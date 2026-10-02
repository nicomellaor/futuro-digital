import { posts } from '../data/posts'

export const currentUser = 'Alex'

export const missions = [
  { id: 'xray', title: 'Activar Modo Rayos X' },
  { id: 'like', title: 'Dar Me gusta' },
  { id: 'follow', title: 'Seguir a un creador' },
  { id: 'recommend', title: 'Mejorar recomendaciones' },
] as const

export type DemoState = {
  likedPostIds: string[]
  followedAuthors: string[]
  xrayEnabled: boolean
  currentMissionIndex: number
  recommendedPostIds: string[] | null
  view: 'feed' | 'overview'
}

export type DemoAction =
  | { type: 'toggleLike'; postId: string }
  | { type: 'toggleFollow'; author: string }
  | { type: 'toggleXray' }
  | { type: 'reset' }

// Factory: reset always creates fresh session collections, with no persisted data.
export function createInitialState(): DemoState {
  return {
    likedPostIds: [],
    followedAuthors: [],
    xrayEnabled: false,
    currentMissionIndex: 0,
    recommendedPostIds: null,
    view: 'feed',
  }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'toggleLike':
      if (!posts.some((post) => post.id === action.postId)) return state
      return {
        ...state,
        likedPostIds: state.likedPostIds.includes(action.postId)
          ? state.likedPostIds.filter((id) => id !== action.postId)
          : [...state.likedPostIds, action.postId],
      }
    case 'toggleFollow':
      if (!posts.some((post) => post.author === action.author)) return state
      return {
        ...state,
        followedAuthors: state.followedAuthors.includes(action.author)
          ? state.followedAuthors.filter((author) => author !== action.author)
          : [...state.followedAuthors, action.author],
      }
    case 'toggleXray':
      return {
        ...state,
        xrayEnabled: !state.xrayEnabled,
        currentMissionIndex: state.currentMissionIndex === 0 ? 1 : state.currentMissionIndex,
      }
    case 'reset':
      return createInitialState()
  }
}
