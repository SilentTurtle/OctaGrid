import * as $ from 'jquery'
import { FormBuilder, IInputWrapper } from "./FormBuilder";
import { bs } from "./BootstrapInputs";
import { Toster } from "./Toaster";
import { sf } from "./StringModule";
import v from 'jquery-validation';

export class columnBuilder {

    private config;
    public counter: number;
    private className: string;
    constructor(formConfig) {
        this.config = formConfig;
        this.counter = this.config.makeColumn;
        this.className = "col-md-" + 12 / this.config.makeColumn;
    }

    allocate(input: string) {
        var html = "";
        if (this.counter == this.config.makeColumn) {
            html += "<div class='row'>";
        }
        html += "<div class=" + this.className + ">";
        html += input;
        html += "</div>";
        this.counter--;
        if (this.counter == 0) {
            html += "</div>";
            this.counter = this.config.makeColumn;

        }
        return html;
    };
    isAlter(datafieldCount: any) {

        return !(datafieldCount % this.config.makeColumn == 0);
    }

}
export class BootstrapFormBuilder extends FormBuilder {
    //<div class='col-lg-12'>
    //      <div class ='header'><h2></h2></div>
    //      <div class ='body'>
    //      <--form--here -->          
    //       </div>
    //</div>
    //
    default = {
        renderAt: null,//this element hold the container
        container: $("<div class='col-lg-12'></div>"),
        header: $("<div class='header'></div>"),
        headerTitle: $("<h2></h2>"),
        headerActionBar: "",// $("<ul class='header-dropdown m-r--5'><li class='dropdown'><a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></a></li></ul>"),
        headerActions: [],
        wrapper: $("<div class='body'></div>"),
        showVertical: true,
        showHorizontal: false,
        makeColumn: 1,
        verticalClass: "",
        horizontalClass: "",
        grid: null,
        fields: [],
        metadata: {},
        reflectedFields: [],
        model: '',
        toaster: new Toster()
    };
    //config: any;
    private columnBuilder: columnBuilder;
    constructor(configuration) {
        super(configuration);
        this.inputWrapper = new BootstrapInputWrapper();
        this.columnBuilder = new columnBuilder(this.config);
        this.inputBuilder = new bs.BootStrapInputBuilder();

        //this.config = $.extend(this.default, configuration);
    }
    validationBuilder(formName: string, rules: any) {
        var self = this;
        var addValidation = function (formName, rules) {
            var fValidator = $('form[name=' + formName + ']').validate({
                ignore: ":hidden",
                rules: rules,
                highlight: function (input) {
                    $(input).parents('.form-group:eq(0)').addClass('has-error');
                },
                unhighlight: function (input) {
                    $(input).parents('.form-group:eq(0)').removeClass('has-error');
                },
                errorPlacement: function (error, element) {
                    $(element).parents('div:eq(0)').append(error);
                }
            });
            $(self.config.renderAt).find("button[command=save]").data('fv', fValidator);
            return fValidator;
        }(formName, rules);

    }
    vertical() {
        var i = 1;
        var formfields = "";
        //console.log(this.forms.grid);
        var ffields = this.config.reflectedFields;
        var fid = this.formId;
        var metadatas = this.config.metadata;
        var primaryKey = this.findPrimaryKey.call(this);
        var validationrules = {};
        for (var i = 0; i < ffields.length; i++) {

            //console.log(metadatas);
            //console.log(metadatas[ffields[i]]);
            var inputmedadata = metadatas[ffields[i]];
            var label = ffields[i];
            var lc_label = label.toLowerCase();
            //customized fields 
            var extendedlabel = inputmedadata.form_label == undefined ? label : inputmedadata.form_label;


            var inputname = fid + "-" + lc_label;
            if (!$.isEmptyObject(inputmedadata.rules))
                validationrules[inputname] = inputmedadata.rules;
            var intputdata = inputmedadata.data ? inputmedadata.data : "";//data for select or rbl

            if (primaryKey == label) {
                //console.log('primary')              
                var hiddenInput = this.inputBuilder.create("hidden", {
                    placeholder: '',
                    name: inputname,
                    value: 0,
                    isprimary: primaryKey == label,
                    data: []
                });
                formfields += hiddenInput.elem[0].outerHTML;
                continue;
            }
          
            if (this.config.makeColumn == 1) {
                if (inputmedadata.input == "hidden")
                    continue;
                var input = this.inputBuilder.create(inputmedadata.input, {
                    placeholder: '',
                    name: inputname,
                    value: intputdata,
                    isprimary: primaryKey == label,
                    data: []
                });
                var inputlbl = this.inputBuilder.create("label", {
                    name: inputname,
                    value: extendedlabel
                });
                var content = inputlbl.elem[0].outerHTML + input.elem[0].outerHTML;
                var output = this.inputWrapper.inputWrapper(true, content);
                this.formElements.Register(input);             
                formfields += output;
            } else {              
                if (inputmedadata.input == "hidden")
                    continue;
                var input = this.inputBuilder.create(inputmedadata.input, {
                    placeholder: '',
                    name: inputname,
                    value: intputdata,
                    isprimary: primaryKey == label,
                    data: []
                });
                var inputlbl = this.inputBuilder.create("label", {
                    name: inputname,
                    value: extendedlabel
                });
                var content = inputlbl.elem[0].outerHTML + input.elem[0].outerHTML;
                var output = this.inputWrapper.inputWrapper(true, content);
                this.formElements.Register(input);
                var x = this.columnBuilder.allocate(output);
                formfields += x;
                // console.log(x);              
            }
        }

        var datafieldCount = ffields.length;
        if (this.columnBuilder.isAlter(datafieldCount)) {
            //closing form row coludiv
            formfields += "</div>";
        }
        var saveButton = this.inputBuilder.create("button", {
            name: this.formId,
            value: "Save",
            command: 'save'

        });
        var cancelButton = this.inputBuilder.create("button", {
            name: this.formId,
            value: "Cancel",
            command: 'cancel',
            onclick: function () { console.log('cancel button '); }

        });
        var buttons = cancelButton.elem[0].outerHTML + saveButton.elem[0].outerHTML;
        var btns = this.inputWrapper.buttonWrapper(true, buttons);
        var actionUrl = "/api/v1/crud/" + this.config.model + "/save";
        var formElements = formfields + btns;
        var formopttions = {
            name: fid,
            method: "post",
            action: actionUrl,
            formelements: formElements, className: ""
        };
        var form = this.createForm(formopttions);
        this.config.wrapper.append(form);
        this.config.header.append(this.config.headerTitle);
        // this.forms.headerActionBar.find("li:eq(0)").append("<ul class='dropdown-menu pull-right'><li><a class=' waves-effect waves-block' href='javascript:void(0);'>action one </a></li></ul>");
        this.config.header.append(this.config.headerActionBar);
        this.config.container.append(this.config.header);
        this.config.container.append(this.config.wrapper);
        //console.log(this.forms.container);
        $(this.config.renderAt).append(this.config.container);
        this.formElements.Initialize('form Initializting...');
        //var rule = { 'heloo': { required: true } };
        //console.log(fid,validationrules);
        //consol.log()
        this.validationBuilder(fid, validationrules);
    }
    horizontal() {
        var i = 1;
        var formfields = "";
        //console.log(this.forms.grid);
        var ffields = this.config.reflectedFields;
        var fid = this.formId;
        var metadatas = this.config.metadata;
        var primaryKey = this.findPrimaryKey.call(this);
        var validationrules = {};
        for (var i = 0; i < ffields.length; i++) {

            //console.log(metadatas);
            //console.log(metadatas[ffields[i]]);
            var inputmedadata = metadatas[ffields[i]];
            var label = ffields[i];
            var lc_label = label.toLowerCase();
            //customized fields 
            var extendedlabel = inputmedadata.form_label == undefined ? label : inputmedadata.form_label;

            var inputname = fid + "-" + lc_label;
            if (!$.isEmptyObject(inputmedadata.rules))
                validationrules[inputname] = inputmedadata.rules;
            var intputdata = inputmedadata.data ? inputmedadata.data : "";//data for select or rbl

            if (primaryKey == label) {
            
                var hiddenInput = this.inputBuilder.create("hidden", {
                    placeholder: '',
                    name: inputname,
                    value: 0,
                    isprimary: primaryKey == label,
                    data: []
                });
                formfields += hiddenInput.elem[0].outerHTML;
                continue;
            }
        
            if (this.config.makeColumn == 1) {
                if (inputmedadata.input == "hidden")
                    continue;
                var input = this.inputBuilder.create(inputmedadata.input, {
                    placeholder: '',
                    name: inputname,
                    value: intputdata,
                    isprimary: primaryKey == label,
                    data: []
                });
                var inputlbl = this.inputBuilder.create("label", {
                    name: inputname,
                    value: extendedlabel
                });
                var content = this.inputWrapper.inputWrapperHorizontal(inputlbl.elem[0].outerHTML, input.elem[0].outerHTML);
                var output = this.inputWrapper.inputWrapper(false, content);
                this.formElements.Register(input);             
                formfields += output;
            } else {               
                if (inputmedadata.input == "hidden")
                    continue;
                var input = this.inputBuilder.create(inputmedadata.input, {
                    placeholder: '',
                    name: inputname,
                    value: intputdata,
                    isprimary: primaryKey == label,
                    data: []
                });
                var inputlbl = this.inputBuilder.create("label", {
                    name: inputname,
                    value: extendedlabel
                });
                var content = this.inputWrapper.inputWrapperHorizontal(inputlbl.elem[0].outerHTML, input.elem[0].outerHTML);
                var output = this.inputWrapper.inputWrapper(false, content);
                //var content = inputlbl.elem[0].outerHTML + input.elem[0].outerHTML;
                //var output = this.inputWrapper.inputWrapper(false, content);
                this.formElements.Register(input);
                var x = this.columnBuilder.allocate(output);
                formfields += x;
              
            }
        }

        var datafieldCount = ffields.length;
        if (this.columnBuilder.isAlter(datafieldCount)) {
            //closing form row coludiv
            formfields += "</div>";
        }

        var saveButton = this.inputBuilder.create("button", {
            name: this.formId,
            value: "Save",
            command: 'save'

        });
        var cancelButton = this.inputBuilder.create("button", {
            name: this.formId,
            value: "Cancel",
            command: 'cancel',
            onclick: function () { console.log('cancel button '); }

        });
        var buttons = cancelButton.elem[0].outerHTML + saveButton.elem[0].outerHTML;
        // var btnsave = this.vertical.button("submit", fid, "btn-primary waves-effect", "Save", 'save'); //forminputmaker("button", "save", "Save", "btn-primary");
        // var btnCancel = this.vertical.button("button", fid, "", "Cancel", 'cancel');
        var btns = this.inputWrapper.buttonWrapper(true, buttons);
        var actionUrl = "/api/v1/crud/" + this.config.model + "/save";
        var formElements = formfields + btns;
        var formopttions = {
            name: fid,
            method: "post",
            action: actionUrl,
            formelements: formElements, className: "form-horizontal"
        };
        var form = this.createForm(formopttions);
        this.config.wrapper.append(form);
        this.config.header.append(this.config.headerTitle);
        // this.forms.headerActionBar.find("li:eq(0)").append("<ul class='dropdown-menu pull-right'><li><a class=' waves-effect waves-block' href='javascript:void(0);'>action one </a></li></ul>");
        this.config.header.append(this.config.headerActionBar);
        this.config.container.append(this.config.header);
        this.config.container.append(this.config.wrapper);
        //console.log(this.forms.container);
        $(this.config.renderAt).append(this.config.container);
        this.formElements.Initialize('form Initializting...');
        //var rule = { 'heloo': { required: true } };
        //console.log(fid,validationrules);
        //consol.log()
        this.validationBuilder(fid, validationrules);
    }

}


export class BootstrapInputWrapper implements IInputWrapper {

    inputWrapperHorizontal(label: string, content: string): string {

        //var lblWrapper = sf.String.Format("<div class='control-label col-md-3' >{0}</div>", label);
        var lblWrapper = label;
        var inputWraper = sf.String.Format("<div class='col-md-9' >{0}</div>", content);
        return lblWrapper + inputWraper;
    }

    rowWrapper(isVertical: boolean): string {
        throw new Error('Method not implemented.');
    }
    columnWrapper(isVertical: boolean): string {
        throw new Error('Method not implemented.');
    }
    labelWrapper(isVertical: boolean): string {
        throw new Error('Method not implemented.');
    }
    buttonWrapper(isVertical: boolean, buttons): string {
        if (isVertical) {
            return sf.String.Format("<div class='row clearfix'><div class='pull-right'>{0}</div></div>", buttons);
        } else {
            return sf.String.Format("<div class='row clearfix'><div class='pull-right'>{0}</div></div>", buttons);
        }
    }
    inputWrapper(isVertical: boolean, content): string {
        if (isVertical) {
            return sf.String.Format("<div class='form-group '>{0}</div>", content);
        } else {
            return sf.String.Format("<div class='form-group row'>{0}</div>", content);
        }
    }


}