import BaseComponent from "../Core/BaseComponent";
import MatRipple from "mat-ripple";

class Ripple extends BaseComponent {

    private selectors = [
        '.post_categoreis .cat-item a',
        '.ripple',
        '.btn',
        '.card.card_1',
        '.breadcrumbs a',
        '.social_links a',
        '.primary_menu .menu-item a',
        '.services_list a',
        '.home_hero_countreis a',
        '.rank-math-list-item .rank-math-question, .rank-math-faq-item .rank-math-question'
    ];

    private color: string = '#21212102';


    constructor() {
        super();

        $.fn.extend({
            ripple: function () {
                // @ts-ignore
                return this.each(function () {
                    const ripple = new MatRipple();
                    ripple.color = '#21212112';
                    // @ts-ignore
                    this.append(ripple);
                });
            }
        });
        // @ts-ignore
        $(this.selectors.join(',')).ripple();
    }

    static append(element: JQuery) {
        const ripple = new MatRipple();
        ripple.color = '#21212102';
        if (element.find('mat-ripple').length) return;
        element.append(ripple);
    }
}


export default Ripple;