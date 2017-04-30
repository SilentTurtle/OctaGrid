import * as $ from 'jquery'
import { Input, IInputBuilder } from "./Input";
export namespace def {
    export class Text extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='text' class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }

    export class Number extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='number' class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }

    }

    export class Image extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='text'class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }
    export class Select extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: '',
            data: []

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<select name='" + this.config.name + " class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            this.config.data.forEach(function (item) {
                this.elem.append("<option id=" + item.Id + " >" + item.value + "</option>")
            });
            this.elem.find("option[id='" + this.config.value + "']").prop('selected', 'selected');
        }
        clear() {
            console.log('clearing');
            this.elem.val(0);
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }
    export class TextArea extends Input {
        private defaults = {
            class: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<textarea name='" + this.config.name + "'  class='" + this.config.class + "' >" + this.config.value + "</textarea>");
            this.name = this.config.name;
        }
        init(item) {
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }

    // class Editor extends Input {
    //     private defaults = {
    //         class: '',
    //         placeholder: '',
    //         name: '',
    //         value: ''

    //     };
    //     public config;
    //     public elem;
    //     public name: string;
    //     private _instance;
    //     constructor(options) {
    //         super();
    //         this.config = $.extend(this.defaults, options);
    //         this.elem = $("<input name='" + this.config.name + "' value=" + this.config.value + " type='text'class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
    //         this.name = this.config.name;
    //         //load dependency
    //     }
    //     init(item) {
    //         _instance = tinymce.init({
    //             selector: ".editor",
    //             setup: function (editor) {
    //                 editor.on('change', function () {
    //                     //console.log('editor change');
    //                     tinymce.triggerSave();
    //                 });
    //             }
    //         });
    //     }
    //     clear() {
    //         console.log('clearing');
    //         // $.each(tinymce.editors, function (index, item) {
    //         if (typeof (tinymce) != "undefined") {
    //             _instance.setContent('');
    //         }
    //         //});
    //     }
    //     get() {
    //         console.log('getting');
    //         var content = _instance.getContent();
    //         return { name: this.name, value: content };

    //         // return this.elem.val();
    //     }
    //     set(value) {
    //         console.log('set');
    //         _instance.setContent(value);
    //     }

    // }
    export class Hidden extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='hidden'   class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }
    export class Button extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: '',
            onclick: function () { }

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<button name='" + this.config.name + "'  type='button' class='" + this.config.class + "' >" + this.config.value + "</button>");
            this.name = this.config.name;
        }
        init(item) {
            this.elem.off("click").on("click", onclick);
        }


    }
    export class Label extends Input {
        private defaults = {
            class: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<label for='" + this.config.name + "' class='" + this.config.class + "'>" + this.config.value + "</label>");
            this.name = this.config.name;
        }



    }
    export class Checkbox extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='checkbox' class='" + this.config.class + "' />");
            this.name = this.config.name;
        }
        init(item) {
            super.init(item);
        }
        clear() {
            this.elem.prop('checked', false);
        }
        get() {
            return { name: this.name, value: this.elem.is(":checked") };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            if (value) {

                this.elem.prop('checked', true);
            } else {
                this.elem.prop('checked', false);
            }
        }

    }
    export class Radio extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='radio' class='" + this.config.class + "' />");
            this.name = this.config.name;
        }
        init(item) {
            super.init(item);
        }
        clear() {
            this.elem.prop('checked', false);
        }
        get() {
            return { name: this.name, value: this.elem.is(":checked") };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            if (value) {

                this.elem.prop('checked', true);
            } else {
                this.elem.prop('checked', false);
            }
        }

    }

    export class ToggleSwitch extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value=" + this.config.value + " type='text'class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }
    export class Tags extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='text' class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }
    export class Datepicker extends Input {
        private defaults = {
            class: '',
            placeholder: '',
            name: '',
            value: ''

        };
        public config;
        public elem;
        public name: string;
        constructor(options) {
            super();
            this.config = $.extend(this.defaults, options);
            this.elem = $("<input name='" + this.config.name + "' value='" + this.config.value + "' type='date' class='" + this.config.class + "' placeholder='" + this.config.placeholder + "' />");
            this.name = this.config.name;
        }
        init(item) {
            console.log('init');
            super.init(item);
        }
        clear() {
            console.log('clearing');
            this.elem.val('');
        }
        get() {
            console.log('getting');
            return { name: this.name, value: this.elem.val() };

            // return this.elem.val();
        }
        set(value) {
            console.log('set');
            this.elem.val(value);
        }

    }

    export class InputBuilder implements IInputBuilder {

        create(type: string, options): Input {
            switch (type) {
                case "text":
                    return new Text(options);
                case "number":
                    return new Number(options);
                case "image":
                    return new Image(options);
                case "select":
                    return new Select(options);
                case "textarea":
                    return new TextArea(options);
                case "datepicker":
                    return new Datepicker(options);
                case "switch":
                    return new ToggleSwitch(options);
                case "radio":
                    return new Radio(options);
                case "checkbox":
                    return new Checkbox(options);
                case "hidden":
                    return new Hidden(options);
                case "label":
                    return new Label(options);
                case "button":
                    return new Button(options);

                default:
                    return new Text(options);

            }
        }
    }
}