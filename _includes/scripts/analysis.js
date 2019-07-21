d3.csv("public/data/overall_analysis_v2.csv", row_converter, (dataset) => {
	var win_analysis = new sucker_chart({
		plot_data: dataset,
		element: "#win_plot",
		x: "wins",
		filter: 10,
		ascending: false
	})

	// var podium_analysis = new sucker_chart({
	// 	plot_data: dataset,
	// 	element: "#podium_plot",
	// 	x: "podiums",
	// 	filter: 10,
	// 	ascending: false
	// })

	// var averages_analysis = new sucker_chart({
	// 	plot_data: dataset,
	// 	element: "#average_plot",
	// 	x: "p_average",
	// 	filter: 10,
	// 	ascending: true
	// })

	{% include scripts/scroller_wins.js %}

});