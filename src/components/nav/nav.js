// `site-nav` - lightweight web component that applies the `.nav-blur` styles
class SiteNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onHashChange = this._onHashChange.bind(this);
  }

  connectedCallback() {
    this.render();
    // wait for slot content to render, then wire up active link handling
    requestAnimationFrame(() => this._setupLinks());
    window.addEventListener('hashchange', this._onHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHashChange);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/global.css">
        <link rel="stylesheet" href="/src/components/nav/nav.css">
      <header class="nav-blur">
        <div class="brand"><slot name="brand">Austin Hardaway</slot></div>
        <nav><slot name="links"></slot></nav>
      </header>
    `;
  }

  _setupLinks() {
    const slot = this.shadowRoot.querySelector('slot[name="links"]');
    if (!slot) return;
    // Get the slotted nodes and filter anchors
    const slotted = slot.assignedElements({ flatten: true });
    this._links = slotted.filter(el => el.tagName && el.tagName.toLowerCase() === 'a');
    this._links.forEach(a => {
      // Add accessible attributes
      a.setAttribute('role', 'link');
      a.addEventListener('click', () => this._updateActive());
      a.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') a.click();
      });
    });
    this._updateActive();
  }

  _onHashChange() {
    this._updateActive();
  }

  _updateActive() {
    if (!this._links) return;
    const current = location.hash || '#/';
    this._links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const isActive = href === current || (href === '#/' && current === '#/');
      if (isActive) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  }
}

customElements.define('site-nav', SiteNav);

export default SiteNav;
