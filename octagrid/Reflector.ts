export class reflector {
    private obj;
    constructor(refObj) {
        this.obj = refObj;
    }
    getProperties() {
        var properties = [];
        for (var prop in this.obj) {
            if (typeof this.obj[prop] != 'function') {
                properties.push(prop);
            }
        }
        return properties;
    }
    getAllMethods = function () {
        var methods = [];
        for (var method in this.obj) {
            if (typeof this.obj[method] == 'function') {
                methods.push(method);
            }
        }
        return methods;
    }
    getOwnMethods = function () {
        var methods = [];
        for (var method in this.obj) {
            if (typeof this.obj[method] == 'function'
                && this.obj.hasOwnProperty(method)) {
                methods.push(method);
            }
        }
        return methods;
    };
}