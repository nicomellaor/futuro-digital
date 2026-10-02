import { categories, posts, type Category } from '../data/posts'

export type Interest = { category: Category; score: number }

export function getInterests(likedPostIds: string[], followedAuthors: string[]): Interest[] {
  const scores = Object.fromEntries(categories.map((category) => [category, 0])) as Record<Category, number>

  // Cada Me gusta aporta 1 punto a la categoría de esa publicación.
  for (const post of posts) {
    if (likedPostIds.includes(post.id)) scores[post.category] += 1
  }

  // Seguir a un autor aporta 2 puntos por categoría en la que publica,
  // una sola vez por categoría, aunque tenga varias publicaciones.
  for (const author of followedAuthors) {
    const authorCategories = new Set(posts.filter((post) => post.author === author).map((post) => post.category))
    for (const category of authorCategories) scores[category] += 2
  }

  return categories.map((category) => ({ category, score: scores[category] }))
}

export function getRecommendedPostIds(interests: Interest[]): string[] {
  const scores = new Map(interests.map(({ category, score }) => [category, score]))
  // Desempate explícito por posición original: el orden siempre es reproducible.
  return posts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => (scores.get(b.post.category) ?? 0) - (scores.get(a.post.category) ?? 0) || a.index - b.index)
    .map(({ post }) => post.id)
}
