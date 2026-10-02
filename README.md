# FuturoDigital

Aplicación local de una red social ficticia para una charla de orientación vocacional. Permite descubrir visualmente qué ocurre detrás de un Like, un seguimiento y un feed personalizado.

## Ejecutar

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite. La primera vez se muestra el feed normal. Activa **Modo Rayos X** para seguir cuatro misiones; después de pulsar Like o Seguir, usa **Siguiente paso** para recorrer Frontend → API → Backend → Base de datos → respuesta. **Mejorar mis recomendaciones** muestra cómo las interacciones ordenan el feed y **Ver panorama completo** presenta la arquitectura final.

Las acciones hechas antes de activar Rayos X funcionan como en una red social normal. Durante un recorrido, termina los pasos para seguir interactuando; **Reiniciar demo** restablece las interacciones y misiones. Los datos se guardan solo en la memoria de la pestaña.

## Verificar

```bash
npm test
npm run build
```

La compilación incluye la comprobación de TypeScript. La demostración utiliza datos locales: no necesita cuentas, backend ni conexión a servicios externos.
