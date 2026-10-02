// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function advanceStages(count: number) {
  for (let step = 0; step < count; step++) {
    act(() => vi.advanceTimersByTime(460))
  }
}

describe('feed y Modo Rayos X', () => {
  it('muestra ocho publicaciones en un solo flujo con arte local y permite abrir el mapa desde el inicio', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(document.querySelectorAll('.feed__stream > article')).toHaveLength(8)
    expect(document.querySelectorAll('.post__media svg')).toHaveLength(8)
    expect(screen.queryByText('Así funciona')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Ver mapa completo' }))
    expect(screen.getByRole('heading', { name: 'Así se conecta todo.' })).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Así se conecta todo.' }))
    expect(screen.getByText('Algoritmo / IA')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: '← Volver al feed' }))
    expect(document.querySelectorAll('.feed__stream > article')).toHaveLength(8)
  })

  it('aplica Like y Seguir al instante, muestra la etapa y conserva acciones rápidas', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    expect(screen.getByText('Así funciona')).toBeTruthy()
    expect(screen.queryByText('Misión 2 de 4')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    expect(screen.getByLabelText('843 Me gusta')).toBeTruthy()
    expect(screen.getByRole('listitem', { current: 'step' }).textContent).toContain('Frontend')
    advanceStages(1)
    expect(screen.getByText('La API envía POST /likes.')).toBeTruthy()
    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    expect(screen.getAllByRole('button', { name: 'Dejar de seguir a PixelZone' })).toHaveLength(2)
    expect(screen.getByText('Alex siguió a @PixelZone.')).toBeTruthy()
    advanceStages(3)
    expect(screen.getByText('Alex | sigue a | PixelZone')).toBeTruthy()
    advanceStages(2)
    expect(screen.getByText('Ahora sigues a @PixelZone.')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Siguiente paso' })).toBeNull()
  })

  it('reordena recomendaciones, explica el algoritmo y permite reiniciar desde el mapa', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    expect(screen.getByRole('status').textContent).toContain('da Me gusta o sigue')
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    fireEvent.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    const cards = document.querySelectorAll('.feed__stream > article')
    expect(within(cards[1] as HTMLElement).getByText(/Un universo entero hecho de píxeles/)).toBeTruthy()
    advanceStages(4)
    expect(screen.getByText(/Videojuegos \+3/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Ver mapa completo' }))
    expect(screen.getByRole('heading', { name: 'Así se conecta todo.' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar para otra charla' }))
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    expect(screen.queryByText('Así funciona')).toBeNull()
  })

  it('muestra la eliminación contextual sin bloquear Me gusta ni Seguir', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    fireEvent.click(screen.getByRole('button', { name: /Quitar Me gusta de Los mundos abiertos/ }))
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    advanceStages(3)
    expect(screen.getByText('Se eliminó: Alex | Videojuegos | ♥')).toBeTruthy()
    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    fireEvent.click(screen.getAllByRole('button', { name: 'Dejar de seguir a PixelZone' })[0])
    advanceStages(3)
    expect(screen.getByText('Se eliminó: Alex | sigue a | PixelZone')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar Rayos X' }))
    expect(screen.queryByText('Así funciona')).toBeNull()
    expect(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })).toHaveLength(2)
  })

  it('se puede usar con teclado y omite la animación con movimiento reducido', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Modo Rayos X' }))
    await user.keyboard('{Enter}')
    const like = screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ })
    like.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText(/Recorrido: Frontend → API → Backend → Base de datos → Frontend/)).toBeTruthy()
    expect(screen.getByText('Alex | Videojuegos | ♥')).toBeTruthy()
    const map = screen.getByRole('button', { name: 'Ver mapa completo' })
    map.focus()
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Así se conecta todo.' }))
  })
})
