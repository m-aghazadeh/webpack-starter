const common = require('./webpack.common');
const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: "js/[name].min.js",
        // publicPath: `/wp-content/themes/${process.env.THEME_DIR_NAME}/app/dist/`
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
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
