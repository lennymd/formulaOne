Stickyfill.add(d3.select('.sticky').node())
var scroller = scrollama();
window.addEventListener('resize', scroller.resize());


var row_converter = (d) => {
	return {
		year: +d.year,
		team: d.team,
		wins: +d.wins,
		races: +d.races,
		win_percentage: +d.win_percentage,
		podiums: +d.podiums,
		podium_percentage: +d.podium_percentage,
		run_id: d.run_id
	}
}

d3.csv("../../public/data/win_and_podium_analysis.csv", row_converter, (dataset) => {

	// create the plot for the section
	var plot_wins = new sucker_chart({
		plot_data: dataset,
		element: "#m1",
		x: "wins",
		y: "run_id"
	})

	var plot_podiums = new sucker_chart({
		plot_data: dataset,
		element: "#m2",
		x: "podiums",
		y: "run_id"
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