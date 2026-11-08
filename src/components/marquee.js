import { stack } from '../data/stack.js'

export function renderMarquee(root) {
  const half = stack.map((s) => `<span>${s.name}</span>`).join('<i>✦</i>') + '<i>✦</i>'
  // Dos copias exactas: la animación recorre -50% y reinicia sin saltos
  root.innerHTML = `<div class="marquee-track" aria-hidden="true">${half}${half}</div>`
}
