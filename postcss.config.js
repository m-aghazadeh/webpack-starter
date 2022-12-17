const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
    plugins: [
        'postcss-preset-env',
        autoprefixer,
        tailwindcss,
        ...(process.env.NODE_ENV === "production" ? [cssnano({
            preset: 'advanced',
        })] : []),
    ],
};