import { gsap, prefersReducedMotion } from './gsap.js'

/** Contador + figuras que se suceden; al final, barras de color barren la pantalla (tipo intro de anime). */
export function playLoader() {
  const loader = document.querySelector('#loader')
  if (!loader) return Promise.resolve()
  if (prefersReducedMotion()) { loader.remove(); return Promise.resolve() }

  const count = loader.querySelector('#loader-count')
  const shapes = loader.querySelectorAll('#loader-shape > *')
  const panels = gsap.utils.toArray('.lp').reverse() // tinta primero, lima al final

  gsap.set(shapes, { autoAlpha: 0, transformOrigin: '50% 50%' })

  return new Promise((resolve) => {
    const state = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => loader.remove() })

    tl.to(state, {
      v: 100, duration: 1.7, ease: 'power2.inOut',
      onUpdate: () => { count.textContent = String(Math.round(state.v)).padStart(3, '0') },
    }, 0)

    shapes.forEach((s, i) => {
      tl.fromTo(s, { autoAlpha: 1, scale: 0.2, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, i * 0.55)
        .to(s, { autoAlpha: 0, scale: 1.6, duration: 0.12 }, i * 0.55 + 0.45)
    })

    tl.to(panels, { yPercent: -100, duration: 0.85, ease: 'expo.inOut', stagger: 0.12 })
      .call(resolve, null, '<+=0.35')
  })
}
