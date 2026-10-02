# FuturoDigital — Aplicación interactiva para explicar programación y TI

## 1. Propósito

Construir una aplicación web breve, visual e interactiva destinada a una charla de orientación vocacional para estudiantes de enseñanza media.

La aplicación debe demostrar, de forma simplificada, qué ocurre detrás de una aplicación digital cotidiana y permitir introducir conceptos como:

- frontend;
- backend;
- API;
- base de datos;
- lógica de programación;
- algoritmos;
- inteligencia artificial.

La experiencia debe priorizar la **comprensión visual y la interacción**, no la precisión técnica exhaustiva.

---

# 2. Concepto de la aplicación

## FuturoDigital

FuturoDigital es una red social ficticia de descubrimiento de contenido.

La interfaz presenta publicaciones relacionadas con temas familiares para adolescentes:

- videojuegos;
- música;
- deportes;
- tecnología;
- películas y series;
- arte;
- ciencia.

Cada publicación consiste únicamente en:

- una miniatura o ilustración;
- título;
- autor;
- categoría;
- número de likes;
- botones de interacción.

No existe reproducción real de audio o video.

Ejemplo:

> 🎮 **Los videojuegos más esperados del año**  
> PixelZone  
> ❤️ 842 · 🔖 Guardar

El usuario puede interactuar con las publicaciones mediante:

- ❤️ Me gusta
- 🔖 Guardar
- ➕ Seguir
- ✨ Recomendar contenido
- 🔄 Actualizar feed

Estas acciones permiten explicar diferentes componentes del software.

---

# 3. Objetivo pedagógico central

La aplicación debe responder visualmente a la pregunta:

> **“¿Qué ocurre dentro de una aplicación cuando yo presiono un botón?”**

La interfaz normal representa lo que ve un usuario.

Un **Modo Rayos X** permite visualizar los sistemas internos responsables de cada acción.

---

# 4. Modo normal

Al iniciar la aplicación se presenta un feed simple.

Ejemplo:

```text
FuturoDigital

Para ti

┌─────────────────────────┐
│ 🎮                      │
│ 5 juegos para descubrir │
│ @GameLab                │
│                         │
│ ❤️ 320   🔖 Guardar     │
└─────────────────────────┘

┌─────────────────────────┐
│ 🚀                      │
│ ¿Podremos vivir en Marte?│
│ @ScienceNow             │
│                         │
│ ❤️ 815   🔖 Guardar     │
└─────────────────────────┘
```

En esta vista la aplicación funciona como cualquier aplicación convencional.

Debe existir siempre un botón visible:

**👁 Activar Modo Rayos X**

---

# 5. Modo Rayos X

Al activarlo, la interfaz se divide visualmente en dos áreas.

### Aplicación

Se mantiene visible FuturoDigital.

### ¿Qué está ocurriendo?

Aparece un esquema simplificado:

```text
📱 Frontend
     ↓
🌐 API
     ↓
⚙️ Backend
     ↓
🗄️ Base de datos
```

Cada interacción ilumina progresivamente los componentes utilizados.

El objetivo es que el estudiante pueda **ver viajar la acción a través del sistema**.

---

# 6. Ejemplo pedagógico: dar Like

El presentador pulsa:

**❤️ Me gusta**

La animación comienza.

### Paso 1 — Frontend

Se ilumina:

**📱 FRONTEND**

Mensaje:

> Detectamos que el usuario presionó “Me gusta”.

---

### Paso 2 — API

Una pequeña animación representa el envío de un mensaje.

```text
POST /likes
```

Explicación:

> El frontend necesita comunicarle al servidor lo que ocurrió.

---

### Paso 3 — Backend

Se ilumina:

**⚙️ BACKEND**

Mensaje:

> El servidor comprueba qué usuario dio like y a qué publicación.

---

### Paso 4 — Base de datos

Se ilumina:

**🗄️ BASE DE DATOS**

Mostrar una tabla muy sencilla:

| usuario | publicación | like |
|---|---|---|
| Alex | videojuegos | ❤️ |

Aparece visualmente una nueva fila.

Mensaje:

> La aplicación guarda la información para recordarla después.

---

### Paso 5 — Respuesta

La información vuelve visualmente:

```text
Base de datos
      ↑
Backend
      ↑
API
      ↑
Frontend
```

El contador cambia:

**❤️ 320 → 321**

---

# 7. Segunda demostración: seguir a un creador

El usuario presiona:

**➕ Seguir**

La secuencia vuelve a recorrer:

Frontend → API → Backend → Base de datos.

Pero en esta ocasión puede mostrarse otra tabla:

### Usuarios seguidos

| usuario | sigue a |
|---|---|
| Alex | GameLab |

Esto permite enseñar que una misma arquitectura permite implementar funciones muy distintas.

---

# 8. Tercera demostración: recomendaciones

Esta interacción introduce algoritmos e inteligencia artificial.

Botón:

**✨ Mejorar mis recomendaciones**

El sistema consulta las interacciones realizadas.

Ejemplo:

```text
Tus intereses detectados:

🎮 Videojuegos     +3
🚀 Ciencia         +2
🎨 Arte            +0
⚽ Deportes        +0
```

Posteriormente aparece:

```text
Tus datos
   ↓
Algoritmo de recomendación
   ↓
Nuevo feed
```

El orden de las tarjetas cambia.

Por ejemplo, aparecen primero videojuegos y ciencia.

---

# 9. Introducción de IA

Después de explicar el algoritmo tradicional puede aparecer un componente adicional:

**🤖 IA**

Visualización:

```text
Historial del usuario
        ↓
       🤖 IA
        ↓
"Podrían interesarle contenidos
sobre exploración espacial
y videojuegos de ciencia ficción."
```

El objetivo pedagógico es mostrar que la IA constituye **una parte del sistema**, no toda la aplicación.

Mensaje sugerido:

> Una aplicación puede usar inteligencia artificial para resolver determinadas tareas, pero sigue necesitando interfaces, servidores, datos y programación tradicional.

No es necesario utilizar una API de IA real durante la demostración.

Las respuestas pueden estar simuladas para garantizar rapidez y funcionamiento sin Internet.

---

# 10. Vista final

Al terminar debe aparecer una vista que conecte todos los conceptos.

```text
                FuturoDigital

                  👤
                Usuario
                  │
                  ▼
           ┌────────────┐
           │  Frontend  │
           └─────┬──────┘
                 │ API
                 ▼
           ┌────────────┐
           │  Backend   │
           └───┬────┬───┘
               │    │
               ▼    ▼
        ┌─────────┐  ┌───────────┐
        │Base de  │  │ Algoritmo │
        │ datos   │  │   / IA    │
        └─────────┘  └───────────┘
```

Mensaje final:

> **Programar significa construir las reglas y sistemas que hacen posible todo esto.**

---

# 11. Pequeña demostración de código

Opcionalmente puede existir un botón:

**</> Ver código**

No debe abrirse un proyecto completo.

Debe mostrar únicamente fragmentos extremadamente sencillos relacionados con la acción realizada.

Ejemplo:

```javascript
function darLike() {
    likes = likes + 1;
}
```

El presentador puede cambiar temporalmente:

```javascript
likes = likes + 1;
```

por:

```javascript
likes = likes + 10;
```

y demostrar inmediatamente cómo cambia el comportamiento.

El objetivo no es enseñar sintaxis, sino demostrar la relación:

**Código → comportamiento**

---

# 12. Datos

Toda la información debe ser ficticia.

### Usuarios

```text
Alex
Sam
Taylor
```

### Categorías

```text
Videojuegos
Música
Ciencia
Tecnología
Deportes
Arte
Películas
```

### Publicaciones

Entre 8 y 12 publicaciones son suficientes.

Cada publicación necesita:

```text
id
titulo
autor
categoria
likes
guardados
```

No se necesitan archivos multimedia reales.

Las miniaturas pueden generarse mediante:

- emojis;
- iconos;
- ilustraciones SVG;
- gradientes;
- imágenes estáticas propias.

---

# 13. Arquitectura técnica recomendada

Para la demostración pueden utilizarse dos niveles de implementación.

## Opción A — Completamente simulada

Una única aplicación frontend.

Tecnologías posibles:

- React;
- TypeScript;
- CSS / Tailwind / MUI.

La base de datos, backend y API se representan visualmente pero funcionan mediante datos locales.

Ventajas:

- muy fiable;
- funciona sin Internet;
- instalación sencilla;
- menor riesgo durante la presentación.

Esta es la opción recomendada para la charla.

---

## Opción B — Arquitectura real simplificada

Frontend:

- React.

Backend:

- Express o FastAPI.

Base de datos:

- SQLite.

Endpoints mínimos:

```text
GET /posts
POST /likes
POST /follow
GET /recommendations
```

Esta versión puede utilizarse si también se desea demostrar físicamente que frontend y backend son programas separados.

Para el público objetivo no es estrictamente necesario.

---

# 14. Requisito importante de diseño

El sistema debe diferenciar claramente:

### Lo que experimenta el usuario

Aplicación simple y familiar.

### Lo que ocurre internamente

Arquitectura tecnológica.

El cambio entre ambos mundos debe producirse mediante el **Modo Rayos X**.

Por tanto, la aplicación no debe parecer inicialmente una herramienta educativa.

Primero debe parecer una aplicación normal.

Después se revela progresivamente cómo funciona.

---

# 15. Alcance mínimo viable

Para una primera versión solamente deben implementarse:

1. Feed con 5–8 publicaciones.
2. Botón de Like.
3. Botón de Seguir.
4. Modo Rayos X.
5. Animación Frontend → API → Backend → Base de datos.
6. Tabla visual de datos.
7. Recomendaciones simples.
8. Sistema de cuatro misiones.
9. Pantalla final con arquitectura completa.

No son necesarios:

- cuentas reales;
- autenticación;
- subida de contenido;
- reproducción multimedia;
- comentarios reales;
- conexión a servicios externos;
- IA real;
- almacenamiento permanente;
- múltiples páginas.

---

# 16. Criterios de éxito

La demostración debería permitir que un estudiante sin conocimientos técnicos pueda responder al finalizar:

- qué es aproximadamente un frontend;
- qué hace un backend;
- para qué sirve una base de datos;
- qué significa que dos sistemas se comuniquen mediante una API;
- dónde pueden utilizarse algoritmos o IA;
- qué papel tiene un programador al construir estos sistemas.

El principal indicador de éxito no es que recuerde definiciones técnicas exactas, sino que comprenda que **una aplicación aparentemente sencilla está formada por múltiples piezas que los profesionales de informática diseñan, programan y conectan entre sí**.