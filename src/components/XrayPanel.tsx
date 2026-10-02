const layers = [
  { icon: '📱', title: 'Frontend', description: 'Lo que ves y tocas' },
  { icon: '🌐', title: 'API', description: 'El mensaje que viaja' },
  { icon: '⚙️', title: 'Backend', description: 'Las reglas de la aplicación' },
  { icon: '🗄️', title: 'Base de datos', description: 'Lo que la aplicación recuerda' },
]

export function XrayPanel() {
  return (
    <aside className="xray" aria-label="Modo Rayos X">
      <div className="xray__heading">
        <span className="xray__eye" aria-hidden="true">◉</span>
        <h2>Detrás de la pantalla</h2>
        <p>Una publicación parece simple. Por dentro, varias piezas hacen que todo funcione.</p>
      </div>
      <ol className="xray__layers" aria-label="Piezas de una aplicación">
        {layers.map((layer, index) => (
          <li className="xray__layer" key={layer.title}>
            <span className="xray__number">{index + 1}</span>
            <span className="xray__layer-icon" aria-hidden="true">{layer.icon}</span>
            <span>
              <strong>{layer.title}</strong>
              <small>{layer.description}</small>
            </span>
          </li>
        ))}
      </ol>
      <p className="xray__note">Esta vista es una simulación local de cómo se conectan los sistemas.</p>
    </aside>
  )
}
