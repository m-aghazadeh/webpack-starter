/**
 * Global functions
 *
 */

export default class {

    static BREACKPOINTS = {
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        '2xl': 1536
    }

    static responsiveToggleSlider(enableSliderFunc, query = '(min-width:1024px)') {
        let slider = null;
        const enableSlider = enableSliderFunc;
        if (!enableSlider) {
            return;
        }
        this.checkBreackPoint(
            query,
            () => {
                if (slider !== null && typeof slider.destroy !== 'undefined' && !slider.destroyed) {
                    slider.destroy(true, true);
                }
            },
            () => {
                slider = enableSlider(slider)
            }
        );
    }

    static breackpointMinWidth(minWidth) {
        return window.matchMedia(`(min-width:${minWidth}px)`);
    }

    static breackpointMsxWidth(maxWidth) {
        return window.matchMedia(`(max-width:${maxWidth}px)`);
    }

    static checkBreackPoint(query = '(min-width:1024px)', doInMatch, doInNotMatch) {
        const breackpoint = window.matchMedia(query);
        const checkBreakpoint = () => {
            if (breackpoint.matches === true) {
                if (this.isFunction(doInMatch)) {
                    doInMatch();
                }
            } else if (breackpoint.matches === false) {
                if (this.isFunction(doInNotMatch)) {
                    doInNotMatch();
                }
            }
        }
        checkBreakpoint();
        breackpoint.onchange = checkBreakpoint;
    }

    static onOutside(type, selector = 'body', callback) {
        const self = this;
        $(document).on(type, function (event) {
            if ($(event.target).closest(selector).length === 0) {
                // tslint:disable-next-line:no-unused-expression
                self.isFunction(callback) && callback();
            }
            event.stopPropagation();
        });
    }

    static isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    static parseJson(input) {
        if (typeof input === "object") {
            return input;
        }
        let json = null;
        try {
            json = JSON.parse(input);
        } catch (e) {
            return false;
        }
        return json;
    }

    static getUrlParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    }
}