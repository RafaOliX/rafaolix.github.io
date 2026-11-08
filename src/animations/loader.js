import { gsap, prefersReducedMotion } from './gsap.js'

/** Resuelve la promesa cuando el loader casi termina, para solapar con el hero. */
export function playLoader() {
  const loader = document.querySelector('#loader')
  if (!loader) return Promise.resolve()
  if (prefersReducedMotion()) { loader.remove(); return Promise.resolve() }

  return new Promise((resolve) => {
    const count = loader.querySelector('#loader-count')
    const bars = loader.querySelectorAll('.loader-bar')
    const ui = loader.querySelector('#loader-ui')
    const state = { v: 0 }

    gsap.timeline({ onComplete: () => loader.remove() })
      .to(state, {
        v: 100, duration: 1.6, ease: 'steps(24)',
        onUpdate: () => { count.textContent = String(Math.round(state.v)).padStart(3, '0') },
      })
      .to(count, { x: () => gsap.utils.random(-12, 12), skewX: 20, duration: 0.06, repeat: 5, yoyo: true })
      .to(ui, { opacity: 0, duration: 0.2 })
      .to(bars, { yPercent: -100, stagger: 0.07, duration: 0.7, ease: 'expo.inOut' })
      .call(resolve, null, '-=0.5')
  })
}
