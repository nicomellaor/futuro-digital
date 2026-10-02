import { useEffect, useReducer, useRef } from 'react'
import { PostCard } from './components/PostCard'
import { Overview } from './components/Overview'
import { XrayPanel } from './components/XrayPanel'
import { posts } from './data/posts'
import { createInitialState, currentUser, demoReducer, getVisibleInteractions, missions } from './state/demo'

function App() {
  const [state, dispatch] = useReducer(demoReducer, undefined, createInitialState)
  const previousView = useRef(state.view)
  useEffect(() => {
    if (previousView.current === state.view) return
    previousView.current = state.view
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    document.getElementById(state.view === 'overview' ? 'overview-title' : 'feed-title')?.focus()
  }, [state.view])
  const visible = getVisibleInteractions(state)
  const orderedPosts = state.recommendedPostIds
    ? state.recommendedPostIds.map((id) => posts.find((post) => post.id === id)!).filter(Boolean)
    : posts

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#inicio" aria-label="FuturoDigital, ir al inicio">
            <span className="brand__mark" aria-hidden="true">✳</span>
            <span>Futuro<span className="brand__accent">Digital</span></span>
          </a>
          <div className="site-header__actions">
            <button className="reset-button" type="button" onClick={() => dispatch({ type: 'reset' })}>
              Reiniciar demo
            </button>
            {state.view === 'overview' ? <button className="xray-button" type="button" onClick={() => dispatch({ type: 'closeOverview' })}>Volver al feed</button> : <button
              className={`xray-button ${state.xrayEnabled ? 'xray-button--active' : ''}`}
              type="button"
              aria-pressed={state.xrayEnabled}
              disabled={Boolean(state.trace)}
              title={state.trace ? 'Termina el recorrido antes de salir de Rayos X' : undefined}
              onClick={() => dispatch({ type: 'toggleXray' })}
            >
              <span aria-hidden="true">◉</span>
              {state.xrayEnabled ? 'Desactivar Rayos X' : 'Activar Modo Rayos X'}
            </button>}
            <span className="avatar" title={`Sesión de ${currentUser}`} aria-label={`Sesión de ${currentUser}`}>
              A
            </span>
          </div>
        </div>
      </header>

      {state.view === 'overview' ? <Overview onBack={() => dispatch({ type: 'closeOverview' })} onReset={() => dispatch({ type: 'reset' })} /> : <main id="inicio" className={`main-layout ${state.xrayEnabled ? 'main-layout--xray' : ''}`}>
        <section className="feed" aria-labelledby="feed-title">
          <div className="feed__heading">
            <div>
              <h1 id="feed-title" tabIndex={-1}>Para ti<span className="feed__dot">.</span></h1>
              <p>Ideas que valen un segundo scroll.</p>
            </div>
            <span className="feed__count">{posts.length} descubrimientos</span>
          </div>
          <div className="feed__tools">
            <button className="recommend-button" type="button" disabled={Boolean(state.trace)} onClick={() => dispatch({ type: 'recommend' })}>
              <span aria-hidden="true">✨</span> Mejorar mis recomendaciones
            </button>
            {state.recommendedPostIds && <span className="feed__updated">Feed ordenado para ti</span>}
            {state.currentMissionIndex === missions.length && !state.xrayEnabled && <button className="feed__overview" type="button" onClick={() => dispatch({ type: 'openOverview' })}>Ver panorama completo</button>}
          </div>
          {state.notice && <p className="feed__notice" role="status">{state.notice}</p>}
          <div className="feed__grid">
            {orderedPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                featured={index === 0}
                liked={visible.likedPostIds.includes(post.id)}
                following={visible.followedAuthors.includes(post.author)}
                disabled={Boolean(state.trace)}
                onLike={(postId) => dispatch({ type: 'toggleLike', postId })}
                onFollow={(author) => dispatch({ type: 'toggleFollow', author })}
              />
            ))}
          </div>
        </section>
        {state.xrayEnabled && <XrayPanel state={state} onNext={() => dispatch({ type: 'nextStep' })} onOverview={() => dispatch({ type: 'openOverview' })} />}
      </main>}
    </div>
  )
}

export default App
