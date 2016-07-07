import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from '../shared/routes';

const location = document.location.pathname + document.location.search;
const app = document.querySelector('#react-app');

match({ routes, location }, (err, redirect, props) => {
  render(
    <AppContainer>
      <Router
        history={ browserHistory }
        routes={ routes }
      />
    </AppContainer>
  , app);
});

if (module.hot) {
  module.hot.accept('../shared/components/App', () => {
    match({ routes, location }, (err, redirect, props) => {
      render(
        <AppContainer>
          <Router
            history={ browserHistory }
            routes={ routes }
          />
        </AppContainer>
      , app);
    });
  });
}
