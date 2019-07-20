class sucker_chart {

	constructor(opts) {
		// these are the inputs: the data we're working with, and the element we're loading the chart into.
		this.data = opts.plot_data;
		this.element = opts.element;
		this.x = opts.x;
		// this.col_y = opts.y;
		this.rank = "rank_" + this.x;
		this.filter = opts.filter + 1;
		this.ascending = opts.ascending;

		this.normalize = false;
		this.sort(this.x);
	}

	draw() {
		this.margin = {
			top: 50,
			right: 60,
			bottom: 50,
			left: 150};

		this.width = window.innerWidth - this.margin.left - this.margin.right;
		this.height = window.innerHeight - this.margin.bottom - this.margin.top;
		
		// Set up the place we're drawing the plot and also create the SVG.
		var anchor = d3.select(this.element);
		// clear whatever was in the anchor before 
		anchor.html("");


		this.svg = anchor.append("svg")
					.attr("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top +this.margin.bottom}`)
					.style("width", "100%")
					.style("height", "auto")
					.attr("class", "sucker")
					.append('g')
					.attr('transform', `translate(${this.margin.left},${this.margin.top})`);
		
		this.data = this.data.filter(d => d[this.rank] < this.filter);
		this.create_scales();
		this.create_axes();
		this.create_shapes();
	}

	create_scales() {
		const x_max = d3.max(this.data, d => d[this.x]);
		var k;

		if (this.normalize) {
			k = 100;
		} else {
			k = Math.floor(x_max * 1.1);
		}

		this.x_scale = d3.scaleLinear()
						.domain([0, k])
						.range([0, this.width]);
		
		this.y_scale = d3.scaleBand()
						.domain(this.data.map( d => d.run_id))
						.range([0, this.height])
						.padding(1.5);

	}
	
	create_axes() {
		// add axes
		this.x_axis = this.svg.append("g")
						.attr("class", "x axis")
						.call(d3.axisTop(this.x_scale))
						.selectAll("text")
						.attr("class", "axis_text axis_text_number")
						.style("text-anchor", "center");
		
		this.y_axis = this.svg.append("g")
						.attr("class", "y axis")
						.call(d3.axisLeft(this.y_scale))
						.selectAll("text")
						.attr("class", "axis_text axis_text_runs")
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

		var lines = this.svg.selectAll("lines")
						.data(this.data)
						.enter()
						.append("line")
						.attr("x1", d => this.x_scale(d[this.x]))
						.attr("x2", this.x_scale(0))
						.attr("y1", d => this.y_scale(d.run_id))
						.attr("y2", d => this.y_scale(d.run_id))
						.attr("stroke-width", "3")
						.attr("stroke", "black")
						.attr("class", d => "line " + d.team.toLowerCase());
		
		var circles = this.svg.selectAll("circles")
							.data(this.data)
							.enter()
							.append("circle")
							.attr("cx", d => this.x_scale(d[this.x]))
							.attr("cy", d => this.y_scale(d.run_id))
							.style("fill", d => this.color(d.team))
							.attr("r", "10")
							.attr("stroke-width", "3")
							.attr("stroke", d => this.color(d.team))
							.attr("class", d => "circle " + d.team.toLowerCase());
	}

	set_data(new_data) {
		this.data = new_data;
		this.draw();
	}

	sort(col) {
		let sorted;
		if (this.ascending) {
			sorted = this.data.sort( (b,a) => b[col] - a[col]);
		} else {
			sorted = this.data.sort((b, a) => a[col] - b[col]);
		}
		this.set_data(sorted);
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
}