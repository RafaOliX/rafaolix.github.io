import { stack } from '../data/stack.js'

const base = import.meta.env.BASE_URL

const logo = ({ icon, logo }) => icon
  ? `<svg class="stack-logo" aria-hidden="true"><use href="${base}assets/sprite.svg#${icon}" /></svg>`
  : `<img class="stack-logo" src="${base}assets/logos/${logo}" alt="" loading="lazy" />`

export function renderStack(root) {
  root.innerHTML = stack.map((item) => `
    <div class="card" style="--accent:${item.color}">
      <span class="w-fit border px-2 py-0.5 text-[10px] uppercase" style="border-color:var(--accent)">${item.tag}</span>
      <span class="font-display text-xl mt-auto relative z-10">${item.name}</span>
      ${logo(item)}
    </div>`).join('')
}
