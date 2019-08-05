class sucker_chart {

	constructor(opts) {
		// these are the inputs: the data we're working with, and the element we're loading the chart into.
		this.data = opts.plot_data;
		this.base_data = opts.plot_data;
		this.element = opts.element;
		this.x = opts.x;
		this.y = "run_id";
		this.rank = "rank_" + this.x;
		this.filter = opts.filter;
		// this.filter = 99;
		this.normalize = false;
		this.duration = 1000;
		this.duration_scale = 0.2;


		this.init();
	}
	organize_data() {
		let sorted_data = this.base_data.sort((b, a) => b[this.rank] - a[this.rank]);
		this.data = sorted_data.filter((d) => d[this.rank] < this.filter + 1);
	}
	init() {
		this.margin = {
			top: 50,
			right: 50,
			bottom: 0,
			left: 100};

		this.width = window.innerWidth/2 - this.margin.left - this.margin.right;
		this.height = window.innerHeight - this.margin.bottom - this.margin.top;
		
		// Set up the place we're drawing the plot and also create the SVG.
		var anchor = d3.select(this.element);
		// clear whatever was in the anchor before 
		// anchor.html("");
		this.w = this.width + this.margin.left + this.margin.right;
		this.h = this.height + this.margin.top + this.margin.bottom

		this.svg = anchor.append("svg")
					// .attr("width", this.width + this.margin.left + this.margin.right)
					// .attr("height", this.height + this.margin.top + this.margin.bottom)
					.attr("viewBox", `0 0 ${this.w} ${this.h}`)
					.append('g')
					.attr('transform', `translate(${this.margin.left},${this.margin.top})`);
		
		// sort by ascending rank, and then filter to the top n 


		this.organize_data(this.filter);
		this.create_scales();
		this.create_axes();
		this.create_shapes();
	}

	create_scales() {
		//make the scales
		let k;
		if (this.normalize) {
			k = 100;
		} else {
			k = Math.floor(
					d3.max(this.data, (d) => d[this.x]) * 1.2
				);
		}

		this.x_scale = d3.scaleLinear()
							.domain([0, k])
							.range([0, this.width])
							.clamp(true)
							.nice();
		
		this.y_scale = d3.scaleBand()
							.domain(this.data.map( (d) => d[this.y]))
							.range([0, this.height])
							.padding(5);
	}
	
	create_axes() {
		// add axes
		var tick_format;
		if (this.normalize) {
			tick_format = ".0%"
		} else {
			tick_format = "0"
		}
		this.x_axis = this.svg.append("g")
						.attr("class", "x axis")
						.call(
							d3.axisTop(this.x_scale)
								.tickFormat(d3.format(tick_format)))
						.selectAll("text")
						.attr("class", "axis_text")
						.style("text-anchor", "center");
		
		this.y_axis = this.svg.append("g")
						.attr("class", "y axis")
						.call(d3.axisLeft(this.y_scale))
						.selectAll("text")
						.attr("class", "axis_text")
						.style("text-anchor", "center");
	}

	create_shapes() {
		this.color = d3.scaleOrdinal()
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
					"#FFFFFF", "#2ED2BE",
					"#555555", "#2041FF",
					"#F4D258", "#FDF503",
					"#004225", "#2086C0",
					"#800080", "#9B0502",
					"#8b4513", "#f08080",
					"#80f080", "#ff682a"]);

		var bars = this.svg.selectAll("bars")
							.data(this.data)
							,enter()
							.append("rect")

		// var lines = this.svg.selectAll("lines")
		// 				.data(this.data)
		// 				.enter()
		// 				.append("line")
		// 				.attr("x1", (d) => this.x_scale(d[this.x]))
		// 				.attr("x2", this.x_scale(0))
		// 				.attr("y1", (d) => this.y_scale(d[this.y]))
		// 				.attr("y2", (d) => this.y_scale(d[this.y]))
		// 				.attr("stroke-width", "3")
		// 				.attr("stroke", "black")
		// 				.attr("class", (d) => "line "+ d.team.toLowerCase());
		
		var circles = this.svg.selectAll("circles")
							.data(this.data)
							.enter()
							.append("circle")
							.attr("cx", (d) => this.x_scale(d[this.x]))
							.attr("cy", (d) => this.y_scale(d[this.y]))
							.attr("r", "10")
							.style("fill", (d) => this.color(d.team))
							.attr("stroke-width", "1")
							.attr("stroke", "#171717")
							.attr("class", (d) => "circle " + d.team.toLowerCase());
	}

	set_data(new_data) {
		this.data = new_data;
		this.init();
	}

	sort(column) {
		var sorted;
		if (this.ascending) {
			sorted = this.data.sort((b, a) => b[column] - a[column]);
		} else {
			sorted = this.data.sort((b, a) => a[column] - b[column]);
		}

		this.data = sorted;
	}

	norm(column) {
		this.normalize = true;
		this.x = column;
		this.sort(this.x);
	}

	reset(column) {
		this.normalize = false;
		this.x = column;
		this.sort(this.x);
	}

	update(column, normalize, filter) {
		// set new data
		this.x = column;
		this.rank = "rank_" + this.x;
		this.normalize = normalize;
		this.filter = filter;

		// filter out data for the graphic
		this.organize_data();
		// console.log(this.data);
		// update the x-scale and y-scale
		this.create_scales();

		// update the x-axis
		this.svg.select(".x.axis")
				.transition()
				.duration(this.duration)
				.call(d3.axisTop(this.x_scale))

		this.svg.select(".y.axis")
				.transition()
				.duration(this.duration)
				.call(d3.axisLeft(this.y_scale))
		
		// d3 selectors for the circles and lines
		var circles = this.svg.selectAll("circle")
								.data(this.data);
		
		var lines = this.svg.selectAll(".line")
							.data(this.data);
		
		lines.enter()
				.append("line")
				.attr("x1", this.x_scale(0))
				.attr("x2", this.x_scale(0))
				.attr("y1", (d) => this.y_scale(d[this.y]))
				.attr("y2", (d) => this.y_scale(d[this.y]))
				.merge(lines)
				.transition()
				.duration(this.duration/2)
				.attr("x1", (d) => this.x_scale(d[this.x]))
				.attr("x2", this.x_scale(0))
				.attr("y1", (d) => this.y_scale(d[this.y]))
				.attr("y2", (d) => this.y_scale(d[this.y]))
				.attr("stroke-width", "3")
				.attr("stroke", "black")
				.attr("class", (d) => "line "+ d.team.toLowerCase());
		
		lines.exit()
			.transition()
			.duration(this.duration/4)
			.remove();

		// update circles
		circles.enter()
				.append("circle")
				.attr("cx", this.x_scale(0))
				.attr("cy", (d) => this.y_scale(d[this.y]))
				.attr("r", "0")
				.merge(circles)
				.transition()
				.duration(this.duration/2)
				.attr("cx", (d) => this.x_scale(d[this.x]))
				.attr("cy", (d) => this.y_scale(d[this.y]))
				.attr("stroke-width", "1")
				.attr("stroke", "#171717")
				.attr("r", "10")
				.style("fill", (d) => this.color(d.team))
				.attr("class", (d) => "circle " + d.team.toLowerCase())
				.style("fill", (d) => this.color(d.team));

		
		circles.exit()
				.transition()
				.duration(this.duration/4)
				// .attr("cx", this.x_scale(this.w))
				.remove();

		// update x-scale
		// redo x-axis
		// make new lines
		// make new circles

	}
}