import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap.js'

const dots = Array.from({ length: 9 }, (_, i) =>
  `<circle cx="${18 + (i % 3) * 32}" cy="${18 + Math.floor(i / 3) * 32}" r="9"/>`).join('')

const PATHS = {
  circle: '<circle cx="50" cy="50" r="46"/>',
  tri: '<polygon points="50,6 95,92 5,92"/>',
  square: '<rect x="8" y="8" width="84" height="84"/>',
  half: '<path d="M4 72A46 46 0 0 1 96 72Z"/>',
  cross: '<path d="M38 6h24v32h32v24H62v32H38V62H6V38h32z"/>',
  star: '<polygon points="50,2 62,38 98,50 62,62 50,98 38,62 2,50 38,38"/>',
  wave: '<path d="M4 50q11.5-34 23 0t23 0 23 0 23 0"/>',
  arrow: '<path d="M6 50h82M62 22l28 28-28 28"/>',
  dots,
}

export const shapeSVG = (kind) => `<svg viewBox="0 0 100 100" aria-hidden="true">${PATHS[kind]}</svg>`

// x/y en % del documento · s = tamaño · f = velocidad relativa al scroll · r = giro total · m = o (solo contorno) | nf (sin contorno)
const SPECS = [
  { k: 'circle', c: 'vermilion', x: 4,  y: 3,  s: 110, f: 0.25,  r: 0 },
  { k: 'tri',    c: 'violet',    x: 82, y: 6,  s: 90,  f: -0.2,  r: 180 },
  { k: 'circle', c: 'pink',      x: 90, y: 14, s: 60,  f: 0.3,   r: 0 },
  { k: 'wave',   c: 'ink',       x: 3,  y: 20, s: 130, f: -0.15, r: 40,  m: 'o' },
  { k: 'cross',  c: 'lime',      x: 92, y: 26, s: 70,  f: 0.2,   r: 270 },
  { k: 'half',   c: 'vermilion', x: 5,  y: 38, s: 100, f: -0.25, r: -90 },
  { k: 'star',   c: 'pink',      x: 85, y: 48, s: 80,  f: 0.3,   r: 180 },
  { k: 'dots',   c: 'violet',    x: 6,  y: 56, s: 90,  f: 0.15,  r: 0,   m: 'nf' },
  { k: 'circle', c: 'ink',       x: 94, y: 62, s: 120, f: -0.2,  r: 90,  m: 'o' },
  { k: 'tri',    c: 'lime',      x: 3,  y: 72, s: 80,  f: 0.25,  r: -200 },
  { k: 'square', c: 'violet',    x: 90, y: 78, s: 70,  f: -0.3,  r: 120 },
  { k: 'arrow',  c: 'ink',       x: 8,  y: 86, s: 110, f: 0.2,   r: 0,   m: 'o' },
  { k: 'cross',  c: 'vermilion', x: 88, y: 92, s: 60,  f: 0.3,   r: 90 },
  // Capa frontal (multiply): contornos grandes que cruzan el contenido
  { k: 'circle', c: 'pink',      x: 50, y: 10, s: 220, f: 0.5,   r: 0,   m: 'o', front: true },
  { k: 'tri',    c: 'vermilion', x: 72, y: 42, s: 150, f: -0.5,  r: 360, m: 'o', front: true },
  { k: 'wave',   c: 'violet',    x: 18, y: 66, s: 200, f: 0.45,  r: 0,   m: 'o', front: true },
]

/** Figuras repartidas por todo el documento; cada una se mueve a su propia velocidad con el scroll. */
export function initShapes() {
  const back = document.querySelector('#shapes')
  const front = document.querySelector('#shapes-front')
  if (!back || !front) return
  const reduced = prefersReducedMotion()

  SPECS.forEach((sp) => {
    const el = document.createElement('div')
    el.className = `sh ${sp.m || ''}`
    el.style.cssText = `--s:${sp.s};--c:var(--color-${sp.c});left:${sp.x}%;top:${sp.y}%;`
    el.innerHTML = shapeSVG(sp.k)
    const host = sp.front ? front : back
    host.appendChild(el)
    if (reduced) return

    gsap.to(el, {
      y: () => sp.f * (document.documentElement.scrollHeight - window.innerHeight),
      rotation: sp.r || 60,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.6, invalidateOnRefresh: true },
    })

    // Movimiento sutil constante (sobre el svg interno para no chocar con el scroll)
    gsap.to(el.firstElementChild, {
      rotation: gsap.utils.random(-12, 12), scale: gsap.utils.random(0.9, 1.12),
      duration: gsap.utils.random(2.5, 5), ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
  })
}

/** Filas de figuras repetidas que se despliegan al entrar y derivan lateralmente. */
export function initBands() {
  document.querySelectorAll('.band').forEach((band) => {
    const { kind, color } = band.dataset
    const dir = Number(band.dataset.dir || 1)
    band.innerHTML = Array.from({ length: 22 }, () =>
      `<span class="sh" style="--s:56;--c:var(--color-${color})">${shapeSVG(kind)}</span>`).join('')
    if (prefersReducedMotion()) return

    gsap.fromTo(band.children,
      { scale: 0, rotation: -160 * dir, y: 40 },
      {
        scale: 1, rotation: 0, y: 0, ease: 'back.out(2)',
        stagger: { each: 0.04, from: dir > 0 ? 'start' : 'end' },
        scrollTrigger: { trigger: band, start: 'top 95%', end: 'top 45%', scrub: 0.8 },
      })

    gsap.fromTo(band, { xPercent: -6 * dir }, {
      xPercent: 6 * dir, ease: 'none',
      scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
}

/** Riel fijo: un rombo baja con el scroll y cambia de color según la sección. */
export function initRail() {
  const rail = document.querySelector('.rail')
  if (!rail) return
  const track = rail.querySelector('.rail-track')
  const dot = rail.querySelector('.rail-dot')
  const fill = rail.querySelector('.rail-fill')
  const label = rail.querySelector('.rail-label')

  document.querySelectorAll('[data-n]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) return
        rail.style.setProperty('--c', sec.dataset.accent)
        label.textContent = sec.dataset.n
      },
    })
  })

  if (prefersReducedMotion()) return

  gsap.to(dot, {
    y: () => track.clientHeight, rotation: 720, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.4, invalidateOnRefresh: true },
  })
  gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } })
}
