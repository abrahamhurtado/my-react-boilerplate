import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Header from './module1';

var app = document.querySelector('#react-app');

render(
  <AppContainer>
    <Header />
  </AppContainer>
,app);

if (module.hot) {
  module.hot.accept('./module1.js', () => {
    render(
      <AppContainer>
        <Header />
      </AppContainer>
    ,app);
  })
}
