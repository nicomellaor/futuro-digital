# Tareas del rediseño — FuturoDigital

Referencia: `spec.md`. El feed social de una columna y el Modo Rayos X libre ya están implementados. El recorrido se controla manualmente para que el presentador pueda explicar cada pieza a su ritmo. Las casillas marcadas indican tareas implementadas y verificadas.

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

## 4. Mostrar el trayecto manualmente y sin bloquear la interacción

- [x] Aplicar Like, Seguir y el orden recomendado **al pulsar**, con o sin Rayos X; no diferir el cambio visible hasta que termine la explicación.
- [x] Al interactuar con Rayos X activo, destacar Frontend y avanzar el trayecto solo mediante un control discreto **Siguiente**; usar **Finalizar** para devolver el diagrama al reposo.
- [x] Para Like/Seguir, representar Frontend → API → Backend → Base de datos → respuesta al Frontend; para Recomendaciones, incluir la consulta a datos, Algoritmo y nuevo feed.
- [x] Reducir las explicaciones a una frase contextual por etapa; conservar mensajes API pertinentes (`POST /likes`, `POST /follow` o su operación inversa).
- [x] Conservar todas las pulsaciones en el estado; una acción nueva reinicia la explicación en Frontend para mostrar solo la más reciente. Salir de Rayos X o reiniciar cierra cualquier recorrido pendiente.
- [x] Mantener etapas comprensibles y avance manual sin depender de animación, también con movimiento reducido.
- [x] Ocultar `xray__explanation` cuando no haya recorrido activo y retirar `xray__note`, conservando el diagrama visible en reposo.

**Comprobar:** una pulsación cambia de inmediato el contador/botón; sin pulsar Siguiente el diagrama no avanza, una acción nueva reemplaza la explicación y Finalizar oculta el recuadro.

## 5. Contexto mínimo en Base de datos

- [x] Retirar las dos tablas permanentes de `XrayPanel.tsx` y mostrar solo una fila breve dentro o junto al nodo Base de datos cuando llegue una acción: `Alex | publicación | ♥` o `Alex | sigue a | autor`.
- [x] Reflejar también la eliminación al quitar Me gusta o dejar de seguir, usando el dato real de la sesión.
- [x] Documentar que backend, API y base de datos están **simulados localmente**, sin añadir una nota fija en el panel.

**Comprobar:** el diagrama queda despejado en reposo; cada fila contextual corresponde exactamente a la acción que se acaba de realizar.

## 6. Recomendaciones y mapa opcional

- [x] Reutilizar la puntuación existente (+1 por Me gusta, +2 por categoría de autor seguido) y el orden estable; mostrar intereses reales brevemente en Rayos X y hacer perceptible el nuevo orden del feed.
- [x] Si no hay señales, mantener el feed y orientar a dar Me gusta o seguir a un creador, sin iniciar un recorrido falso.
- [x] Adaptar `Overview.tsx` al tema claro y abrirlo desde un control visible **siempre**, sin requisito de cuatro misiones; permitir volver sin perder datos y reiniciar todo desde el header.
- [x] Usar iconos SVG coherentes en el mapa completo y retirar `overview__note`, `overview__back` y el botón «Reiniciar para otra charla» del cuerpo.
- [x] Situar Base de datos debajo de Backend y Algoritmo / IA debajo de Base de datos en el mapa completo; permitir que el texto final ocupe todo el ancho.
- [x] Mantener la distinción pedagógica entre algoritmo de reglas e IA opcional; no atribuir a IA la personalización de esta demo.

**Comprobar:** la personalización refleja interacciones realizadas en cualquier orden; el mapa completo está disponible desde el inicio y el regreso conserva el estado.

## 7. Verificación y documentación

- [x] Probar flujo libre, cambios inmediatos, avance manual sin temporizador, acción nueva durante el recorrido, deshacer acciones, ausencia de señales, mapa opcional y reinicio.
- [x] Verificar con teclado la activación de Rayos X, las publicaciones y el mapa; revisar anuncios de etapa activa, foco y el modo de movimiento reducido.
- [x] Revisar visualmente a tamaño laptop/proyector y móvil: columna única, scroll continuo, tema claro uniforme, diagrama visible y ausencia de desbordes.
- [x] Actualizar `README.md` y `spec.md` con el control **Siguiente/Finalizar**, la ausencia de notas permanentes y la navegación desde el header.
- [x] Ejecutar `npm test` y `npm run build`; corregir los fallos antes de marcar el rediseño como completado.

**Fuera de alcance:** backend real, cuentas, almacenamiento permanente, multimedia, Guardar, Actualizar feed, IA simulada, editor de código editable o ejecutable, misiones, recorrido automático y tablas permanentes.

## 8. Programación dentro de Rayos X

- [x] Definir en `spec.md` el objetivo didáctico, las dos pestañas, los casos de pseudocódigo y la dinámica del taller; actualizar la guía de uso en `README.md`.
- [x] Añadir pestañas accesibles **Programación** y **Arquitectura** dentro de `XrayPanel.tsx`, dejando Programación primera y seleccionada al entrar. Mantener un solo control Rayos X en el header y el feed interactivo al lado del panel.
- [x] Mostrar únicamente «Realiza una acción para continuar.» hasta la primera acción; después, pseudocódigo contextual de solo lectura con apariencia de editor (archivo y líneas numeradas) para **Datos**, **Condición**, **Instrucciones** y **Prueba**. Usar asignaciones, `if` con dos puntos, indentación, comentarios `#` y nombres explicativos en español.
- [x] Cubrir Me gusta/Quitar Me gusta y Seguir/Dejar de seguir con condiciones y efectos coherentes con la publicación o autor; cubrir Recomendaciones (+1 por Me gusta, +2 por categoría de autor seguido, empates estables) y el caso sin señales, sin inventar intereses ni servicios reales.
- [x] Reutilizar el estado y la última acción: al alternar pestañas conservar interacciones y etapa manual de Arquitectura; al pulsar **Finalizar**, devolver el diagrama a reposo y conservar el último ejemplo en Programación. Una acción nueva reemplaza solo la explicación; cerrar Rayos X borra las explicaciones sin deshacer acciones y reiniciar restablece también los datos. No convertir **Prueba** en una evaluación automática ni añadir un editor ejecutable.
- [x] Adaptar pestañas y pseudocódigo al panel lateral de laptop/proyector y a su versión móvil; comprobar foco, teclado, contraste, desplazamiento y movimiento reducido.
- [x] Probar ambos sentidos de Me gusta y Seguir, recomendaciones con y sin señales, cambio de pestaña a mitad del recorrido, acciones rápidas, cierre y reinicio. Actualizar la guía de uso de `README.md` y ejecutar `npm test` y `npm run build` antes de marcar estas tareas como completadas.

**Comprobar:** el público puede predecir una regla, probarla en el feed y ver datos/condiciones/instrucciones/pruebas acordes a su acción, sin perder el avance manual de Arquitectura ni confundir la simulación con un backend real.
