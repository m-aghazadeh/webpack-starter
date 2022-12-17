const svgtofont = require("svgtofont");
const path = require("path");

const buildfonts = async () => {

    await svgtofont({
        src: path.resolve(process.cwd(), "src/assets/icons"), // svg path
        dist: path.resolve(process.cwd(), "src/assets/fonts/pg-icons"), // output path
        fontName: "pg", // font name
        css: {
            output: 'src/scss',
            cssPath: '/src/assets/fonts/pg-icons/',
            include: 'scss',
            fileName: 'font-icon',
            fontSize: '1.2rem',
        }
        , // Create CSS files.
        emptyDist: true,
        startUnicode: 0xea01, // unicode start number
        svgicons2svgfont: {
            fontHeight: 1000,
            normalize: false
        },
    }).then(() => {
        console.log('font icons are ready!\n');
    });
}
buildfonts();