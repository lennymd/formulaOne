// initialize the big variables
var main = d3.select("main");

var scrolly0 = main.select("#scrolly_bubbles");
var figure_bubbles = scrolly0.select('figure');
var steps_bubbles = scrolly0.selectAll("article .step");

var scroller_drivers = scrollama();

function handleResize() {
	// this should handle window size changing
	var h = Math.floor(window.innerHeight * 0.75);
	steps_bubbles.style('height', stepH + 'px');
	var figureWidth= window.innerWidth;
	var figureMarginTop = 0;

	figure_bubbles
		.style('width', figureWidth + 'px')
		.style('top', figureMarginTop + 'px');
}

function setupStickyfill() {
	// add stickyfill to all the figures
}

function init() {
	// do all the loading and stuff here

	// run this before anything
	setupStickyfill();

	// force a resize to make sure things are most up to date
	handleResize();

	// load bubble stuff

	// load wins stuff
}

// set things in motion
init();