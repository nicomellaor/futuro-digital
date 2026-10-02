type OverviewProps = {
  onBack: () => void
  onReset: () => void
}

export function Overview({ onBack, onReset }: OverviewProps) {
  return (
    <main className="overview" id="inicio">
      <button className="overview__back" type="button" onClick={onBack}>← Volver al feed</button>
      <div className="overview__intro">
        <span className="overview__eyebrow">El mapa de FuturoDigital</span>
        <h1 id="overview-title" tabIndex={-1}>Así se conecta todo.</h1>
        <p>Detrás de cada toque hay piezas distintas haciendo su trabajo.</p>
      </div>
      <section className="architecture" aria-label="Arquitectura de FuturoDigital: usuario, frontend, API, backend, base de datos y algoritmo">
        <div className="architecture__node architecture__node--person"><span aria-hidden="true">👤</span><strong>Usuario</strong><small>Toca un botón</small></div>
        <span className="architecture__arrow" aria-hidden="true">↓</span>
        <div className="architecture__node architecture__node--front"><span aria-hidden="true">📱</span><strong>Frontend</strong><small>Muestra lo que ves</small></div>
        <div className="architecture__api"><span aria-hidden="true">↓</span><strong>API</strong><span>Comunica las piezas</span><span aria-hidden="true">↓</span></div>
        <div className="architecture__node architecture__node--back"><span aria-hidden="true">⚙️</span><strong>Backend</strong><small>Aplica las reglas</small></div>
        <span className="architecture__arrow" aria-hidden="true">↓</span>
        <div className="architecture__branches">
          <div className="architecture__node architecture__node--data"><span aria-hidden="true">🗄️</span><strong>Base de datos</strong><small>Recuerda tus acciones</small></div>
          <div className="architecture__node architecture__node--algorithm"><span aria-hidden="true">✨</span><strong>Algoritmo / IA</strong><small>Aquí ordenamos el feed con reglas</small></div>
        </div>
      </section>
      <p className="overview__note">Esta demo utiliza un algoritmo sencillo. Una IA podría ayudar con otra tarea, pero también necesitaría interfaz, programación y datos.</p>
      <div className="overview__closing">
        <p>Programar significa construir las reglas y sistemas que hacen posible todo esto.</p>
        <button type="button" onClick={onReset}>Reiniciar para otra charla</button>
      </div>
    </main>
  )
}
