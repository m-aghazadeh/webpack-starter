import BaseComponent from "../Core/BaseComponent";

class Toast extends BaseComponent {
    private toasts: JQuery<HTMLElement>;

    constructor() {
        super();
        this.toasts = $(document.createElement('div'));
        this.toasts.addClass('toasts_container');
        $(document.body).append(this.toasts);
    }

    public notify(message: string, timeout: number = 2500, icon: string = ''): void {
        const notification = document.createElement('div');
        notification.classList.add('toast')

        notification.innerText = message
        notification.style.display = 'none'

        const $notification = $(notification);

        this.toasts.append($notification)
        $notification.show(100)
        setTimeout(() => {
            $notification.hide(100, '', function () {
                // @ts-ignore
                $(this).remove();
            });
        }, timeout)


    }
}


export default Toast;