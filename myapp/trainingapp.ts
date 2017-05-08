 import { OctaGrid } from "../octagrid/Grid";
import { BootstrapFormBuilder } from "../octagrid/BootstrapFormBuilder";
 import * as $ from 'jquery-validation'


var metadata = '{"TrainingId":{"input":"number","grid_header_type": "checkbox","isdependent":false,"primary":true,"rules":{}},"Name":{"input":"text","isdependent":false,"primary":false,"rules":{"required":true}},"Description":{"input":"textarea","isdependent":false,"primary":false,"rules":{}},"Syllabus":{"input":"editor","isdependent":false,"primary":false,"rules":{}},"Career":{"input":"editor","isdependent":false,"primary":false,"rules":{}},"DateFrom":{"input":"datepicker","isdependent":false,"primary":false,"rules":{}},"DateTo":{"input":"datepicker","isdependent":false,"primary":false,"rules":{}},"Time":{"input":"text","isdependent":false,"primary":false,"rules":{"required":true}},"IsPopular":{"input":"checkbox","isdependent":false,"primary":false,"rules":{}},"IsRunning":{"input":"checkbox","isdependent":false,"primary":false,"rules":{}},"IsActive":{"input":"checkbox","isdependent":false,"primary":false,"rules":{}},"AddedOn":{"input":"hidden","isdependent":false,"primary":false,"rules":{}},"IsDeleted":{"input":"hidden","isdependent":false,"primary":false,"rules":{}}}';
var mdta = JSON.parse(metadata)
var formbuilder = new BootstrapFormBuilder({
    renderAt: "#formhere",
    showVertical: false,
    model: 'brand',
    makeColumn: 2,
    metadata: JSON.parse(metadata)

});
var options = {
    show: ['TrainingId', 'Name', 'Description'],
    hideColumns: ['AddedBy', 'IsDeleted'],
    // searchBox: "#txtSearch",
    showAddNewButton: true,
    metadata: JSON.parse(metadata),
    model: 'brand',
    containers: {
        listContainer: $("#dvlist"),
        formContainer: $("#formhere"),
        paginationContainer: $("#pagehere"),
        itemperpage: $("#ddlItemsPerPage")
    },
    enableForm: true,
    formBuilder: formbuilder
};
var grid = new OctaGrid(options);

grid.renderGrid($("#tbltest"));
if (options.enableForm) {
    options.formBuilder.renderForm();
    options.formBuilder.setGrid(grid);
    //grid.setForm(options.formBuilder);
}