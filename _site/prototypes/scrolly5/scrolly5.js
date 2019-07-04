Stickyfill.add(d3.select('.sticky').node())
var scroller = scrollama();

var correct_data_types_wins = (d) => {
	return {
		year: +d.year,
		constructor_clean: d.constructor_clean,
		wins: +d.wins,
		run: d.run,
		races: +d.races,
		win_percentage: +d.win_percentage
	}
}

var correct_data_types_podiums = (d) => {
	return {
		year: +d.year,
		constructor_clean: d.constructor_clean,
		podiums: +d.podiums,
		races: +d.races,
		available_podium_spots: +d.available_podium_spots,
		podium_percentage: +d.podium_percentage
	}
}

d3.csv("../../public/data/podium_count_normalized.csv", correct_data_types_podiums, (dataset) => {

	// create the plot for the section
	var podium = new sucker_chart({
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
				// do nothing
			} else if (i === 2) {
				podium.norm("podium_percentage");
			} else if (i === 3) {
				// do nothing

			}
		} else {
			//response.direction === up
			if (i === 0) {
				// do nothing
			} else if (i === 1) {
				podium.reset("podiums");
				// console.log(i, "resetting")
			} else if (i === 2) {
				// plot.norm("win_percentage");
			} else if (i === 3) {
				// do nothing
			}
		}
	}

	function step_exit(response) {
		const el = d3.select(response.element);
		const i = Number(el.attr("data-index"));
	}

	scroller.setup({
		step: ".step",
		debug: false,
		offset: 0.55
	})
	.onStepEnter(step_enter)
	.onStepExit(step_exit);


	window.addEventListener('resize', scroller.resize());

});