import './styles/main.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { runLoader } from './js/loader.js'
import { initGlitch } from './js/glitch.js'
import { initScroll } from './js/scroll.js'

gsap.registerPlugin(ScrollTrigger)

async function boot() {
  await runLoader()
  initGlitch()
  initScroll()
}

boot()
