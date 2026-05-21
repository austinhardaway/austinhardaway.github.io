// Minimal Web Component App and bootstrap helper
import { startRouter, navigate } from './router.js';
// register app-button component so it can be used in templates
import './components/button/button.js';
// site-level components
import './components/nav/nav.js';
import './components/card/card.js';
import './pages/home/home.js';

class MyApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
    // Start router when component is attached
    startRouter(this.handleRoute.bind(this));
  }

  handleRoute(route) {
    this.current = route;
    this.render();
  }

  render() {
    const route = this.current || location.hash.replace('#', '') || '/';
    this.container.innerHTML = `
      <style>
        :host { display:block; font-family: system-ui, sans-serif; padding: 16px; }
        nav a { margin-right: 8px; }
      </style>
      <site-nav>
        <span slot="brand">Austin Hardaway</span>
        <a slot="links" href="#/">Home</a>
        <a slot="links" href="#/about">About</a>
        <a slot="links" href="#/contact">Contact</a>
      </site-nav>
      <main>
        ${this.renderRoute(route)}
      </main>
    `;
  }

  renderRoute(route) {
    switch (route) {
      case '/about':
        return `<h1>About</h1><p>This is a minimal web component app.</p>`;
      case '/contact':
        return `<h1>Contact</h1><p>Reach out at <a href="mailto:you@example.com">you@example.com</a></p>`;
      case '/':
      default:
        return `<home-page></home-page>`;
    }
  }
}

customElements.define('my-app', MyApp);

// Helper to initialize app into a container
export function initApp(container) {
  if (!container) throw new Error('Missing container element to mount App');
  const app = document.createElement('my-app');
  container.appendChild(app);
}

export { navigate };
