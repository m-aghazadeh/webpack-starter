/**
 * Global functions
 *
 */


enum Breakpoints {
    sm = 640,
    md = 768,
    lg = 1024,
    xl = 1280,
    '2xl' = 1536
}

export default class {

    static Breakpoints = Breakpoints;


    static createMinWidthMediaQuery(minWidth: number) {
        return window.matchMedia(`(min-width:${minWidth}px)`);
    }

    static createMaxWidthMediaQuery(maxWidth: number) {
        return window.matchMedia(`(max-width:${maxWidth}px)`);
    }

    static handleMediaQuery(query = '(min-width:1024px)', doInMatch: () => void, doInNotMatch: () => void) {
        const breackpoint = window.matchMedia(query);
        const checkBreakpoint = () => {
            if (breackpoint.matches) {
                if (this.isValidCallback(doInMatch)) {
                    doInMatch();
                }
            } else {
                if (this.isValidCallback(doInNotMatch)) {
                    doInNotMatch();
                }
            }
        };
        checkBreakpoint();
        breackpoint.onchange = checkBreakpoint;
    }

    static addOutsideClickListener(targetSelector = 'body', callback: () => void) {
        const self = this;
        $(document).on('click', function (event) {
            if ($(event.target).closest(targetSelector).length === 0) {
                if (self.isValidCallback(callback)) {
                    callback();
                }
            }
            event.stopPropagation();
        });
    }

    static isValidCallback(functionToCheck: () => void) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    static parseJson(input: string) {
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

    static getUrlParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    }
}