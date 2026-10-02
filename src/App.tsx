import { useReducer } from 'react'
import { PostCard } from './components/PostCard'
import { XrayPanel } from './components/XrayPanel'
import { posts } from './data/posts'
import { createInitialState, currentUser, demoReducer } from './state/demo'

function App() {
  const [state, dispatch] = useReducer(demoReducer, undefined, createInitialState)

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
            <button
              className={`xray-button ${state.xrayEnabled ? 'xray-button--active' : ''}`}
              type="button"
              aria-pressed={state.xrayEnabled}
              onClick={() => dispatch({ type: 'toggleXray' })}
            >
              <span aria-hidden="true">◉</span>
              {state.xrayEnabled ? 'Desactivar Rayos X' : 'Activar Modo Rayos X'}
            </button>
            <span className="avatar" title={`Sesión de ${currentUser}`} aria-label={`Sesión de ${currentUser}`}>
              A
            </span>
          </div>
        </div>
      </header>

      <main id="inicio" className={`main-layout ${state.xrayEnabled ? 'main-layout--xray' : ''}`}>
        <section className="feed" aria-labelledby="feed-title">
          <div className="feed__heading">
            <div>
              <h1 id="feed-title">Para ti<span className="feed__dot">.</span></h1>
              <p>Ideas que valen un segundo scroll.</p>
            </div>
            <span className="feed__count">{posts.length} descubrimientos</span>
          </div>
          <div className="feed__grid">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                featured={index === 0}
                liked={state.likedPostIds.includes(post.id)}
                following={state.followedAuthors.includes(post.author)}
                onLike={(postId) => dispatch({ type: 'toggleLike', postId })}
                onFollow={(author) => dispatch({ type: 'toggleFollow', author })}
              />
            ))}
          </div>
        </section>
        {state.xrayEnabled && <XrayPanel />}
      </main>
    </div>
  )
}

export default App
