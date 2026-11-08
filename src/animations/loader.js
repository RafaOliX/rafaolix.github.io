import { gsap, prefersReducedMotion } from './gsap.js'

/** Loader de torres translúcidas (guiño a los comerciales de PS2). Resuelve cerca del final. */
export function playLoader() {
  const loader = document.querySelector('#loader')
  if (!loader) return Promise.resolve()
  if (prefersReducedMotion()) { loader.remove(); return Promise.resolve() }

  const towers = loader.querySelector('#towers')
  towers.innerHTML = Array.from({ length: 26 }, () => '<span class="tower"></span>').join('')
  const els = towers.querySelectorAll('.tower')
  const count = loader.querySelector('#loader-count')

  const idle = gsap.to(els, {
    scaleY: () => gsap.utils.random(0.25, 1),
    duration: () => gsap.utils.random(0.35, 0.8),
    ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true,
    stagger: { each: 0.04, from: 'center' },
  })

  return new Promise((resolve) => {
    const state = { v: 0 }
    gsap.timeline({ onComplete: () => loader.remove() })
      .to(state, {
        v: 100, duration: 1.8, ease: 'power2.inOut',
        onUpdate: () => { count.textContent = String(Math.round(state.v)).padStart(3, '0') },
      })
      .add(() => idle.kill())
      .to(els, { scaleY: 2, duration: 0.5, ease: 'expo.in', stagger: { each: 0.03, from: 'edges' } })
      .to('#loader-ui', { autoAlpha: 0, scale: 1.4, duration: 0.35 }, '<')
      .to(loader, { autoAlpha: 0, duration: 0.5 }, '-=0.15')
      .call(resolve, null, '-=0.4')
  })
}
