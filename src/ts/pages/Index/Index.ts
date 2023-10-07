import app from "../../Core/App";
import BasePage from "../../Core/BasePage";

import './home.scss';

class HomePage extends BasePage {
    constructor() {
        super("Home Page");
    }

    static init = () => {
        const page = new HomePage();
        app.setPage(page);
        app.init();
    };

    run = async () => {
    };


    // <editor-fold>
}


HomePage.init();
