const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1500,
        poll: false,
    },

    output: {
        filename: "js/[name].min.js",
        // publicPath: `/wp-content/themes/${process.env.THEME_DIR_NAME}/app/dist/`
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
    ],
})
