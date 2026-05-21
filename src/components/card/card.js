// `site-card` - simple card wrapper using the project's `.card` CSS
class SiteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/global.css">
      <link rel="stylesheet" href="/src/components/card/card.css">
      <style>
        :host { display:block; }
        .card { padding: 1rem; border-radius:12px; }
        .card-title { font-weight:700; margin-bottom:0.5rem; }
        .card-body { margin-bottom:0.75rem; }
        .card-footer { font-size:0.9rem; color:var(--muted, #666); }
      </style>
      <article class="card">
        ${title ? `<div class="card-title">${title}</div>` : ''}
        <div class="card-body"><slot></slot></div>
        <div class="card-footer"><slot name="footer"></slot></div>
      </article>
    `;
  }
}

customElements.define('site-card', SiteCard);

export default SiteCard;
