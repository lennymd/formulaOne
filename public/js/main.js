// initialize the big variables
var main = d3.select("main");

var scrolly0 = main.select("#scrolly_bubbles"),
	figure_bubbles = scrolly0.select("figure"),
	steps_bubbles = scrolly0.select("article")
							.selectAll(".step");

// var scrolly1 = main.select("#scrolly_wins"),
// 	figure_wins = scrolly1.select("figure"),
// 	steps_wins = scrolly1.select("article")
// 						.selectAll(".step");

var scroller_drivers = scrollama(),
	scroller_wins = scrollama();


function handleResize() {
	// this should handle window size changing
	var h = Math.floor(window.innerHeight * 0.75);
	steps_bubbles.style('height', h + 'px');
	var figureWidth= window.innerWidth;
	var figureMarginTop = 0;

	figure_bubbles
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');

	scroller_drivers.resize();
}

function setupStickyfill() {
	// add stickyfill to all the figures
	// d3.selectAll('figure').each(() => Stickyfill.add(this));
}

function init() {
	// do all the loading and stuff here

	// run this before anything
	setupStickyfill();

	// force a resize to make sure things are most up to date
	handleResize();

	// work with bubble chart
	scroller_drivers.setup({
		step: '#scrolly_bubbles article .step',
		offset: 0.5,
		debug: false
	})
		.onStepEnter(stepEnter_bubble)
		.onStepExit(stepExit_bubble);
	
	
		
	// load wins stuff
	d3.csv("public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
		var win_analysis = new sucker_chart({
			plot_data: dataset,
			element: "#win_plot",
			x: "wins",
			y: "run_id"
		})

		scroller_wins.setup({
			step:"#scrolly_win article .step",
			offset: 0.5,
			debug: false
		})
			.onStepEnter(stepEnter_bubble)
			.onStepExit(stepExit_bubble);

	})



	// resize things
	window.addEventListener('resize', handleResize);
}

// set things in motion
init();