var webpack = require('webpack');
var { resolve } = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: [
        'es2015-webpack',
        'react'
      ],
      plugins: [
        'react-hot-loader/babel'
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
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
]

module.exports = () => {
  return {
    context: __dirname,
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/main'
    ],
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
