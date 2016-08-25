// eslint-disable no-console
import express from 'express';
import path from 'path';

import chalk from 'chalk';

// middlewares
import compression from 'compression';

// custom middlewares
import reactRouter from './server/middleware/reactRouter';

const app = express();

const env = process.env.NODE_ENV || 'development';

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './server/views'));
app.use(compression());

app.use('/static', express.static(`${__dirname}/build`));

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev')();
  const compiler = webpack(config);

  const devMiddleware = (require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));

  app.use(devMiddleware);
}

app.use(reactRouter());

app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.bold.green(`El servidor escucha en el puerto ${process.env.PORT || 3000}`));
});
