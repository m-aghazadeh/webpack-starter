import DropDown from "./DropDown.js";


class AralanSelect {
    dropdowns = [];

    constructor(selector = 'select', options = {}) {
        this.initializeDropDowns(selector);
        return this.dropdowns;
    }

    initializeDropDowns(selector = 'select') {
        const self = this;
        const selectElems = $(selector);
        if (selectElems.length) {
            selectElems.each(function (i, select) {
                if (!$(this).next().hasClass('dropdown')) {
                    self.dropdowns.push(new DropDown(this));
                }
            });
        }
    }
}

export default AralanSelect;