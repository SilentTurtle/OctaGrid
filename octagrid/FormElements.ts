import * as $ from 'jquery'
import { Input } from "./Input";
export class FormElements {
    constructor() { }
    public elements: Input[]=new Array<Input>();

    Register(self:Input) {
        this.elements.push(self);
    }
    Initialize(log) {
        this.elements.forEach(function (item) {
            var scope = item || window;
            item.init.call(scope, log);
        });
    }
    Clear(log) {
        this.elements.forEach(function (item) {
            var scope = item || window;
            item.clear.call(scope, log);
        });
        
    }
    GetAll(log) {
      var returns = []
        this.elements.forEach(function (item) {
            var scope = item || window;
            returns.push(item.get.call(scope, log));
        });
        return returns;
    }
    GetByName(name) {
        var element = this.elements.filter(
            function (item) {
                if (item.elem.prop('name') == name) {
                    return item;
                }
            }
        );
        return { name: element[0].elem.prop('name'), value: element[0].elem.val() };
    }
    SetAll() {

            

    }
    SetByName(name,value){
        var element = this.elements.filter(function (item) {
            if (item.name == name) {
                return item;
            }
        });
        element[0].set.call(element[0],value);
    }

}


