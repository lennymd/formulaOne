var row_converter = function(d) {
	return {
		run_id: d.run_id,
		year: +d.year,
		team: d.team,
		wins: +d.wins,
		rank_wins: +d.rank_win,
		win_percentage: +d.win_percentage,
		rank_win_percentage: +d.rank_win_percentage,
		podiums: +d.podium_spots_claimed,
		rank_podiums: +d.rank_podiums,
		podium_percentage: +d.podium_percentage,
		rank_podium_percentage: +d.rank_podium_percentage,
		p_average: +d.p_average,
		rank_p_average: +d.rank_p_average
	}
};

d3.csv("public/data/overall_analysis_v2.csv", row_converter, (data) => {
	var win_analysis = new sucker_chart({
		plot_data: data,
		element: "#win_plot",
		col: "wins",
		rank: "rank_wins"
	})

	win_analysis.draw();
})

var main = d3.select('main');
var scrolly = main.select('#scrolly_wins');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
// 1. update height of step elements
var stepH = Math.floor(window.innerHeight * 0.75);
step.style('height', stepH + 'px');

var figureHeight = window.innerHeight;
var figureMarginTop = 0;

figure
// .style('height', figureHeight + 'px')
.style('top', figureMarginTop + 'px');


// 3. tell scrollama to update new element dimensions
scroller.resize();
}

// scrollama event handlers
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

function setupStickyfill() {
	d3.selectAll('.sticky').each(() => Stickyfill.add(this));
}

function init() {
setupStickyfill();

// 1. force a resize on load to ensure proper dimensions are sent to scrollama
handleResize();

// 2. setup the scroller passing options
// 		this will also initialize trigger observations
// 3. bind scrollama event handlers (this can be chained like below)
scroller.setup({
step: '#scrolly article .step',
offset: 0.5,
debug: false,
})
.onStepEnter(handleStepEnter)
.onStepExit(handleStepExit);


// setup resize event
window.addEventListener('resize', handleResize);
}

// kick things off
init();