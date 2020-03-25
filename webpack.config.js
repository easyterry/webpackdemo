const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name]_[hash].[ext]',
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    stats: {
        children: false
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: "index.html"
        }),
        new miniCssExtractPlugin({
            chunkFilename: '[id].[hash].css',
            filename: '[name].[hash].css'
        }),
        new webpack.BannerPlugin('版权所有，翻版必究')
    ]
}