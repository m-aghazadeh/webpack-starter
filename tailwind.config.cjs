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
        './src/templates/*.ejs',
        './src/templates/partials/*.ejs',
    ],
    theme: {
        extend: {
            fontFamily: {
                'yekanbakh': ['Yekan Bakh'],
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
                    DEFAULT: '#5F325D',
                    light: '#FEFDFE',
                    50: '#EEE9EE',
                    100: '#DED4DE',
                    150: '#CEC0CE',
                    200: '#BEACBE',
                    300: '#9F839D',
                    400: '#7F5B7D',
                    500: '#5F325D',
                    600: '#4C284A',
                    700: '#391E38',
                    750: '#30042E',
                    800: '#261425',
                    850: '#1D0F1C',
                    900: '#130A13',
                    950: '#0A0509',
                },
                fuchsia: {
                    800: '#94078D'
                },
                'neutral': {
                    DEFAULT: '#808080',
                    50: '#F3F3F3',
                    100: '#C8C8C8',
                    150: '#D9D9D9',
                    200: '#ADADAD',
                    300: '#B3B3B3',
                    400: '#9A9A9A',
                    450: '#989898',
                    500: '#808080',
                    600: '#646464',
                    700: '#484848',
                    750: '#3A3A3A',
                    800: '#2C2C2C',
                    850: '#1E1E1E',
                    900: '#101010',
                },
                sec: {
                    DEFAULT: '#FFC800',
                    50: '#FFFAE6',
                    100: '#FFF4CC',
                    150: '#FFEFB3',
                    200: '#FFE999',
                    300: '#FFDE66',
                    400: '#FFD333',
                    500: '#FFC800',
                    600: '#CCA000',
                    700: '#997800',
                    800: '#665000',
                    850: '#4D3C00',
                    900: '#332800',
                    950: '#1A1400',
                },
            },
            boxShadow: {
                'neu-400': '0px 54px 64px -13px rgba(0, 0, 0, 0.30)',
            },
            minWidth: {
                12: '3rem',
                16: '4rem',
                '4/5': ((100 * 4) / 5) + '%',
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
                DEFAULT: '1.25rem',
                lg: 0
            },
            screens: {
                '2xl': '80.75rem',
                '3xl': '1300px'
            },
        }
    },
    variants: {
        extend: {},
    },
};