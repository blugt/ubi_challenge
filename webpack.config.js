const webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: ['./public/main.ts','./public/styles/main.scss'],
    output: {
        path: './dist',
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader!angular2-template-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                 test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                 loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader?name=./fonts/[name].[ext]"
            }, {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader?name=./fonts/[name].[ext]"
            }, 
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader?name=./fonts/[name].[ext]"
            }, {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader?name=./fonts/[name].[ext]"
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devtool: 'source-map'
}