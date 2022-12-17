const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMessages = require('webpack-messages');

require('dotenv').config();

module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/ts/pages/Index.ts'),
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    },
    stats: 'errors-only',
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
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
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
        //home is home.html in /src folder and index is index entry in this webpack config.
        hthmlWebpackPlugin('home', ['index']),
        require('autoprefixer'),
        new WebpackMessages({
            name: 'client',
            logger: str => {
                console.log(str);
            }
        }),
    ],
};

function hthmlWebpackPlugin(fileName, chunks) {
    return new HtmlWebpackPlugin({
        filename: `${fileName}.html`,
        template: `./src/${fileName}.html`,
        chunks,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: false,
            removeAttributeQuotes: true
        },
    })
}