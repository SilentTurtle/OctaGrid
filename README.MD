# Octa Grid 

The Octa Grid is specially designed to reduce heavy work load on creating crud application. This is written in typescript  and will give you fully automated crud functionality with any server side language. By default it uses bootstrap forms but you can also create own forms(eg,materialcss) and inputs.
 
see the [Demo](https://silentturtle.github.io/octagriddemo.github.io/) here.
#Note
(Still in Development though you can hit try :))

# Included Feature

  - Grid
  - Form Builder
  - Form Elements
  - Toster


You can also:
  - Create own form bulder
  - Create customized toaster
  - add new grid components

## How to USE?

steps to use in your app
-create {yourapp}.ts 
-include references
```
import { OctaGrid } from "./Grid";
import { BootstrapFormBuilder } from "./BootstrapFormBuilder";
 import * as $ from 'jquery-validation'
var metadata={
   "TrainingId": {
      "input": "number",
      "grid_header_type": "checkbox",
      "isdependent": false,
      "primary": true,
      "rules": {}
   },
   "Name": {
      "input": "text",
      "isdependent": false,
      "primary": false,
      "rules": {
         "required": true
      }
   },
   "Description": {
      "input": "textarea",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "Syllabus": {
      "input": "editor",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "Career": {
      "input": "editor",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "DateFrom": {
      "input": "datepicker",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "DateTo": {
      "input": "datepicker",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "Time": {
      "input": "text",
      "isdependent": false,
      "primary": false,
      "rules": {
         "required": true
      }
   },
   "IsPopular": {
      "input": "checkbox",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "IsRunning": {
      "input": "checkbox",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "IsActive": {
      "input": "checkbox",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "AddedOn": {
      "input": "hidden",
      "isdependent": false,
      "primary": false,
      "rules": {}
   },
   "IsDeleted": {
      "input": "hidden",
      "isdependent": false,
      "primary": false,
      "rules": {}
   }
};
//this is for form builder
var formbuilder = new BootstrapFormBuilder({
    renderAt: "#formhere",//elements at which insert/edit form
    showVertical: false,//settings 
    model: 'training',// will call api/v1/training/list or save or get or delete                depending on user action.make sure you've created an api
    makeColumn: 2,//no of column in form
    metadata: metadata// form meta data

});
//options for grid
var options = {
    show: ['TrainingId', 'Name', 'Description'],//will show provided columns
    hideColumns: ['AddedBy', 'IsDeleted'],//hide column
    showAddNewButton: true,//show add new button
    metadata: metadata,//form meta data
    model: 'training',
    containers: {
        listContainer: $("#dvlist"),//grid container
        formContainer: $("#formhere"),//form container
        paginationContainer: $("#pagehere"),//pagination container
        itemperpage: $("#ddlItemsPerPage")//dropdown size container
    },
    enableForm: true,// allow add/edit form
    formBuilder: formbuilder //formbuilder inside grid
};
//render grid and form
grid.renderGrid($("#tbltest"));
if (options.enableForm) {
    options.formBuilder.renderForm();
    options.formBuilder.setGrid(grid);
}
```
###For Demo
For demo I've used static json file as datasource,can have look inside demo folder
and for api use please to go **grid.ts** inside octagrid folder and at line no 63
uncomment ajaxcall and use.
```
  // $.ajax({
        //     type: "POST",
        //     contentType: "application/json; charset=utf-8",
        //     async: false,
        //     url: this.config.baseUrl + this.config.model + "/" + url,
        //     // url: "list.json",
        //     data: JSON.stringify(param),
        //     dataType: "json",
        //     success: successFx,
        //     error: error
        // });
$.getJSON("list.json",successFx);
```

### Documentation
* **showVertical=true**  gives you the vertical forms and false gives you the horizontal fomrs.
* **makeColumn** = {number} gives you the number of column per rows.
* **metadata**  is json object which contains meta information about the each form's datatype,validation,dependencies etc..
```
var formbuilder = new BootstrapFormBuilder({
    renderAt: "#formhere",//elements at which insert/edit form
    showVertical: false,//settings 
    model: 'training',// will call api/v1/training/list or save or get or delete                depending on user action.make sure you've created an api
    makeColumn: 2,//no of column in form
    metadata: metadata// form meta data

});
```
* **model** will bind to call an api with given model path .eg
api/v1/model/list,api/v1/model/get...
all you have to do is create list,get,save,delete api service in your backend system
with the given response format.
``` 
{
"Code": 200,
 "Message": "",
 "Data": [your data objects are here]
 }
 ```

### Installation

Just RUN npmrestore.bat or type command manually
```sh
$ npm install
```



### Contribution?

Want to contribute? Yes,sure you can.




### Todos

	-bug fix
	-enhancement

License
----

MIT