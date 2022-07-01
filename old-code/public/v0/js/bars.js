var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = window.innerWidth - margin.left - margin.right,
	height = window.innerHeight - margin.top - margin.bottom,
	w = width + margin.left + margin.right,
	h = height + margin.top + margin.bottom;

var svg = d3.select("#stacked")
			.append("svg")
			.attr("viewBox", [0, 0, w, h])
			.attr("class", "bar_stack")
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

var y = d3.scaleBand()
			.rangeRound([0, height])
			.paddingInner(0.05)
			.align(0.1);

var x = d3.scaleLinear()
			.rangeRound([0, width]);

var z = d3.scaleOrdinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var row_converter = (d, i, columns) => {
	for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
	d.total = t;
	return d;
}
d3.csv("https://raw.githubusercontent.com/lennymartinez/newhousevis-capstone/master/v0/public/data/constructor_winners.csv", row_converter, (error, data) => {
	if (error) throw error;
	
	var keys = data.columns.slice(1);
	
	data.sort((a, b) => b.total - a.total);

	y.domain(data.map( (d) => d.team ));
	x.domain([0, d3.max(data, (d) => d.total)]).nice();
	z.domain(keys);

	svg.append("g")
		.selectAll("g")
		.data(d3.stack().keys(keys)(data))
		.enter()
		.append("g")
		.attr("fill", (d) => z(d.key))
		.selectAll("rect")
		.data((d) => d)
		.enter()
		.append("rect")
		.attr("y", (d) => y(d.data.team))
		.attr("x", (d) => x(d[0]))
		.attr("width", (d) => x(d[1]) - x(d[0]))
		.attr("height", y.bandwidth());

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, 0)")
		.call(d3.axisLeft(y));
	
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(x).ticks(null, "s"))
		.append("text")
		.attr("y", 2)
		.attr("x", x(x.ticks().pop()) + 0.5)
		.attr("dy", "0.32em")
		.attr("fill", "#000")
		.attr("font-weight", "bold")
		.attr("text-anchor", "start")
		.text("Population")
		.attr("transform", "translate("+ (-width) +",-10)");

// var legend = g.append("g")
// .attr("font-family", "sans-serif")
// .attr("font-size", 10)
// .attr("text-anchor", "end")
// .selectAll("g")
// .data(keys.slice().reverse())
// .enter().append("g")
// //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
// .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });

// legend.append("rect")
// .attr("x", width - 19)
// .attr("width", 19)
// .attr("height", 19)
// .attr("fill", z);

// legend.append("text")
// .attr("x", width - 24)
// .attr("y", 9.5)
// .attr("dy", "0.32em")
// .text(function(d) { return d; });
});
