import '../assets';

export class App {
    page: any;

    setPage = (page: any) => {
        this.page = page;
    }

    init = () => {
        window.addEventListener('load', () => {
            // @ts-ignore
            (function (jQuery) {
                // @ts-ignore
                window.$ = jQuery.noConflict();
            })(jQuery);
            console.log('Application init ...');
            this.page.run();
        });

    }
}

const app = new App();
export default app;