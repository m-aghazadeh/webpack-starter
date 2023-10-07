import './scss/index.scss';

class DropDown {
    iconHtml = `<svg class="dropdown-icon" width="18" height="9" viewBox="0 0 18 9" fill="none">
<path d="M16.9201 0.949951L10.4001 7.46995C9.63008 8.23995 8.37008 8.23995 7.60008 7.46995L1.08008 0.949951" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    isIconInRight = false;

    constructor(selectElem) {
        this.select = $(selectElem);
        this.isMultiple = this.select.prop('multiple');
        this.init();
        this.initEvents();
    }

    init() {
        this.optionsSearch = this.select.data('search');
        this.title = this.select.data('title');
        this.class = this.select.attr('class');
        this.isIconInRight = this.select.data('is-icon-in-right');


        const options = this.getOptions();

        if (options.length > 7) {
            this.optionsSearch = 'جستجو...';
        }

        this.select.after(this.getDropdownHtml());

        this.select.on('DOMSubtreeModified', () => {
            this.update();
        })

        this.dropDownElem = this.select.next('.dropdown');

        this.dropDownElem.addClass(this.isMultiple ? 'multiple' : '');

        this.input = this.dropDownElem.find('input');
        this.updateCurrent();

        this.setOptions(options);
    }

    getOptions() {
        return this.select.find('option');
    }

    setOptions(options) {
        const optionsListElem = this.dropDownElem.find('.list ul').html('');
        options.each((j, option) => {
            const optionElem = $(option);
            const display = $(option).data('display-text') || '';
            const selectedClass = (optionElem.is(':selected') ? 'selected' : '');
            const optionValue = optionElem.val();

            optionsListElem.append(`<li class="option ${selectedClass}" data-value="${optionValue}" data-display-text="${display}"><span class="checkbox"></span>${optionElem.text()}</li>`);
        });
    }

    updateOptions(options) {
        options.each((j, option) => {
            const optionElem = $(option);
            const optionLi = this.dropDownElem.find(`.list ul li[data-value="${optionElem.prop('value')}"]`);
            if (optionElem.is(':selected')) {
                optionLi.addClass('selected');
            } else {
                optionLi.removeClass('selected');
            }
        });
    }

    updateCurrent() {
        const selected = this.select.find('option:selected');
        const texts = [];
        selected.map((i, elem) => {
            texts.push($(elem).data('display-text') || $(elem).text());
        });
        if (texts.length === 0) {
            texts.push('انتخاب کنید...');
        }

        this.dropDownElem.find('.current').html(texts.join(', '));
    }

    initEvents() {
        const self = this;
        this.dropDownElem.on('click', function () {
            self.handleToggle(this);
        });
        $(document).on('click', this.handleOutsideClick);
        this.dropDownElem.find('.option').on('click', function (e) {
            self.handleOptionClick($(this), e);
        });
        this.dropDownElem.on('keydown', this.handleKeyboardEvents);

        this.input.on('click', e => e.stopPropagation());
        this.input.on('keydown', e => e.stopPropagation());
        if (this.input.length) {
            this.input.on('input', (e) => {
                this.filterBySearch(e.target.value);
            });
        }
    }

    filterBySearch(text) {
        this.setOptions(this.getOptions().filter((i, option) => {
            const newText = text.toLowerCase();
            return option.value.toLowerCase().includes(newText) || option.innerText.toLowerCase().includes(newText);
        }));

        this.updateCurrent();
        this.reset();
        this.initEvents();
    }

    reset() {
        $(this.dropDownElem).off('click');
        this.dropDownElem.find('.option').off('click');
        this.dropDownElem.off('keydown');
        this.input.off('input');
    }

    update() {
        this.setOptions(this.getOptions());
        this.updateCurrent();
        this.reset();
        this.initEvents();
    }

    getDropdownHtml() {
        const searchHtml = this.getSearchHtml();
        return `
        <div class="dropdown ${(this.class || '')}" tabindex="0">
            <div class="current-selection">
                ${this.isIconInRight ? this.iconHtml : ''}
                <div class="flex flex-col max-w-8/10">
                    ${this.title !== undefined ? `<span class="title">${this.title}</span>` : ''}
                    <span class="current"></span>
                </div>
                ${!this.isIconInRight ? this.iconHtml : ''}
            </div>
            <div class="list">
            ${this.optionsSearch ? searchHtml : ''}
            <ul></ul>
            </div>
        </div>
        `
    }

    getSearchHtml() {
        if (!this.optionsSearch) {
            return '';
        }
        return `
        <input class="border border-mine-shaft-200 bg-mine-shaft-100 rounded-full text-sm flex items-center focus:border-primary focus:placeholder-transparent placeholder-mine-shaft-600 mb-2 px-4 py-2" type="search" placeholder="${this.optionsSearch}"/>
        `;
    }

    handleToggle(self) {

        $('.dropdown').not($(self)).removeClass('open');
        if (this.isMultiple) {
            $(self).addClass('open');
        } else {
            $(self).toggleClass('open');
        }
        if ($(self).hasClass('open')) {
            $(self).find('.option').attr('tabindex', 0);
            if (!this.isMultiple) {
                $(self).find('.selected').focus();
            }
        } else {
            $(self).find('.option').removeAttr('tabindex');
            $(self).focus();
        }
    }

    handleOutsideClick(event) {
        event.stopPropagation();
        if ($(event.target).closest('.dropdown').length === 0) {
            $('.dropdown').removeClass('open');
            $('.dropdown .option').removeAttr('tabindex');
        }
    }

    handleOptionClick(current, e) {
        let selectedOptions = current.closest('.list').find('.selected');
        if (this.isMultiple) {
            e.preventDefault();
            current.toggleClass('selected');
        } else {
            selectedOptions.removeClass('selected');
            current.addClass('selected');
        }


        const select = this.dropDownElem.prev('select').children(`option[value="${current.data('value')}"]`);
        const isItemSelected = select.prop('selected');
        select.prop('selected', !isItemSelected);
        this.updateCurrent();

        this.dropDownElem.prev('select').trigger('change');
        this.input.val('');
        this.updateOptions(this.getOptions())
        this.reset();
        this.initEvents();
    }

    handleKeyboardEvents(event) {
        let focusedOption = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
        // Space or Enter
        if (event.keyCode === 32 || event.keyCode === 13) {
            if ($(this).hasClass('open')) {
                focusedOption.trigger('click');
            } else {
                $(this).trigger('click');
            }
            return false;
            // Down
        } else if (event.keyCode === 40) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                focusedOption.next().focus();
            }
            return false;
            // Up
        } else if (event.keyCode === 38) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                focusedOption = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                focusedOption.prev().focus();
            }
            return false;
            // Esc
        } else if (event.keyCode === 27) {
            if ($(this).hasClass('open')) {
                $(this).trigger('click');
            }
            return false;
        }
    }

}

export default DropDown;