import path from "path";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../src/templates/');

export {
    getPlugins,
    getEntries
}

async function getEntries() {
    let entries = {};

    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            let fileCount = 0;
            for (const file of files) {
                if (!file.includes('.ejs')) {
                    fileCount++;
                    continue;
                }


                const match = file.match(/\[([^)]+)\](.+).ejs/);

                let filename = file.replace('.ejs', '');
                let folderName = '';
                if (match && match[1] && match[2]) {
                    filename = match[2];
                    folderName = match[1];
                }

                const entryName = folderName ? folderName : filename;

                entries = {
                    ...entries,
                    [entryName]: path.resolve(__dirname, `../src/ts/pages/${entryName}/${entryName}.ts`),
                }

                fileCount++;
            }

            if (fileCount >= files.length) {
                resolve(entries);
            } else {
                reject(`Error! Random value: ${fileCount}`);
            }
        });
    });
}

async function getPlugins() {
    const htmlWebpackPlugins = [];

    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            let fileCount = 0;
            for (const file of files) {
                if (!file.includes('.ejs')) {
                    fileCount++;
                    continue;
                }


                const match = file.match(/\[([^)]+)\](.+).ejs/);

                let filename = file.replace('.ejs', '');
                let folderName = '';
                if (match && match[1] && match[2]) {
                    filename = match[2];
                    folderName = match[1];
                }


                const htmlFileName = filename.toLowerCase();
                const entryHtmlFile = `${folderName ? (folderName + '/') : ''}${htmlFileName}.html`;
                console.log(`http://localhost:${process.env.port}/${entryHtmlFile}`)
                htmlWebpackPlugins.push(new HtmlWebpackPlugin({
                    filename: entryHtmlFile,
                    template: `!!ejs-compiled-loader!./src/templates/${folderName ? `[${folderName}]` : ''}${filename}.ejs`,
                    page: `${folderName ? `[${folderName}]` : ''}${filename}.ejs`,
                    chunks: [folderName ? folderName : filename],
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: false,
                        removeAttributeQuotes: true
                    },
                }));
                fileCount++;
            }

            if (fileCount >= files.length) {
                resolve(htmlWebpackPlugins);
            } else {
                reject(`Error! Random value: ${fileCount}`);
            }
        });
    });
}


