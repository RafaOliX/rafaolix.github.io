import './styles/main.css'

import { renderSocials } from './components/socials.js'
import { renderCertifications } from './components/certifications.js'
import { renderStack } from './components/stack.js'

import { playLoader } from './animations/loader.js'
import { playHero } from './animations/hero.js'
import { initGlitch } from './animations/glitch.js'
import { initRects } from './animations/rects.js'
import { initScroll } from './animations/scroll.js'

async function main() {
  // 1) Render del contenido (antes de animar)
  renderSocials(document.querySelector('#socials'))
  renderCertifications(document.querySelector('#certs'))
  renderStack(document.querySelector('#stack-grid'))
  document.querySelector('#year').textContent = new Date().getFullYear()

  // 2) Fondo + loader
  initRects()
  await playLoader()

  // 3) Entrada del hero + efectos persistentes
  playHero()
  initGlitch()
  initScroll()
}

main()
