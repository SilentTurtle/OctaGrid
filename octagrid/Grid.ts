import * as $ from 'jquery'
import { reflector } from "./Reflector";
import { Toster } from "./Toaster";
import {FormFiller} from './FormFiller';
export class OctaGrid {
    default = {
        enableForm: false,
        showAddNewButton: false,
        showeditButton: true,
        showdeleteButton: true,
        enableActionBar: true,
        fields: [{ name: "Account", title: '', type: 'text', align: '' }],
        hideColumns: ['isDeleted'],
        baseUrl: '/api/v1/crud',
        searchBox: '.searchBox',
        model: '',
        tblClass: 'table table-bordered table-striped table-hover dataTable',
        rowClass: '',
        tdClass: '',
        showAction: true,
        actions: {
            edititem: {
                text: 'edit',
                command: 'edit',
                icon: 'fa fa-edit',
                className: '',
                callback: $.noop
            },
            deleteitem: {
                text: 'delete',
                command: 'delete',
                icon: 'fa fa-trash',
                className: '',
                callback: $.noop
            }

        },
        events: {
            ondelete: null,
            onedit: null,
            onnew: null,
            onpaginate: null
        },        
        metadata: {

        },
        containers: {},
        formBuilder:{},
        toaster:new Toster()
    };
    config;   
    _currentpage: number = 1;//
    _rowData = [];
    _rowTotal: number = 0;
    reflectedFields;
    displayFields;
    constructor(options) {
        this.config = $.extend(true, this.default, options);        
        var r = new reflector(this.config.metadata);
        this.reflectedFields = r.getProperties();        
    }

    ajaxCall(url: string, param, successFx, error) {
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
    }


    registerEvents () {
        //this.initPagination(1);
        var grid = this.config.gridElem;
        var crudGrid = this;
        console.log(crudGrid);
        $(document).off("change", "#" + this.config.containers.itemperpage[0].id).on("change", "#" + this.config.containers.itemperpage[0].id, function () {

            //crudGrid.refresh();
            var search = crudGrid.config.searchBox.val();
            crudGrid.reload.call(crudGrid, 1, this.value, search, "");
            //crudGrid.paginate(crudGrid, grid);
        });

        function hideActionBar() {
            $(".actionbar button").hide();
        }
        function showActionBar() {
            $(".actionbar button").show();
        }

        $(document).off("click", ".actionbar li").on("click", ".actionbar li", function () {
            var array = [];
            $(this).parents("div:eq(2)").find('table:eq(0)').find("input:checkbox.itemCheckbox:checked").each(function (x, i) {
                array.push(i[0].value);
            });
            crudGrid.actionbarDelete.call(crudGrid, array.join(','));
            $(this).parents("div:eq(2)").find('table:eq(0)').find("input:checkbox.headerCheckbox").prop('checked', false);
        });

        $(document).off("change", "input:checkbox.headerCheckbox").on("change", "input:checkbox.headerCheckbox", function () {

            if ($(this).is(":checked")) {
                $(this).parents('table:eq(0)').find("input:checkbox.itemCheckbox").prop('checked', true);
                if ($(this).parents('table:eq(0)').find("input:checkbox.itemCheckbox").length > 0)
                    showActionBar();
            } else {
                $(this).parents('table:eq(0)').find("input:checkbox.itemCheckbox").prop('checked', false);
                hideActionBar();
            }
        });
        $(document).off("change", "input:checkbox.itemCheckbox").on("change", "input:checkbox.itemCheckbox", function () {

            var totalcheckbox = $(this).parents('table:eq(0)').find("input:checkbox.itemCheckbox").length;
            var totalCheckedcheckbox = $(this).parents('table:eq(0)').find("input:checkbox.itemCheckbox:checked").length;
            if (totalcheckbox == totalCheckedcheckbox) {
                $(this).parents('table:eq(0)').find("input:checkbox.headerCheckbox").prop('checked', true);
            } else {

                $(this).parents('table:eq(0)').find("input:checkbox.headerCheckbox").prop('checked', false);
            }
            if ($(this).is(":checked"))
                showActionBar();
            if (totalCheckedcheckbox == 0)
                hideActionBar();
        });
        //$(document).off("click", "td a[command=edit]").on("click", "td a[command=edit]", function () {
        //    //console.log("edit button fired");
        //    var grid = $(this).parents("table:eq(0)").data('grid');
        //    grid.onEdit(this);

        //});

        //$(document).off("click", "td a[command=delete]").on("click", "td a[command=delete]", function () {
        //    //console.log("delete button fired");
        //    var grid = $(this).parents("table:eq(0)").data('grid');
        //    grid.onDelete(crudGrid, this);
        //});

        $.each(crudGrid.config.actions, function (index, item) {
            if (item.command == 'edit') {
                $(document).off("click", "td a[command=edit]").on("click", "td a[command=edit]", function () {
                    //console.log("edit button fired");
                    var grid = $(this).parents("table:eq(0)").data('grid');
                    grid.onEdit(this);

                });
            }
            else if (item.command == 'delete') {
                $(document).off("click", "td a[command=delete]").on("click", "td a[command=delete]", function () {
                    //console.log("delete button fired");
                    var grid = $(this).parents("table:eq(0)").data('grid');
                    grid.onDelete(crudGrid, this);
                });
            } else {
                $(document).off("click", "td a[command=" + item.command + "]").on("click", "td a[command=" + item.command + "]", function () {
                    //console.log("delete button fired");
                    var row = $(this).parents("tr:eq(0)").data('item');
                    item.callback(row);
                });
            }
        });

        $(grid).parents(".grid-body:eq(0)").find("button[command=new]").off("click").on("click", function () {
            //console.log("new button fired");
            var grid = $(this).parents("div:eq(2)").find("table:eq(0)").data('grid');
            grid.new(this);

        });

        $(grid).parents(".grid-body:eq(0)").find(" button[command=search]").off("click").on("click", function () {
            //console.log("search button fired");
            crudGrid.search.call(crudGrid);
        });
        crudGrid.config.searchBox.keyup(function (e) {
            if (e.keyCode == 8) {
                if ($(this).val() == "") {

                    crudGrid.search.call(crudGrid);
                }
            }
            if (e.keyCode == 48) {
                if ($(this).val() == "") {

                    crudGrid.search.call(crudGrid);
                }
            }
            if (e.keyCode == 13) {
                crudGrid.search.call(crudGrid);
            }
        });
    }

    generateActionBar() {
        var actionBar = {
            ddnewbtn: $('<button type="button" class="btn  btn-lg  btn-primary btn-large  waves-effect"></button>'),
            searchTxtbox: $('<label>Search:<input class="form-control input-sm search" placeholder="" type="search"></label>'),
            barWrapper: $("<div class='dataTables_filter'></div>"),
            filterWrapper: $("<div class='col-md-2'></div>")
        }

    };

    renderSearchBar() {
        var actionBar = '<div class="actionbar col-md-6 pull-left"><div class="btn-group">';
        actionBar += '<button style="display:none;" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>';
        actionBar += '<ul class="dropdown-menu">';
        actionBar += '<li><a href="javascript:void(0);" command="action-delete">Delete</a></li>';
        //actionBar += '<li><a href="javascript:void(0)">Another action</a></li>';
        //actionBar += '<li><a href="javascript:void(0)">Something else here</a></li>';
        //actionBar += '<li role="separator" class="divider"></li>';
        //actionBar += '<li><a href="javascript:void(0)">Separated link</a></li>';
        actionBar += '</ul></div></div>';
        var searchBar = '<div class="searchbar navbar-form navbar-left col-md-6 pull-right" ><div class="form-group"><input type="text"  class="form-control searchBox"  placeholder="Search" class="searchbox"></div><button command="search" class="btn btn-default" type="button"><span class="fa  fa-search"></span></button>';
        if (this.config.enableForm || this.config.showAddNewButton)
            searchBar += '<button class="btn btn-primary" type="button" command="new"><span class="fa fa-plus"></span></button>';
        searchBar += '</div>';
        if (this.config.enableActionBar)
            $(actionBar + searchBar).insertBefore($(this.config.gridElem));
        else
            $(searchBar).insertBefore($(this.config.gridElem));
        this.config.searchBox = $(this.config.gridElem).prev('div').find(".searchBox");
    };

    refresh() {
        var limit = this.config.containers.itemperpage.val();
        this._currentpage = 1;
        //var totalpage = Math.ceil(this.rowtotal / limit);
        //var ul = this.containers.paginationContainer;
        // $(ul).bootpag({ total: totalpage, page: 1, maxVisible: 10 });
        var search = this.config.searchBox.val();
        var grid = this;
        this.ajaxCall("list", { offset: 1, limit: limit, search: search, filter: '' }, function (response) {

            //console.log(grid);
            if (response.Code == 200) {
                if (response.Data.length > 0) {
                    grid._rowData = response.Data;
                    grid._rowTotal = response.Data[0].RowTotal;
                } else {
                    grid._rowData = [];
                    grid._rowTotal = 0;
                }
                grid.renderData();
            }
        }, function (error) {

        });
    };

    reload( offset, limit, search, filterby) {
        //console.log(offset, limit, search, filterby);
        //$ajaxCall
        var grid=this;
        this.ajaxCall("list", { offset: offset, limit: limit, search: search, filter: '' }, function (response) {

            if (response.Code == 200) {
                if (response.Data.length > 0) {
                    grid._rowData = response.Data;
                    grid._rowTotal = response.Data[0].RowTotal;
                } else {
                    grid._rowData = [];
                    grid._rowTotal = 0;
                }

                grid.renderData();
            }

        }, function (error) {

        });
    };

    renderData() {
        this.renderRows.call(this);
        this.applyOddEven.call(this);
       // this.paginate(this);
        $(this.config.gridElem).data('grid', this);
    };

    renderGrid(el) {
        // var data = [];
        this.config.gridElem = el;

        //for (var i = 1; i < 5; i++) {
        //    this.rowdata.push({ id: i, productName: 'product ' + i, imagePath: 100 * i, IsActive: true, phoneNo: 123456, description: false });
        //}

        // CrudGrid.prototype.sayHello.call(this)

        // console.log(fields);
        var cols = [];

        for (var i = 0; i < this.reflectedFields.length; i++) {
            for (var z = 0; z < this.config.show.length; z++) {
                if (this.reflectedFields[i].toLowerCase() == this.config.show[z].toLowerCase()) {
                    var coldef = { name: this.reflectedFields[i], metadata: this.config.metadata[this.reflectedFields[i]] };
                    cols.push(coldef);
                    break;
                }
            }
        }
        this.displayFields = cols;// this.config.fields;
        this.reload( 1, 10, "", "");
        ///// this.loadDependencies();
        this.renderSearchBar();
        this.renderHeader.call(this);
        $(this.config.gridElem).addClass(this.config.tblClass);
        //console.log(this.config)
          this.registerEvents();

    };

    renderCommands() {
        var commands = "";
        //edit
        commands += "<td >";
        //if (this.config.showeditButton)
        //    commands += "<a command='edit' class='command' href='javascript:void(0);'><i class='fa fa-edit'></i></a>";
        //delete
        //commands += "<a command='delete' class='command' href='javascript:void(0);'><i class='fa fa-trash'></i></a></td>";
        // this.config.actions.edit.text;
        var showedit = this.config.showeditButton;
        var showdelete = this.config.showdeleteButton;
        $.each(this.config.actions, function (index, item) {
            if (item.command == 'edit') {
                if (showedit) {
                    commands += "<a command='edit' class='command' href='javascript:void(0);'><i class='" + item.icon + "'></i></a>";
                }
            } else if (item.command == 'delete') {
                if (showdelete) {
                    commands += "<a command='delete' class='command' href='javascript:void(0);'><i class='fa fa-trash'></i></a>";
                }
            } else {

                commands += "<a command='" + item.command + "' class='" + item.className + "' href='javascript:void(0);'><i class='" + item.icon + "'></i></a>";
            }
            //text: 'edit',
            //command:'edit',
            //icon: 'icon-edit',
            //className: '',
            //callback: function () { }
        });
        commands += "</td >";
        return commands;
    };

    renderHeader() {
        var header = [];

        //for (var i = 0; i < this.displayFields.length; i++) {
        //    var added = false;
        //    for (var z = 0; z < this.config.show.length; z++) {
        //        if (this.displayFields[i].toLowerCase() == this.config.show[z].toLowerCase()) {
        //            header.push(this.config.show[z]);
        //            added = true;
        //            break;
        //        }
        //    }
        //    if (!added) {
        //        header.push(this.displayFields[i]);
        //    }
        //}
        var thead = "<thead>";
        for (var i = 0; i < this.displayFields.length; i++) {
            ////if customized else as it is
            //if (this.displayFields[i].metadata.grid_header_title != undefined) {

            //    if (this.displayFields[i].metadata.grid_header_type != undefined) {
            //        var headertype = this.displayFields[i].metadata.grid_header_type;

            //    } else {
            //        thead += "<td>" + this.displayFields[i].metadata.grid_header_title + "</td>";
            //    }
            //} else {
            //    thead += "<td>" + this.displayFields[i].name + "</td>";
            //}
            thead += this.renderHeaderColumn(this.displayFields[i]);
        }
        if (this.config.showAction) {
            thead += "<td></td>";
        }
        thead += "</thead>";
        //TODO command button
        $(this.config.gridElem).find("thead").remove();
        $(this.config.gridElem).append(thead);
    };


    renderRows() {
        $(this.config.gridElem).find("tbody").html("");
        if (this._rowData.length == 0) {
            var colspan = parseInt(this.displayFields.length + 1);
            var tr = $("<tr>").append("<td colspan=" + colspan + ">No Record Founds</td>");
            if ($(this.config.gridElem).find("tbody").length > 0)
                $(this.config.gridElem).find("tbody").append(tr);
            else
                $(this.config.gridElem).append("<tbody>").append(tr);
            return;
        }
        for (var i = 0; i < this._rowData.length; i++) {
            this.renderRow.call(this, this._rowData[i]);
            // _createRow(elem, rowdata[i]);
        }
    };

    renderRow(data) {
        var row = data;
        var tds = this.renderColumns.call(this, row);
        //TODO command button
        var tr = $("<tr>").append(tds).data('item', row);
        if ($(this.config.gridElem).find("tbody").length == 0)
            $(this.config.gridElem).append("<tbody>").append(tr);
        else
            $(this.config.gridElem).find("tbody").append(tr);
    };

    renderColumns(row) {
        var tds = "";
        for (var i = 0; i < this.displayFields.length; i++) {
            //TODO::bind as its type image,checkbox hiden
            //console.log(row, row[this.displayFields[i].name])
            // tds += "<td>" + row[this.displayFields[i].name] + "</td>";
            var val = row[this.displayFields[i].name];
            tds += this.renderColumn(this.displayFields[i], val);
        }
        if (this.config.showAction) {
            tds += this.renderCommands();
        }
        return tds;
    };

    renderHeaderColumn(columndef) {
        var td = "";
        var coltype = columndef.metadata.grid_header_type == undefined ? "text" : columndef.metadata.grid_header_type;
        var value = columndef.metadata.grid_header_title == undefined ? columndef.name : columndef.metadata.grid_header_title;
        switch (coltype) {
            case "text":
                td += "<td>" + value + "</td>";
                break;
            case "checkbox":
                td += "<td><input class='headerCheckbox' type='checkbox' value='" + value + "' /></td>";
                break;
            default:
                td += "<td>" + value + "</td>";
                break;
        }
        return td;

    };
    renderColumn(columndef, value) {
        var td = "";
        var coltype = columndef.metadata.grid_header_type == undefined ? "text" : columndef.metadata.grid_header_type;
        switch (coltype) {
            case "text":
                td += "<td>" + value + "</td>";
                break;
            case "checkbox":
                td += "<td><input type='checkbox' class='itemCheckbox' value='" + value + "' /></td>";
                break;
            default:
        }
        return td;

    };
    applyOddEven() {
        $(this.config.gridElem).find("tbody>tr:odd").addClass("odd");
        $(this.config.gridElem).find("tbody>tr:even").addClass("even");
    };

    paginate(crudgrid) {
        //var rowtotal = 5000;
        var limit = crudgrid.config.containers.itemperpage.val();
        var totalpage = Math.ceil(crudgrid._rowTotal / limit);
        var ul = crudgrid.config.containers.paginationContainer;
        $(ul).bootpag({ total: totalpage, page: crudgrid._currentpage, maxVisible: 10 }).addClass("pull-left");
        if (this.config.events.onpaginate != null) {
            this.config.events.onpaginate();
        }
        //var search = crudgrid.options.searchBox.val();
        // crudgrid.reload(crudgrid, 1, limit, search, "");
    };
    initPagination = function (cp) {
        //var rowtotal = 5000;// data.[0].TotalRows;
        var limit = this.config.containers.itemperpage.val();
        var totalpage = Math.ceil(this._rowTotal / limit);
        // initPaging(totalpage, _currentpage);
        var ul = this.config.containers.paginationContainer;
        var crudGrid = this;
        $(ul).bootpag({ total: totalpage, page: cp, maxVisible: 10 }).on("page", function (pgevent, num) {
            crudGrid._currentpage = num;
            var limit = crudGrid.config.containers.itemperpage.val();
            var offset = (num * limit) - limit + 1;
            //event.reload(offset, limit, "", "");
            var search = crudGrid.config.searchBox.val();
            crudGrid.reload.call(crudGrid, offset, limit, search, "");
            // $(".content4").html("Page " + num); // or some ajax content loading...
        });
        if (this.config.events.onpaginate != null) {
            this.config.events.onpaginate();
        }
    };

    save() {
        this.config.containers.formContainer.hide();
        this.config.containers.listContainer.show();
        this.config.containers.paginationContainer.show();
    };

    findPrimaryKey() {
        var primaryKey;
        $.each(this.config.metadata, function (key, element) {
            $.each(element, function (key1, element) {
                //console.log('key: ' + key1 + '\n' + 'value: ' + element);
                if (key1 == "primary" && element == true) {
                    primaryKey = key;
                }
            });
        });
        return primaryKey;
    };

    onDelete(atag) {
        if (this.config.events.ondelete == null) {
            //console.log($(atag).parents("tr:eq(0)").data())
            if (confirm("Are you sure?")) {
                var primaryKey = this.findPrimaryKey();
                var row = $(atag).parents("tr:eq(0)").data('item');
                this.config.containers.formContainer.hide();
                var self=this;
                this.ajaxCall("delete", { id: row[primaryKey] }, function (response) {
                    var limit = self.config.containers.itemperpage.val();
                    var search = self.config.searchBox.val("");
                    self.reload.call(self,1, limit, "", "");
                    self.config.toaster.success();

                }, function (error) {
                    self.config.toaster.error(error);
                });
            }
        } else {
            this.config.events.ondelete(atag);
        }
    };
    actionbarDelete(ids) {
        //console.log($(atag).parents("tr:eq(0)").data())
        var cg = this;
        if (confirm("Are you sure?")) {

            this.ajaxCall("delete", { id: ids }, function (response) {
                var limit = cg.config.containers.itemperpage.val();
                var search = cg.config.searchBox.val("");
                cg.reload( 1, limit, "", "");
                cg.config.toaster.success('Data deleted successfully.');
            }, function (error) {

            });
        }
    };

    deleteSelected() {

    };


    createFormDataReady(detail) {

        var data = {};
        var formId = this.config.formBuilder.formId;
        $.each(detail, function (_, kv) {
            // console.log(_,kv)
            var x = formId + '-' + _.toLowerCase();
            data[x] = kv;

        });
        return data;
    };

    onEdit(atag) {
        if (this.config.events.onedit == null) {
            var row = $(atag).parents("tr:eq(0)").data('item');
            var model = this.createFormDataReady.call(this, row);
            //console.log(model);
            //console.log(this.containers)

            //$("form[name=" + this.config.formBuilder.formId + "]").autofill(model);
            var formdata=new FormFiller();
            formdata.fill(this.config.formBuilder.formId,model);
            this.config.formBuilder.config.headerTitle.text("edit " + this.config.model);
            this.config.containers.formContainer.show();
            this.config.containers.listContainer.hide();
            this.config.containers.paginationContainer.hide();
            $('.selectpicker').selectpicker('refresh');
        } else {
            this.config.events.onedit(atag);
        }
    };

    search() {
        // console.log("searching");
        var limit = this.config.containers.itemperpage.val();
        var search = this.config.searchBox.val();
        this.reload( 1, limit, search, "");
    };
    new = function () {
        if (this.config.events.onnew == null) {
            // console.log(this.containers)
            this.config.formBuilder.config.headerTitle.text("add new " + this.config.model);
            this.config.containers.formContainer.show();
            this.config.containers.listContainer.hide();
            this.config.containers.paginationContainer.hide();
            this.config.formBuilder.clearForm(this.config.formBuilder.formId);
        } else {
            this.config.events.onnew();
        }
    };

    setForm(form) {
        this.config.formBuilder = form;
    };

}

$.fn.OctaGrid = function (options) {
    return this.each(function (index, elem) {
        var $this = $(this);
        var grid = new OctaGrid(options);
        grid.renderGrid($this);
        if (options.enableForm) {
            options.formBuilder.renderForm(); 
            options.formBuilder.setGrid(grid);       
            //grid.setForm(options.formBuilder);
        }
        // form.execute('clearForm',{a:1,b:2,c:3});
    });
}