import { gsap, prefersReducedMotion } from './gsap.js'

const rnd = gsap.utils.random

/** Nubes a la deriva + parallax de nubes y sol con el scroll. */
export function initSky() {
  const wrap = document.querySelector('#clouds')
  if (!wrap) return
  const reduced = prefersReducedMotion()

  for (let i = 0; i < 8; i++) {
    const cloud = document.createElement('div')
    cloud.className = 'cloud'
    Object.assign(cloud.style, {
      width: `${rnd(18, 38)}vw`, height: `${rnd(5, 9)}vw`,
      left: `${rnd(-10, 90)}%`, top: `${rnd(0, 160)}vh`,
    })
    wrap.appendChild(cloud)
    if (reduced) continue

    gsap.to(cloud, { x: rnd(-80, 80), duration: rnd(14, 30), ease: 'sine.inOut', repeat: -1, yoyo: true })
    gsap.to(cloud, {
      y: -rnd(300, 900), ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
  }

  if (!reduced) {
    gsap.to('.sun', {
      yPercent: 25, scale: 1.25, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
  }
}
