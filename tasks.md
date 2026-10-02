# Tareas del rediseño — FuturoDigital

Referencia: `spec.md`. El objetivo es pasar del prototipo actual de cuadrícula y misiones a un feed social de una columna, Rayos X libre y explicaciones automáticas. Los ítems marcados abajo son **base existente reutilizable**; todos los cambios de diseño y comportamiento siguen pendientes hasta verificarlos.

## 0. Base existente reutilizable

- [x] Proyecto React + TypeScript + Vite con datos ficticios locales, ocho publicaciones, compilación y pruebas.
- [x] Like y Seguir alternables, con seguimiento compartido por autor y reinicio de sesión.
- [x] Regla determinista de recomendaciones a partir de Me gusta y autores seguidos.

## 1. Convertir el feed en una publicación por vez

- [x] Reemplazar en `App.tsx` y `styles.css` la cuadrícula y tarjeta destacada por **una sola columna centrada** de publicaciones del mismo ancho, con scroll vertical continuo y sin scroll-snap.
- [x] Reorganizar `PostCard.tsx`: avatar/autor y Seguir arriba, ilustración vertical protagonista (aprox. 4:5), acciones debajo, contador y título/categoría como texto de la publicación.
- [x] Sustituir el tratamiento repetido de emoji sobre gradiente por ilustraciones SVG o recursos locales propios distinguibles entre publicaciones, sin cargar contenido remoto.
- [x] Conservar Like, Seguir y recomendaciones funcionales mientras cambia la presentación; mantener los botones accesibles y sus estados visibles.

**Comprobar:** en escritorio y móvil nunca hay dos publicaciones lado a lado; al desplazar hacia abajo aparece la siguiente de forma natural. La primera pantalla parece un feed social y no una galería educativa.

## 2. Unificar la identidad visual en tema claro

- [x] Definir en `styles.css` tokens coherentes de superficie, fondo, texto, borde, acento y estado de Like; aplicarlos al feed, Rayos X y mapa completo.
- [x] Retirar el panel oscuro, el encabezado de estilo promocional y los elementos decorativos que compitan con la publicación.
- [x] Ajustar anchuras, tipografía, contraste y tamaño de controles para proyector/laptop y móvil; conservar foco visible y soporte de movimiento reducido.

**Comprobar:** no quedan superficies oscuras pertenecientes a otro tema; la publicación es el foco visual y la información sigue siendo legible a distancia.

## 3. Sustituir misiones por Rayos X de exploración libre

- [x] Retirar de `demo.ts`, `App.tsx` y `XrayPanel.tsx` el índice de misión, las instrucciones, la barra de progreso y las condiciones de desbloqueo.
- [x] Mantener el feed usable al activar Rayos X y mostrar un diagrama compacto con Usuario, Frontend, API, Backend, Base de datos y Algoritmo; ubicarlo junto al feed en escritorio y adaptarlo a móvil.
- [x] Mostrar el diagrama en reposo hasta que haya una acción. Permitir activar/desactivar Rayos X en cualquier momento sin perder datos ni requerir terminar una explicación.
- [x] Hacer accesible **Ver mapa completo** sin condiciones, tanto si Rayos X está activo como si no.

**Comprobar:** se puede ejecutar Like, Seguir o Recomendaciones en cualquier orden, entrar y salir de Rayos X y abrir el mapa completo sin completar misiones.

## 4. Mostrar el trayecto automáticamente y sin bloquear la interacción

- [x] Cambiar el estado en `demo.ts` para aplicar Like, Seguir y el orden recomendado **al pulsar**, con o sin Rayos X; eliminar la confirmación diferida y el botón «Siguiente paso».
- [x] Al interactuar con Rayos X activo, iluminar sucesivamente el trayecto adecuado durante unos 2–3 segundos y terminar con un resumen corto de la última acción.
- [x] Para Like/Seguir, representar Frontend → API → Backend → Base de datos → respuesta al Frontend; para Recomendaciones, incluir la consulta a datos, Algoritmo y nuevo feed.
- [x] Reducir las explicaciones a una frase contextual por etapa; conservar mensajes API pertinentes (`POST /likes`, `POST /follow` o su operación inversa).
- [x] Controlar temporizadores y clics rápidos: todas las pulsaciones cambian el estado; la animación anterior se cancela y el diagrama muestra solamente la acción más reciente. Salir de Rayos X o reiniciar cancela cualquier animación pendiente.
- [x] Presentar un trayecto estático comprensible cuando esté activada la preferencia de movimiento reducido.

**Comprobar:** una pulsación cambia de inmediato el contador/botón; clics rápidos no pierden acciones ni dejan mensajes atrasados; no se bloquean las acciones durante el recorrido.

## 5. Contexto mínimo en Base de datos

- [x] Retirar las dos tablas permanentes de `XrayPanel.tsx` y mostrar solo una fila breve dentro o junto al nodo Base de datos cuando llegue una acción: `Alex | publicación | ♥` o `Alex | sigue a | autor`.
- [x] Reflejar también la eliminación al quitar Me gusta o dejar de seguir, usando el dato real de la sesión.
- [x] Mantener una indicación breve de que backend, API y base de datos están **simulados localmente**.

**Comprobar:** el diagrama queda despejado en reposo; cada fila contextual corresponde exactamente a la acción que se acaba de realizar.

## 6. Recomendaciones y mapa opcional

- [x] Reutilizar la puntuación existente (+1 por Me gusta, +2 por categoría de autor seguido) y el orden estable; mostrar intereses reales brevemente en Rayos X y hacer perceptible el nuevo orden del feed.
- [x] Si no hay señales, mantener el feed y orientar a dar Me gusta o seguir a un creador, sin iniciar un recorrido falso.
- [x] Adaptar `Overview.tsx` al tema claro y abrirlo desde un control visible **siempre**, sin requisito de cuatro misiones; permitir volver sin perder datos y reiniciar todo.
- [x] Mantener la distinción pedagógica entre algoritmo de reglas e IA opcional; no atribuir a IA la personalización de esta demo.

**Comprobar:** la personalización refleja interacciones realizadas en cualquier orden; el mapa completo está disponible desde el inicio y el regreso conserva el estado.

## 7. Verificación y documentación

- [x] Sustituir las pruebas de misiones y avance manual por pruebas del flujo libre, cambios inmediatos, recorrido automático, clics rápidos, deshacer acciones, ausencia de señales, mapa opcional y reinicio.
- [x] Verificar con teclado la activación de Rayos X, las publicaciones y el mapa; revisar anuncios de etapa activa, foco y el modo de movimiento reducido.
- [x] Revisar visualmente a tamaño laptop/proyector y móvil: columna única, scroll continuo, tema claro uniforme, diagrama visible y ausencia de desbordes.
- [x] Actualizar `README.md` con los controles reales y eliminar referencias a misiones o al avance por «Siguiente».
- [x] Ejecutar `npm test` y `npm run build`; corregir los fallos antes de marcar el rediseño como completado.

**Fuera de alcance:** backend real, cuentas, almacenamiento permanente, multimedia, Guardar, Actualizar feed, IA simulada, editor de código, misiones, avance manual y tablas permanentes.
