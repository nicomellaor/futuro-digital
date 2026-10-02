import { posts } from '../data/posts'
import { currentUser, getTraceRoute, type ArchitectureNode, type Trace } from '../state/demo'

const nodes: { id: ArchitectureNode | 'user'; title: string; description: string; symbol: string }[] = [
  { id: 'user', title: 'Usuario', description: 'Toca una publicación', symbol: 'A' },
  { id: 'frontend', title: 'Frontend', description: 'Lo que ves y tocas', symbol: '▣' },
  { id: 'api', title: 'API', description: 'Lleva el mensaje', symbol: '↗' },
  { id: 'backend', title: 'Backend', description: 'Aplica las reglas', symbol: '⚙' },
  { id: 'database', title: 'Base de datos', description: 'Recuerda tus acciones', symbol: '▤' },
  { id: 'algorithm', title: 'Algoritmo', description: 'Se usa para ordenar el feed', symbol: '✧' },
]

function getCopy(trace: Trace) {
  if (trace.kind === 'recommend') return [
    'Alex pidió mejorar su feed.',
    'La API lleva la petición al servidor.',
    'El backend reúne las señales de Alex.',
    'Se consultan Me gusta y creadores seguidos.',
    'Una regla ordena las categorías: +1 por Me gusta, +2 por autor seguido.',
    'El feed ya muestra primero tus intereses.',
  ][trace.stepIndex ?? 0]

  const post = trace.kind === 'like' ? posts.find((item) => item.id === trace.targetId) : null
  const subject = post ? `«${post.title}»` : `@${trace.targetId}`
  const adding = trace.intent === 'add'
  const action = trace.kind === 'like' ? adding ? 'dio Me gusta a' : 'quitó Me gusta de' : adding ? 'siguió a' : 'dejó de seguir a'
  const endpoint = trace.kind === 'like' ? '/likes' : '/follow'
  return [
    `${currentUser} ${action} ${subject}.`,
    `La API envía ${adding ? 'POST' : 'DELETE'} ${endpoint}.`,
    `El backend comprueba quién y ${post ? 'qué publicación' : 'qué creador'}.`,
    adding ? 'Se guarda esta relación para recordarla.' : 'Se elimina la relación guardada.',
    post ? 'El feed ya muestra el nuevo contador.' : 'El feed ya muestra el nuevo seguimiento.',
  ][trace.stepIndex ?? 0]
}

function getSummary(trace: Trace): string {
  if (trace.kind === 'recommend') return 'El feed se ordenó según tus intereses.'
  if (trace.kind === 'follow') return trace.intent === 'add'
    ? `Ahora sigues a @${trace.targetId}.` : `Dejaste de seguir a @${trace.targetId}.`
  const post = posts.find((item) => item.id === trace.targetId)
  return `${trace.intent === 'add' ? 'Me gusta añadido' : 'Me gusta eliminado'} en «${post?.title ?? 'la publicación'}».`
}

function getDataRow(trace: Trace): string {
  if (trace.kind === 'recommend') return 'Alex | Me gusta + seguidos → intereses'
  if (trace.kind === 'follow') return `Alex | sigue a | ${trace.targetId}`
  const post = posts.find((item) => item.id === trace.targetId)
  return `Alex | ${post?.category ?? 'publicación'} | ♥`
}

export function XrayPanel({ trace }: { trace: Trace | null }) {
  const route = trace ? getTraceRoute(trace) : []
  const active = trace?.stepIndex === null || !trace ? null : route[trace.stepIndex]
  const visited = trace ? (trace.stepIndex === null ? route : route.slice(0, trace.stepIndex)) : []
  const dataVisible = trace && (trace.stepIndex === 3 || trace.stepIndex === null && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

  return (
    <aside className="xray" aria-label="Mapa del Modo Rayos X">
      <div className="xray__header">
        <span className="xray__mark" aria-hidden="true">◎</span>
        <div><h2>Así funciona</h2><p>Lo que ocurre detrás de cada toque.</p></div>
      </div>

      <ol className="xray__diagram" aria-label="Usuario, Frontend, API, Backend, Base de datos y Algoritmo">
        {nodes.map((node) => {
          const isActive = active === node.id
          const isVisited = node.id === 'user' ? Boolean(trace) : visited.includes(node.id as ArchitectureNode)
          return <li
            className={`xray__node ${isActive ? 'xray__node--active' : isVisited ? 'xray__node--visited' : ''}`}
            aria-current={isActive ? 'step' : undefined}
            key={node.id}
          >
            <span className="xray__symbol" aria-hidden="true">{node.symbol}</span>
            <span className="xray__node-copy"><strong>{node.title}</strong><small>{node.description}</small></span>
            {node.id === 'database' && dataVisible && <span className="xray__data-row" role="status">
              {trace.kind !== 'recommend' && trace.intent === 'remove' ? 'Se eliminó: ' : ''}{getDataRow(trace)}
            </span>}
            {node.id === 'algorithm' && trace?.kind === 'recommend' && (trace.stepIndex === 4 || trace.stepIndex === null) && <span className="xray__interests">
              {trace.interests.filter(({ score }) => score > 0).map(({ category, score }) => `${category} +${score}`).join('  ·  ')}
            </span>}
          </li>
        })}
      </ol>

      <div className="xray__explanation" aria-live="polite" aria-atomic="true">
        {!trace && <p>Prueba Me gusta, Seguir o Mejorar mis recomendaciones para ver el recorrido.</p>}
        {trace?.stepIndex !== null && trace && <>
          <span className="xray__step">{active === 'frontend' && trace.stepIndex === route.length - 1 ? 'Respuesta al frontend' : nodes.find((node) => node.id === active)?.title}</span>
          <p key={`${trace.id}-${trace.stepIndex}`}>{getCopy(trace)}</p>
        </>}
        {trace?.stepIndex === null && trace && <>
          <span className="xray__step">Última acción</span>
          <p>{getSummary(trace)}</p>
          <small>Recorrido: {route.map((node) => nodes.find((item) => item.id === node)?.title).join(' → ')}</small>
        </>}
      </div>
      <p className="xray__note">Una simulación local: aquí no se usa un servidor real.</p>
    </aside>
  )
}
