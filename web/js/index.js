$('document').ready(function () {
	$('#add-url').on('click',function(){
		$.ajax({
			type:"post",
			url: "/url",
			data: {name: $('#url-name').val(),url:$('#url-path').val()},
			success: function (data) {
				console.log(data);
			}
		});
	});

	$(":button[class*='remove']").on('click',function(){
		var urlName = this.name;
		$.ajax({
			type:"post",
			url: "/"+urlName+"/deactivate",
			success: function (data) {
				console.log(data);
			}
		});
	});
	$('input[name="dates"]').daterangepicker();


	$('.draw-chart').on('click', function () {
		var obj = [];
		var sDate = $('input[name="dates"]').data('daterangepicker').startDate.format('YYYY-MM-DD');
		var eDate = $('input[name="dates"]').data('daterangepicker').endDate.format('YYYY-MM-DD');
		var selected = $('#selectOptions option:selected').text();
		$.ajax({
			type:"get",
			url: "/logs",
			data:{name:selected,from:sDate,to:eDate,platform:$('#desktopView').val()},
			success: function (data) {
				chart(data);
			}
		});

	});

	function chart(data){
		var ctx = $('#myChart');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.labels,
			datasets:data.datasets 
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	}
});

