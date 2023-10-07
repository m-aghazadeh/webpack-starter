import './scss/index.scss';
import Event = JQuery.Event;

// ripple.color = '#00000015';
class AralanRipple {
    private TAG_NAME = 'aralan-ripple';
    private readonly rippleElem: HTMLElement;
    private elements: NodeListOf<Element>;

    constructor() {
        this.registerRippleElement();
        this.elements = document.querySelectorAll('.ripple, .btn,.breadcrumbs a');

        this.rippleElem = this.createRippleElem();
        this.elements.forEach((item: Element) => {
            item.appendChild(this.rippleElem);
            item.addEventListener('mousedown', (e: any) => {
                this.handleClick(e, item as HTMLElement);
            });
        });
    }

    private registerRippleElement(): void {
        customElements.define(this.TAG_NAME, HTMLElement, {extends: 'br'});
    }

    private createRippleElem() {
        return document.createElement(this.TAG_NAME);
    }

    private handleClick(ev: PointerEvent, currentElem: HTMLElement) {
        const ripple = this.createRippleElem();
        const pos = this.getMousePosition(ev, currentElem);
        currentElem.style.overflow = 'hidden';
        currentElem.style.position = getComputedStyle(currentElem).position === 'absolute' ? 'absolute' : 'relative';
        ripple.style.cssText = `
        top:${pos.y}px;
        left:${pos.x}px;
        background: #21212112;
        display: block;
        width: 50px;
        height: 50px;
        border-radius:50%;
        position: absolute;
        transform: translate(-50% , -50%);
        transition:all .2s;
        pointer-events: none;
        overflow : hidden;
        `;
        currentElem.appendChild(ripple);
        let goleft: number = 0;

        function moveCircle() {
            goleft++;
            ripple.style.transform = " translate(-50% , -50%) scale(" + goleft + ")";
            if (goleft > 30) {
                ripple.style.opacity = '0';
            }
            if (goleft > 45) {
                ripple.remove();
            }
            window.requestAnimationFrame(moveCircle);
        }

        moveCircle();
    }
    private getMousePosition(ev: PointerEvent, currentElem: HTMLElement): { x: number; y: number } {
        const x = ev?.clientX || 0;
        const y = ev?.clientY || 0;
        const pos = currentElem.getBoundingClientRect();
        return {
            x: x - pos.x || 0,
            y: y - pos.y || 0
        };
    }
}

export default AralanRipple;