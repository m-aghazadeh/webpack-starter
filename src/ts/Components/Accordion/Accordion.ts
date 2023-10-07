import BaseComponent from "../../Core/BaseComponent";
import './accordion.scss';


class Accordion extends BaseComponent {
    constructor() {
        super();
        const accordion = $('.rank-math-block, .wp-block-rank-math-faq-block');
        accordion.find('.rank-math-list-item .rank-math-question, .rank-math-faq-item .rank-math-question').on('click', function (e) {
            const $this = $(this);
            const parent = $(this).parent();
            $this.next('.rank-math-answer').slideToggle(200);
            parent.toggleClass('open');
        });
    }
}


export default Accordion;