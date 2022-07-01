// set the dimensions and margins of the graph
var margin = { top: 40, right: 100, bottom: 0, left: 100 },
	width = window.innerWidth - margin.left - margin.right,
	height = window.innerHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#m1")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

var rowConversion = function (d) {
	return {
		year: +d.year,
		constructor_clean: d.constructor_clean,
		wins: +d.wins,
		run: d.run,
		races: +d.races,
		win_percentage: +d.win_percentage
	}
};


d3.csv("../../public/data/win_count_normalized.csv", rowConversion, function (data) {
	data.sort(function (b, a) {
		return a.wins - b.wins;
	});

	// ferrari reds "#D40000" "#DC0300"
	var color = d3.scaleOrdinal()
		.domain(["Ferrari", "McLaren", "Williams", "Mercedes", "Lotus", "Red Bull", "Brabham", "Renault", "Cooper", "Benetton", "Tyrrell", "Alfa Romeo", "BRM", "Matra", "Brawn GP", "Maserati"])
		.range(["#DC0300", "#FB8703", "#FFFFFF", "#2ED2BE", "#555", "#2041FF", "#F4D258", "#FDF503", "#004225", "#2086C0", "#800080", "#9B0502", "#8b4513", "#f08080", "#80f080", "#ff682a"])

	var x = d3.scaleLinear()
		.domain([0, 20])
		.range([0, width]);

	svg.append("g")
		// .attr("transform", "translate(0," + height + ")")
		.call(d3.axisTop(x))
		.selectAll("text")
		.attr("transform", "translate(0,0)rotate(0)")
		.style("text-anchor", "center");

	var y = d3.scaleBand()
		.range([0, height])
		.domain(data.map(function (d) { return d.run; }))
		.padding(5);

	svg.append("g")
		.call(d3.axisLeft(y));

	var lines = svg.selectAll("mylines")
		.data(data)
		.enter()
		.append("line")
		.attr("x1", function (d) { return x(d.wins); })
		.attr("x2", x(0))
		.attr("y1", function (d) { return y(d.run); })
		.attr("y2", function (d) { return y(d.run); })
		.attr("stroke", "grey")

	var circles = svg.selectAll("mycircles")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function (d) { return x(d.wins); })
		.attr("cy", function (d) { return y(d.run); })
		.attr("r", "4")
		.style("fill", function (d) { return color(d.constructor_clean); })
		.attr("stroke", "black")

})