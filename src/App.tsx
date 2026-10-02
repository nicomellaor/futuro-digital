import { useEffect, useReducer, useRef } from 'react'
import { PostCard } from './components/PostCard'
import { Overview } from './components/Overview'
import { XrayPanel } from './components/XrayPanel'
import { posts } from './data/posts'
import { createInitialState, currentUser, demoReducer } from './state/demo'

function App() {
  const [state, dispatch] = useReducer(demoReducer, undefined, createInitialState)
  const previousView = useRef(state.view)
  const previousOrder = useRef(state.recommendedPostIds)

  useEffect(() => {
    if (previousView.current === state.view) return
    previousView.current = state.view
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    document.getElementById(state.view === 'overview' ? 'overview-title' : 'feed-title')?.focus()
  }, [state.view])

  useEffect(() => {
    if (state.recommendedPostIds && previousOrder.current !== state.recommendedPostIds && state.view === 'feed') {
      document.getElementById('feed-title')?.scrollIntoView?.({ behavior: 'instant', block: 'start' })
    }
    previousOrder.current = state.recommendedPostIds
  }, [state.recommendedPostIds, state.view])

  const postById = new Map(posts.map((post) => [post.id, post]))
  const orderedPosts = state.recommendedPostIds
    ? state.recommendedPostIds.flatMap((id) => {
      const post = postById.get(id)
      return post ? [post] : []
    })
    : posts

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#inicio" aria-label="FuturoDigital, ir al inicio">
            futuro<span>digital</span><span className="brand__dot">.</span>
          </a>
          <nav className="site-header__actions" aria-label="Controles de la demostración">
            {state.view === 'overview' ? (
              <button className="header-link" type="button" onClick={() => dispatch({ type: 'closeOverview' })}>Volver al feed</button>
            ) : <>
              <button className="header-link" type="button" onClick={() => dispatch({ type: 'openOverview' })}>Ver mapa completo</button>
              <button
                className={`xray-button ${state.xrayEnabled ? 'xray-button--active' : ''}`}
                type="button"
                aria-pressed={state.xrayEnabled}
                onClick={() => dispatch({ type: 'toggleXray' })}
              >
                <span className="xray-button__icon" aria-hidden="true">◎</span>
                {state.xrayEnabled ? 'Cerrar Rayos X' : 'Modo Rayos X'}
              </button>
            </>}
            <button className="reset-button" type="button" onClick={() => dispatch({ type: 'reset' })}>
              <span aria-hidden="true">↺</span><span className="reset-button__label">Reiniciar demo</span>
            </button>
            <span className="avatar" title={`Sesión de ${currentUser}`} aria-label={`Sesión de ${currentUser}`}>A</span>
          </nav>
        </div>
      </header>

      {state.view === 'overview' ? (
        <Overview />
      ) : (
        <main id="inicio" className={`main-layout ${state.xrayEnabled ? 'main-layout--xray' : ''}`}>
          <section className="feed" aria-labelledby="feed-title">
            <div className="feed__intro">
              <h1 id="feed-title" tabIndex={-1}>Para ti</h1>
              <button className="recommend-button" type="button" onClick={() => dispatch({ type: 'recommend' })}>
                <span aria-hidden="true">✧</span> Mejorar mis recomendaciones
              </button>
            </div>
            {state.notice && <p className="feed__notice" role="status">{state.notice}</p>}
            {state.recommendedPostIds && <p className="feed__updated" role="status">Contenido ordenado según tus intereses</p>}
            <div className="feed__stream">
              {orderedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  liked={state.likedPostIds.includes(post.id)}
                  following={state.followedAuthors.includes(post.author)}
                  onLike={(postId) => dispatch({ type: 'toggleLike', postId })}
                  onFollow={(author) => dispatch({ type: 'toggleFollow', author })}
                />
              ))}
            </div>
          </section>
          {state.xrayEnabled && <XrayPanel trace={state.trace} onNext={(traceId) => dispatch({ type: 'advanceTrace', traceId })} />}
        </main>
      )}
    </div>
  )
}

export default App
