// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

afterEach(cleanup)

async function finishTrace(user: ReturnType<typeof userEvent.setup>, stepCount: number) {
  for (let step = 1; step < stepCount; step++) {
    await user.click(screen.getByRole('button', { name: 'Siguiente paso' }))
  }
  await user.click(screen.getByRole('button', { name: 'Terminar recorrido' }))
}

describe('demo en pantalla', () => {
  it('recorre las cuatro misiones y muestra la arquitectura final', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.queryByText('¿Qué está ocurriendo?')).toBeNull()
    await user.click(screen.getByRole('button', { name: /Activar Modo Rayos X/ }))
    expect(screen.getByText('Misión 2 de 4')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeTruthy()
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    for (let step = 0; step < 3; step++) {
      await user.click(screen.getByRole('button', { name: 'Siguiente paso' }))
    }
    expect(screen.getByRole('cell', { name: 'Los mundos abiertos que no querrás abandonar' })).toBeTruthy()
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Siguiente paso' }))
    expect(screen.getByLabelText('843 Me gusta')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Terminar recorrido' }))
    expect(screen.getByText('Misión 3 de 4')).toBeTruthy()

    await user.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    await finishTrace(user, 5)
    expect(screen.getByText('Misión 4 de 4')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Dejar de seguir a PixelZone' })).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    expect(screen.getByText('Intereses detectados')).toBeTruthy()
    await finishTrace(user, 3)
    expect(screen.getByText('4 de 4 completadas')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Ver panorama completo' }))
    expect(screen.getByRole('heading', { name: /Todo está conectado/ })).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: /Todo está conectado/ }))
    expect(screen.getByText('Algoritmo / IA')).toBeTruthy()
    expect(screen.getByText('Programar significa construir las reglas y sistemas que hacen posible todo esto.')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Reiniciar para otra charla' }))
    expect(screen.queryByText('¿Qué está ocurriendo?')).toBeNull()
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
  })

  it('indica cómo generar intereses y permite explorar antes de Rayos X', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    expect(screen.getByRole('status').textContent).toContain('da Me gusta o sigue')
    await user.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    expect(screen.getByLabelText('843 Me gusta')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: /Activar Modo Rayos X/ }))
    expect(screen.getByText('Misión 2 de 4')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: /Desactivar Rayos X/ }))
    expect(screen.getByLabelText('843 Me gusta')).toBeTruthy()
  })

  it('permite activar Rayos X y avanzar el recorrido con teclado', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    await user.tab()
    await user.tab()
    const toggle = screen.getByRole('button', { name: /Activar Modo Rayos X/ })
    expect(document.activeElement).toBe(toggle)
    await user.keyboard('{Enter}')
    const like = screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ })
    like.focus()
    await user.keyboard('{Enter}')
    const next = screen.getByRole('button', { name: 'Siguiente paso' })
    next.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('POST /likes')).toBeTruthy()
    expect(screen.getByRole('listitem', { current: 'step' }).textContent).toContain('API')
  })
})
