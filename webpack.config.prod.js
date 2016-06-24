const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: './src/index.js',

  output: {
    path: './dist',
    filename: 'bundle.min.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compressor: {
        warnings: false,
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },

};
