import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../shared/routes';

export default () => (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const app = renderToString(<RouterContext { ...props } />);

      const head = Helmet.rewind();

      res.render('index', {
        app,
        title: head.title.toString(),
        assets: require('../assets.json')
      });

    } else {
      res.status(404).send('Not found');
    }
  });
};
