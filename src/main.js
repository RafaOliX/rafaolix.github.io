import './styles/main.css'

import { renderSocials } from './components/socials.js'
import { renderCertifications } from './components/certifications.js'
import { renderExperience } from './components/experience.js'
import { renderProjects } from './components/projects.js'
import { renderStack } from './components/stack.js'
import { renderMarquee } from './components/marquee.js'

import { ScrollTrigger } from './animations/gsap.js'
import { playLoader } from './animations/loader.js'
import { playHero } from './animations/hero.js'
import { textToAscii, decodeIn, initWave } from './animations/ascii.js'
import { initSky } from './animations/sky.js'
import { initGL } from './animations/gl.js'
import { initScroll } from './animations/scroll.js'
import { initMarquee } from './animations/marquee.js'

const $ = (sel) => document.querySelector(sel)

async function main() {
  // 1) Contenido (antes de animar)
  renderSocials($('#socials'))
  renderCertifications($('#certs'))
  renderExperience($('#exp'))
  renderProjects($('#projects'))
  renderStack($('#stack-grid'))
  renderMarquee($('#marquee'))
  $('#year').textContent = new Date().getFullYear()

  // 2) Fondo vivo
  initSky()
  initGL()
  initWave($('#ascii-wave'))

  // 3) Loader + ASCII en paralelo (reservamos el espacio del título para evitar saltos)
  const loading = playLoader()
  const art = await textToAscii('RAFAOLIX')
  const title = $('#ascii-title')
  title.textContent = art.replace(/\S/g, ' ')
  await loading

  // 4) Entrada del hero y animaciones de scroll
  playHero()
  decodeIn(title, art)
  initScroll()
  initMarquee()

  // Las imágenes lazy cambian el alto de la página: recalcular posiciones
  if (document.readyState === 'complete') ScrollTrigger.refresh()
  else window.addEventListener('load', () => ScrollTrigger.refresh())
}

main()
