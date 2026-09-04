---
name: recetas-privacy
description: Protege el flujo de recetas, archivos y consultas que contienen datos sensibles.
---

# Privacidad de recetas y consultas

Usar esta skill en cambios de formularios, adjuntos, correo, WhatsApp, Cloudinary, APIs, base de datos, analytics y logs.

## Principios obligatorios

- Una receta puede contener datos de salud sensibles. Aplicar minimización de datos y acceso por necesidad.
- No registrar archivos, nombres, teléfonos, enlaces firmados ni contenido de formularios en logs de aplicación, analytics o herramientas de error.
- Validar tipo, cantidad y tamaño de archivos tanto en cliente como en servidor.
- Usar HTTPS y almacenamiento privado. Los enlaces a archivos deben expirar y no ser públicos.
- Definir un período de retención, una forma de eliminación y responsables de acceso antes de producción.
- Proteger credenciales exclusivamente mediante variables de entorno; nunca exponerlas mediante `NEXT_PUBLIC_`.

## Flujo actual

La route `src/app/api/recetas/route.ts` sube archivos a Cloudinary y devuelve una URL de WhatsApp. WhatsApp no permite adjuntar archivos con `wa.me`, por lo que los enlaces se incluyen en el mensaje.

Antes de producción, reemplazar o complementar el enlace de Cloudinary por URLs firmadas de corta duración. Verificar también que el proveedor contratado sea apto para el tratamiento de datos de salud según la jurisdicción aplicable.

## Decisión de arquitectura

- Para una consulta general sin adjuntos, WhatsApp y correo pueden ser suficientes.
- Para recetas o documentación clínica, mantener un backend aunque la atención continúe por WhatsApp.
- Persistir en una base de datos solo metadatos operativos indispensables: identificador, fecha, estado, canal y referencia al archivo. No guardar el archivo en la base de datos.
- Almacenar el archivo en storage privado, con control de acceso, retención limitada y auditoría.
- Usar correo solo para notificaciones internas o al paciente; no como transporte de recetas adjuntas, salvo que exista cifrado y una política aprobada.
