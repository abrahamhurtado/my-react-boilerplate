import express from 'express';
import path from 'path';

// middlewares
import compression from 'compression';

// custom middlewares
import reactRouter from './server/middleware/reactRouter';

const app = express();

const env = process.env.NODE_ENV || 'development';

app.use(compression())

app.use('/static', express.static(__dirname + '/build'));

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev')();
  const compiler = webpack(config);

  const devMiddleware = (require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));

  app.use(devMiddleware);

  app.use(require('webpack-hot-middleware')(compiler))

  app.use(reactRouter(true, path.join(compiler.outputPath, 'index.html'), compiler.outputFileSystem))
} else {
  app.use(reactRouter(false, path.resolve('./build/index.html')))
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`El servidor escucha en el puerto ${process.env.PORT || 3000}`);
});
