import * as $ from 'jquery'
export class FormInputs {
    constructor() { }
    private clearHandlers = new Array();
    private initHandlers = new Array();
    private getHandlers = new Array();
    private setHandlers = new Array();

    regClear(self, fn) {
        this.clearHandlers.push({ self: self, fn: fn });

    };
    removeClear(fn) {
        this.clearHandlers = this.clearHandlers.filter(
            function (item) {
                if (item.fn !== fn) {
                    return item;
                }
            }
        );
    };
    execClear(o) {
        this.clearHandlers.forEach(function (item) {
            var scope = item.self || window;
            item.fn.call(scope, o);
        });
    };
    reg(self) {
        this.initHandlers.push({ self: self, fn: self.init });
        this.getHandlers.push({ self: self, fn: self.get });
        this.setHandlers.push({ self: self, fn: self.set });
        this.clearHandlers.push({ self: self, fn: self.clear });
    };
    regInit(self) {

        this.initHandlers.push({ self: self, fn: self.init });

    };
    removeInit(fn) {
        this.initHandlers = this.initHandlers.filter(
            function (item) {
                if (item.fn !== fn) {
                    return item;
                }
            }
        );
    };
    execInit(o) {
        this.initHandlers.forEach(function (item) {
            var scope = item.self || window;
            item.fn.call(scope, o);
        });
    };
    regGet(self) {

        this.getHandlers.push({ self: self, fn: self.get });

    };
    removeGet(fn) {
        this.getHandlers = this.getHandlers.filter(
            function (item) {
                if (item.fn !== fn) {
                    return item;
                }
            }
        );
    };
    execGet(o) {
        var returns = []
        this.getHandlers.forEach(function (item) {
            var scope = item.self || window;
            returns.push(item.fn.call(scope, o));
        });
        return returns;
    };
    regSet(self) {

        this.setHandlers.push({ self: self, fn: self.set });

    };
    removeSet(fn) {
        this.setHandlers = this.setHandlers.filter(
            function (item) {
                if (item.fn !== fn) {
                    return item;
                }
            }
        );
    };
    execSet(o) {
        this.setHandlers.forEach(function (item) {
            var scope = item.self || window;
            item.fn.call(scope, o);
        });
    };
}


