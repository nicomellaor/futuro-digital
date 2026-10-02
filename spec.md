# FuturoDigital — Especificación de la experiencia

## 1. Propósito

Crear una aplicación web breve para una charla de orientación vocacional con estudiantes de enseñanza media. Debe responder visualmente: **«¿Qué ocurre dentro de una aplicación cuando presiono un botón?»**

El estudiante debe reconocer frontend, API, backend, base de datos y algoritmo como piezas conectadas de un producto cotidiano. La experiencia prioriza familiaridad, interacción y comprensión visual sobre exactitud técnica exhaustiva.

## 2. Concepto y alcance

FuturoDigital es una red social ficticia de descubrimiento de publicaciones sobre videojuegos, música, ciencia, tecnología, deportes, arte y películas. Funciona con datos locales y sin Internet; no reproduce audio ni video.

En esta versión, Alex puede:

- dar y quitar Me gusta a una publicación;
- seguir y dejar de seguir a un creador;
- mejorar sus recomendaciones según sus interacciones;
- activar o desactivar **Modo Rayos X** para ver el funcionamiento interno;
- abrir cuando quiera **Ver mapa completo** y reiniciar la demostración.

No hay objetivos obligatorios ni orden prescrito para probar esas acciones.

## 3. Feed en modo normal

La primera impresión debe ser la de una red social conocida, **no** la de una herramienta educativa. El feed presenta una única columna centrada de publicaciones apiladas, con scroll vertical continuo: al bajar aparece la siguiente publicación. No hay cuadrícula, tarjeta destacada, carrusel ni ajuste forzado de una publicación por pantalla.

Cada publicación tiene una composición familiar:

1. Encabezado compacto con avatar ficticio, autor y control **Seguir / Siguiendo**.
2. Ilustración propia y predominante, preferentemente vertical (aproximadamente 4:5), sin depender de multimedia externa.
3. Fila de interacción con el corazón de **Me gusta**.
4. Contador de Me gusta y texto breve que integra título y categoría.

Las publicaciones usan la misma estructura y anchura. En laptop/proyector el feed permanece legible y centrado; en móvil ocupa el ancho disponible sin perder el scroll familiar. Las acciones se aplican inmediatamente también antes de activar Rayos X. El control para activar Rayos X debe estar siempre a la vista en el feed.

## 4. Dirección visual

La interfaz completa utiliza **un tema claro uniforme**, incluido Rayos X y la vista de mapa completo: fondo claro, superficies blancas, texto oscuro, divisores sutiles y un acento principal reservado a controles y etapas activas. El corazón puede usar un color propio para expresar su estado.

La identidad de FuturoDigital debe surgir de la estructura reconocible de la publicación y de ilustraciones locales originales, no de una galería de tarjetas, bloques de gradientes multicolor o un panel técnico oscuro. No se necesitan imágenes remotas ni una copia literal de marcas, logotipos o fotografías de otra red social.

## 5. Modo Rayos X libre

Al activarlo, el feed sigue siendo utilizable y aparece a su lado un diagrama compacto de la arquitectura en pantallas amplias. En pantallas estrechas se adapta sin ocultar las acciones del feed. Debe poder verse la publicación y el diagrama durante la demostración en laptop/proyector.

```text
Usuario → Frontend → API → Backend ┬→ Base de datos
                                   └→ Algoritmo → Frontend
```

El diagrama muestra brevemente qué representa cada pieza. Cuando no hay acción en curso permanece visible en reposo, sin un recuadro de explicación vacío ni una nota fija al pie. Al interactuar, se ilumina la etapa actual. **No** muestra misiones, barras de progreso obligatorias ni tablas permanentes. El usuario puede salir y volver a Rayos X sin perder sus interacciones.

El diagrama representa sistemas simulados localmente, como se explica en la documentación del proyecto; no necesita una advertencia permanente en la interfaz.

## 6. Regla de explicación de acciones

Una pulsación produce inmediatamente el cambio que espera el usuario. Si Rayos X está activo, aparece la etapa **Frontend** y una frase concreta sobre la acción. El presentador avanza a su ritmo mediante un botón discreto **Siguiente** dentro del panel; en la última etapa el botón dice **Finalizar**. Al finalizar, el diagrama vuelve al reposo y la explicación desaparece. No hay temporizador ni avance automático.

- El flujo de Me gusta y Seguir recorre **Frontend → API → Backend → Base de datos → respuesta al Frontend**.
- Recomendaciones recorre **Frontend → API → Backend → Base de datos → Algoritmo → nuevo feed en Frontend**.
- La respuesta y el resultado visible deben corresponder a la publicación o autor que se pulsó.
- Pulsaciones rápidas conservan **todos** sus efectos sobre los datos; una acción nueva sustituye la explicación anterior y comienza otra vez en Frontend. No se bloquean los botones del feed.
- Al desactivar Rayos X se cierra la explicación, no se deshacen las acciones. Reiniciar borra el estado de la sesión y cualquier recorrido pendiente.
- Con movimiento reducido se mantiene el mismo control manual y las etapas son comprensibles sin animación.

## 7. Me gusta

Al dar Me gusta, el corazón y el contador cambian de inmediato. En Rayos X, las frases pueden ser:

```text
Frontend: Alex pulsó Me gusta en esta publicación.
API: Se envía POST /likes.
Backend: Se comprueba quién y qué publicación.
Base de datos: Se recuerda este Me gusta.
Respuesta: El feed ya muestra el nuevo contador.
```

En el nodo Base de datos aparece **solo durante la explicación** una fila contextual, por ejemplo `Alex | videojuegos | ♥`. Al quitar Me gusta se muestra la eliminación de esa relación y el contador vuelve a su valor anterior. No se muestra una tabla de sesión permanente.

## 8. Seguir a un creador

Seguir actualiza inmediatamente todas las publicaciones del mismo autor. Rayos X usa el mismo recorrido y una explicación específica (`POST /follow` o la acción de dejar de seguir). En Base de datos aparece brevemente una fila como `Alex | sigue a | PixelZone`; al dejar de seguir se indica su eliminación. Esto enseña que una arquitectura compartida permite funciones diferentes.

## 9. Recomendaciones y algoritmos

El botón **✨ Mejorar mis recomendaciones** usa Me gusta y autores seguidos como señales. La regla local es determinista y explicable: cada Me gusta aporta **+1** a la categoría de su publicación y cada autor seguido aporta **+2** a cada categoría en la que publica, una sola vez por categoría. Se muestra un resumen breve de los intereses detectados durante la explicación en Rayos X.

Al ejecutar la acción, el feed se reordena de forma estable: mayor puntuación de categoría primero; los empates conservan el orden original. El cambio debe ser perceptible y no borrar Me gusta ni seguidos. Si no hay señales, se indica que hay que dar Me gusta o seguir a alguien antes de personalizar el feed; no se simula una preferencia inventada.

El recorrido destaca la consulta de datos y el algoritmo hasta el nuevo feed. No se utiliza IA real ni simulada en la personalización: **el algoritmo es programación con reglas simples**. La IA puede mencionarse como componente opcional de otros productos, no como explicación falsa del funcionamiento de esta versión.

## 10. Mapa completo opcional

**Ver mapa completo** está disponible en cualquier momento, sin desbloqueos ni requisito de completar acciones. Presenta Usuario, Frontend, API, Backend, Base de datos y Algoritmo / IA con **iconos SVG de línea, no emojis**, y definiciones muy breves. La distinción entre reglas e IA opcional se explica en el nodo correspondiente, sin una nota separada debajo del diagrama.

Mensaje de síntesis:

> **Programar significa construir las reglas y sistemas que hacen posible todo esto.**

Se puede volver al feed conservando la sesión o reiniciar para otra charla mediante **los controles del header**. La vista no repite los botones Volver o Reiniciar en el cuerpo.

## 11. Datos y funcionamiento local

- Ocho publicaciones ficticias son suficientes. Cada una tiene `id`, título, autor, categoría, likes iniciales, guardados (dato opcional para futuro uso) e ilustración local; no requiere reproducción multimedia.
- Alex es el usuario de la demostración. Me gusta y autores seguidos son estado local de la sesión y pueden deshacerse; el seguimiento pertenece al autor, no a una sola tarjeta.
- Las ilustraciones pueden ser SVG originales u otros recursos estáticos propios. Deben distinguir temas y publicaciones sin depender únicamente de un emoji sobre un gradiente.
- React, TypeScript, Vite y CSS implementan la simulación; API, backend y base de datos son representaciones didácticas, no servicios reales.
- No se guardan cuentas ni datos permanentes. Una recarga o el control **Reiniciar demo** restablece publicaciones, interacciones, orden y visualización.

## 12. Fuera de alcance de esta versión

Guardar, Actualizar feed, comentarios, cuentas, autenticación, subida de contenido, reproducción multimedia, servicios externos, persistencia, IA real o simulada, editor de código, misiones guiadas, recorrido automático y tablas permanentes. Estos elementos no son requisitos para medir el rediseño.

## 13. Criterios de aceptación

1. Al abrir, se ve un feed claro y reconocible de una sola columna; se navega con scroll continuo y se aprecia una publicación predominante antes de la siguiente.
2. Cada publicación tiene cabecera de autor, ilustración vertical protagonista, acciones y contador/texto debajo. El diseño no se convierte en cuadrícula en escritorio.
3. Toda la aplicación, incluido Rayos X y el mapa completo, mantiene tema claro y contraste legible en móvil y en laptop/proyector.
4. Like y Seguir funcionan y se deshacen con o sin Rayos X; seguir a un autor se refleja en todas sus publicaciones.
5. Rayos X puede activarse y cerrarse libremente. En reposo muestra solo el diagrama: no hay `xray__note` ni `xray__explanation`. Al pulsar una acción destaca Frontend; únicamente **Siguiente** avanza por el trayecto, y **Finalizar** devuelve el panel al reposo.
6. Las explicaciones son breves y contextualizadas; al llegar a Base de datos se muestra una fila transitoria pertinente, no una tabla permanente. El efecto ya es visible en el feed al pulsar.
7. Con clics rápidos se preservan todas las interacciones y el recorrido corresponde a la última, reiniciándose en Frontend. El control manual y el contenido siguen siendo accesibles con teclado y movimiento reducido.
8. Recomendaciones muestra señales reales, explica la regla, reordena de modo estable y orienta cuando no existen intereses. El nuevo orden es perceptible.
9. Ver mapa completo está disponible en cualquier momento; usa iconos, no emojis, y no contiene `overview__note`, `overview__back` ni un botón Reiniciar dentro de la vista. Los controles del header permiten volver conservando el estado y reiniciar todo.
10. Una persona sin conocimientos técnicos puede señalar qué hacen aproximadamente frontend, API, backend, base de datos y algoritmo, y dónde podría incorporarse IA sin confundirla con toda la aplicación.
