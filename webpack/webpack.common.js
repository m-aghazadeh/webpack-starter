import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMessages from 'webpack-messages';
import {configDotenv} from "dotenv";
import autoprefixer from 'autoprefixer';
import {getEntries, getPlugins} from './entries.js'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv()

const plugins = await getPlugins();
const entries = await getEntries();
console.log(plugins)
export default {
    entry: {...entries},
    output: {
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    },
    stats: {
        children: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, '../src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
            {test: /\.ejs$/, loader: 'ejs-loader'},
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
                generator: {
                    filename: './img/[name][ext]',
                },

            },
        ],
    },
    plugins: [
        autoprefixer,
        new WebpackMessages({
            name: 'client',
            logger: str => {
                console.log(str);
            }
        }),

        ...plugins
        // ...plugins
        // getPlugins().map((item) => {
        //     return new HtmlWebpackPlugin(item)
        // })
    ],
};