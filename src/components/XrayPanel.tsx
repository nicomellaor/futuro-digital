import { useEffect, useRef } from 'react'
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
  ][trace.stepIndex]

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
  ][trace.stepIndex]
}

function getDataRow(trace: Trace): string {
  if (trace.kind === 'recommend') return 'Alex | Me gusta + seguidos → intereses'
  if (trace.kind === 'follow') return `Alex | sigue a | ${trace.targetId}`
  const post = posts.find((item) => item.id === trace.targetId)
  return `Alex | ${post?.category ?? 'publicación'} | ♥`
}

export function XrayPanel({ trace, onNext }: { trace: Trace | null; onNext: (traceId: number) => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previousTrace = useRef<Trace | null>(null)
  useEffect(() => {
    if (previousTrace.current && !trace) headingRef.current?.focus()
    previousTrace.current = trace
  }, [trace])

  const route = trace ? getTraceRoute(trace) : []
  const active = trace ? route[trace.stepIndex] : null
  const visited = trace ? route.slice(0, trace.stepIndex) : []
  const dataVisible = trace?.stepIndex === 3

  return (
    <aside className="xray" aria-label="Mapa del Modo Rayos X">
      <div className="xray__header">
        <span className="xray__mark" aria-hidden="true">◎</span>
        <div><h2 ref={headingRef} tabIndex={-1}>Así funciona</h2><p>Lo que ocurre detrás de cada toque.</p></div>
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
            {node.id === 'algorithm' && trace?.kind === 'recommend' && trace.stepIndex === 4 && <span className="xray__interests">
              {trace.interests.filter(({ score }) => score > 0).map(({ category, score }) => `${category} +${score}`).join('  ·  ')}
            </span>}
          </li>
        })}
      </ol>

      {trace && <div className="xray__explanation">
        <div aria-live="polite" aria-atomic="true">
          <span className="xray__step">{active === 'frontend' && trace.stepIndex === route.length - 1 ? 'Respuesta al frontend' : nodes.find((node) => node.id === active)?.title}</span>
          <p key={`${trace.id}-${trace.stepIndex}`}>{getCopy(trace)}</p>
        </div>
        <div className="xray__controls">
          <span>Paso {trace.stepIndex + 1} de {route.length}</span>
          <button type="button" onClick={() => onNext(trace.id)}>
            {trace.stepIndex === route.length - 1 ? 'Finalizar' : 'Siguiente'}
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </div>}
    </aside>
  )
}
