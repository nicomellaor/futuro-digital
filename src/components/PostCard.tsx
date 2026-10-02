import type { Post } from '../data/posts'

type PostCardProps = {
  post: Post
  featured: boolean
  liked: boolean
  following: boolean
  disabled: boolean
  onLike: (id: string) => void
  onFollow: (author: string) => void
}

const numberFormat = new Intl.NumberFormat('es-CL')

export function PostCard({ post, featured, liked, following, disabled, onLike, onFollow }: PostCardProps) {
  return (
    <article className={`post ${featured ? 'post--featured' : ''}`}>
      <div className={`post__art post__art--${post.artwork}`} aria-hidden="true">
        <span className="post__art-shape" />
        <span className="post__emoji">{post.emoji}</span>
      </div>
      <div className="post__body">
        <div className="post__topline">
          <span className="post__category">{post.category}</span>
          <button
            className={`follow-button ${following ? 'follow-button--active' : ''}`}
            type="button"
            aria-label={`${following ? 'Dejar de seguir' : 'Seguir'} a ${post.author}`}
            aria-pressed={following}
            disabled={disabled}
            onClick={() => onFollow(post.author)}
          >
            <span aria-hidden="true">{following ? '✓' : '+'}</span> {following ? 'Siguiendo' : 'Seguir'}
          </button>
        </div>
        <h2 className="post__title">{post.title}</h2>
        <p className="post__author">por @{post.author}</p>
        <div className="post__actions">
          <button
            className={`like-button ${liked ? 'like-button--active' : ''}`}
            type="button"
            aria-label={`${liked ? 'Quitar Me gusta de' : 'Dar Me gusta a'} ${post.title}`}
            aria-pressed={liked}
            disabled={disabled}
            onClick={() => onLike(post.id)}
          >
            <span className="like-button__heart" aria-hidden="true">♥</span>
            <span>Me gusta</span>
          </button>
          <span className="post__likes" aria-label={`${numberFormat.format(post.likes + Number(liked))} Me gusta`}>
            {numberFormat.format(post.likes + Number(liked))}
          </span>
        </div>
      </div>
    </article>
  )
}
