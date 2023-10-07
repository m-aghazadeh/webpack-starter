import AralanSelect from "../libraries/aralan-select";
import Ripple from '../Components/Ripple';

export default abstract class BasePage {
    name: string;
    ver: number;

    constructor(name: string, ver = 1.00) {
        this.name = name;
        this.ver = ver;

        // @ts-ignore
        window.$ = jQuery.noConflict();
        window.addEventListener('load', function () {
            // @ts-ignore
            window.$ = jQuery.noConflict();
        });

        console.log(`platform ${this.constructor?.name || ''} page loaded...`);


        window.addEventListener('load', () => {
            const aralanSelect = new AralanSelect();
            const ripple = new Ripple();

        });
    }


    abstract run(): void;
}