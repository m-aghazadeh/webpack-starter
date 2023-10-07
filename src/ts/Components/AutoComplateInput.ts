import BaseComponent from "../Core/BaseComponent";
import TriggeredEvent = JQuery.TriggeredEvent;

class AutoComplateInput extends BaseComponent {

    private inputs: JQuery;

    constructor(config: { selecetor?: string | null }) {
        super();

        if (!config.selecetor) {
            config.selecetor = '.aralan_autocomplate';
        }

        this.handleInput = this.handleInput.bind(this);
        this.inputs = $(config.selecetor);
        this.init();
    }

    init(): void {
        this.inputs.each((index, elem) => {
            const self = $(elem);
            const datalistOptions = $(self.data('datalist_selector') + ' option');
            const dataList = this.getData(datalistOptions);

            const listElem = this.createListElement();
            self.parent().css('position', 'relative');
            self.after(listElem);

            self.on('focusin', e => listElem.slideDown(50));
            self.on('focusout', e => setTimeout(() => listElem.slideUp(50), 100));

            self.on('input', (e) => {
                this.handleInput($(e.target).val() as string, dataList, listElem, self);
            });

        });
    }

    getData(datalistOptions: JQuery<HTMLElement>): string[] {
        const dataList: string[] = [];
        datalistOptions.each((index, elem) => {
            dataList.push(elem.getAttribute('value') + '');
        });
        return dataList;
    }

    handleInput(value: string, datalist: string[], listElem: JQuery, inputElem: JQuery) {
        const newDatalist: string[] = datalist.filter(item => item.toLowerCase().includes(value.toLowerCase()));

        listElem.html('');
        listElem.append(newDatalist.map(item => this.createListItem(item, inputElem)));
    }


    createListElement(): JQuery {
        const listElem = document.createElement('div');
        listElem.className = 'autocomplate_list';
        return $(listElem);
    }


    createListItem(text: string, inputElem: JQuery) {
        const elem = document.createElement('div');
        elem.className = 'item';
        elem.innerText = text;
        elem.addEventListener('click', () => {
            inputElem.val(text);
        })
        return elem;
    }

}


export default AutoComplateInput;