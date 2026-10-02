# Tareas de implementación — FuturoDigital

Alcance acordado: MVP de `spec.md`, con cuatro misiones guiadas, simulación local, avance manual de Rayos X y presentación principal en laptop/proyector.

## 1. Preparar la aplicación

- [x] Inicializar Vite con React y TypeScript; añadir scripts para desarrollo, compilación y comprobación de tipos.
- [x] Organizar el código por datos, estado/lógica y componentes visuales, sin incorporar servidor ni servicios externos.
- [x] Definir estilos globales y una disposición adaptable que priorice la lectura en pantalla horizontal proyectada.

**Comprobar:** la aplicación arranca localmente y compila sin errores.

## 2. Definir datos y estado de la demo

- [x] Crear ocho publicaciones ficticias con `id`, título, autor, categoría, likes iniciales, guardados y miniatura visual local (emoji, SVG o gradiente).
- [x] Definir a Alex como usuario de la demostración y representar Likes y autores seguidos como estado de sesión, separado de los contadores iniciales de las publicaciones.
- [x] Definir un estado inicial único para poder reiniciar publicaciones, interacciones, recomendaciones, misiones y Modo Rayos X.
- [x] Modelar las cuatro misiones en orden: activar Rayos X → dar Like → seguir a un creador → mejorar recomendaciones.

**Comprobar:** una recarga recupera el estado inicial; ningún dato requiere Internet.

## 3. Construir el feed en modo normal

- [x] Crear cabecera FuturoDigital, sección «Para ti» y tarjetas con miniatura, título, autor, categoría y contador de Likes.
- [x] Añadir Like y Seguir alternables. Seguir se aplica al autor, por lo que todas sus tarjetas deben reflejar el mismo estado.
- [x] Mantener visible el botón «Activar Modo Rayos X» y permitir interacciones normales antes de activarlo, sin explicaciones técnicas automáticas.
- [x] Añadir un control de reinicio accesible durante toda la demostración.

**Comprobar:** los contadores y botones reflejan inmediatamente las acciones y sus reversiones; el feed inicial parece una aplicación cotidiana.

## 4. Implementar misiones y navegación

- [ ] Mostrar la misión actual con una instrucción breve y progreso «1 de 4» a «4 de 4».
- [ ] Avanzar únicamente cuando se realice la acción de la misión activa; otras interacciones deben seguir funcionando sin completar misiones posteriores.
- [ ] Al activar Rayos X, completar la primera misión y presentar la instrucción para dar Like.
- [ ] Considerar completadas las misiones de Like y Seguir al terminar la explicación paso a paso de una acción válida, no por acciones realizadas previamente en modo normal.
- [ ] Si se deshacen intereses antes de la cuarta misión, pedir nuevas interacciones en lugar de completar recomendaciones sin señales.

**Comprobar:** el recorrido guiado funciona desde cero y no se salta pasos al interactuar libremente.

## 5. Construir el Modo Rayos X

- [ ] Distribuir la pantalla en dos áreas simultáneas: aplicación y panel «¿Qué está ocurriendo?»; permitir volver al modo normal sin perder el estado de sesión.
- [ ] Representar Frontend → API → Backend → Base de datos como etapas distinguibles, con un indicador visual de la etapa activa y movimiento de la acción.
- [ ] Implementar un recorrido manual con botón «Siguiente»: detección en frontend, envío mediante API, validación en backend, cambio en base de datos y respuesta hasta el frontend.
- [ ] Adaptar textos y mensaje de API a Like y Seguir; explicar con lenguaje sencillo qué hace cada pieza.
- [ ] Coordinar el recorrido con el estado para evitar que clics repetidos mezclen explicaciones o produzcan contadores inconsistentes.

**Comprobar:** el presentador puede detenerse en cada etapa; al cerrar el recorrido se ve el efecto correcto en el feed.

## 6. Visualizar la base de datos simulada

- [ ] Mostrar una tabla de Likes con usuario, publicación y estado, y otra de autores seguidos con usuario y autor.
- [ ] Actualizar las filas a partir de las interacciones reales de Alex durante la sesión; al quitar un Like o dejar de seguir, reflejar la eliminación.
- [ ] Destacar la fila añadida o eliminada cuando el recorrido manual llega a «Base de datos».
- [ ] Explicar en la interfaz que el recorrido representa de forma simplificada sistemas simulados localmente.

**Comprobar:** las tablas nunca muestran interacciones inexistentes y coinciden con los controles del feed.

## 7. Implementar recomendaciones

- [ ] Calcular intereses por categoría a partir de publicaciones con Like y autores seguidos; documentar en el código una regla simple y determinista de puntuación.
- [ ] Mostrar las categorías y señales detectadas antes de aplicar el nuevo orden.
- [ ] Impedir la aplicación si no hay señales y explicar qué acción debe realizarse para generarlas.
- [ ] Reordenar de forma estable las tarjetas al pulsar «Mejorar mis recomendaciones», conservando interacciones y contadores.
- [ ] Mostrar el recorrido pedagógico «Tus datos → Algoritmo → Nuevo feed» y completar la cuarta misión cuando termine.

**Comprobar:** cambiar Likes o seguidos cambia los intereses calculados; con datos suficientes el orden del feed responde a ellos.

## 8. Crear la síntesis final

- [ ] Tras la cuarta misión, ofrecer «Ver panorama» sin retirar inmediatamente el feed recomendado.
- [ ] Dibujar el mapa Usuario → Frontend → API → Backend → Base de datos / Algoritmo, acompañado de definiciones breves.
- [ ] Incorporar el mensaje: «Programar significa construir las reglas y sistemas que hacen posible todo esto».
- [ ] Permitir regresar a la demostración y reiniciar para otra charla.

**Comprobar:** el cierre conecta explícitamente las piezas vistas en las misiones y no sugiere que exista IA real en este MVP.

## 9. Pulir y verificar la demostración

- [ ] Revisar contraste, tamaño de letra, botones grandes, foco visible y mensajes comprensibles desde un proyector; respetar la preferencia de movimiento reducido.
- [ ] Verificar teclado y atributos accesibles de botones, pasos activos y mensajes de progreso.
- [ ] Probar manualmente: interacción previa a Rayos X, cuatro misiones completas, clics repetidos, deshacer Like/Seguir, recomendaciones sin señales, salir/entrar de Rayos X, pantalla final y reinicio.
- [ ] Ejecutar compilación y comprobación de tipos; corregir errores y dejar instrucciones breves para iniciar la demo localmente.

**Fuera de esta entrega:** Guardar, Actualizar feed, IA simulada, Ver código, cuentas, persistencia, servidor y servicios externos.
