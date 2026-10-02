import { posts } from '../data/posts'
import { currentUser, missions, type DemoState, type InteractionTrace, type Trace } from '../state/demo'

const layers = [
  { icon: '📱', title: 'Frontend', description: 'Lo que ves y tocas' },
  { icon: '🌐', title: 'API', description: 'El mensaje que viaja' },
  { icon: '⚙️', title: 'Backend', description: 'Las reglas de la aplicación' },
  { icon: '🗄️', title: 'Base de datos', description: 'Lo que la aplicación recuerda' },
]

function interactionCopy(trace: InteractionTrace) {
  const post = trace.action === 'like' ? posts.find((item) => item.id === trace.targetId) : null
  const subject = post ? `«${post.title}»` : `@${trace.targetId}`
  const adding = trace.intent === 'add'
  const operation = trace.action === 'like'
    ? adding ? 'dio Me gusta a' : 'quitó Me gusta de'
    : adding ? 'siguió a' : 'dejó de seguir a'
  const request = trace.action === 'like'
    ? adding ? 'POST /likes' : 'DELETE /likes'
    : adding ? 'POST /follow' : 'DELETE /follow'

  return [
    { title: 'Frontend', text: `Detectamos que ${currentUser} ${operation} ${subject}.` },
    { title: 'API', text: 'El frontend envía un mensaje para contarle al servidor qué ocurrió.', code: request },
    { title: 'Backend', text: `El servidor comprueba quién es ${currentUser} y ${post ? 'a qué publicación' : 'a qué creador'} se refiere la acción.` },
    { title: 'Base de datos', text: adding
      ? 'Se añade una fila para recordar esta acción.'
      : 'Se elimina la fila porque deshiciste la acción.' },
    { title: 'Respuesta', text: post
      ? 'La respuesta vuelve: base de datos ↑ backend ↑ API ↑ frontend. Ahora cambia el contador.'
      : 'La respuesta vuelve: base de datos ↑ backend ↑ API ↑ frontend. Ahora ves el nuevo estado.' },
  ][trace.step]
}

function getLayerStatus(index: number, trace: Trace | null): string {
  if (!trace || trace.kind !== 'interaction') return 'idle'
  if (trace.step === 4) return index === 0 ? 'active' : 'visited'
  return index === trace.step ? 'active' : index < trace.step ? 'visited' : 'idle'
}

type XrayPanelProps = {
  state: DemoState
  onNext: () => void
  onOverview: () => void
}

export function XrayPanel({ state, onNext, onOverview }: XrayPanelProps) {
  const { trace } = state
  const mission = missions[state.currentMissionIndex]
  const interaction = trace?.kind === 'interaction' ? trace : null
  const recommendation = trace?.kind === 'recommendation' ? trace : null
  const stepCopy = interaction ? interactionCopy(interaction) : null
  const lastStep = interaction ? 4 : 2
  const activeRow = interaction?.step === 3 ? interaction : null

  return (
    <aside className="xray" aria-label="Modo Rayos X">
      <div className="xray__heading">
        <span className="xray__eye" aria-hidden="true">◉</span>
        <h2>¿Qué está ocurriendo?</h2>
        <p>Ahora puedes ver las piezas que trabajan detrás de cada acción.</p>
      </div>

      <section className="mission" aria-label="Misiones de la demostración">
        <div className="mission__progress" role="progressbar" aria-label="Misiones completadas" aria-valuemin={0} aria-valuemax={missions.length} aria-valuenow={state.currentMissionIndex} aria-valuetext={`${state.currentMissionIndex} de ${missions.length} misiones completadas`}>
          {missions.map((item, index) => (
            <span
              className={`mission__segment ${index < state.currentMissionIndex ? 'mission__segment--done' : ''}`}
              key={item.id}
              aria-hidden="true"
            />
          ))}
        </div>
        {mission ? (
          <>
            <span className="mission__count" aria-live="polite">Misión {state.currentMissionIndex + 1} de {missions.length}</span>
            <h3>{mission.title}</h3>
            <p>{mission.instruction}</p>
          </>
        ) : (
          <>
            <span className="mission__count">{missions.length} de {missions.length} completadas</span>
            <h3>Ya viste el viaje completo</h3>
            <p>Ahora junta todas las piezas en un solo mapa.</p>
            {!trace && <button className="overview-button" type="button" onClick={onOverview}>Ver panorama completo</button>}
          </>
        )}
      </section>

      {trace && (
        <section className="trace" aria-label="Recorrido de la acción">
          <span className="trace__count">Paso {trace.step + 1} de {lastStep + 1}</span>
          <div className="trace__content" aria-live="polite" aria-atomic="true" key={`${trace.kind}-${trace.step}`}>
            {stepCopy && <>
              <h3>{stepCopy.title}</h3>
              <p>{stepCopy.text}</p>
              {'code' in stepCopy && <code className="trace__code">{stepCopy.code}</code>}
            </>}
            {recommendation && <>
              <h3>{['Tus datos', 'Algoritmo', 'Nuevo feed'][recommendation.step]}</h3>
              <p>{[
                'El sistema mira tus Me gusta y a quiénes sigues. Esas acciones son pistas sobre tus intereses.',
                'Una regla suma puntos por categoría: +1 por Me gusta y +2 por cada autor seguido que publique sobre ella.',
                'Las publicaciones con categorías de mayor puntuación aparecen primero. El resto conserva su orden.',
              ][recommendation.step]}</p>
            </>}
          </div>
          {recommendation && <>
            <div className="recommendation-path" aria-label="Tus datos, algoritmo, nuevo feed">
              {['Tus datos', 'Algoritmo', 'Nuevo feed'].map((step, index) => (
                <span className={index === recommendation.step ? 'recommendation-path__active' : ''} key={step}>{step}</span>
              ))}
            </div>
            <div className="interests">
              <strong>Intereses detectados</strong>
              {recommendation.interests.map(({ category, score }) => (
                <div className="interests__row" key={category}>
                  <span>{category}</span>
                  <span className={score ? 'interests__score interests__score--active' : 'interests__score'}>+{score}</span>
                </div>
              ))}
            </div>
          </>}
          <button className="trace__next" type="button" onClick={onNext}>
            {trace.step === lastStep ? 'Terminar recorrido' : 'Siguiente paso'}
          </button>
          <p className="trace__hint">Termina el recorrido para seguir interactuando o salir de Rayos X.</p>
        </section>
      )}

      {(!trace || interaction) && <ol className={`xray__layers ${interaction?.step === 4 ? 'xray__layers--return' : ''}`} aria-label="Recorrido Frontend, API, Backend y Base de datos">
        {layers.map((layer, index) => (
          <li className={`xray__layer xray__layer--${getLayerStatus(index, trace)}`} aria-current={getLayerStatus(index, trace) === 'active' ? 'step' : undefined} key={layer.title}>
            <span className="xray__number">{index + 1}</span>
            <span className="xray__layer-icon" aria-hidden="true">{layer.icon}</span>
            <span>
              <strong>{layer.title}</strong>
              <small>{layer.description}</small>
            </span>
            {getLayerStatus(index, trace) === 'active' && <span className="xray__signal" aria-hidden="true" />}
          </li>
        ))}
      </ol>}
      {interaction?.step === 4 && <p className="xray__return">↑ La respuesta regresó hasta el frontend</p>}

      <section className="data-tables" aria-label="Datos guardados en esta sesión">
        <h3>Datos de {currentUser}</h3>
        <div className="data-table">
          <h4>Me gusta</h4>
          <table aria-label="Me gusta guardados">
            <thead><tr><th>Usuario</th><th>Publicación</th><th>Like</th></tr></thead>
            <tbody>
              {state.likedPostIds.map((id) => {
                const post = posts.find((item) => item.id === id)
                return post && <tr className={activeRow?.action === 'like' && activeRow.targetId === id ? 'data-table__new' : ''} key={id}>
                  <td>{currentUser}</td><td>{post.title}</td><td>♥</td>
                </tr>
              })}
              {state.likedPostIds.length === 0 && <tr><td colSpan={3} className="data-table__empty">Todavía no hay Me gusta.</td></tr>}
            </tbody>
          </table>
          {activeRow?.action === 'like' && activeRow.intent === 'remove' && <p className="data-table__removed">Fila eliminada: {posts.find((post) => post.id === activeRow.targetId)?.title}</p>}
        </div>
        <div className="data-table">
          <h4>Usuarios seguidos</h4>
          <table aria-label="Autores seguidos">
            <thead><tr><th>Usuario</th><th>Sigue a</th></tr></thead>
            <tbody>
              {state.followedAuthors.map((author) => <tr className={activeRow?.action === 'follow' && activeRow.targetId === author ? 'data-table__new' : ''} key={author}>
                <td>{currentUser}</td><td>@{author}</td>
              </tr>)}
              {state.followedAuthors.length === 0 && <tr><td colSpan={2} className="data-table__empty">Todavía no sigues a nadie.</td></tr>}
            </tbody>
          </table>
          {activeRow?.action === 'follow' && activeRow.intent === 'remove' && <p className="data-table__removed">Fila eliminada: {currentUser} → @{activeRow.targetId}</p>}
        </div>
      </section>
      <p className="xray__note">Esta vista representa sistemas simulados localmente, sin servidor ni base de datos real.</p>
    </aside>
  )
}
