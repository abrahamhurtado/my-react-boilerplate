import React from 'react';
import App from './components/App';
import Index from './components/random/indexRouteComponent';
// import Children from './components/random/childrenRouteComponent';s

function loadRoute (cb) {
  return (module) => cb(null, module.default);
}

function errorLoading (err) {
  console.error('Dynamic page loading failed', err);
}

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Index
  },
  childRoutes: [
    { path: '/children', getComponent (location, cb) {
      System.import('./components/random/childrenRouteComponent')
        .then(loadRoute(cb))
        .catch(errorLoading);
    } }
  ]
};
