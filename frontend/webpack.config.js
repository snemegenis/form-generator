const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const development = require('./development.config.js');
const production = require('./production.config.js');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(SRC_DIR, 'app');
var CMP_DIR = path.resolve(SRC_DIR, 'component');

// Loading user configuration.
let nconf = require('nconf');
if (process.env.NODE_ENV == 'prod') {
  nconf.file('./src/config/prodConfig.json');
}
nconf.file('./src/config/devConfig.json');
nconf.file('./src/config/commonConfig.json');
let appConfig = nconf.get();

var CSSLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]__[hash:base64:5]'
].join('&');

var common = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      },
      {
        test: /main\.css$/,
        loaders: ['style', 'css-loader?minimize=true'],
      },
      {
        test: /\.css$/,
        loaders: ['style', CSSLoader],
        exclude: /main\.css$/
      },
      {
        test: /\.scss$/,
        loaders: ['style', CSSLoader, 'sass']
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(SRC_DIR, 'index.html')
    }),
    new ExtendedDefinePlugin({
      APP_CONFIG: appConfig
    })
  ]
};

var config;

switch (process.env.NODE_ENV) {
  case 'prod':
    console.log('production');
    config = merge(common,
      production.babel({
        include: [APP_DIR, CMP_DIR],
        exclude: /node_modules/
      }));
    break;
  default:
    console.log('development');
    config = merge(common,
      development.babel({
        include: [SRC_DIR],
        exclude: /node_modules/
      }),
      development.devServer({
        host: process.env.HOST,
        port: 8081
      }),
      development.sourcemap());
}

module.exports = config;