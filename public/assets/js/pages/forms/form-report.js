(function ($) {
    'use strict';
    $(document).ready(function () {
        //Colorpicker
        $('.colorpicker-component').colorpicker();

        //Dropzone fileupload
        Dropzone.options.frmFileUpload = {
            paramName: "file",
            maxFilesize: 2
        };

        //Masked Input
        $('[data-inputmask]').inputmask();

        //Multi-select
        $('#optgroup').multiSelect({
            selectableOptgroup: true
        });

        //Bootstrap TagsInput
        $('.js-tagsinput')
            .tagsinput({
                tagClass: function (item) {
                    switch (item) {
                        case 'Tag-1':
                            return 'label label-primary';
                        case 'Tag-2':
                            return 'label label-danger';
                        case 'Tag-3':
                            return 'label label-success';
                        case 'Tag-4':
                            return 'label label-default';
                        case 'Tag-5':
                            return 'label label-warning';
                        case 'Tag-6':
                            return 'label label-info';
                    }

                    return 'label label-default';
                }
            });

        //Select 2
        $('.js-select2').select2();
        $('.js-select2-placeholder').select2({
            placeholder: 'Please select a car',
            allowClear: true
        });

        //Chosen
        $('.chosen-select').chosen();
        // var config = {
        //   '.chosen-select'           : {},
        //   '.chosen-select-deselect'  : { allow_single_deselect: true },
        //   '.chosen-select-no-single' : { disable_search_threshold: 10 },
        //   '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        //   '.chosen-select-rtl'       : { rtl: true },
        //   '.chosen-select-width'     : { width: '95%' }
        // }
        // for (var selector in config) {
        //   $(selector).chosen(config[selector]);
        // }

        //DateRange Picker
        $('.js-daterange-picker').daterangepicker({
            startDate: "2017/08/06",
            endDate: "2017/09/30",
            drops: "down",
            applyClass: "btn-primary",
            locale: {
                format: 'YYYY/MM/DD'
            }
        });

        $('.js-daterange-picker-rangesoption').daterangepicker({
            ranges: {
                "Today": [
                    '2017/08/11', '2017/08/11'
                ],
                "Yesterday": [
                    '2017/08/10', '2017/08/10'
                ],
                "Last 7 Days": [
                    '2017/08/04', '2017/08/11'
                ],
                "Last 30 Days": [
                    '2017/07/11', '2017/08/11'
                ],
                "This Month": [
                    '2017/08/01', '2017/08/31'
                ],
                "Last Month": [
                    '2017/07/01', '2017/07/31'
                ]
            },
            showCustomRangeLabel: false,
            startDate: "2017/08/11",
            endDate: "2017/08/11",
            drops: "up",
            applyClass: "btn-primary",
            locale: {
                format: 'YYYY/MM/DD'
            }
        });

        $('.js-daterange-picker-rangesoption-2').daterangepicker({
            ranges: {
                "Today": [
                    '2017/08/11', '2017/08/11'
                ],
                "Yesterday": [
                    '2017/08/10', '2017/08/10'
                ],
                "Last 7 Days": [
                    '2017/08/04', '2017/08/11'
                ],
                "Last 30 Days": [
                    '2017/07/11', '2017/08/11'
                ],
                "This Month": [
                    '2017/08/01', '2017/08/31'
                ],
                "Last Month": [
                    '2017/07/01', '2017/07/31'
                ]
            },
            showCustomRangeLabel: true,
            alwaysShowCalendars: true,
            startDate: "2018/04/01",
            endDate: "2018/04/01",
            drops: "down",
            opens: "right",
            applyClass: "btn-primary",
            locale: {
                format: 'YYYY/MM/DD'
            }
        });

        //Init switch buttons
        var $switchButtons = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        $switchButtons.forEach(function (e) {
            var size = $(e).data('size');
            var options = {};
            options['color'] = '#009688';
            if (size !== undefined) options['size'] = size;

            var switchery = new Switchery(e, options);
        });
    });
}(jQuery));
