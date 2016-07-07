import React from 'react';
import App from './components/App';
import Index from './components/random/indexRouteComponent';
import Children from './components/random/childrenRouteComponent';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Index
  },
  childRoutes: [
    { path: '/children', component: Children }
  ]
};
