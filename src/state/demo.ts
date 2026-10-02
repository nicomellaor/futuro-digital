import { posts } from '../data/posts'
import { getInterests, getRecommendedPostIds, type Interest } from './recommendations'

export const currentUser = 'Alex'

export const missions = [
  { id: 'xray', title: 'Activa Modo Rayos X', instruction: 'Descubre lo que hay detrás del feed.' },
  { id: 'like', title: 'Da Me gusta', instruction: 'Elige una publicación sin Me gusta y sigue el viaje de tu acción.' },
  { id: 'follow', title: 'Sigue a un creador', instruction: 'Elige un autor al que aún no sigas y descubre qué se guarda.' },
  { id: 'recommend', title: 'Mejora tus recomendaciones', instruction: 'Descubre cómo tus intereses cambian el orden del feed.' },
] as const

export type InteractionTrace = {
  kind: 'interaction'
  action: 'like' | 'follow'
  targetId: string
  intent: 'add' | 'remove'
  step: number
}

export type RecommendationTrace = {
  kind: 'recommendation'
  step: number
  interests: Interest[]
  order: string[]
}

export type Trace = InteractionTrace | RecommendationTrace

export type DemoState = {
  likedPostIds: string[]
  followedAuthors: string[]
  xrayEnabled: boolean
  currentMissionIndex: number
  recommendedPostIds: string[] | null
  view: 'feed' | 'overview'
  trace: Trace | null
  notice: string | null
}

export type DemoAction =
  | { type: 'toggleLike'; postId: string }
  | { type: 'toggleFollow'; author: string }
  | { type: 'toggleXray' }
  | { type: 'recommend' }
  | { type: 'nextStep' }
  | { type: 'openOverview' }
  | { type: 'closeOverview' }
  | { type: 'reset' }

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

// Factory: reset always creates fresh session collections, with no persisted data.
export function createInitialState(): DemoState {
  return {
    likedPostIds: [],
    followedAuthors: [],
    xrayEnabled: false,
    currentMissionIndex: 0,
    recommendedPostIds: null,
    view: 'feed',
    trace: null,
    notice: null,
  }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'toggleLike': {
      if (state.trace || state.view !== 'feed' || !posts.some((post) => post.id === action.postId)) return state
      if (state.xrayEnabled) {
        return {
          ...state,
          trace: {
            kind: 'interaction', action: 'like', targetId: action.postId,
            intent: state.likedPostIds.includes(action.postId) ? 'remove' : 'add', step: 0,
          },
          notice: null,
        }
      }
      return {
        ...state,
        likedPostIds: toggleValue(state.likedPostIds, action.postId),
        notice: null,
      }
    }
    case 'toggleFollow': {
      if (state.trace || state.view !== 'feed' || !posts.some((post) => post.author === action.author)) return state
      if (state.xrayEnabled) {
        return {
          ...state,
          trace: {
            kind: 'interaction', action: 'follow', targetId: action.author,
            intent: state.followedAuthors.includes(action.author) ? 'remove' : 'add', step: 0,
          },
          notice: null,
        }
      }
      return {
        ...state,
        followedAuthors: toggleValue(state.followedAuthors, action.author),
        notice: null,
      }
    }
    case 'toggleXray':
      if (state.trace || state.view !== 'feed') return state
      return {
        ...state,
        xrayEnabled: !state.xrayEnabled,
        currentMissionIndex: !state.xrayEnabled && state.currentMissionIndex === 0 ? 1 : state.currentMissionIndex,
        notice: null,
      }
    case 'recommend': {
      if (state.trace || state.view !== 'feed') return state
      const interests = getInterests(state.likedPostIds, state.followedAuthors)
      if (!interests.some(({ score }) => score > 0)) {
        return { ...state, notice: 'Para mejorar el feed, da Me gusta o sigue a un creador primero.' }
      }
      const order = getRecommendedPostIds(interests)
      if (state.xrayEnabled) {
        return { ...state, trace: { kind: 'recommendation', step: 0, interests, order }, notice: null }
      }
      return { ...state, recommendedPostIds: order, notice: null }
    }
    case 'nextStep': {
      const trace = state.trace
      if (!trace || !state.xrayEnabled || state.view !== 'feed') return state
      if (trace.kind === 'interaction') {
        if (trace.step === 4) {
          const expected = state.currentMissionIndex === 1 ? 'like' : state.currentMissionIndex === 2 ? 'follow' : null
          return {
            ...state,
            trace: null,
            currentMissionIndex: expected === trace.action && trace.intent === 'add'
              ? state.currentMissionIndex + 1 : state.currentMissionIndex,
          }
        }
        if (trace.step === 2) {
          return {
            ...state,
            trace: { ...trace, step: 3 },
            likedPostIds: trace.action === 'like' ? toggleValue(state.likedPostIds, trace.targetId) : state.likedPostIds,
            followedAuthors: trace.action === 'follow'
              ? toggleValue(state.followedAuthors, trace.targetId) : state.followedAuthors,
          }
        }
        return { ...state, trace: { ...trace, step: trace.step + 1 } }
      }
      if (trace.step === 2) {
        return {
          ...state,
          trace: null,
          currentMissionIndex: state.currentMissionIndex === 3 ? 4 : state.currentMissionIndex,
        }
      }
      return {
        ...state,
        trace: { ...trace, step: trace.step + 1 },
        recommendedPostIds: trace.step === 1 ? trace.order : state.recommendedPostIds,
      }
    }
    case 'openOverview':
      if (state.trace || state.currentMissionIndex < missions.length) return state
      return { ...state, view: 'overview' }
    case 'closeOverview':
      return { ...state, view: 'feed' }
    case 'reset':
      return createInitialState()
  }
}

// Durante el paso «Base de datos», el dato ya cambió pero la respuesta aún no
// ha llegado al frontend: sus botones y contadores muestran el valor anterior.
export function getVisibleInteractions(state: DemoState) {
  const trace = state.trace
  if (!trace || trace.kind !== 'interaction' || trace.step !== 3) {
    return { likedPostIds: state.likedPostIds, followedAuthors: state.followedAuthors }
  }
  return {
    likedPostIds: trace.action === 'like' ? toggleValue(state.likedPostIds, trace.targetId) : state.likedPostIds,
    followedAuthors: trace.action === 'follow'
      ? toggleValue(state.followedAuthors, trace.targetId) : state.followedAuthors,
  }
}
