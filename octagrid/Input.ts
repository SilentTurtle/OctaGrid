import * as $ from 'jquery';
export class Input {

    public elem = $("<input type='text' />");
    constructor() {
        this.name = 'uniquenamevalue'
    }
    public name: string;
    init(item) {
       // console.log('am initialized');
    }
    clear() {
        this.elem.val('');
        console.log('am cleared');
    }
    get() {
        console.log('getting');
        return { name: this.elem.prop('name'), value: this.elem.val() };
    }
    set(value) {
        console.log('am being set');
        this.elem.val(value);
    }
}
export interface  IInputBuilder {
        create(type: string, options): Input
}