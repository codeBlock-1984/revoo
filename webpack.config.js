const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        library: 'UserReviewJSPlugin',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
