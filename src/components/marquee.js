import { stack } from '../data/stack.js'

const MARKS = ['●', '■', '▲']

export function renderMarquee(root) {
  const half = stack.map((s, i) => `<span>${s.name}</span><i>${MARKS[i % 3]}</i>`).join('')
  // Dos copias exactas: la animación recorre -50% y reinicia sin saltos
  root.innerHTML = `<div class="marquee-track" aria-hidden="true">${half}${half}</div>`
}
