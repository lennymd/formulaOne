---
---
// row converter for csv processing
{% include scripts/row_converter.js %}

// setup for all the sections
{% include scripts/setup.js %}

{% include scripts/setupStickyfill.js %}

{% include scripts/bubbles.js %}

// handleResize

// handleStepEnter

// handleStepExit


d3.csv("public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
	setupStickyfill();
	var win_analysis = new sucker_chart({
		plot_data: dataset,
		element: "#win_plot",
		x: "wins",
		filter: 10,
		ascending: false
	})

	var podium_analysis = new sucker_chart({
		plot_data: dataset,
		element: "#podium_plot",
		x: "podiums",
		filter: 10,
		ascending: false
	})

	var averages_analysis = new sucker_chart({
		plot_data: dataset,
		element: "#average_plot",
		x: "p_average",
		filter: 10,
		ascending: true
	})
	
	function handleResize() {
		// 1. update height of step elements
		var stepH = Math.floor(window.innerHeight * 0.75);
		steps_bubble.style('height', stepH + 'px');
		steps_wins.style('height', stepH + 'px');
		steps_podiums.style('height', stepH + 'px');
		steps_averages.style('height', stepH + 'px');
		
		// 2. update figure sizing
		// let margin = { top: 50, right: 60, bottom: 50, left: 150};
		// var figureWidth = window.innerWidth + margin.left + margin.right;
		// var figureHeight = window.innerHeight + margin.top + margin.bottom;
	
		var figureMarginTop = 0;
		
		figure_bubble.style('top', figureMarginTop + 'px');
		// .attr("viewBox", `0 0 ${figureWidth} ${figureHeight}`)
			
		figure_wins.style('top', figureMarginTop + 'px');
			// .attr("viewBox", `0 0 ${figureWidth} ${figureHeight}`)
			
		figure_podiums.style('top', figureMarginTop + 'px');
			// .attr("viewBox", `0 0 ${figureWidth} ${figureHeight}`)
			
		figure_averages.style('top', figureMarginTop + 'px');
			// .attr("viewBox", `0 0 ${figureWidth} ${figureHeight}`)
		
		// 3. tell scrollama to update new element dimensions
		scroller_wins.resize();
		scroller_podiums.resize();
		scroller_averages.resize();
		// 4. redraw the charts
		win_analysis.draw();
		podium_analysis.draw();
		averages_analysis.draw();
		console.log("resize");
	}
	
	function handleStepEnter(response) {
		const el = d3.select(response.element);
		const index = Number(el.attr("data-step"));
		// console.log(response.element, index, response.direction);
	
		if (response.direction === "down") {
			el.classed("is-active", true);
		}
	}
	
	function handleStepExit(response) {
		const el = d3.select(response.element);
		const index = Number(el.attr("data-step"));
		// console.log(response.element, index, response.direction);
	
		if (response.direction === "up") {
			el.classed("is-active", false);
		}
	}
	scroller_wins.setup({
		step: '#scrolly_wins article .step',
		offset: 0.5,
		debug: false,
	})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);
	
	
	window.addEventListener('resize', handleResize);
});

// // initialize the scrollama
// var scroller = scrollama();

// // generic window resize listener event
// function handleResize() {
// // 1. update height of step elements
// var stepH = Math.floor(window.innerHeight * 0.75);
// step.style('height', stepH + 'px');

// var figureHeight = window.innerHeight;
// var figureMarginTop = 0;

// figure
// // .style('height', figureHeight + 'px')
// .style('top', figureMarginTop + 'px');


// // 3. tell scrollama to update new element dimensions
// scroller.resize();
// }

// // scrollama event handlers
// function handleStepEnter(response) {
// 	const el = d3.select(response.element);
// 	const index = Number(el.attr("data-step"));
// 	// console.log(response.element, index, response.direction);

// 	if (response.direction === "down") {
// 		el.classed("is-active", true);
// 	}
// }

// function handleStepExit(response) {
// 	const el = d3.select(response.element);
// 	const index = Number(el.attr("data-step"));
// 	// console.log(response.element, index, response.direction);

// 	if (response.direction === "up") {
// 		el.classed("is-active", false);
// 	}
// }

// // function setupStickyfill() {
// // 	d3.selectAll('.sticky').each(() => Stickyfill.add(this));
// // }

// function init() {
// // setupStickyfill();

// // 1. force a resize on load to ensure proper dimensions are sent to scrollama
// handleResize();

// // 2. setup the scroller passing options
// // 		this will also initialize trigger observations
// // 3. bind scrollama event handlers (this can be chained like below)
// scroller.setup({
// step: '#scrolly article .step',
// offset: 0.5,
// debug: false,
// })
// .onStepEnter(handleStepEnter)
// .onStepExit(handleStepExit);


// // setup resize event
// window.addEventListener('resize', handleResize);
// }

// // kick things off
// init();