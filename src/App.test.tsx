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

function next(count: number) {
  for (let step = 0; step < count; step++) {
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
  }
}

describe('feed y Modo Rayos X', () => {
  it('mantiene el feed y ofrece el mapa con iconos desde el inicio y navegación en el header', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(document.querySelectorAll('.feed__stream > article')).toHaveLength(8)
    expect(document.querySelectorAll('.post__media svg')).toHaveLength(8)
    await user.click(screen.getByRole('button', { name: 'Ver mapa completo' }))
    expect(screen.getByRole('heading', { name: 'Así se conecta todo.' })).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Así se conecta todo.' }))
    expect(document.querySelectorAll('.architecture svg')).toHaveLength(6)
    expect(screen.getByText('Algoritmo / IA')).toBeTruthy()
    expect(document.querySelector('.overview__note, .overview__back, .overview__closing button')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Volver al feed' }))
    expect(document.querySelectorAll('.feed__stream > article')).toHaveLength(8)
  })

  it('deja el diagrama limpio en reposo y avanza solo con el botón manual', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    expect(screen.getByText('Así funciona')).toBeTruthy()
    expect(document.querySelector('.xray__note, .xray__explanation')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    expect(screen.getByLabelText('843 Me gusta')).toBeTruthy()
    expect(screen.getByRole('listitem', { current: 'step' }).textContent).toContain('Frontend')
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('listitem', { current: 'step' }).textContent).toContain('Frontend')
    next(1)
    expect(screen.getByText('La API envía POST /likes.')).toBeTruthy()

    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    expect(screen.getAllByRole('button', { name: 'Dejar de seguir a PixelZone' })).toHaveLength(2)
    expect(screen.getByText('Alex siguió a @PixelZone.')).toBeTruthy()
    next(3)
    expect(screen.getByText('Alex | sigue a | PixelZone')).toBeTruthy()
    next(1)
    expect(screen.getByText('El feed ya muestra el nuevo seguimiento.')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Finalizar' }))
    expect(document.querySelector('.xray__explanation')).toBeNull()
    expect(screen.queryByRole('listitem', { current: 'step' })).toBeNull()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Así funciona' }))
  })

  it('reordena recomendaciones, explica el algoritmo y permite reiniciar desde el header', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    expect(screen.getByRole('status').textContent).toContain('da Me gusta o sigue')
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    fireEvent.click(screen.getByRole('button', { name: /Mejorar mis recomendaciones/ }))
    const cards = document.querySelectorAll('.feed__stream > article')
    expect(within(cards[1] as HTMLElement).getByText(/Un universo entero hecho de píxeles/)).toBeTruthy()
    next(4)
    expect(screen.getByText(/Videojuegos \+3/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Ver mapa completo' }))
    expect(screen.getByRole('heading', { name: 'Así se conecta todo.' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar demo' }))
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    expect(screen.queryByText('Así funciona')).toBeNull()
  })

  it('muestra la eliminación contextual y permite salir de Rayos X a mitad del recorrido', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Modo Rayos X' }))
    fireEvent.click(screen.getByRole('button', { name: /Dar Me gusta a Los mundos abiertos/ }))
    fireEvent.click(screen.getByRole('button', { name: /Quitar Me gusta de Los mundos abiertos/ }))
    expect(screen.getByLabelText('842 Me gusta')).toBeTruthy()
    next(3)
    expect(screen.getByText('Se eliminó: Alex | Videojuegos | ♥')).toBeTruthy()
    fireEvent.click(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })[0])
    fireEvent.click(screen.getAllByRole('button', { name: 'Dejar de seguir a PixelZone' })[0])
    next(3)
    expect(screen.getByText('Se eliminó: Alex | sigue a | PixelZone')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar Rayos X' }))
    expect(screen.queryByText('Así funciona')).toBeNull()
    expect(screen.getAllByRole('button', { name: 'Seguir a PixelZone' })).toHaveLength(2)
  })

  it('permite navegar con teclado también con movimiento reducido', async () => {
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
    expect(screen.getByText('Alex dio Me gusta a «Los mundos abiertos que no querrás abandonar».')).toBeTruthy()
    const advance = screen.getByRole('button', { name: 'Siguiente' })
    advance.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('La API envía POST /likes.')).toBeTruthy()
    const map = screen.getByRole('button', { name: 'Ver mapa completo' })
    map.focus()
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Así se conecta todo.' }))
  })
})
