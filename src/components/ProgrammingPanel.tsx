import type { ReactNode } from 'react'
import { posts } from '../data/posts'
import { currentUser, type ProgrammingAction } from '../state/demo'
import { getRecommendedPostIds } from '../state/recommendations'

type CodeLine = { content: ReactNode; indent?: boolean; comment?: boolean }
type Rule = {
  title: string
  description: string
  data: CodeLine[]
  condition: string
  instructions: CodeLine[]
  test: CodeLine[]
  question: string
}

function literal(value: string | number | boolean): ReactNode {
  const text = typeof value === 'string' ? JSON.stringify(value)
    : typeof value === 'boolean' ? (value ? 'True' : 'False') : String(value)
  return <span className="programming__string">{text}</span>
}

function collection(value: object): ReactNode {
  return <span className="programming__string">{JSON.stringify(value)}</span>
}

function assign(name: string, value: ReactNode, indent = false): CodeLine {
  return { content: <>{name} = {value}</>, indent }
}

function check(expression: ReactNode): CodeLine {
  return { content: <><span className="programming__keyword">comprobar</span>({expression})</> }
}

function describeAction(action: ProgrammingAction): Rule {
  if (action.kind === 'like') {
    const post = posts.find((item) => item.id === action.targetId)!
    const adding = action.intent === 'add'
    const before = post.likes + (adding ? 0 : 1)
    const after = post.likes + (adding ? 1 : 0)
    return {
      title: `${adding ? 'Dar' : 'Quitar'} Me gusta`,
      description: `Publicación: ${post.title}`,
      data: [
        assign('usuario', literal(currentUser)),
        assign('publicacion', literal(post.title)),
        assign('categoria', literal(post.category)),
        assign('me_gusta', literal(!adding)),
        assign('contador', literal(before)),
      ],
      condition: adding ? 'not me_gusta' : 'me_gusta',
      instructions: [
        assign('me_gusta', literal(adding), true),
        { content: <>contador {adding ? '+=' : '-='} {literal(1)}</>, indent: true },
      ],
      test: [check(<>contador == {literal(after)}</>)],
      question: `Si vuelves a pulsar, ¿regresan el corazón y el contador a ${before}?`,
    }
  }

  if (action.kind === 'follow') {
    const authorPosts = posts.filter((post) => post.author === action.targetId)
    const categories = [...new Set(authorPosts.map((post) => post.category))]
    const adding = action.intent === 'add'
    return {
      title: `${adding ? 'Seguir' : 'Dejar de seguir'} a @${action.targetId}`,
      description: 'Una regla para todas las publicaciones del creador.',
      data: [
        assign('usuario', literal(currentUser)),
        assign('autor', literal(action.targetId)),
        assign('categorias', collection(categories)),
        assign('publicaciones', literal(authorPosts.length)),
        assign('siguiendo', literal(!adding)),
      ],
      condition: adding ? 'not siguiendo' : 'siguiendo',
      instructions: [
        assign('siguiendo', literal(adding), true),
        { content: <>mostrar_en_publicaciones(autor, {literal(adding ? 'Siguiendo' : 'Seguir')})</>, indent: true },
      ],
      test: [check(<>siguiendo == {literal(adding)}</>)],
      question: `Si vuelves a pulsar, ¿las ${authorPosts.length} publicaciones mostrarán ${adding ? 'Seguir' : 'Siguiendo'}?`,
    }
  }

  const scored = action.interests.filter(({ score }) => score > 0)
  const data = [
    assign('usuario', literal(currentUser)),
    assign('me_gusta', literal(action.likeCount)),
    assign('autores_seguidos', literal(action.followCount)),
    assign('puntos_actuales', collection(Object.fromEntries(scored.map(({ category, score }) => [category, score])))),
  ]

  if (scored.length === 0) return {
    title: 'Mejorar mis recomendaciones',
    description: 'Todavía no hay señales para cambiar el orden.',
    data: [...data, assign('orden_actual', literal('orden visible'))],
    condition: 'me_gusta == 0 and autores_seguidos == 0',
    instructions: [
      assign('orden_nuevo', 'orden_actual', true),
      { content: <>mostrar({literal('Da Me gusta o sigue a un creador primero')})</>, indent: true },
    ],
    test: [check('orden_nuevo == orden_actual')],
    question: '¿Cambió el orden? Da Me gusta o sigue a alguien y vuelve a probar.',
  }

  const firstPost = posts.find((post) => post.id === getRecommendedPostIds(action.interests)[0])!
  return {
    title: 'Mejorar mis recomendaciones',
    description: `Las preferencias de ${currentUser} cambian el orden del feed.`,
    data,
    condition: 'me_gusta > 0 or autores_seguidos > 0',
    instructions: [
      { content: '# +1 por Me gusta; +2 por categoría de cada autor seguido, una vez.', indent: true, comment: true },
      assign('puntos', <>calcular_puntos(por_me_gusta={literal(1)}, por_categoria_seguida={literal(2)})</>, true),
      assign('feed', <>ordenar_por_puntos(puntos, empates={literal('orden_original')})</>, true),
      assign('primera', literal(firstPost.title), true),
    ],
    test: [check(<>primera == {literal(firstPost.title)}</>)],
    question: '¿Qué categoría quedó arriba? ¿Qué pasó con las publicaciones empatadas?',
  }
}

export function ProgrammingPanel({ action }: { action: ProgrammingAction | null }) {
  if (!action) return <p className="programming__hint">Realiza una acción para continuar.</p>

  const rule = describeAction(action)
  const comment = (text: string): CodeLine => ({ content: `# ${text}`, comment: true })
  const lines: CodeLine[] = [
    comment(rule.title),
    comment(rule.description),
    { content: null },
    comment('Datos'),
    ...rule.data,
    { content: null },
    comment('Condición'),
    { content: <><span className="programming__keyword">if</span> {rule.condition}:</> },
    { content: '# Instrucciones', indent: true, comment: true },
    ...rule.instructions,
    { content: null },
    comment('Prueba'),
    ...rule.test,
    comment(rule.question),
  ]

  return (
    <section className="programming" aria-label={`Pseudocódigo: ${rule.title}`}>
      <div className="programming__toolbar">
        <span className="programming__file">reglas.pseudo</span>
        <span className="programming__readonly">Solo lectura</span>
      </div>
      <ol className="programming__lines" aria-label={`Reglas para ${rule.title}`}>
        {lines.map(({ content, indent, comment: isComment }, index) => (
          <li className={`programming__line ${content === null ? 'programming__line--blank' : ''} ${indent ? 'programming__line--indented' : ''}`} key={index}>
            <span className={`programming__code ${isComment ? 'programming__comment' : ''}`}>{content}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
