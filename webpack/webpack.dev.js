import path from "path";
import webpack from 'webpack';
import common from './webpack.common.js';
import {merge} from 'webpack-merge';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
console.log(path.join(__dirname, "../"))
export default merge(common, {
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
            },
            {
                directory: path.join(__dirname, "../")
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
