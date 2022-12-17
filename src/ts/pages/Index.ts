import app from "../Core/App";
import BasePage from "../Core/BasePage";

import '../../scss/pages/home.scss';


class HomePage extends BasePage {
    constructor() {
        super("Home Page");
    }

    static init = () => {
        const page = new HomePage();
        app.setPage(page);
        app.init();
    }

    run = () => {
        // all pages needs this method.
        console.log('Home page is running');
    }

}


HomePage.init();
