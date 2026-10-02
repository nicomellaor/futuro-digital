import { describe, expect, it } from 'vitest'
import { createInitialState, demoReducer, getVisibleInteractions, type DemoState } from './demo'
import { getInterests, getRecommendedPostIds } from './recommendations'
import { posts } from '../data/posts'

function advance(state: DemoState, steps: number): DemoState {
  for (let index = 0; index < steps; index++) state = demoReducer(state, { type: 'nextStep' })
  return state
}

describe('recorrido de FuturoDigital', () => {
  it('permite explorar el feed antes de Rayos X sin completar misiones', () => {
    let state = createInitialState()
    state = demoReducer(state, { type: 'toggleLike', postId: 'mundos-abiertos' })
    state = demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' })
    expect(state.likedPostIds).toEqual(['mundos-abiertos'])
    expect(state.followedAuthors).toEqual(['PixelZone'])
    expect(state.currentMissionIndex).toBe(0)
    state = demoReducer(state, { type: 'toggleXray' })
    expect(state.currentMissionIndex).toBe(1)
    state = demoReducer(state, { type: 'toggleXray' })
    expect(state.currentMissionIndex).toBe(1)
    expect(state.likedPostIds).toEqual(['mundos-abiertos'])
  })

  it('guarda el Like en base de datos y actualiza la vista solo tras la respuesta', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = demoReducer(state, { type: 'toggleLike', postId: 'marte' })
    expect(state.trace).toMatchObject({ kind: 'interaction', action: 'like', step: 0 })
    expect(state.likedPostIds).toEqual([])
    expect(demoReducer(state, { type: 'toggleLike', postId: 'playlist' })).toBe(state)
    state = advance(state, 3)
    expect(state.trace).toMatchObject({ step: 3 })
    expect(state.likedPostIds).toEqual(['marte'])
    expect(getVisibleInteractions(state).likedPostIds).toEqual([])
    state = advance(state, 1)
    expect(getVisibleInteractions(state).likedPostIds).toEqual(['marte'])
    expect(state.currentMissionIndex).toBe(1)
    state = advance(state, 1)
    expect(state.currentMissionIndex).toBe(2)
    expect(state.trace).toBeNull()
  })

  it('completa Seguir solo al terminar su recorrido y deja deshacer sin saltar misiones', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = advance(demoReducer(state, { type: 'toggleLike', postId: 'marte' }), 5)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    expect(state.followedAuthors).toEqual(['PixelZone'])
    expect(state.currentMissionIndex).toBe(3)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 3)
    expect(state.followedAuthors).toEqual([])
    expect(getVisibleInteractions(state).followedAuthors).toEqual(['PixelZone'])
    state = advance(state, 2)
    expect(state.currentMissionIndex).toBe(3)
    expect(state.followedAuthors).toEqual([])
  })

  it('permite acciones fuera de la misión actual sin adelantar el recorrido', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    expect(state.currentMissionIndex).toBe(1)
    state = advance(demoReducer(state, { type: 'toggleLike', postId: 'marte' }), 5)
    expect(state.currentMissionIndex).toBe(2)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    expect(state.currentMissionIndex).toBe(2)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'ScienceNow' }), 5)
    expect(state.currentMissionIndex).toBe(3)
  })

  it('pide señales si se deshacen todos los intereses', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = advance(demoReducer(state, { type: 'toggleLike', postId: 'marte' }), 5)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    state = advance(demoReducer(state, { type: 'toggleLike', postId: 'marte' }), 5)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    state = demoReducer(state, { type: 'recommend' })
    expect(state.trace).toBeNull()
    expect(state.recommendedPostIds).toBeNull()
    expect(state.currentMissionIndex).toBe(3)
    expect(state.notice).toContain('da Me gusta o sigue')
  })

  it('reordena con las señales presentes y permite ver el panorama y reiniciar', () => {
    let state = demoReducer(createInitialState(), { type: 'toggleXray' })
    state = advance(demoReducer(state, { type: 'toggleLike', postId: 'mundos-abiertos' }), 5)
    state = advance(demoReducer(state, { type: 'toggleFollow', author: 'PixelZone' }), 5)
    state = demoReducer(state, { type: 'recommend' })
    expect(state.trace).toMatchObject({ kind: 'recommendation', step: 0 })
    expect(state.recommendedPostIds).toBeNull()
    state = advance(state, 2)
    expect(state.recommendedPostIds?.slice(0, 2)).toEqual(['mundos-abiertos', 'pixel-art'])
    expect(state.currentMissionIndex).toBe(3)
    state = advance(state, 1)
    expect(state.currentMissionIndex).toBe(4)
    state = demoReducer(state, { type: 'openOverview' })
    expect(state.view).toBe('overview')
    state = demoReducer(state, { type: 'closeOverview' })
    expect(state.view).toBe('feed')
    expect(demoReducer(state, { type: 'reset' })).toEqual(createInitialState())
  })
})

describe('reglas de recomendaciones', () => {
  it('suma Likes y seguidos sin multiplicar el mismo autor por sus publicaciones', () => {
    const interests = getInterests(['mundos-abiertos'], ['PixelZone'])
    expect(interests.find(({ category }) => category === 'Videojuegos')?.score).toBe(3)
    expect(interests.find(({ category }) => category === 'Música')?.score).toBe(0)
    expect(getRecommendedPostIds(interests).slice(0, 2)).toEqual(['mundos-abiertos', 'pixel-art'])
    expect(getRecommendedPostIds(getInterests([], []))).toEqual(posts.map((post) => post.id))
  })
})
