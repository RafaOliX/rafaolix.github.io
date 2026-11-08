import { gsap, prefersReducedMotion } from './gsap.js'

const COLORS = ['var(--color-ink)', 'var(--color-vermilion)', 'var(--color-violet)', 'var(--color-pink)']
const N = 10

/** Túnel infinito de cuadrados en perspectiva. El scroll lo acelera ("zoom through"). */
export function initTunnel() {
  const root = document.querySelector('.tunnel')
  if (!root) return

  const els = Array.from({ length: N }, (_, i) => {
    const el = document.createElement('i')
    el.style.color = COLORS[i % COLORS.length]
    root.appendChild(el)
    return el
  })

  const draw = (t, s) => {
    els.forEach((el, i) => {
      const p = (((i / N) + t * 0.035 + s * 0.0007) % 1 + 1) % 1
      el.style.opacity = Math.sin(Math.PI * p).toFixed(3)
      el.style.transform = `translate(-50%, -50%) translateZ(${-1500 + p * 1900}px) rotate(${p * 120}deg)`
    })
  }

  if (prefersReducedMotion()) { draw(0, 0); return }

  let visible = true
  let smooth = 0
  new IntersectionObserver(([e]) => { visible = e.isIntersecting }).observe(root)

  gsap.ticker.add((time) => {
    if (!visible || document.hidden) return
    smooth += (window.scrollY - smooth) * 0.08
    draw(time, smooth)
  })
}
