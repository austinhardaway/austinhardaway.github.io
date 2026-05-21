// Very small hash-based router

let _onRoute = null;

export function startRouter(onRoute) {
  _onRoute = onRoute;
  window.addEventListener('hashchange', _handleHashChange);
  // Trigger initial route
  _handleHashChange();
}

export function navigate(path) {
  if (!path.startsWith('/')) path = '/' + path;
  location.hash = path;
}

function _handleHashChange() {
  const hash = location.hash.replace('#', '') || '/';
  if (typeof _onRoute === 'function') {
    _onRoute(hash);
  }
}

export default { startRouter, navigate };
