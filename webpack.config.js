var webpack = require('webpack');
var path = require('path');
var libraryName = 'library';

var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: 'wonderform.js',
        library: 'form',
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                },
                exclude: /(node_modules)/,
            }
        ]
    }
};

module.exports = config;
