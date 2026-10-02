import { describe, expect, it } from 'vitest'
import { createInitialState, demoReducer, getTraceRoute, type DemoState } from './demo'
import { getInterests, getRecommendedPostIds } from './recommendations'
import { posts } from '../data/posts'

function advanceAll(state: DemoState): DemoState {
  while (state.trace) {
    state = demoReducer(state, { type: 'advanceTrace', traceId: state.trace.id })
  }
  return state
}

describe('acciones libres y estado de la sesión', () => {
  it('aplica Me gusta y Seguir al instante y permite deshacerlos sin Rayos X', () => {
    let state = createInitialState()
    state = demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'mundos-abiertos' })
    expect(state.followedAuthors).toEqual(['PixelZone'])
    expect(state.likedPostIds).toEqual(['mundos-abiertos'])
    expect(state.trace).toBeNull()
    state = demoReducer(state, { type: 'toggleLike', postId: 'mundos-abiertos' })
    state = demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' })
    expect(state.likedPostIds).toEqual([])
    expect(state.followedAuthors).toEqual([])
  })

  it('puede abrir el mapa desde el inicio y volver sin borrar la sesión', () => {
    let state = demoReducer(createInitialState(), { type: 'openOverview' })
    expect(state.view).toBe('overview')
    state = demoReducer(state, { type: 'closeOverview' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    state = demoReducer(state, { type: 'toggleXray' })
    expect(state.likedPostIds).toEqual(['marte'])
    expect(state.xrayEnabled).toBe(true)
    state = demoReducer(state, { type: 'toggleXray' })
    expect(state.likedPostIds).toEqual(['marte'])
  })

  it('ilumina el trayecto correcto sin demorar el cambio del feed', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    expect(state.likedPostIds).toEqual(['marte'])
    expect(state.trace).toMatchObject({ kind: 'like', intent: 'add', stepIndex: 0 })
    expect(getTraceRoute(state.trace!)).toEqual(['frontend', 'api', 'backend', 'database', 'frontend'])
    state = advanceAll(state)
    expect(state.trace).toBeNull()
    expect(state.likedPostIds).toEqual(['marte'])
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    expect(state.trace).toMatchObject({ kind: 'like', intent: 'remove', stepIndex: 0 })
    expect(state.likedPostIds).toEqual([])
  })

  it('conserva todas las pulsaciones rápidas e ignora controles de recorridos anteriores', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    const oldId = state.trace!.id
    state = demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' })
    expect(state.likedPostIds).toEqual(['marte'])
    expect(state.followedAuthors).toEqual(['PixelZone'])
    expect(state.trace).toMatchObject({ kind: 'follow', targetId: 'PixelZone', stepIndex: 0 })
    expect(demoReducer(state, { type: 'advanceTrace', traceId: oldId })).toBe(state)
    const newId = state.trace!.id
    state = demoReducer(state, { type: 'reset' })
    state = demoReducer(state, { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'playlist' })
    expect(demoReducer(state, { type: 'advanceTrace', traceId: newId })).toBe(state)
    expect(state.trace?.stepIndex).toBe(0)
    expect(state.likedPostIds).toEqual(['playlist'])
  })

  it('permite salir de Rayos X y abrir el mapa mientras una acción se explica', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleFollow', author: 'ScienceNow' })
    const id = state.trace!.id
    state = demoReducer(state, { type: 'toggleXray' })
    expect(state.trace).toBeNull()
    expect(state.followedAuthors).toEqual(['ScienceNow'])
    state = demoReducer(state, { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    state = demoReducer(state, { type: 'openOverview' })
    expect(state.view).toBe('overview')
    expect(state.trace).toBeNull()
    expect(state.likedPostIds).toEqual(['marte'])
    expect(demoReducer(state, { type: 'advanceTrace', traceId: id })).toBe(state)
  })

  it('reordena el feed al pulsar y no inventa señales cuando no las hay', () => {
    let state = demoReducer(createInitialState(), { type: 'recommend' })
    expect(state.recommendedPostIds).toBeNull()
    expect(state.trace).toBeNull()
    expect(state.notice).toContain('da Me gusta o sigue')
    state = demoReducer(state, { type: 'toggleLike', postId: 'mundos-abiertos' })
    state = demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' })
    state = demoReducer(state, { type: 'toggleXray' })
    state = demoReducer(state, { type: 'recommend' })
    expect(state.recommendedPostIds?.slice(0, 2)).toEqual(['mundos-abiertos', 'pixel-art'])
    expect(state.trace).toMatchObject({ kind: 'recommend', stepIndex: 0 })
    expect(getTraceRoute(state.trace!)).toEqual(['frontend', 'api', 'backend', 'database', 'algorithm', 'frontend'])
    state = advanceAll(state)
    expect(state.trace).toBeNull()
    expect(state.recommendedPostIds?.[1]).toBe('pixel-art')
  })
})

describe('reglas de recomendaciones', () => {
  it('suma Likes y seguidos una sola vez por categoría y conserva los empates', () => {
    const interests = getInterests(['mundos-abiertos'], ['PixelZone'])
    expect(interests.find(({ category }) => category === 'Videojuegos')?.score).toBe(3)
    expect(interests.find(({ category }) => category === 'Música')?.score).toBe(0)
    expect(getRecommendedPostIds(interests).slice(0, 2)).toEqual(['mundos-abiertos', 'pixel-art'])
    expect(getRecommendedPostIds(getInterests([], []))).toEqual(posts.map((post) => post.id))
  })
})
