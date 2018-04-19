(function ($) {
    'use strict';
    $(function () {
        //Init sparkline
        $('[data-sparkline="true"]')
            .each(function (i, key) {
                var type = $(key).data('type');
                var height = $(key).data('height');
                var barColor = $(key).data('barColor');

                height = height === undefined ? 24 : height;
                barColor = barColor === undefined ? '#d2d2d2' : barColor;

                $(key)
                    .sparkline('html',
                    {
                        type: type,
                        barColor: barColor,
                        height: height,
                        chartRangeMin: 0
                    });
            });

        //Init flot chart
        var d1 = [[0, 2100], [1, 1200], [2, 2700], [3, 1200], [4, 1600], [5, 2000], [6, 1500], [7, 1200], [8, 3500], [9, 2000], [10, 1000], [11, 1800], [12, 1200],
         [13, 2100], [14, 1200], [15, 2700], [16, 1200], [17, 1600], [18, 2000], [19, 1500], [20, 1200], [21, 3500], [22, 2000], [23, 1000], [24, 1800], [25, 1200],
         [26, 2100], [27, 1200], [28, 2700], [29, 1200], [30, 1600], [31, 2000]];
        var d2 = [[0, 300], [1, 900], [2, 1500], [3, 900], [4, 1600], [5, 800], [6, 1500], [7, 1200], [8, 1900], [9, 1400], [10, 1000], [11, 1600], [12, 1000],
                  [13, 300], [14, 900], [15, 1500], [16, 900], [17, 1600], [18, 800], [19, 1500], [20, 1200], [21, 1900], [22, 1400], [23, 1000], [24, 1600], [25, 1000],
                  [26, 300], [27, 900], [28, 1500], [29, 900], [30, 1600], [31, 800]];
        var d3 = [[0, 30], [1, 90], [2, 150], [3, 90], [4, 1600], [5, 80], [6, 1500], [7, 120], [8, 190], [9, 1400], [10, 100], [11, 160], [12, 100],
                  [13, 300], [14, 900], [15, 150], [16, 900], [17, 160], [18, 800], [19, 150], [20, 120], [21, 190], [22, 1400], [23, 100], [24, 1600], [25, 100],
                  [26, 300], [27, 90], [28, 150], [29, 90], [30, 160], [31, 800]];

        var flotChartDatas = [
                { label: "Line#1", data: d1 },
                { label: "Line#2", data: d2 },
                { label: "Line#3", data: d3 }];

        var flotChartOptions = {
            series: {
                lines: {
                    show: false,
                    fill: true,
                    lineWidth: 0.3
                },
                points: {
                    show: false,
                    radius: 2,
                    width: 2
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.0
                },
                shadowSize: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: '#f0f0f0',
                borderWidth: 1,
                color: '#f0f0f0'
            },
            colors: ['#d0d0d0', '#1ab394', '#4b81F4'],
            yaxis: {
                ticks: 8
            },
            xaxis: {
      				mode: "categories",
      				tickLength: 0
      			}
        }

        setTimeout(initFlotChart, 550);

        function initFlotChart() {
            $.plot('#line_chart', flotChartDatas, flotChartOptions);
        }

        $('.js-toggle-left-sidebar').on('click', function () {
            setTimeout(initFlotChart, 500);
        });
        window.onresize = function (e) {

            initFlotChart();
        };

        //Init peity chart
        $("span.pie")
            .peity("pie",
            {
                fill: ['#009688', '#ddd']
            });

        //Exportable table
        $('.js-exportable').DataTable({
            responsive: true,
            dom: '<"html5buttons"B>lTfgtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
        });

        //To-Do List
        //Check or uncheck to-do item
        $('.todo-list').on('click', 'li', function (e) {
            if ($(e.target).closest('.controls, .move-handle').length === 0) {
                $(this).find('input').iCheck('toggle');
            }
        });

        //Init sortable
        $('.todo-list').sortable({
            handle: '.move-handle'
        });

        //Delete to-do item
        $('.todo-list').on('click', '.js-delete-todo', function () {
            $(this).parents('li').fadeOut(500, function () {
                $(this).remove();
            });
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

        //Add item
        $('.js-btn-add-item').on('click', addToItem);
        $('.js-input').on('keyup', function (event) {
            var key = event.keyCode || event.which;
            if (key === 13) addToItem();
        });

        //Init iCheckbox
        setICheckbox();
        function setICheckbox() {
            $('input:not(.js-switch)').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });

            $('input:not(.js-switch)').on('ifToggled', function (e) {
                $(this).parents('li').toggleClass('closed');
            });
        }

        //Add to-do item to list
        function addToItem() {
            var $input = $('.js-input');
            var $toDoList = $('.todo-list');

            var item = $input.val();
            if (item !== '') {
                var newItemHtml = '<li>' +
                                  '   <a href="javascript:void(0);" title="Move"><i class="fa fa-arrows move-handle"></i></a>' +
                                  '   <input type="checkbox" />' +
                                  '   <span>' + item + '</span>' +
                                  '   <span class="controls pull-right">' +
                                  '       <a href="javascript:void(0);" title="Edit"><i class="fa fa-pencil"></i></a>' +
                                  '       <a href="javascript:void(0);" title="Delete"><i class="fa fa-trash js-delete-todo"></i></a>' +
                                  '   </span>' +
                                  '</li>';

                $toDoList.append(newItemHtml);
                $input.val('');
            }

            $input.focus();
            setICheckbox();
        }
    });
}(jQuery));
