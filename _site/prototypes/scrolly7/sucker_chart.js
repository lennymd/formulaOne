class sucker_chart {

	constructor(opts) {
		// these are the inputs: the data we're working with, and the element we're loading the chart into.
		this.data = opts.plot_data;
		this.element = opts.element;
		this.col_x = opts.x;
		this.col_y = opts.y;

		this.normalize = 0;
		
		this.sort(this.col_x);
	}

	draw() {
		this.margin = {
			top: 50,
			right: 60,
			bottom: 50,
			left: 100};

		this.width = window.innerWidth - this.margin.left - this.margin.right;
		this.height = window.innerHeight - this.margin.bottom - this.margin.top;
		
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
		this.x_scale = d3.scaleLinear().range([0, this.width]);
		if (n === 0) {
			this.x_scale.domain([0, d3.max(this.data, (d) => { return d[this.col_x]; }) + 5]);
		} else if (n === 1) {
			this.x_scale.domain([0, 100]);
		}
		
		this.y_scale2 = d3.scaleBand()
						.domain(this.data.map((d) => { return d[this.col_y];}))
						.range([0, this.height])
						.padding(5);
		
		this.y_scale = d3.scaleLinear()
					.domain([1949, 2020])
					.range([0, this.height]);


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
						.attr("class", function (d) { return "line "+ d.constructor_clean.toLowerCase(); });
		
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
							.attr("stroke-width", "1")
							.attr("stroke", (d) => {
								return this.color(d.constructor_clean);
							})
							.attr("class", function (d) { return "circle " + d.constructor_clean.toLowerCase(); });
	}

	set_data(new_data) {
		this.data = new_data;
		this.draw();
	}

	sort(column) {
		let sorted = this.data.sort((b, a) => {
			return a[column] - b[column];
		});
		this.set_data(sorted);
	}

	norm(column) {
		this.normalize = 1;
		this.col_x = column;
		this.sort(this.col_x);
	}

	reset(column) {
		this.normalize = 0;
		this.col_x = column;
		this.sort(this.col_x);
	}

}