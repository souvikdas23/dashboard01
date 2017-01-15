"use strict";

require.config({
    waitSeconds: 0,

    shim: {
    	 handlebars: {
                exports: 'Handlebars'
         }
    },

    paths: {
    	jquery: '//localhost:8080/feltso/lib/js/jquery-3.1.1.min',
        handlebars: '//localhost:8080/feltso/lib/js/handlebars.min',
        text: '//localhost:8080/feltso/lib/js/text',
        mcustomscrollbar: '//localhost:8080/feltso/lib/js/jquery.mCustomScrollbar.concat.min',
        chart:'//localhost:8080/feltso/lib/js/chart',
        moment: '//localhost:8080/feltso/lib/js/moment',
        mousewheel: '//localhost:8080/feltso/lib/js/mousewheel',
    }
});


require([
	'jquery',
	'handlebars',
	'mcustomscrollbar',
	'chart',
	'moment',
	'mousewheel',
	'helpers/register_helpers',
	'text!partials/sidebar.html',
	'text!partials/all_category_template.html',
	'text!partials/common_template.html',
	'text!partials/nav_template.html'
	],function($, Handlebars, mCustomScrollbar, chart, Moment, Mousewheel, RegisterHelpers, Sidebar, allCategoryTemplate, commonTemplate, navTemplate){

	var some_data;
	/*console.log(Handlebars);*/
	

	var prev_this = this;

	$(document).ready(function(){
	    some_data = $.parseJSON(jsonData);
		//function for rendering sidebar
		var common_obj = {"common":[]};
		this.arr_sidebar = [];
		for(var i=0;i<some_data.features_data.length;i++){ 
			this.arr_sidebar.push(some_data.features_data[i].name);
			common_obj["common"].push({"name": some_data.features_data[i].name, "avg_rating":some_data.features_data[i].avg_rating});
		}
	
		var sidebar_template = Handlebars.compile(Sidebar);
		$('.select-sec').html(sidebar_template(common_obj));

		renderAllCategory(some_data);
		renderNavigation(some_data);
		/*handlesidebar(some_data, this.arr_sidebar);*/
		$.when( handlesidebar(some_data, this.arr_sidebar) ).done(function(){
			customscrollbar();		
		});

		customscrollbar();

		chartController(some_data);

		pieChartController(some_data);

		chartModifier(some_data);

	});

	var customscrollbar = function(){
		$('.review-main-main').mCustomScrollbar({
			theme: "dark",
	        scrollButtons: {
	            enable: true
	        }
		});
	}

	var renderNavigation =function(some_data){
		var nav_template = Handlebars.compile(navTemplate);

		$('.navigation').html(nav_template({
			'json': some_data.source_wise_stats
		}));
	};

	var renderAllCategory = function(some_data){
	
		var all_category_template = Handlebars.compile(allCategoryTemplate);

		$('.review-main-main').html(all_category_template({
			'recent_postive': some_data.recent_positive_reviews,
			'recent_negative': some_data.recent_negative_reviews
		}))
	};

	(function(){
		$('#review-positive').on('click', function(){
			$('.negative').hide();
			$('.positive').show();
			var prev_this = this;
			checkselection(prev_this);
		});

		$('#review-negative').on('click', function(){
			$('.negative').show();
			$('.positive').hide();
			var prev_this = this;
			checkselection(prev_this);
		});
		
		$('#review-all').on('click', function(){
			$('.negative').show();
			$('.positive').show();
			var prev_this = this;
			checkselection(prev_this);
		});

		var checkselection = function(prev_this){
			$('#review-all, #review-positive, #review-negative').removeClass('review-header-items-selected');
			$(prev_this).addClass('review-header-items-selected');
		}
	})();


	var handlesidebar = function(some_data, arr_sidebar){
		$('.select-items').on('click', function(){
			var id = this.id;

			if(id === 'select-0'){
				renderAllCategory(some_data);
			}else{
				for(var i=0;i<some_data.features_data.length;i++){
					if(some_data.features_data[i].name == arr_sidebar[id]){
						 var pos_review = some_data.features_data[i].positive_samples;
						 var neg_review = some_data.features_data[i].negative_samples;
					}
				}

				var common_template = Handlebars.compile(commonTemplate);

				$('.review-main-main').html(common_template({
					'recent_postive': pos_review,
					'recent_negative': neg_review
				}))
				customscrollbar();
			}

			$('.select-items').removeClass('select-selected');
			$(this).addClass('select-selected');
			$('#review-all, #review-positive, #review-negative').removeClass('review-header-items-selected');
			$('#review-all').addClass('review-header-items-selected');

			$('.review-main-main').mCustomScrollbar({
				theme: "dark",
		        scrollButtons: {
		            enable: true
		        }
			});
		});
	};


	var chartController = function(some_data){
		var canvas = document.querySelector('canvas'),
		    ctx    = $("#myChart"),
		    c_labels = [],
			c_data = [] ;

		for(var i=0;i<some_data.time_wise_NPS_stats.length;i++){
			c_labels.push(some_data.time_wise_NPS_stats[i].time);
			c_data.push(some_data.time_wise_NPS_stats[i].nps_score);
		};

		fitToContainer(canvas);

		chartPlotter(c_labels, c_data, ctx);
	};

	function chartModifier(some_data){
		$('.target').on('change', function(){
			var id = parseInt(this.value);

			var ctx = $("#myChart"),
				c_labels = [],
				c_data = [];

			for(var i=0;i<some_data.time_wise_NPS_stats.length;i++){
				if(id == "2016"){
					if((some_data.time_wise_NPS_stats[i].time).indexOf(id)>-1){
						c_labels.push(some_data.time_wise_NPS_stats[i].time);
						c_data.push(some_data.time_wise_NPS_stats[i].nps_score);	
					}
				}else if(id == "2015"){
					if((some_data.time_wise_NPS_stats[i].time).indexOf(id)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 1)>-1){
						c_labels.push(some_data.time_wise_NPS_stats[i].time);
						c_data.push(some_data.time_wise_NPS_stats[i].nps_score);	
					}
				}else if(id == "2014"){
					if((some_data.time_wise_NPS_stats[i].time).indexOf(id)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 1)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 2)>-1){
						c_labels.push(some_data.time_wise_NPS_stats[i].time);
						c_data.push(some_data.time_wise_NPS_stats[i].nps_score);	
					}
				}else if(id == "2013"){
					if((some_data.time_wise_NPS_stats[i].time).indexOf(id)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 1)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 2)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 3)>-1){
						c_labels.push(some_data.time_wise_NPS_stats[i].time);
						c_data.push(some_data.time_wise_NPS_stats[i].nps_score);	
					}
				}else if(id == "2012"){
					if((some_data.time_wise_NPS_stats[i].time).indexOf(id)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 1)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 2)>-1 || (some_data.time_wise_NPS_stats[i].time).indexOf(id + 3)>-1 ||	 (some_data.time_wise_NPS_stats[i].time).indexOf(id + 4)>-1){
						c_labels.push(some_data.time_wise_NPS_stats[i].time);
						c_data.push(some_data.time_wise_NPS_stats[i].nps_score);	
					}
				}
				
			};

			chartPlotter(c_labels, c_data, ctx);
		});

	};

	var chartPlotter = function(c_labels, c_data, ctx){
		var  data = {
			labels: c_labels,
			datasets: [
				{
					/*fillColor: "rgb(206, 243, 252)",
			        strokeColor: "rgba(220,180,0,1)",
			        pointColor: "rgba(220,180,0,1)",*/
			        backgroundColor: "rgba(18, 146, 232,0.4)",
            		borderColor: "rgba(18, 146, 232,1)",
			        data: c_data,
			        lineTension: 0,
				}
			]
		},			 
			 options = {
			 	responsive:true,
			 	legend:{
			 		display:false
			 	},

			 	scales: {
				    xAxes: [{
				                gridLines: {
				                    display : false
				                }
				            }],
				    yAxes: [{
				    			ticks: {
	                                stepSize: 100,
	                                callback: function(label, index, labels) {
								        return label+'%';
								    }
	                            },
				                gridLines: {
				                   color: "rgba(0, 0, 0, 0)",
				                }   
				            }]
				    }
			 };
		var myLineChart = new Chart(ctx , {
			type: "line",
			data: data,
			options: options
		});	
	};

	function fitToContainer(canvas){
	  canvas.style.width='100%';
	  canvas.style.height='100%';
	  canvas.width  = canvas.offsetWidth;
	  canvas.height = canvas.offsetHeight;
	};

	var pieChartController = function(some_data){
		var ctx = $('#myPieChart'),
			p_data= [];

		p_data.push(some_data.overall_stats.positive_count);
		p_data.push(some_data.overall_stats.negative_count);
		p_data.push(some_data.overall_stats.mixed_count);

		var data = {
		    labels: [
		        "Positive",
		        "Negative",
		        "Mixed"
		    ],
		    datasets: [
		        {
		            data: p_data,
		            backgroundColor: [
		                "#74db96",
		                "#db74cf",
		                "#7498db"
		            ],
		            hoverBackgroundColor: [
		                "#74db96",
		                "#db74cf",
		                "#7498db"
		            ]
		        }]
		};

		var options = {
			responsive: true,
    		scaleBeginAtZero: true
		};


		var myPieChart = new Chart(ctx,{
		    type: 'pie',
		    data: data,
		    options: options
		});

	} 

	
	
});



