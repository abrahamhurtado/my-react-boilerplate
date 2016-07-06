var webpack = require('webpack');
var { resolve } = require('path');
var autoprefixer = require('autoprefixer');

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
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
]

var plugins = [

]

module.exports = () => {
  return {
    context: __dirname,
    entry: './index',
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'build'),
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },
    module: {
      loaders: loaders
    },
    plugins: plugins,
    postcss: () => [ autoprefixer({browsers: 'last 2 versions'}) ]
  }
}
