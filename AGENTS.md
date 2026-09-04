# Biotox: instrucciones para agentes

## Contexto

Biotox es un sitio institucional de un laboratorio de análisis clínicos, toxicología, estudios de ADN y pericias químico-legales. El proyecto usa Next.js App Router y TypeScript estricto.

## Estructura

- `src/app`: rutas, layout, estilos globales y route handlers.
- `src/components`: componentes de interfaz y comportamiento de cliente.
- `src/config`: configuración pública y metadatos del sitio.
- `.agents/skills`: procedimientos específicos que se deben consultar según la tarea.

## Reglas de trabajo

- Preservar la dirección visual existente salvo que el pedido indique un rediseño.
- Mantener español rioplatense, tono claro, calmo y profesional.
- No dar indicaciones médicas ni modificar preparaciones de pacientes sin validación del laboratorio.
- No incluir datos clínicos, recetas reales, credenciales o información personal en fixtures, logs o documentación.
- Para cambios en la carga de recetas, consultar `.agents/skills/recetas-privacy/SKILL.md`.
- Para cambios de interfaz, consultar `.agents/skills/biotox-ui/SKILL.md`.
- Ejecutar `npm run typecheck` y `npm run build` al finalizar cambios de código.

## Agentes recomendados

- `ui-maintainer`: cambios visuales, responsive y accesibilidad. Usa `biotox-ui`.
- `clinical-content-reviewer`: cambios de textos, estudios, preparación y coberturas. Usa `clinical-content`.
- `privacy-reviewer`: formularios, archivos, WhatsApp, correo, almacenamiento y datos personales. Usa `recetas-privacy`.

Los roles son una guía de especialización. No reemplazan una revisión humana profesional para contenido médico, legal o de seguridad.
