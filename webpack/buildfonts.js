import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import svgtofont from 'svgtofont'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildfonts = async () => {

    await svgtofont({
        src: path.resolve(process.cwd(), "src/assets/icons"), // svg path
        dist: path.resolve(process.cwd(), "src/assets/fonts/pg-icons"), // output path
        useNameAsUnicode: false,
        fontName: "pg", // font name
        css: {
            output: 'src/scss',
            cssPath: '/src/assets/fonts/pg-icons/',
            include: 'scss',
            fileName: 'font-icon',
            fontSize: '1.2rem',
        },
        // Create CSS files.
        generateCss: true,
        emptyDist: true,
        startUnicode: 0xea01, // unicode start number
        svgicons2svgfont: {
            fontHeight: 1000,
            normalize: false
        },
    }).then(async () => {
        const fileContent = (await fs.promises.readFile(path.resolve(process.cwd(), "src/scss/font-icon.scss"))).toString();

        const regex = /\$pg-(.*):\s*"\\(.*)";/g;
        let variables = '';
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
            variables += `$${match[1]}: "\\${match[2]}";\n`;
        }

        try {
            const fileName = "src/scss/fonticon-variables.scss";
            await fs.promises.writeFile(fileName, variables);
        } catch (err) {
            console.error(err);
        }

        console.log('font icons are ready!\n');
    });
}
await buildfonts();