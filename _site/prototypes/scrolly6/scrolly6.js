Stickyfill.add(d3.select('.sticky').node())
var scroller = scrollama();
window.addEventListener('resize', scroller.resize());


var row_converter = (d) => {
	return {
		year: +d.year,
		constructor_clean: d.constructor_clean,
		run: d.run,
		races: +d.races,
		wins: +d.wins,
		podiums: +d.podiums,
		available_podium_spots: +d.available_podium_spots,
		win_percentage: +d.win_percentage,
		podium_percentage: +d.podium_percentage
	}
}

d3.csv("../../public/data/wins_and_podiums.csv", row_converter, (dataset) => {

	// create the plot for the section
	var plot_wins = new sucker_chart({
		plot_data: dataset,
		element: "#m1",
		normalize: 0,
		x: "wins",
		y: "run"
	})

	var plot_podiums = new sucker_chart({
		plot_data: dataset,
		element: "#m2",
		normalize: 2,
		x: "podiums",
		y: "run"
	})

	// start scrollytelling component
	function step_enter(response) {
		const el = d3.select(response.element);
		const i = Number(el.attr("data-index"));
		if (response.direction === "down") {
			if (i === 1) {
				plot_wins.norm("win_percentage");
			} else if (i === 2) {
				plot_podiums.norm("podium_percentage");
			}
		}
	}

	function step_exit(response) {
		const el = d3.select(response.element);
		const i = Number(el.attr("data-index"));

		if (response.direction === "up") {
			if (i === 1) {
				plot_wins.reset("wins");
			} else if (i === 2) {
				plot_podiums.reset("podiums");
			}
		}
	}

	scroller.setup({
		step: ".step",
		debug: false,
		offset: 0.5
	})
	.onStepEnter(step_enter)
	.onStepExit(step_exit);



});