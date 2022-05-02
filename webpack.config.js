const path = require('path');

module.exports = {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/app.js'],

  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/preset-react'],
                    
                }
            }
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.py$/, 
            use: 'raw-loader'
        }]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public/'),
        },
        port: 3000,
        devMiddleware: {
            publicPath: "https://localhost:3000/scripts/"
        }
    },
    devtool: 'source-map'    
};