import { gsap } from 'gsap'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function runLoader() {
  const loader = document.getElementById('loader')
  const counter = document.getElementById('loader-count')

  return new Promise((resolve) => {
    if (reduced) {
      loader.remove()
      return resolve()
    }

    const state = { n: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        loader.remove()
        resolve()
      },
    })

    tl.from('.loader-bar', {
      scaleX: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      stagger: 0.12,
    })
      .to(
        state,
        {
          n: 100,
          duration: 1.2,
          ease: 'steps(20)',
          onUpdate: () => (counter.textContent = Math.round(state.n)),
        },
        0
      )
      .to('.loader-bar', {
        xPercent: (i) => (i % 2 ? 100 : -100),
        duration: 0.7,
        ease: 'expo.inOut',
        stagger: 0.08,
      })
      .from(
        '[data-hero-line]',
        { y: 60, opacity: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1 },
        '-=0.3'
      )
  })
}
