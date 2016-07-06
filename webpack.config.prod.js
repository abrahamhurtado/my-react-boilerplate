var webpack = require('webpack');
var { resolve } = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
  {
    test: /\.jsx$/,
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
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  }
]

var plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    sourceMap: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
]

module.exports = () => {
  return {
    context: __dirname,
    entry: './index',
    devtool: 'hidden-source-map',
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
    postcss: [ autoprefixer({browsers: 'last 2 versions'}) ]
  }
}