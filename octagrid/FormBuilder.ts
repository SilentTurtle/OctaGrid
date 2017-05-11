import * as $ from 'jquery'
import { FormElements } from "./FormElements";
import { IInputBuilder } from "./Input";
import { def } from "./DefaultInputs";
import { reflector } from "./Reflector";
import { Toster } from "./Toaster";
import { sf } from "./StringModule";
import * as v from 'jquery-validation';
export interface IFormBuilder {

    config;
    //columnBuilder(): void;
    vertical();
    horizontal();
    validationBuilder(formName: string, rules: any);

}

export class FormBuilder implements IFormBuilder {

    default = {
        renderAt: null,//this element hold the container
        container: $("<div class='col-lg-12'></div>"),
        header: $("<div class='form-header'></div>"),
        headerTitle: $("<h2></h2>"),
        headerActionBar: "",// $("<ul class='header-dropdown m-r--5'><li class='dropdown'><a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></a></li></ul>"),
        headerActions: [],
        wrapper: $("<div class='form-body'></div>"),
        showVertical: true,
        showHorizontal: false,
        makeColumn: 1,
        verticalClass: "",
        horizontalClass: "",
        grid: null,
        fields: [],
        metadata: {},
        reflectedFields: [],
        toaster: new Toster()
    };
    config: any;
    formId: string;
    formElements: FormElements;
    inputWrapper: IInputWrapper;
    inputBuilder: IInputBuilder;
    constructor(configuration) {
        this.formId = "form-" + Math.floor(Date.now() / 100);
        this.config = $.extend(this.default, configuration);
        this.formElements = new FormElements();      
        this.inputBuilder = new def.InputBuilder();
        var r = new reflector(this.config.metadata);
        this.config.reflectedFields = r.getProperties();
        console.log(this.config);
    }
    ajaxCall(url: string, param, successFx, error) {
        $.ajax({
            type: "POS",
            contentType: "application/json; charset=utf-8",
            async: false,
            url: "/api/v1/crud/" + this.config.model + "/" + url,
            data: JSON.stringify(param),
            dataType: "json",
            success: successFx,
            error: error
        });

    }
    vertical() {
        throw new Error('Method not implemented.');       
    }
    horizontal() {
        throw new Error('Method not implemented.');
    }
    validationBuilder(formName: string, rules: any) {
        throw new Error('Method not implemented.');
    }

    renderForm() {
        console.log('rendering form');
        if (this.config.showVertical) {
            this.createVertical();
        } else {
            this.createHorizontal();
        }
        this.registerEvents();
    }
    createForm(options) {
        console.log('creating form');
        return sf.String.Format("<form name='{0}' method={1} action='{2}' class='{4}'>{3}</form>",
            options.name,
            options.method,
            options.action,
            options.formelements, options.className);
    }
    findPrimaryKey() {
        console.log('super p key form');
        var primaryKey;
        $.each(this.config.metadata, function (key, element) {
            // console.log('key: ' + key + '\n' + 'value: ' + element);
            $.each(element, function (key1, element) {
                // console.log('key: ' + key1 + '\n' + 'value: ' + element);
                if (key1 == "primary" && element == true) {
                    primaryKey = key;
                }
            });
        });
        return primaryKey;
    }

    createVertical() {
        this.vertical();
    }
    createHorizontal() {
        this.horizontal();
    }
    clearForm(formName) {
        this.formElements.Clear('clearing');
        console.log('cleared');
    }

    cancel(btn) {
        console.log('canceling');
        var fname = $(btn).prop('name');
        this.clearForm(fname);
        
        var validator = $("form[name=" + fname + "]").validate();
        validator.resetForm();
        var grd = this.config.grid.config.containers;
        grd.formContainer.hide();
        grd.listContainer.show();
        grd.paginationContainer.show();
    }
    save(button) {
        console.log('saving');
        var fm = $(button).data('fv');
        var formName = $(button).prop('name');
        var fbuilder = this;
        if (fm.form()) {

            var model = {};

            $.each($('form[name=' + formName + ']').serializeArray(), function (_, kv) {
                var x = kv.name.replace(formName + '-', '');
                //if (model.hasOwnProperty(x)) {
                //    model[kv.name] = $.makeArray(model[x]);
                //} else {
                model[x] = kv.value;
                //}
            });
            console.log(model);
            this.ajaxCall("save", model, function (response) {
                if (response.Code == 200) {
                    var grd = fbuilder.config.grid.config.containers;
                    grd.formContainer.hide();
                    grd.listContainer.show();
                    grd.paginationContainer.show();
                    fbuilder.config.grid.refresh.call(fbuilder.config.grid);
                    fbuilder.config.toaster.success("");
                } else {
                    console.log(response.Message);
                    // alert(response.Message);
                    fbuilder.config.toaster.error(response.Message);
                }

            }, function (error) {
                fbuilder.config.toaster.error(error);
            });

        } else {

        }
    }
    registerEvents() {
        console.log('form events')
        var formBuilder = this;
        $(this.config.renderAt).find("button[command=save]").off("click").on("click", function () {
            console.log("save button fired");
            //formBuilder.save( this);
            formBuilder.save.call(formBuilder, this);
            return false;
        });

        $(this.config.renderAt).find("button[command=cancel]").off("click").on("click", function () {
            console.log("cancel button fired");
            formBuilder.cancel(this);
        });


    }
    setGrid(grid){
        this.config.grid=grid;
    }

}

export interface IInputWrapper {
    rowWrapper(isVertical: boolean): string;
    columnWrapper(isVertical: boolean): string;
    labelWrapper(isVertical: boolean): string;
    buttonWrapper(isVertical: boolean, buttons: string): string;
    inputWrapper(isVertical: boolean, content: string): string
    inputWrapperHorizontal(label: string, content: string): string

}