const webpack = require('webpack');

module.exports = {

    entry: './public/main.ts',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
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
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devtool: 'source-map'
}