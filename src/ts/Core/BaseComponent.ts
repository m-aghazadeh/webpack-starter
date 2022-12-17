export default abstract class BaseComponent {

    constructor() {
        // @ts-ignore
        console.log(`component ${this.constructor?.name || ''} loaded...`);
    }
}