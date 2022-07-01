// initialize the big variables
var main = d3.select("main");

var scrolly1 = main.select("#scrolly_wins"),
	figure_wins = scrolly1.select("figure"),
	steps_wins = scrolly1.select("article").selectAll(".step");


var scroller_wins = scrollama();


function handleResize() {
	// this should handle window size changing
	var h = Math.floor(window.innerHeight * 0.75);
	steps_wins.style("height", h + "px");

	var figureHeight= window.innerHeight / 2;
	var figureMarginTop = (window.innerHeight - figureHeight) / 2;
	
	figure_wins
		.style('width', figureHeight + 'px')
		.style('top', figureMarginTop + 'px');

	scroller_wins.resize();
}

function setupStickyfill() {
	// add stickyfill to all the figures
	d3.selectAll('.sticky').each(() => Stickyfill.add(this));
}

function init() {
	// do all the loading and stuff here

	// run this before anything
	setupStickyfill();

	// force a resize to make sure things are most up to date
	handleResize();

	// load wins stuff
	d3.csv("public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
		var win_analysis = new sucker_chart({
			plot_data: dataset,
			element: "#win_plot",
			x: "wins",
			filter: 10
		})

		function stepEnter(response) {
			const element = d3.select(response.element);
			const index = Number(element.attr("data-step"));
			const section = Number(element.attr("section-index"));
			if (response.direction === "down") {
				if (section === 1 ){
					//do stuff
					// console.log(section, index, "enter");
					if (index === 1) {
						//update to be about win percentages
						win_analysis.update("win_percentage", true, 10);
					}
				} else if (section === 2 ){
					//do stuff
					console.log(section, index, "enter");
					if (index === 1) {
						//update to be about win percentages
						// podium_analysis.update("podium_percentage", true, 10);
					}
				} else {
					// section ==== 3
					console.log("wrong section");
				}
			} else {
				// direction is up
				console.log(response.direction)
				if (section === 1 ){
					//do stuff
					// console.log(section, index, "enter");
					if (index === 0) {
						//update to be about win percentages
						win_analysis.update("wins", false, 10);

					}
				} else if (section === 2 ){
					//do stuff
					console.log(section, index, "enter");
					if (index === 0) {
						//update to be about win percentages
						// podium_analysis.update("podiums", false, 11);
					}
				} else {
					// section ==== 3
					console.log("wrong section");
				}
			}
			
		}

		function stepExit(response) {
			const element = d3.select(response.element);
			const index = Number(element.attr("data-step"));
			const section = Number(element.attr("section-index"));
			if (response.direction === "up") {
				if (section === 1 ){
					//do stuff
					// console.log(section, index, "enter");
					if (index === 1) {
						//update to be about win percentages
						win_analysis.update("wins", false, 10);
					}
				} else if (section === 2 ){
					//do stuff wit podiums
					console.log(section, index, "exit");
					if (index === 1) {
						//update to be about win percentages
						// podium_analysis.update("podiums", false, 10);
					}
				} else {
					console.log("wrong section");
				}
			} else {
				console.log(response.direction)
			}
		}




		scroller_wins.setup({
			step:"#scrolly_wins article .step",
			offset: 0.5,
			debug: false
		})
			.onStepEnter(stepEnter)
			.onStepExit(stepExit);
	})



	// resize things
	window.addEventListener('resize', handleResize);
}

// set things in motion
init();