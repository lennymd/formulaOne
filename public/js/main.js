
// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly_wins');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	var h = Math.floor(window.innerHeight * 0.75);
	step.style('height', h + 'px');

	var figureHeight = window.innerHeight;
	var figureMarginTop = (window.innerHeight - figureHeight) / 2

	figure
		.style('height', figureHeight + 'px')
		.style('top', figureMarginTop + 'px');


	// 3. tell scrollama to update new element dimensions
	scroller.resize();
}

function setupStickyfill() {
	d3.selectAll('.sticky').each(function () {
		Stickyfill.add(this);
	});
}

function init() {
	setupStickyfill();

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	d3.csv("../public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
		var wins = new sucker_chart({
			plot_data: dataset,
			element: "#plot",
			x: "wins",
			filter: 10
		})

		// scrollama event handlers
		function stepEnter(response) {
			const element = d3.select(response.element);
			const index = Number(element.attr("data-step"));
			const section = Number(element.attr("section-index"));	
			// add color to current step only
			step.classed('is-active', function (d, i) {
				return i === response.index;
			})
			if (index === 3) {
				wins.update("win_percentage", true, 10);
			}
			// update graphic based on step
			// figure.select('p').text(response.index + 1);
		}

		scroller.setup({
		step: '#scrolly_wins article .step',
		offset: 0.5,
		debug: false,
	})
		.onStepEnter(stepEnter)


	})
	


	// setup resize event
	window.addEventListener('resize', handleResize);
}

// kick things off
init();
