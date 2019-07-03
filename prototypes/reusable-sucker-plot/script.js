class sucker_chart {

	constructor(opts) {
		// these are the inputs: the data we're working with, and the element we're loading the chart into.
		this.data = opts.plot_data;
		this.element = opts.element;
		this.normalize = +opts.normalize;
		this.col_x = opts.x;
		this.col_y = opts.y;

		this.draw();
	}

	draw() {
		this.margin = {
			top: 40,
			right: 40,
			bottom: 0,
			left: 40};

		this.width = window.innerWidth - this.margin.left - this.margin.right;
		this.height = window.innerHeight - this.margin.bottom - this.margin.top;

		// console.log(this.width, this.height, this.margin)

		// if (this.width > 800) {
		// 	this.orientation = 1; //horizontal is possible
		// } else {
		// 	this.orientation = 0; //vertical is the way to go
		// }
		
		// Set up the place we're drawing the plot and also create the SVG.
		var anchor = d3.select(this.element);
		// clear whatever was in the anchor before 
		anchor.html("");


		this.svg = anchor.append("svg")
					.attr("width", this.width + this.margin.left + this.margin.right)
					.attr("height", this.height + this.margin.top + this.margin.bottom)
					.append('g')
					.attr('transform', `translate(${this.margin.left},${this.margin.top})`);

		this.create_scales(this.normalize);
		this.create_axes();
		this.create_shapes(this.col_x, this.col_y);
	}

	create_scales(normalize) {
		//make the scales
		const n = normalize;
		
		this.x_scale = d3.scaleLinear()
						.domain([0, 21])
						.range([0, this.width]);
		
		this.y_scale = d3.scaleBand()
						.domain(this.data.map((d) => { return d[this.col_y];}))
						.range([0, this.height])
						.padding(5);
		
		this.y_scale2 = d3.scaleLinear()
					.domain([0,1])
					.range([0, this.height]);

		if (n === 1) {
			this.x_scale.domain([0,1])
		}
	}
	
	create_axes() {
		// add axes
		this.x_axis = this.svg.append("g")
						.attr("class", "x axis")
						.call(d3.axisTop(this.x_scale))
						.selectAll("text")
						.attr("transform", "translate(0,0)rotate(0)")
						.style("text-anchor", "center");
		
		this.y_axis = this.svg.append("g")
						.attr("class", "y axis")
						.call(d3.axisLeft(this.y_scale2))
						.selectAll("text")
						.style("text-anchor", "center");
	}

	create_shapes(col_x, col_y) {
		const x = col_x;
		const y = col_y; 

		let svg = this.svg;
		let data = this.data;

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
					"#80f080", "#ff682a"])

		var lines = svg.selectAll("lines")
						.data(data)
						.enter()
						.append("line")
						.attr("x1", (d) => { 
							return this.x_scale(d[x]); 
						})
						.attr("x2", this.x_scale(0))
						.attr("y1", (d) => { 
							return this.y_scale2(d[y]);
						})
						.attr("y2", (d) => {
							return this.y_scale2(d[y]);
						})
						.attr("stroke-width", "1.5")
						.attr("stroke", "black")
		
		var circles = svg.selectAll("circles")
							.data(data)
							.enter()
							.append("circle")
							.attr("cx", (d) => {
								return this.x_scale(d[x]);
							})
							.attr("cy", (d) => {
								return this.y_scale2(d[y]);
							})
							.style("fill", (d) => {
								return this.color(d.constructor_clean);
							})
							.attr("r", "4")
							.attr("stroke-width", "2")
							.attr("stroke", (d) => {
								return this.color(d.constructor_clean);
							});
	}

	set_data(new_data) {
		this.data = new_data;

		this.draw();
	}

	resort(column) {
		const input = this.data;
		let sorted = input.sort((b, a) => {
			return a[column] - b[column];
		})
		this.set_data(sorted);
	}

	// normalize(value, axis) {
	// 	this.normalize = Number(value);
	// 	this.draw();
	// }
}