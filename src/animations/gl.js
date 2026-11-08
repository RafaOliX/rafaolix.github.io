import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, MeshPhysicalMaterial,
  SphereGeometry, IcosahedronGeometry, OctahedronGeometry, TorusGeometry, PMREMGenerator,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { gsap, prefersReducedMotion } from './gsap.js'

const rnd = gsap.utils.random
const FOV = 40
const DIST = 14
const halfH = Math.tan(((FOV / 2) * Math.PI) / 180) * DIST

/** Objetos 3D brillantes flotando detrás del contenido (parallax con scroll y mouse). */
export function initGL() {
  const canvas = document.querySelector('#gl')
  if (!canvas) return

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  } catch {
    canvas.remove() // sin WebGL el sitio sigue funcionando
    return
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.z = DIST
  scene.environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture

  const mats = [
    new MeshPhysicalMaterial({ color: 0x5ef0ff, roughness: 0.05, transparent: true, opacity: 0.72, clearcoat: 1, clearcoatRoughness: 0, envMapIntensity: 1.4 }),
    new MeshPhysicalMaterial({ color: 0x7bd63a, roughness: 0.15, metalness: 0.1, clearcoat: 1, flatShading: true, envMapIntensity: 1.2 }),
    new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.6, clearcoat: 1, flatShading: true, envMapIntensity: 1.5 }),
  ]
  const geos = [
    new SphereGeometry(1, 48, 48),
    new IcosahedronGeometry(1, 0),
    new OctahedronGeometry(1, 0),
    new TorusGeometry(0.9, 0.32, 24, 48),
  ]

  const group = new Group()
  scene.add(group)
  const items = []
  const count = window.innerWidth < 700 ? 9 : 15

  for (let i = 0; i < count; i++) {
    const mesh = new Mesh(geos[i % geos.length], mats[i % mats.length])
    mesh.position.z = rnd(-3, 2)
    mesh.rotation.set(rnd(0, 3), rnd(0, 3), 0)
    mesh.userData = {
      nx: rnd(-1, 1), by: rnd(-20, 5), base: rnd(0.45, 1.2),
      phase: rnd(0, 6.28), speed: rnd(0.15, 0.5), fl: rnd(0.4, 0.9),
    }
    group.add(mesh)
    items.push(mesh)
  }

  const reduced = prefersReducedMotion()
  const render = () => renderer.render(scene, camera)

  const layout = () => {
    const w = window.innerWidth, h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const halfW = halfH * camera.aspect
    const k = Math.min(1, camera.aspect * 1.4)
    items.forEach((m) => {
      m.position.x = m.userData.nx * halfW * 0.95
      m.position.y = m.userData.by
      m.scale.setScalar(m.userData.base * k)
    })
    if (reduced) render()
  }
  layout()
  window.addEventListener('resize', layout)
  if (reduced) return

  let mx = 0, my = 0
  window.addEventListener('pointermove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * -2
  })

  gsap.to(group.position, {
    y: 20, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.8 },
  })

  gsap.ticker.add((time, deltaTime) => {
    if (document.hidden) return
    const dt = Math.min(deltaTime / 1000, 0.05)
    items.forEach((m) => {
      const u = m.userData
      m.position.y = u.by + Math.sin(time * u.fl + u.phase) * 0.5
      m.rotation.x += dt * u.speed
      m.rotation.y += dt * u.speed * 0.8
    })
    camera.position.x += (mx * 0.9 - camera.position.x) * 0.05
    camera.position.y += (my * 0.5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
    render()
  })
}
