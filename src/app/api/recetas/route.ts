import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

function uploadRecipe(file: File) {
  return file.arrayBuffer().then((buffer) => new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "biotox-recetas", type: "authenticated" }, (error, result) => error || !result ? reject(error) : resolve(result.secure_url));
    stream.end(Buffer.from(buffer));
  }));
}

async function notifyLaboratory(data: { nombre: string; telefono: string; obraSocial: string; comentario: string; links: string[] }) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, LAB_NOTIFICATION_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !LAB_NOTIFICATION_EMAIL) return false;

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } });
  await transporter.sendMail({
    from: `Biotox recetas <${GMAIL_USER}>`,
    to: LAB_NOTIFICATION_EMAIL,
    subject: "Nueva receta recibida desde el sitio web",
    text: [
      "Se recibió una receta desde el sitio web de Biotox.",
      `Nombre: ${data.nombre}`,
      `Teléfono: ${data.telefono}`,
      data.obraSocial && `Obra social: ${data.obraSocial}`,
      data.comentario && `Comentario: ${data.comentario}`,
      "Archivos cargados:",
      ...data.links,
    ].filter(Boolean).join("\n"),
  });
  return true;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("recetas").filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (!files.length) return NextResponse.json({ error: "Adjuntá al menos una receta." }, { status: 400 });
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (files.length > 5 || files.some((file) => file.size > 10 * 1024 * 1024)) return NextResponse.json({ error: "Podés adjuntar hasta 5 archivos de 10 MB cada uno." }, { status: 400 });
    if (files.some((file) => !allowedTypes.includes(file.type))) return NextResponse.json({ error: "Solo se aceptan archivos JPG, PNG, WEBP o PDF." }, { status: 400 });
    if (!process.env.CLOUDINARY_CLOUD_NAME) return NextResponse.json({ error: "El servicio de recetas todavía no fue configurado." }, { status: 503 });
    const links = await Promise.all(files.map(uploadRecipe));
    const nombre = String(formData.get("nombre") || "");
    const telefono = String(formData.get("telefono") || "");
    const obraSocial = String(formData.get("obraSocial") || "");
    const comentario = String(formData.get("comentario") || "");
    const emailSent = await notifyLaboratory({ nombre, telefono, obraSocial, comentario, links });
    const lines = ["Hola Biotox, quiero enviar recetas para coordinar mis estudios.", `Nombre: ${nombre}`, `Teléfono: ${telefono}`, obraSocial && `Obra social: ${obraSocial}`, comentario && `Comentario: ${comentario}`, `Recetas: ${links.join(" | ")}`].filter(Boolean);
    const number = process.env.WHATSAPP_NUMBER || "5491112345678";
    return NextResponse.json({ whatsappUrl: `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`, emailSent });
  } catch { return NextResponse.json({ error: "No pudimos cargar los archivos. Intentá nuevamente." }, { status: 500 }); }
}
