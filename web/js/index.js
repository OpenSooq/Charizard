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
	$(":button[class*='analyze']").on('click',function(){
		var view ='<div>';
		$('#percentage-charts').html('');
		$.ajax({
			type:"get",
			url: "/analyze",
			data:{platform:$('input[name=platform]:checked').val(),url:$('#url-analyze').val()},
			success: function (data) {
				for (let key in data) {
					if (data.hasOwnProperty(key)) {
						let element = data[key];
						let color = 'red';
						if(element>89){
							color='green';
						}else if (element>49){
							color='orange';
						}
						view+= '<div class="d-inline-block">'+
						'<div class="c100 p'+element+' '+color+'">'+
							'<span>'+element+'%</span>'+
							'<div class="slice">'+
								'<div class="bar"></div>'+
							'<div class="fill"></div>'+
							'</div>'+
					'</div>'+
					'<span>'+key+'</span></div>';					
					}
				};
				view+='</div><div class="scorescale">'+
				'<span class="scorescale-range scorescale-red">0–49</span>'+
				'<span class="scorescale-range scorescale-orange">50–89</span>'+
				'<span class="scorescale-range scorescale-green">90–100</span></div>';
			$('#percentage-charts').append(view);
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
			data:{name:selected,from:sDate,to:eDate,platform:$('input[name=platform]:checked').val()},
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

