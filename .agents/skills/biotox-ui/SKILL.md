---
name: biotox-ui
description: Mantiene la interfaz institucional de Biotox sin alterar su dirección visual.
---

# Interfaz Biotox

Usar esta skill al modificar páginas, componentes, estilos, responsive o accesibilidad.

## Dirección visual

- Conservar la composición editorial, científica y humana actual; no convertirla en un hero fotográfico ni en una grilla genérica de tarjetas.
- Respetar los colores institucionales existentes: verde `#007e72`, verde oscuro `#005f57`, magenta `#c72367`, tinta `#172a2b` y fondos neutros.
- Mantener la tipografía Manrope para interfaz y DM Mono para etiquetas técnicas.
- Evitar dependencias de UI nuevas si CSS existente resuelve el cambio de manera clara.

## Implementación

- Priorizar HTML semántico, foco visible y controles accesibles por teclado.
- Mantener los breakpoints actuales para móvil, tablet y escritorio.
- Si se agregan iconos, utilizar trazos simples compatibles con Lucide.
- No usar texto incrustado en imágenes. Toda imagen decorativa debe poder ocultarse a lectores de pantalla.
- Verificar en anchos de 360 px, 768 px y 1280 px como mínimo.

## Cierre

Ejecutar `npm run typecheck` y `npm run build`. Informar explícitamente cualquier cambio que pueda afectar la identidad visual.
