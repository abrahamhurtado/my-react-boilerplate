var webpack = require('webpack');
var { resolve } = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    babelrc: false,
    query: {
      presets: [
        'es2015-webpack',
        'react'
      ]
    }
  }, {
    test: /\.css$/,
    loaders: [
      'style-loader',
      {
        loader: 'css-loader',
        query: {
          modules: true,
          importLoaders: '1',
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss-loader'
    ]
  }
];

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new AssetsPlugin({
    filename: 'assets.json',
    path: resolve(__dirname, 'server'),
    prettyPrint: true,
    update: true
  })
];

module.exports = () => {
  return {
    context: __dirname,
    entry: {
      app: './client/main'
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'build'),
      publicPath: '/static/'
    },
    resolve: {
      extensions: [ '', '.js', '.jsx', '.css' ]
    },
    module: {
      loaders
    },
    plugins,
    postcss: () => [ autoprefixer({ browsers: 'last 2 versions' }) ]
  };
};
