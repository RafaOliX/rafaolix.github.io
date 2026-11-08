import './styles/main.css'

import { renderSocials } from './components/socials.js'
import { renderCertifications } from './components/certifications.js'
import { renderExperience } from './components/experience.js'
import { renderProjects } from './components/projects.js'
import { renderStack } from './components/stack.js'
import { renderMarquee } from './components/marquee.js'

import { ScrollTrigger } from './animations/gsap.js'
import { playLoader } from './animations/loader.js'
import { prepHero, playHero } from './animations/hero.js'
import { initTunnel } from './animations/tunnel.js'
import { initShapes, initBands, initRail } from './animations/shapes.js'
import { initScroll } from './animations/scroll.js'
import { initMarquee } from './animations/marquee.js'

const $ = (sel) => document.querySelector(sel)
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  // 1) Contenido (antes de animar)
  renderSocials($('#socials'))
  renderCertifications($('#certs'))
  renderExperience($('#exp'))
  renderProjects($('#projects'))
  renderStack($('#stack-grid'))
  renderMarquee($('#marquee'))
  $('#year').textContent = new Date().getFullYear()

  // 2) Esperar fuentes (SplitText necesita medirlas), con tope de 1.5 s
  await Promise.race([document.fonts.ready, wait(1500)])

  // 3) Escena viva + loader
  prepHero()
  initShapes()
  initBands()
  initTunnel()
  initRail()
  await playLoader()

  // 4) Entrada del hero y animaciones de scroll
  playHero()
  initScroll()
  initMarquee()

  // Fuentes e imágenes lazy cambian el alto de la página: recalcular posiciones
  document.fonts.ready.then(() => ScrollTrigger.refresh())
  if (document.readyState === 'complete') ScrollTrigger.refresh()
  else window.addEventListener('load', () => ScrollTrigger.refresh())
}

main()
