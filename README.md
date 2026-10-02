# FuturoDigital

Aplicación local de una red social ficticia para una charla de orientación vocacional. El feed de una columna permite explorar publicaciones con scroll continuo y descubrir qué ocurre detrás de Me gusta, Seguir y las recomendaciones.

## Ejecutar

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite. La primera vez se muestra el feed normal. Puedes dar Me gusta, seguir creadores o pulsar **Mejorar mis recomendaciones** en cualquier orden. Activa **Modo Rayos X** para ver el diagrama y el trayecto automático y breve de la próxima acción. **Ver mapa completo** abre la síntesis de la arquitectura en cualquier momento.

Las acciones se aplican de inmediato, incluso durante una explicación en Rayos X. Salir del modo conserva las interacciones; **Reiniciar demo** restablece feed, datos y visualización. Los datos se guardan solo en la memoria de la pestaña.

## Verificar

```bash
npm test
npm run build
```

La compilación incluye la comprobación de TypeScript. La demostración utiliza datos locales: no necesita cuentas, backend ni conexión a servicios externos.
