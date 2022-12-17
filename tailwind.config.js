const plugin = require('tailwindcss/plugin')
let remSizes = {};
for (let i = 1; i <= 96; i += 0.5) {
    remSizes[i] = i / 4 + 'rem'
}

const spacing = {
    '1/10': '10%',
    '2/10': '20%',
    '3/10': '30%',
    '4/10': '40%',
    '5/10': '50%',
    '6/10': '60%',
    '7/10': '70%',
    '8/10': '80%',
    '9/10': '90%',

    '1/8': 100 / 8 + '%',
    '2/8': 200 / 8 + '%',
    '3/8': 300 / 8 + '%',
    '4/8': 400 / 8 + '%',
    '5/8': 500 / 8 + '%',
    '6/8': 600 / 8 + '%',
    '7/8': 700 / 8 + '%',

    '1/9': 100 / 9 + '%',
    '2/9': 200 / 9 + '%',
    '3/9': 300 / 9 + '%',
    '4/9': 400 / 9 + '%',
    '5/9': 500 / 9 + '%',
    '6/9': 600 / 9 + '%',
    '7/9': 700 / 9 + '%',
    '8/9': 800 / 9 + '%',
};

module.exports = {
    mode: 'jit',
    content: [
        './src/*.html',
        './src/js/**/*.js',
        './src/js/**/*.ts',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'sans': ['noora-fn'],
                // 'sans-fat': ['Yekan Bakh Fat'],
            },
            screens: {
                '3xl': '1700'
            },
            colors: {
                gray: {
                    light: '#F8F9FB',
                },
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    45: 'var(--color-primary-45)',
                    50: 'var(--color-primary-50)',
                    75: 'var(--color-primary-75)',
                    76: 'var(--color-primary-76)',
                    80: 'var(--color-primary-80)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                },
                sec: {
                    DEFAULT: 'var(--color-sec)',
                    100: 'var(--color-sec-100)',
                    200: 'var(--color-sec-200)',
                    300: 'var(--color-sec-300)',
                    400: 'var(--color-sec-400)',
                    500: 'var(--color-sec-500)',
                    600: 'var(--color-sec-600)',
                    700: 'var(--color-sec-700)',
                    800: 'var(--color-sec-800)',
                    900: 'var(--color-sec-900)',
                    1000: 'var(--color-sec-1000)',
                },
                nat: {
                    DEFAULT: 'var(--color-nat)',
                    50: 'var(--color-nat-50)',
                    100: 'var(--color-nat-100)',
                    200: 'var(--color-nat-200)',
                    300: 'var(--color-nat-300)',
                    400: 'var(--color-nat-400)',
                    500: 'var(--color-nat-500)',
                    600: 'var(--color-nat-600)',
                    700: 'var(--color-nat-700)',
                    800: 'var(--color-nat-800)',
                    850: 'var(--color-nat-850)',
                    900: 'var(--color-nat-900)',
                },
                orange: {
                    100: '#fffaf0',
                    200: '#feebc8',
                    300: '#fbd38d',
                    400: '#f6ad55',
                    500: '#ed8936',
                    600: '#dd6b20',
                    700: '#c05621',
                    800: '#9c4221',
                    900: '#7b341e'
                },

            },
            boxShadow: {
                'light-20': '0 50px 87px rgba(0,0,0,.03)',
                'light-25': '0 50px 87px rgba(0,0,0,.04)',
                'light-50': '0 1rem 4rem rgba(0,0,0,.06)',
                'light-100': '0 50px 138px rgba(0,0,0,.06)',
                'light-120': '0 16px 63px rgba(0,0,0,.06)',
                'primary-150': '0px 8px 13px rgba(40, 43, 133, 0.15)',
                'primary-200': '0 26px 38px rgba(40,43,133,0.17)',
            },
            minWidth: {
                12: '3rem',
                16: '4rem',
                '4/5': 4 / 5 + '%',
                ...remSizes,
                ...spacing
            },
            maxWidth: {
                12: '3rem',
                16: '4rem',
                ...remSizes,
                ...spacing
            },
            width: {
                '11.4/12': '95%',
                '2.58/12': '21.5%',
                '5.25/12': '44%',
                '2.46/12': '20.5%',
            },
            height: {
                'max': 'max-content'
            },
            spacing: {
                ...spacing,
                ...remSizes,
            },
            fontSize: {
                base: ['1rem', '2rem'],
                sm: ['0.875rem', '27.3px'],
                '2xs': ['.5rem', {}],
                '1xl': ['1.375rem', '2.68rem'],
                ...remSizes
            },
            lineHeight: {
                ...remSizes
            },
            opacity: {
                'unset': 'unset'
            },
            zIndex: {
                '-10': '-10'
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
                ...remSizes
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.625rem',
                lg: 0
            },
            screens: {
                '2xl': '1400px',
                '3xl': '1600px'
            },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({addUtilities, config}) {
            const gradient = {
                '.gradinet-primary': {
                    background: 'linear-gradient(269.74deg, var(--color-primary) 1.5%, #282B85 1.51%, #8AC65E 106.05%)',
                },
                '.gradient-soft': {
                    background: 'linear-gradient(179.69deg, #79B2A5 -56.44%, #1C4B93 78.97%)',
                },
            }
            const squars = {};
            const sizes = config().theme.width;
            // tslint:disable-next-line:forin
            for (let size in sizes) {
                size = size.toString().replace('/', '\\/');
                size = size.toString().replace('.', '\\.');
                squars['.square-' + size] = {
                    width: sizes[size],
                    position: 'relative',
                    'padding-bottom': '100%',
                    '>*': {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }
                }
            }
            const newUtilities = {
                '.text-gradient': {
                    color: '#0000',
                    backgroundClip: 'text'
                },
                ...gradient,
                ...squars
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        })
    ]
};