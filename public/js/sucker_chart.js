class sucker_chart {

	constructor(opts) {
		this.data = opts.input;
		this.element = opts.element;
		this.col_x = opts.x;
		this.col_y = opts.y;
		this.rank = opts.rank;
		this.normalize = 0;
	}

	draw() {
		this.margin = {top: 40, left: 10, bottom: 40, right:10},
		this.height = window.innerHeight - margin.top - margin.bottom,
		this.width = window.innerWidth - margin.left - margin.right;

		this.svg = d3.select(this.element)
						.append("svg")
						.attr("viewBox", `0 0 ${this.width} ${this.height}`)
						.style("width", "100%")
						.style("height", "auto")
						.attr("class", "sucker")
						.attr('transform', `translate(${this.margin.left},${this.margin.top})`);
		this.create_scales(this.normalize);
		this.create_axes();
		this.create_shapes(this.col_x, this.rank);
	}
	
	create_scales(normalize) {
		const n = normalize;
		let x_max = d3.max(this.data, (d) => d[this.col_x]);
		
		this.x_scale = d3.scaleLinear().range([0,this.width]);
		if (n === 0) {
			this.x_scale.domain([0, Math.floor(x_max * 1.5)]);
		} else if (n === 1) {
			this.x_scale.domain([0, 100]);
		}

		this.run_scale = d3.scaleBand()
							.domain(this.data.map(d => d.run_id))
							.range([0, this.height])
							.padding(10);
	}
	
	create_axes() {
		this.x_axis = this.svg.append("g")
								.attr("class", "axis x_axis")
								.call(d3.axisTop(this.x_scale))
								.selectAll("text")
								.style("text-anchor", "center");
		
		this.y_axis = this.svg.append("g")
								.attr("class", "axis y_axis")
								.call(d3.axisLeft(this.run_scale))
								.selectAll("text")
								.style("text-anchor", "center");
	}

	create_shapes(col, to_rank) {
		let x = col;
		let rank = to_rank;
		let svg = this.svg;
		let data = this.data;

		this.col_xor = d3.scaleOrdinal()
						.domain(["Ferrari", "McLaren",
								"Williams", "Mercedes",
								"Lotus", "Red Bull",
								"Brabham", "Renault",
								"Cooper", "Benetton",
								"Tyrrell", "Alfa Romeo",
								"BRM", "Matra",
								"Brawn GP", "Maserati"])
						.range(["#DC0300", "#FB8703",
								"#FFFFFF", "#2ED2BE",
								"#555555", "#2041FF",
								"#F4D258", "#FDF503",
								"#004225", "#2086C0",
								"#800080", "#9B0502",
								"#8b4513", "#f08080",
								"#80f080", "#ff682a"]);

		var lines = svg.selectAll("lines")
					.data(data)
					.enter()
					.append("line")
					.filter(d => d[rank] < 11)
					.attr("x1", d => this.x_scale(d[x]))
					.attr("x2", this.x_scale(0))
					.attr("y1", d => this.run_scale(d.run_id))
					.attr("y2", d => this.run_scale(d.run_id))
					.attr("stroke-width", "1.5")
					.attr("stroke", "black")
					.attr("class", d =>"line " + d.team.toLowerCase());
		
		var circles = svg.selectAll("circles")
						.data(data)
						.enter()
						.append("circle")
						.filter(d => d[rank] <11)
						.attr("cx", d => this.x_scale(d[x]))
						.attr("cy", d => this.run_scale(d.run_id))
						.style("fill", d => this.col_xor(d.team))
						.attr("r", "4")
						.attr("stroke-width", "1")
						.attr("stroke", d => this.col_xor(d.team))
						.attr("class", d => "circle " + d.team.toLowerCase());
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

	norm(column, rank) {
		this.normalize = 1;
		this.col_x = column;
		this.rank = rank;
		this.sort(this.col_x);
	}

	reset(column, rank) {
		this.normalize = 0;
		this.col_x = column;
		this.rank = rank;
		this.sort(this.col_x);
	}
}