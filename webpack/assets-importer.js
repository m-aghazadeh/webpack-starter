import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = fs.readdirSync(path.join(__dirname, '../src/assets/img/'));

const newFIles = files.map(file => `import '../assets/img/${file}';`);

const makeAssetsImportFile = async () => {
    await fs.writeFileSync(path.join(__dirname, '../src/ts/assets.js'), newFIles.join('\n'), {
        encoding: 'utf8',
        flag: 'w'
    });
    console.log('assets has been imported!\n');
}
await makeAssetsImportFile();