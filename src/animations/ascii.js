import { gsap, prefersReducedMotion } from './gsap.js'

const RAMP = ' .:-=+*#%@'

/** Convierte texto a arte ASCII dibujándolo en un canvas y muestreando su densidad. */
export async function textToAscii(text, { cols = 110 } = {}) {
  try { await document.fonts.load('900 120px Nunito', text) } catch {}

  const size = 120, pad = 10
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const font = `900 ${size}px Nunito, sans-serif`

  ctx.font = font
  const w = Math.ceil(ctx.measureText(text).width) + pad * 2
  const h = Math.ceil(size * 1.3)
  canvas.width = w
  canvas.height = h
  ctx.font = font            // cambiar el tamaño del canvas reinicia el contexto
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, pad, h / 2)

  const data = ctx.getImageData(0, 0, w, h).data
  const cellW = w / cols
  const cellH = cellW * 2     // los caracteres son ~2x más altos que anchos
  const rows = Math.floor(h / cellH)
  const lines = []

  for (let r = 0; r < rows; r++) {
    let line = ''
    for (let c = 0; c < cols; c++) {
      let sum = 0, n = 0
      for (let y = Math.floor(r * cellH); y < Math.floor((r + 1) * cellH); y++) {
        for (let x = Math.floor(c * cellW); x < Math.floor((c + 1) * cellW); x++) {
          sum += data[(y * w + x) * 4 + 3]
          n++
        }
      }
      const density = Math.pow(sum / (n * 255), 0.7)
      line += RAMP[Math.min(RAMP.length - 1, Math.floor(density * RAMP.length))]
    }
    lines.push(line)
  }
  while (lines.length && !lines[0].trim()) lines.shift()
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop()
  return lines.join('\n')
}

/** Efecto "decode": caracteres aleatorios que se resuelven en el arte final. */
export function decodeIn(el, art, duration = 1.4) {
  if (prefersReducedMotion()) { el.textContent = art; return }
  const noise = '#%@*+=-:.'
  const state = { p: 0 }
  gsap.to(state, {
    p: 1, duration, ease: 'power2.out',
    onUpdate: () => {
      let out = ''
      for (const ch of art) {
        out += ch === ' ' || ch === '\n' ? ch
          : Math.random() < state.p ? ch : noise[(Math.random() * noise.length) | 0]
      }
      el.textContent = out
    },
    onComplete: () => { el.textContent = art },
  })
}

/** Ola ASCII animada que ocupa todo el ancho. */
export function initWave(el, rows = 5) {
  if (!el) return
  let cols = 0
  const measure = () => {
    const fs = parseFloat(getComputedStyle(el).fontSize)
    cols = Math.ceil(window.innerWidth / (fs * 0.6)) + 2
  }
  const draw = (t) => {
    let out = ''
    for (let r = 0; r < rows; r++) {
      for (let x = 0; x < cols; x++) {
        const y = 2 + Math.sin(x * 0.09 + t * 1.6) * 1.1 + Math.sin(x * 0.047 - t) * 0.9
        const d = r - y
        out += d < -0.5 ? ' ' : d < 0.5 ? '~' : d < 1.5 ? '-' : '.'
      }
      out += '\n'
    }
    el.textContent = out
  }

  measure()
  window.addEventListener('resize', () => { measure(); if (prefersReducedMotion()) draw(0) })
  if (prefersReducedMotion()) { draw(0); return }

  let frame = 0
  gsap.ticker.add((time) => { if (++frame % 2 === 0) draw(time) }) // ~30 fps
}
