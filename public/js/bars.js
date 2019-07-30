var margin = {top: 30, right: 10, bottom: 0, left: 30},
	width = window.innerWidth - margin.left - margin.right,
	height = window.innerHeight - margin.top - margin.bottom;

var svg = d3.select("#stacked")
			.append("svg")
			.attr("viewBox", [0, 0, width, height])
			.append("g")
			.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

var data = (await d3.csv("https://gist.githubusercontent.com/mbostock/5429c74d6aba68c52c7b39642c98deed/raw/50a5157a1d920191b0a7f636796ee721047cbb92/us-population-state-age.csv", (d, i, columns) => (d3.autoType(d), d.total = d3.sum(columns, c => d[c]), d))).sort((a, b) => b.total - a.total);

var series = d3.stack().keys(data.columns.slice(1))(data);

var x = d3.scaleLinear()
			.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
			.range([margin.left, width - margin.right]);

var y = d3.scaleBand()
			.domain(data.map(d => d.name))
			.range([margin.top, height - margin.bottom])
			.padding(0.1);

var xAxis = g => g.attr("transform", `translate(0,${margin.top})`)
					.call(d3.axisTop(x).ticks(width / 100, "s"))
					.call(g => g.selectAll(".domain").remove());

var yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
					.call(d3.axisLeft(y).tickSizeOuter(0))
					.call(g => g.selectAll(".domain").remove());

svg.append("g")
	.selectAll("g")
	.data(series)
	.join("g")
	.attr("fill", d => color(d.key))
	.selectAll("rect")
	.data(d => d)
	.join("rect")
	.attr("x", d => x(d[0]))
	.attr("y", (d, i) => y(d.data.name))
	.attr("width", d => x(d[1]) - x(d[0]))
	.attr("height", y.bandwidth());

svg.append("g")
	.call(xAxis);

svg.append("g")
	.call(yAxis);