import BaseComponent from "../../Core/BaseComponent";
import './style.scss';

class TestComponent extends BaseComponent {
    constructor() {
        super();
        this.init();
    }

    init() {
        setInterval(() => {
            const currentDate = new Date();
            $('.test_component').text(`${currentDate.getHours()}: ${currentDate.getMinutes()} : ${currentDate.getSeconds()}`);

        }, 1000);
    }

}


export default TestComponent;