import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import routes from '../shared/routes';

const rootElement = document.querySelector('#react-app');

match({ routes, history: browserHistory }, (err, redirect, props) => {
  render(
    <Router
      history={ browserHistory }
      routes={ routes }
    />
  , rootElement);
});
