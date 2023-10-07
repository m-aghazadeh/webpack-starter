import BaseComponent from "../Core/BaseComponent";

type TogglerConfig = { btn: string | JQuery, target: string | JQuery, classForToggle: string };

class MenuToggler extends BaseComponent {
    private config: TogglerConfig;
    private btnToggle: JQuery<HTMLElement>;
    private targetMenu: JQuery<HTMLElement>;

    constructor(config: TogglerConfig = {
        btn: '.toggle_menu',
        target: '.toggle_menu',
        classForToggle: 'open'
    }) {
        super();

        this.config = config;
        if (typeof config.btn === "string") {
            this.btnToggle = $(config.btn);
        } else {
            this.btnToggle = config.btn;
        }

        if (typeof config.target === "string") {
            this.targetMenu = $(config.target);
        } else {
            this.targetMenu = config.target;
        }

        this.btnToggle.on('click', () => {
            this.toggle();
        });
    }


    public isMneuOpen() {
        return this.targetMenu.hasClass('open');
    }

    public toggle() {
        this.btnToggle.toggleClass(this.config.classForToggle);
        this.targetMenu.toggleClass(this.config.classForToggle);

        $('header.primary_header').toggleClass('menu_is_open');
        $('body').toggleClass('overflow-hidden');
    }
}

export default MenuToggler;