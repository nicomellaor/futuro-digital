# FuturoDigital — Especificación de la experiencia

## 1. Propósito

Crear una aplicación web breve para una charla de orientación vocacional con estudiantes de enseñanza media. Debe responder visualmente: **«¿Qué ocurre dentro de una aplicación cuando presiono un botón?»** y **«¿Qué instrucciones hacen que ocurra?»**.

El estudiante debe reconocer frontend, API, backend, base de datos y algoritmo como piezas conectadas de un producto cotidiano, e identificar datos, condiciones, instrucciones y pruebas como conceptos de programación aplicables fuera de la web. La experiencia prioriza familiaridad, interacción y comprensión visual sobre exactitud técnica exhaustiva.

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

El feed, el contenedor de Rayos X y el mapa completo utilizan **un tema claro uniforme**: fondo claro, superficies blancas, texto oscuro, divisores sutiles y un acento principal reservado a controles y etapas activas. Una vez que hay una acción, el pseudocódigo de Programación se presenta como una superficie de editor oscura y legible dentro del panel claro. El corazón puede usar un color propio para expresar su estado.

La identidad de FuturoDigital debe surgir de la estructura reconocible de la publicación y de ilustraciones locales originales, no de una galería de tarjetas ni de bloques de gradientes multicolor. La superficie de código no convierte el feed ni el diagrama en paneles oscuros. No se necesitan imágenes remotas ni una copia literal de marcas, logotipos o fotografías de otra red social.

## 5. Modo Rayos X libre

Al activarlo, el feed sigue siendo utilizable y aparece a su lado el panel con las pestañas **Programación** (primera y seleccionada por defecto) y **Arquitectura** (segunda) en pantallas amplias. En pantallas estrechas se adapta sin ocultar las acciones del feed. Debe poder verse la publicación y el diagrama durante la demostración en laptop/proyector al seleccionar Arquitectura.

```text
Usuario → Frontend → API → Backend ┬→ Base de datos
                                   └→ Algoritmo → Frontend
```

En la pestaña Arquitectura, el diagrama muestra brevemente qué representa cada pieza. Cuando no hay acción en curso permanece visible en reposo, sin un recuadro de explicación vacío ni una nota fija al pie. Al interactuar, se ilumina la etapa actual. **No** muestra misiones, barras de progreso obligatorias ni tablas permanentes. El usuario puede salir y volver a Rayos X sin perder sus interacciones.

El diagrama representa sistemas simulados localmente, como se explica en la documentación del proyecto; no necesita una advertencia permanente en la interfaz.

## 6. Regla de explicación de acciones

Una pulsación produce inmediatamente el cambio que espera el usuario. Si Rayos X está activo, Programación explica la acción y el recorrido de Arquitectura comienza en **Frontend**, disponible al cambiar a esa pestaña. El presentador avanza a su ritmo mediante un botón discreto **Siguiente** dentro de Arquitectura; en la última etapa el botón dice **Finalizar**. Al finalizar, el diagrama vuelve al reposo y la explicación arquitectónica desaparece. No hay temporizador ni avance automático.

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

**Ver mapa completo** está disponible en cualquier momento, sin desbloqueos ni requisito de completar acciones. Presenta Usuario, Frontend, API, Backend, Base de datos y Algoritmo / IA con **iconos SVG de línea, no emojis**, y definiciones muy breves. Base de datos se sitúa justo debajo de Backend y Algoritmo / IA debajo de Base de datos, con las flechas alineadas entre nodos. La distinción entre reglas e IA opcional se explica en el nodo correspondiente, sin una nota separada debajo del diagrama.

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

Guardar, Actualizar feed, comentarios, cuentas, autenticación, subida de contenido, reproducción multimedia, servicios externos, persistencia, IA real o simulada, editor de código editable o ejecutable, misiones guiadas, recorrido automático y tablas permanentes. Estos elementos no son requisitos para medir el rediseño.

## 13. Criterios de aceptación

1. Al abrir, se ve un feed claro y reconocible de una sola columna; se navega con scroll continuo y se aprecia una publicación predominante antes de la siguiente.
2. Cada publicación tiene cabecera de autor, ilustración vertical protagonista, acciones y contador/texto debajo. El diseño no se convierte en cuadrícula en escritorio.
3. La aplicación mantiene tema claro y contraste legible en móvil y laptop/proyector, con una superficie de código oscura y legible solo cuando Programación muestra una acción.
4. Like y Seguir funcionan y se deshacen con o sin Rayos X; seguir a un autor se refleja en todas sus publicaciones.
5. Rayos X puede activarse y cerrarse libremente. La pestaña Arquitectura muestra solo el diagrama en reposo: no hay `xray__note` ni `xray__explanation`. Al pulsar una acción destaca Frontend; únicamente **Siguiente** avanza por el trayecto, y **Finalizar** devuelve el diagrama al reposo.
6. Las explicaciones son breves y contextualizadas; al llegar a Base de datos se muestra una fila transitoria pertinente, no una tabla permanente. El efecto ya es visible en el feed al pulsar.
7. Con clics rápidos se preservan todas las interacciones y el recorrido corresponde a la última, reiniciándose en Frontend. El control manual y el contenido siguen siendo accesibles con teclado y movimiento reducido.
8. Recomendaciones muestra señales reales, explica la regla, reordena de modo estable y orienta cuando no existen intereses. El nuevo orden es perceptible.
9. Ver mapa completo está disponible en cualquier momento; usa iconos, no emojis, y no contiene `overview__note`, `overview__back` ni un botón Reiniciar dentro de la vista. Los controles del header permiten volver conservando el estado y reiniciar todo.
10. Una persona sin conocimientos técnicos puede señalar qué hacen aproximadamente frontend, API, backend, base de datos y algoritmo, y dónde podría incorporarse IA sin confundirla con toda la aplicación.

## 14. Pestaña Programación

Su objetivo es conectar la arquitectura con la programación: Arquitectura explica *por dónde pasa* una acción y Programación explica *qué datos y reglas determinan el resultado*. Los ejemplos son pseudocódigo legible con variables y explicaciones en español; los textos aparecen entre comillas. No se editan ni se ejecutan como código introducido por el público. El enfoque sirve también para videojuegos, robots y otras aplicaciones, no solo para páginas web.

- Mantener el único control **Modo Rayos X** en el header. Dentro del panel, ofrecer dos pestañas accesibles en este orden: **Programación** (predeterminada) y **Arquitectura**. No abrir otro panel ni ocultar el feed. En móvil ambas vistas deben seguir siendo legibles sin desbordes.
- En reposo, Programación muestra únicamente el texto discreto **«Realiza una acción para continuar.»**: no presenta datos, reglas ni un ejemplo previo hasta pulsar una acción con Rayos X abierto. Arquitectura conserva el diagrama limpio en reposo. Tras interactuar, Programación muestra la última acción real en un editor de pseudocódigo de solo lectura, con nombre de archivo, números de línea, tipografía monoespaciada y diferenciación visual entre comentarios, palabras clave y valores. Sus líneas identifican **Datos**, **Condición**, **Instrucciones** y **Prueba**. La pregunta de Prueba invita a predecir y comprobar manualmente un caso, no califica respuestas.
- Escribir el pseudocódigo con **estructura similar a Python**: asignaciones a variables en español, valores entre comillas cuando son textos, `True`/`False`, comentarios `#`, `if` con dos puntos e instrucciones indentadas, sin llaves ni sintaxis JavaScript. La vista enseña reglas aproximadas, no código que se ejecute en la demo.
- Usar la publicación, autor, categoría y estado pertinentes a la acción. Me gusta y Seguir deben explicar tanto activar como deshacer; si se pulsa otra acción, la explicación anterior se reemplaza sin perder ninguno de sus efectos. Cambiar de pestaña conserva las interacciones y el paso actual de Arquitectura; **Siguiente/Finalizar** siguen controlando solo ese recorrido. Al finalizar, Arquitectura vuelve a reposo y Programación conserva el último ejemplo hasta otra acción o hasta cerrar Rayos X. **Reiniciar demo** borra ambos recorridos y los datos de la sesión.
- Recomendaciones explica cómo se puntúan las categorías (+1 por Me gusta, +2 por cada categoría de un autor seguido, una vez por categoría) y cómo se ordena el feed conservando el orden original en los empates. Si faltan señales, mostrar la condición «si no hay Me gusta ni seguidos» y la instrucción de pedir una interacción; no inventar intereses ni iniciar un recorrido arquitectónico falso.
- Las frases describen las reglas **locales reales** de esta demo: API, backend y base de datos continúan siendo una representación didáctica, y no se atribuye el algoritmo a IA. El acceso y el contenido de ambas pestañas deben funcionar con teclado, foco visible y movimiento reducido.

Ejemplo orientativo después de dar Me gusta (solo visible tras la acción):

```text
# Datos
usuario = "Alex"
publicacion = "Los mundos abiertos que no querrás abandonar"
categoria = "Videojuegos"
me_gusta = False
contador = 842
# Condición
if not me_gusta:
    # Instrucciones
    me_gusta = True
    contador += 1
# Prueba
comprobar(contador == 843)
# Si vuelves a pulsar, ¿regresan el corazón y el contador a 842?
```

**Comprobar:** Programación es la primera pestaña y en reposo solo contiene la indicación breve; al interactuar aparece el editor contextual con sintaxis tipo Python y contenidos en español. Dar y quitar Me gusta, seguir y dejar de seguir, recomendar con y sin señales, cambiar de pestaña durante una explicación, recibir una acción nueva, cerrar y reiniciar deben mantener textos acordes al feed.

## 15. Dinámica sugerida para el taller

Usar el ciclo **predecir → escribir una regla → probarla → corregirla**: pedir al grupo que anticipe qué hará Me gusta al pulsarlo dos veces; formular en parejas una condición para Seguir; calcular los puntos antes de mejorar recomendaciones; representar los roles del recorrido en Rayos X; y detectar qué regla falló si el contador no vuelve a su valor inicial. La pestaña Programación permite contrastar estas predicciones con datos, condiciones, instrucciones y preguntas de prueba de la acción elegida. Esta guía no impone pasos obligatorios a quien explora el feed.
