(function(document, window, body, $) {
    window.ui = window.ui || {};
    if ($(".os-manageUrlTable").length) {
        var table = "<table class=\"table table-striped\">"+
"<thead> <tr><th scope=\"col\">Name</th><th scope=\"col\">URL</th><th scope=\"col\"></th>"+
  "</tr></thead><tbody>";
        $.ajax({
            type: "get",
            url: "/page/all",
            success: function(pages) {
                pages.forEach(function(page) {
                    table+= "<tr name="+page.name+"><td>"+page.name+"</td><td>"+page.url+"</td><td align=\"right\">"+
"<button class=\"btn btn-danger remove\">remove</button></td></tr>";
                });
                table+="</tbody></table>";
                $(".os-manageUrlTable").append(table);
            },
        });
    }
    if ($("#selectOptions").length) {
        var view="";
        $.ajax({
            type: "get",
            url: "/page/all",
            success: function(pages) {
                pages.forEach(function(page) {
                    view+="<option value= "+page.name+">"+page.name+"</option>";
                });
                $("#selectOptions").append(view);
            },
        });
    }


    $("#add-url").on("click", function() {
        $.ajax({
            type: "post",
            url: "/page/create",
            data: {name: $("#url-name").val(), url: $("#url-path").val()},
            success: function(page, status) {
                if (status=="success") {
                    var row = "<tr><td>"+page.name+"</td><td>"+page.url+"</td><td align=\"right\">"+
                            "<button class=\"btn btn-danger remove\">remove</button></td></tr>";
                    $(".table").append(row);
                }
            },
        });
    });

    $("body").on("click", ":button[class*='remove']", function() {
        var tr = $(this).parent().parent();
        var urlName = tr.find("td:first-child").text();
        $.ajax({
            type: "post",
            url: "/page/deactivate",
            data: {name: urlName},
            success: function(data) {
                tr.remove();
            },
        });
    });
    $(":button[class*='analyze']").on("click", function() {
        var ChartView ="<div>";
        $("#percentage-charts").html("<div class=\"loader d-inline-block\"></div>");
        $(".loader").fadeOut();
        $.ajax({
            type: "get",
            url: "page/analyze",
            data: {platform: $("input[name=platform]:checked").val(), url: $("#url-analyze").val()},
            error: function(request, status, error) {
                $("#percentage-charts").html("<div class=\"alert alert-warning\" role=\"alert\">"+error+"</div>");
            },
            success: function(data, status) {
                for (var index in data) {
                    if (index in data) {
                        var element = data[index];
                        var color = "red";
                        if (element>89) {
                            color="green";
                        } else if (element>49) {
                            color="orange";
                        }
                        ChartView+= "<div class=\"d-inline-block\">"+
"<div class=\"c100 p"+element+" "+color+"\">"+
"<span>"+element+"%</span>"+
"<div class=\"slice\">"+
"<div class=\"bar\"></div>"+
"<div class=\"fill\"></div>"+
"</div>"+
"</div>"+
"<span>"+index+"</span></div>";
                    }
                }
                ChartView+="</div><div class=\"scorescale\">"+
"<span class=\"scorescale-range scorescale-red\">0–49</span>"+
"<span class=\"scorescale-range scorescale-orange\">50–89</span>"+
"<span class=\"scorescale-range scorescale-green\">90–100</span></div>";
                $("#percentage-charts").html(ChartView);
            },
        });
    });
    if ($("input[name=\"dates\"]").length) {
        $("input[name=\"dates\"]").daterangepicker();
    }


    $(".draw-chart").on("click", function() {
        var sDate = $("input[name=\"dates\"]").data("daterangepicker").startDate.format("YYYY-MM-DD");
        var eDate = $("input[name=\"dates\"]").data("daterangepicker").endDate.format("YYYY-MM-DD");
        var selected = $("#selectOptions option:selected").text();
        var categories = [];
        $("input[name='options[]']:checked").each(function() {
            categories.push($(this).val());
        });
        $.ajax({
            type: "get",
            url: "page/logs",
            data: {name: selected, from: sDate, to: eDate, platform: $("input[name=platform]:checked").val(), categories: categories},
            success: function(data) {
                chart(data);
            },
        });
    });
    /**
 * @param {object} data of chart.
 */
    function chart(data) {
        var ctx = $("#myChart");
        // eslint-disable-next-line no-undef
        new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: data.datasets,
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
            },
        });
    }
// eslint-disable-next-line no-undef
})(document, window, document.body, jQuery);
