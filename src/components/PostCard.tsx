import type { Post } from '../data/posts'
import { PostArtwork } from './PostArtwork'

type PostCardProps = {
  post: Post
  liked: boolean
  following: boolean
  onLike: (id: string) => void
  onFollow: (author: string) => void
}

const numberFormat = new Intl.NumberFormat('es-CL')

export function PostCard({ post, liked, following, onLike, onFollow }: PostCardProps) {
  return (
    <article className="post" aria-label={`Publicación de ${post.author}`}>
      <div className="post__header">
        <span className={`post__avatar post__avatar--${post.artwork}`} aria-hidden="true">{post.author[0]}</span>
        <div className="post__identity">
          <strong>{post.author}</strong>
          <span>{post.category}</span>
        </div>
        <button
          className={`follow-button ${following ? 'follow-button--active' : ''}`}
          type="button"
          aria-label={`${following ? 'Dejar de seguir' : 'Seguir'} a ${post.author}`}
          aria-pressed={following}
          onClick={() => onFollow(post.author)}
        >
          {following ? 'Siguiendo' : 'Seguir'}
        </button>
      </div>

      <div className="post__media"><PostArtwork post={post} /></div>

      <div className="post__content">
        <button
          className={`like-button ${liked ? 'like-button--active' : ''}`}
          type="button"
          aria-label={`${liked ? 'Quitar Me gusta de' : 'Dar Me gusta a'} ${post.title}`}
          aria-pressed={liked}
          onClick={() => onLike(post.id)}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <path d="M16 28 4.7 16.6C-1 10.8 8 1.7 14 7.6l2 2 2-2c6-5.9 15 3.2 9.3 9L16 28Z" />
          </svg>
          <span className="sr-only">Me gusta</span>
        </button>
        <p className="post__likes" aria-label={`${numberFormat.format(post.likes + Number(liked))} Me gusta`}>
          {numberFormat.format(post.likes + Number(liked))} Me gusta
        </p>
        <p className="post__caption"><strong>{post.author}</strong> {post.title}</p>
        <span className="post__tag">#{post.category.toLowerCase()}</span>
      </div>
    </article>
  )
}
