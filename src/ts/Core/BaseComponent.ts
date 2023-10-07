export default abstract class BaseComponent {

    constructor() {
        console.log(`component ${this.constructor?.name || ''} loaded...`);
    }
}