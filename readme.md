# Iranmehr front-end

## Setup

Download [Node.js](https://nodejs.org/en/download/). Run this followed commands:

``` bash
# Install dependencies (only the first time)
yarn install

# Copy .env-example to .env in the root folder 
sudo cp .env-example .env
# File .env
# THEME_DIR_NAME = set this by the wordpress theme directory (it should be parent of this directory)

# Run the local server at localhost:3000
yarn run dev

# Build for production in the dist/ directory
yarn run build

# Build for development in the dist/ directory
yarn run bulid:dev

# Build for development compatible with WordPress theme in the dist/ directory
yarn run wp-dev

# Build for production compatible with WordPress theme in the dist/ directory
yarn run wp-prod
```

Assets bundler : [webpack](https://webpack.js.org/)

Css freamwork : [tailwind](https://tailwindcss.com/)


## Folder structure

Project files

    src/
        assets/
            fonts/
                iransans/
                    iransans-bold.ttf
                    iransans-bold.woff
                    iransans-light.ttf
                    iransans-light.woff and other fonts
            icons/
                svg icons goes here
            img/
                images goes here
        scss/
            components/
            pages/
        ts/
        types/
        index.html
        sample-page.html
    webpack/
    .env
    .env-example
    .gitignore
    package.json
    readme.md
    tailwind.config.js
    tsconfig.json
    tslint.json