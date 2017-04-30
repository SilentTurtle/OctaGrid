import * as $ from 'jquery';
import tinymce from 'tinymce';
export  class FormFiller {

     fill (formName: string, model: any) {
         
        var self = $("form[name='" + formName + "']");
            $.each(model, function (k, v) {
                var selector, elt;

                selector = '[name="' + k + '"]';
                elt = self.find(selector)
                //console.log(elt, [v])
                // if (elt.prop("type") == "textarea") {
                //     // console.log(k)
                //     if (typeof (tinymce) != "undefined") {
                //         if (tinymce.editors[k] == undefined)
                //             elt.val([v]);
                //         else
                //             tinymce.editors[k].setContent(v);
                //     }

                // }
                if (elt.prop('type') == "select") {
                    $('.selectpicker').selectpicker('refresh');
                }
                if (elt.prop("type") == "hidden") {
                    if (typeof (v) == 'string') {
                        var xyz = v.toString();
                        if (xyz.indexOf('imageresizer') != -1) {
                            //preload image 
                            // if (typeof (Dropzone) != "undefined") {
                            //     $.each(Dropzone.instances, function (indx, dropzone) {
                            //         dropzone.emit('resetFiles');
                            //         dropzone.emit('reset');
                            //         dropzone.preload(xyz);
                            //     });
                            // }
                        }
                    }
                }
                if (elt.length == 1) {
                    elt.val((elt.attr("type") == "checkbox") ? [v] : v);
                    if (v == true) {
                        elt.prop('checked', 'checked');
                    } else {
                        elt.removeAttr('checked');
                    }
                } else if (elt.length > 1) {
                    // radio
                    elt.val([v]);
                    if (v == true) {
                        elt.prop('checked', 'checked');
                    } else {
                        elt.removeAttr('checked');
                    }
                } else {
                    selector = '[name="' + k + '[]"]';
                    elt = self.find(selector);
                    elt.each(function () {
                        $(this).val(v);
                        if (v == true) {
                            $(this).prop('checked', 'checked');
                        } else {
                            $(this).removeAttr('checked');
                        }
                    });
                }


            });
    }


}