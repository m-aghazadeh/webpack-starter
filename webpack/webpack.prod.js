const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require("path");
module.exports = merge(common, {
    mode: 'production',
    entry: {
        'jquery': '/node_modules/jquery',
    },
    output: {
        filename: "js/[name].[hash].min.js",
        publicPath: path.join(__dirname, '../dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].min.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })

    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                    mangle: true,
                },
            }),
        ],
    },
})