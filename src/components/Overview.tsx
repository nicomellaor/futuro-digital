import { ArchitectureIcon } from './ArchitectureIcon'

export function Overview() {
  return (
    <main className="overview" id="inicio">
      <div className="overview__intro">
        <span className="overview__eyebrow">El mapa de FuturoDigital</span>
        <h1 id="overview-title" tabIndex={-1}>Así se conecta todo.</h1>
        <p>Detrás de cada toque hay piezas distintas haciendo su trabajo.</p>
      </div>
      <section className="architecture" aria-label="Arquitectura de FuturoDigital: usuario, frontend, API, backend, base de datos y algoritmo">
        <div className="architecture__node architecture__node--person"><span className="architecture__icon"><ArchitectureIcon name="user" /></span><strong>Usuario</strong><small>Toca un botón</small></div>
        <span className="architecture__arrow" aria-hidden="true">↓</span>
        <div className="architecture__node architecture__node--front"><span className="architecture__icon"><ArchitectureIcon name="frontend" /></span><strong>Frontend</strong><small>Muestra lo que ves</small></div>
        <div className="architecture__api"><span aria-hidden="true">↓</span><span className="architecture__api-icon"><ArchitectureIcon name="api" /></span><strong>API</strong><span>Comunica las piezas</span><span aria-hidden="true">↓</span></div>
        <div className="architecture__node architecture__node--back"><span className="architecture__icon"><ArchitectureIcon name="backend" /></span><strong>Backend</strong><small>Aplica las reglas</small></div>
        <span className="architecture__arrow" aria-hidden="true">↓</span>
        <div className="architecture__branches">
          <div className="architecture__node architecture__node--data"><span className="architecture__icon"><ArchitectureIcon name="database" /></span><strong>Base de datos</strong><small>Recuerda tus acciones</small></div>
          <div className="architecture__node architecture__node--algorithm"><span className="architecture__icon"><ArchitectureIcon name="algorithm" /></span><strong>Algoritmo / IA</strong><small>Aquí usamos reglas; la IA sería opcional</small></div>
        </div>
      </section>
      <div className="overview__closing">
        <p>Programar significa construir las reglas y sistemas que hacen posible todo esto.</p>
      </div>
    </main>
  )
}
