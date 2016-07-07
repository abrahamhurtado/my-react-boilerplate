import express from 'express';
import path from 'path';

const app = express();

const env = process.env.NODE_ENV || 'development';

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

  app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

}

app.use('/static', express.static('./build'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`El servidor escucha en el puerto ${process.env.PORT || 3000}`);
});
