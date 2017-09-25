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
var CSS_DIR = path.resolve(SRC_DIR, 'style');
var CMP_DIR = path.resolve(SRC_DIR, 'component');

// Loading user configuration.
let nconf = require('nconf');
if (process.env.NODE_ENV == 'prod') {
    nconf.file('./src/config/prodConfig.json');
}
nconf.file('./src/config/devConfig.json');
nconf.file('./src/config/commonConfig.json');
let appConfig = nconf.get();

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
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: CSS_DIR
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