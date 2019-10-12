var div = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

var chart = d3.select("#championship_chart");

var converter = (d) => {
	return {
		team: d.team,
		start: +d.start,
		end: +d.end
	}
}

var converter2 = (d) => {
	return {
		team: d.team,
		year: +d.year,
		driver: d.driver,
	}
}



var color = d3.scaleOrdinal()
				.domain(
					["Ferrari", "McLaren",
						"Williams", "Mercedes",
						"Lotus", "Red Bull",
						"Brabham", "Renault",
						"Cooper", "Benetton",
						"Tyrrell", "Alfa Romeo",
						"BRM", "Matra",
						"Brawn GP", "Maserati"]
				)
				.range(
					["#DC0300", "#FB8703",
						"#2086C0", "#2ED2BE",
						"#555555", "#2041FF",
						"#F4D258", "#FDF503",
						"#004225","#00A204",
						"#800080", "#9B0502",
						"#8b4513", "#f08080",
						"#80f080", "#ff682a"]);
var winners;
d3.csv("https://lennymartinez.com/newhousevis-capstone/v0/public/data/winners_annual.csv", converter2, (data) => winners = data);

function draw() {
	d3.csv("https://lennymartinez.com/newhousevis-capstone/v0/public/data/teams_active_years.csv", converter, (dataset) => {

	if (window.innerWidth > 800) {
		var w = window.innerWidth,
			h = 900;

		var margin = {top: 15, right: 60, bottom: 60, left: 110},
			width = w - margin.left - margin.right,
			height = h - margin.top - margin.bottom;

		var svg = chart.append("svg")
			.attr("viewBox", `0 0 ${w} ${h}`)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);
		// scales
		var x = d3.scaleLinear()
		.domain([1950, 2020])
		.range([0, width])
		.clamp(true)
		.nice();

		var y = d3.scaleBand()
			.domain(dataset.map( (d) => d.team))
			.range([0, height])
			.padding(1);
		// create axes
		var x_axis = svg.append("g")
				.attr("class", "x axis")
				.call(d3.axisBottom(x).tickFormat(d3.format("d")).tickSize(height))
				.selectAll("text")
				.attr("class", "axis_text")
				.style("text-align", "middle");

		var y_axis = svg.append("g")
				.attr("class", "y axis")
				.call(d3.axisLeft(y))
				.attr("transform", `translate(-10, 0)`)
				.selectAll("text")
				.attr("class", "axis_text")
				.style("text-anchor", "end");

		// draw lines
		var lines = svg.selectAll("active_years")
				.data(dataset)
				.enter()
				.append("line")
				.attr("x1", (d) => x(d.start))
				.attr("x2", (d) => x(d.end))
				.attr("y1", (d) => y(d.team))
				.attr("y2", (d) => y(d.team))
				.attr("opacity", "0.6")
				.attr("stroke-width", "10")
				.attr("stroke", (d) => color(d.team))
				.attr("class", "active_years");

		var champions = svg.selectAll("winners")
					.data(winners)
					.enter()
					.append("text")
					.attr("class", "trophy")
					.attr("x", d => x(d.year))
					.attr("y", d => y(d.team))
					.attr("text-anchor", "middle")
					.attr("dominant-baseline", "middle")
					.attr('font-family', 'FontAwesome')
					.attr('font-size', "19px")
					.attr("fill", d=> color(d.team))
					.attr("stroke-width", "0.5")
					.attr("stroke", "#000000")
					.text(d => "\uf091");

			} else {
				// make it vertical
				var w = 800,
					h = 1000;

				var margin = {top: 125, right: 60, bottom: 30, left: 50},
					width = w - margin.left - margin.right,
					height = h - margin.top - margin.bottom;
				
				var svg = chart.append("svg")
					.attr("viewBox", `0 0 ${w} ${h}`)
					.append('g')
					.attr('transform', `translate(${margin.left},${margin.top})`);
					var y = d3.scaleLinear()
					.domain([1950, 2020])
					.range([0, height])
					.clamp(true)
					.nice();

				var x = d3.scaleBand()
							.domain(dataset.map( (d) => d.team))
							.range([0, width])
							.padding(1);
				// create axes
				var y_axis = svg.append("g")
								.attr("class", "x axis")
								.call(d3.axisLeft(y).tickFormat(d3.format("d")).tickSize(-width))
								.selectAll("text")
								.attr("transform", `translate(-10, 0)`)
								.attr("class", "axis_text")
								.style("text-align", "middle");

				var x_axis = svg.append("g")
								.attr("class", "y axis")
								.call(d3.axisTop(x))
								.selectAll("text")
								.attr("transform", `rotate(-45) translate(${1* margin.left/2}, ${-10})`)
								.attr("class", "axis_text")
								.style("text-anchor", "middle");
				
				// draw lines
				var lines = svg.selectAll("active_years")
								.data(dataset)
								.enter()
								.append("line")
								.attr("y1", (d) => y(d.start))
								.attr("y2", (d) => y(d.end))
								.attr("x1", (d) => x(d.team))
								.attr("x2", (d) => x(d.team))
								.attr("opacity", "0.6")
								.attr("stroke-width", "10")
								.attr("stroke", (d) => color(d.team))
								.attr("class", "active_years");
			
				var champions = svg.selectAll("winners")
									.data(winners)
									.enter()
									.append("text")
									.attr("class", "trophy")
									.attr("y", d => y(d.year))
									.attr("x", d => x(d.team))
									.attr("text-anchor", "middle")
									.attr("dominant-baseline", "middle")
									.attr('font-family', 'FontAwesome')
									.attr('font-size', "19px")
									.attr("fill", d=> color(d.team))
									.attr("stroke-width", "0.5")
									.attr("stroke", "#000000")
									.text(d => "\uf091");
			}
	

	champions.on("mouseover", (d) => {
		div.transition()
			.duration(200)
			.style("opacity", 1);
		div.html("<strong>" + d.year +"</strong><br><span>" + d.driver + "</span>")
			// .style("width", d.driver.length*100 + "px")
			.style("left", () => {
				let x = d3.event.pageX;
				let bar = window.innerWidth * .5;
				if (x < bar ) {
					return x + "px";
				} else {
					return (x - (550/3)) + "px";
				} 
			})
			.style("top", (d3.event.pageY - 28) + "px");
	})
	.on("mouseout", (d) => {
		div.transition()
			.duration(500)
			.style("opacity", 0);
	});
	})
}

draw();

window.addEventListener('resize', () => {
	chart.html("");
	draw();
});