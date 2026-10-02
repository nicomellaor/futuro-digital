import { posts } from '../data/posts'
import { getInterests, getRecommendedPostIds, type Interest } from './recommendations'

export const currentUser = 'Alex'

export type ArchitectureNode = 'frontend' | 'api' | 'backend' | 'database' | 'algorithm'

export type InteractionTrace = {
  id: number
  kind: 'like' | 'follow'
  targetId: string
  intent: 'add' | 'remove'
  stepIndex: number
}

export type RecommendationTrace = {
  id: number
  kind: 'recommend'
  interests: Interest[]
  stepIndex: number
}

export type Trace = InteractionTrace | RecommendationTrace

export const interactionRoute: ArchitectureNode[] = ['frontend', 'api', 'backend', 'database', 'frontend']
export const recommendationRoute: ArchitectureNode[] = ['frontend', 'api', 'backend', 'database', 'algorithm', 'frontend']

export function getTraceRoute(trace: Trace): ArchitectureNode[] {
  return trace.kind === 'recommend' ? recommendationRoute : interactionRoute
}

export type DemoState = {
  likedPostIds: string[]
  followedAuthors: string[]
  xrayEnabled: boolean
  recommendedPostIds: string[] | null
  view: 'feed' | 'overview'
  trace: Trace | null
  nextTraceId: number
  notice: string | null
}

export type DemoAction =
  | { type: 'toggleLike'; postId: string }
  | { type: 'toggleFollow'; author: string }
  | { type: 'toggleXray' }
  | { type: 'recommend' }
  | { type: 'advanceTrace'; traceId: number }
  | { type: 'openOverview' }
  | { type: 'closeOverview' }
  | { type: 'reset' }

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

// Estado de una única sesión local; el reinicio crea colecciones nuevas.
export function createInitialState(): DemoState {
  return {
    likedPostIds: [],
    followedAuthors: [],
    xrayEnabled: false,
    recommendedPostIds: null,
    view: 'feed',
    trace: null,
    nextTraceId: 0,
    notice: null,
  }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'toggleLike': {
      if (state.view !== 'feed' || !posts.some((post) => post.id === action.postId)) return state
      const intent = state.likedPostIds.includes(action.postId) ? 'remove' : 'add'
      return {
        ...state,
        likedPostIds: toggleValue(state.likedPostIds, action.postId),
        trace: state.xrayEnabled ? {
          id: state.nextTraceId + 1, kind: 'like', targetId: action.postId, intent, stepIndex: 0,
        } : null,
        nextTraceId: state.nextTraceId + 1,
        notice: null,
      }
    }
    case 'toggleFollow': {
      if (state.view !== 'feed' || !posts.some((post) => post.author === action.author)) return state
      const intent = state.followedAuthors.includes(action.author) ? 'remove' : 'add'
      return {
        ...state,
        followedAuthors: toggleValue(state.followedAuthors, action.author),
        trace: state.xrayEnabled ? {
          id: state.nextTraceId + 1, kind: 'follow', targetId: action.author, intent, stepIndex: 0,
        } : null,
        nextTraceId: state.nextTraceId + 1,
        notice: null,
      }
    }
    case 'toggleXray':
      if (state.view !== 'feed') return state
      return { ...state, xrayEnabled: !state.xrayEnabled, trace: null }
    case 'recommend': {
      if (state.view !== 'feed') return state
      const interests = getInterests(state.likedPostIds, state.followedAuthors)
      if (!interests.some(({ score }) => score > 0)) {
        return { ...state, notice: 'Para mejorar el feed, da Me gusta o sigue a un creador primero.', trace: null }
      }
      return {
        ...state,
        recommendedPostIds: getRecommendedPostIds(interests),
        trace: state.xrayEnabled ? {
          id: state.nextTraceId + 1, kind: 'recommend', interests, stepIndex: 0,
        } : null,
        nextTraceId: state.nextTraceId + 1,
        notice: null,
      }
    }
    case 'advanceTrace': {
      const trace = state.trace
      if (!trace || trace.id !== action.traceId) return state
      const next = trace.stepIndex + 1
      return { ...state, trace: next >= getTraceRoute(trace).length ? null : { ...trace, stepIndex: next } }
    }
    case 'openOverview':
      return { ...state, view: 'overview', trace: null }
    case 'closeOverview':
      return { ...state, view: 'feed' }
    case 'reset':
      // Mantener identificadores crecientes evita que un control de un recorrido
      // anterior pueda avanzar otra acción después de reiniciar la demostración.
      return { ...createInitialState(), nextTraceId: state.nextTraceId + 1 }
  }
}
