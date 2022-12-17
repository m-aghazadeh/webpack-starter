const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PORT = process.env.PORT;
module.exports = merge(common, {
    mode: 'development',
    entry: {
        'jquery': '/node_modules/jquery',
    },
    output: {
        filename: "js/[name].[hash].min.js",
        clean: true,
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, "../dist")
            },
            {
                directory: path.join(__dirname, "../src")
            }
        ],
        compress: false,
        port: PORT,
        liveReload: true,
        open: true,
        https: false,
        hot: 'only',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].min.css'
        }),
    ],
})
