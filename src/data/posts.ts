export const categories = [
  'Videojuegos',
  'Música',
  'Ciencia',
  'Tecnología',
  'Deportes',
  'Arte',
  'Películas',
] as const

export type Category = (typeof categories)[number]

export type Post = {
  id: string
  title: string
  author: string
  category: Category
  likes: number
  saves: number
  emoji: string
  artwork: 'game' | 'space' | 'music' | 'tech' | 'sport' | 'art' | 'film'
}

export const posts: Post[] = [
  {
    id: 'mundos-abiertos',
    title: 'Los mundos abiertos que no querrás abandonar',
    author: 'PixelZone',
    category: 'Videojuegos',
    likes: 842,
    saves: 128,
    emoji: '🎮',
    artwork: 'game',
  },
  {
    id: 'marte',
    title: '¿Podremos vivir algún día en Marte?',
    author: 'ScienceNow',
    category: 'Ciencia',
    likes: 815,
    saves: 204,
    emoji: '🚀',
    artwork: 'space',
  },
  {
    id: 'playlist',
    title: 'La playlist para volver a empezar',
    author: 'OndaNueva',
    category: 'Música',
    likes: 526,
    saves: 91,
    emoji: '🎧',
    artwork: 'music',
  },
  {
    id: 'robot-casero',
    title: 'Armamos un robot con cosas de casa',
    author: 'TecnoLab',
    category: 'Tecnología',
    likes: 473,
    saves: 76,
    emoji: '🤖',
    artwork: 'tech',
  },
  {
    id: 'cancha',
    title: 'Una jugada, mil formas de contarla',
    author: 'FueraDeJuego',
    category: 'Deportes',
    likes: 392,
    saves: 43,
    emoji: '⚽',
    artwork: 'sport',
  },
  {
    id: 'color',
    title: 'Dibujar con colores que no combinan',
    author: 'TrazoLibre',
    category: 'Arte',
    likes: 328,
    saves: 112,
    emoji: '🎨',
    artwork: 'art',
  },
  {
    id: 'cine',
    title: 'Historias que merecen otra función',
    author: 'CineClub',
    category: 'Películas',
    likes: 667,
    saves: 135,
    emoji: '🎬',
    artwork: 'film',
  },
  {
    id: 'pixel-art',
    title: 'Un universo entero hecho de píxeles',
    author: 'PixelZone',
    category: 'Videojuegos',
    likes: 594,
    saves: 88,
    emoji: '👾',
    artwork: 'game',
  },
]
