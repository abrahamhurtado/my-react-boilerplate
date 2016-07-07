import React from 'react';
import { readFileSync } from 'fs';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../shared/routes';

export default (isDev, filename, webpackFileSystem) => (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const app = renderToString(<RouterContext { ...props } />);

      try {
        if (isDev) {
          res.send(webpackFileSystem.readFileSync(filename).toString().replace('{{APP}}', app));
        } else {
          res.send(readFileSync(filename).toString().replace('{{APP}}', app));
        }
      } catch (e) {
        res.send('An error has happened, maybe it is because the index.html has not been created.');
      }

    } else {
      res.status(404).send('Not found');
    }
  });
};
