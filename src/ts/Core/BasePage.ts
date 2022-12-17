import TestComponent from "../Components/TestComponent";

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

        // @ts-ignore
        console.log(`platform ${this.constructor?.name || ''} page loaded...`);


        window.addEventListener('load', () => {
            const testComponent = new TestComponent();
        });
    }


    abstract run(): void;
}