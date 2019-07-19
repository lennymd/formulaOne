Stickyfill.add(d3.select('.sticky').node())
var scroller = scrollama();

var correct_data_types = (d) => {
	return {
		year: +d.year,
		constructor_clean: d.constructor_clean,
		wins: +d.wins,
		run: d.run,
		races: +d.races,
		win_percentage: +d.win_percentage
	}
}

d3.csv("../../public/data/win_count_normalized.csv", correct_data_types, (dataset) => {

	// create the plot for the section
	var plot = new sucker_chart({
		plot_data: dataset,
		element: "#m1",
		normalize: 0,
		x: "wins",
		y: "run"
	})

	// start scrollytelling component
	function step_enter(response) {
		const el = d3.select(response.element);
		const i = Number(el.attr("data-index"));
		if (response.direction === "down") {
			if (i === 1) {
			} else if (i === 2) {
				plot.norm("win_percentage");
			} else if (i === 3) {
				// plot.reset("wins");

			}
		} else {
			//response.direction === up
			if (i === 0) {
				// plot.reset("wins");
			} else if (i === 1) {
				plot.reset("wins");
				console.log(i, "resetting")
			} else if (i === 2) {
				plot.norm("win_percentage");
			} else if (i === 3) {
				// plot.reset("wins");
			}
		}
	}

	function step_exit(response) {
		const el = d3.select(response.element);
		const i = Number(el.attr("data-index"));
	}

	scroller.setup({
		step: ".step",
		debug: true,
		offset: 0.55
	})
	.onStepEnter(step_enter)
	.onStepExit(step_exit);


	window.addEventListener('resize', scroller.resize());

});

var scroller = scrollama();
const container = d3.select('#scrolly-overlay');
const stepSel = container.selectAll('.step');

function handleStepEnter(response) {

}

function handleStepExit(response) {

}




