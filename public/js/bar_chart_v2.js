class bar_chart {

	constructor(opts) {
		// these are the inputs: the data we're working with, and the element we're loading the chart into.
		this.data = opts.plot_data;
		this.base_data = opts.plot_data;
		this.element = opts.element;
		this.x_key = opts.x;
		this.y_key = "run_id";
		this.rank = "rank_" + this.x_key;
		this.filter = opts.filter;
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
			top: 20,
			right: 50,
			bottom: 0,
			left: 150};

		this.width = window.innerWidth - this.margin.left - this.margin.right;
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
		this.create_shapes();
		this.create_axes();
	}

	create_scales() {
		//make the scales
		let k;
		if (this.normalize) {
			k = 100;
		} else {
			k = Math.floor(
					d3.max(this.data, (d) => d[this.x_key])
				);
		}

		this.x_scale = d3.scaleLinear()
							.domain([0, k])
							.range([0, this.width])
							.clamp(true)
							.nice();
		
		this.y_key_scale = d3.scaleBand()
							.domain(this.data.map( (d) => d[this.y_key]))
							.range([0, this.height])
							.padding(0.3);
		// console.log(this.y_key_scale.bandwidth());
	}
	
	create_axes() {
		// const key = this.x_key;
		this.labels = {"wins": "Wins", "win_percentage": "Win percentage", "podiums": "Podium finishes", "podium_percentage": "Percentage of podium spots", "average":"Average finishing position"}
		this.y_axis = this.svg.append("g")
						.attr("class", "y axis")
						.call(d3.axisLeft(this.y_key_scale))
						.selectAll("text")
						.attr("class", "axis_text")
						.style("text-anchor", "center");

		this.x_label = this.svg.append("text")
								.attr("transform", `translate( ${this.width / 2}, ${this.margin.top/2})`)
								.style("text-anchor", "middle")
								.attr("class", "x_label")
								.text(this.labels[this.x_key]);
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
					"goldenrod", "#2ED2BE",
					"#555555", "#2041FF",
					"#F4D258", "#FDF503",
					"#004225", "#2086C0",
					"#800080", "#9B0502",
					"#8b4513", "#f08080",
					"#80f080", "#ff682a"]);

		this.colorText = d3.scaleOrdinal()
							.domain(["Ferrari", "McLaren",
							"Williams", "Mercedes",
							"Lotus", "Red Bull",
							"Brabham", "Renault",
							"Cooper", "Benetton",
							"Tyrrell", "Alfa Romeo",
							"BRM", "Matra",
							"Brawn GP", "Maserati"])
							.range(
								["#000000", "#000000",
									"#000000", "#000000",
									"#000000", "#ffffff",
									"#000000", "#000000",
									"#000000", "#000000",
									"#000000", "#ffffff",
									"#000000", "#000000",
									"#000000", "#000000"]);
		
		var groups = this.svg.selectAll(".group")
								.data(this.data)
								.enter()
								.append("g")
								.attr("class", "group");
		
		var bars = groups.append("rect")
							.attr("class", "bar")
							.attr("y", d => this.y_key_scale(d[this.y_key]))
							.attr("width", d => this.x_scale(d[this.x_key]))
							.attr("height", this.y_key_scale.bandwidth())
							.attr("fill", (d) => this.color(d.team));

		var info = groups.append("text")
							.attr("class", "inner_text")
							.attr("text-anchor", "end")
							.attr("x", d=> this.x_scale(d[this.x_key]) - 5)
							.attr("y", d => this.y_key_scale(d[this.y_key]) + this.y_key_scale.bandwidth() / 2)
							.attr("dy", "0.35em")
							.attr("fill", d => this.colorText(d.team))
							.text(d => this.set_text(d));

	}
	set_text(d) {
		var data = d;
		const key = this.x_key;
		var val = data[this.x_key];
		var new_text;
		if (key === "wins") {
			new_text = val;
		} else if (key === "podiums") {
			new_text = val;
		} else if (key === "average") {
			new_text = val.toFixed(2);
		} else {
			new_text = val.toFixed(2) + "%";
		}

		return new_text;
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
		this.x_key = column;
		this.sort(this.x_key);
	}

	reset(column) {
		this.normalize = false;
		this.x_key = column;
		this.sort(this.x_key);
	}
	

	update(column, normalize, filter) {
		// set new data
		this.x_key = column;
		this.rank = "rank_" + this.x_key;
		this.normalize = normalize;
		this.filter = filter;

		// filter out data for the graphic
		this.organize_data();
		console.log(this.data);
		// update the x-scale and y-scale
		this.create_scales();

		var groups = this.svg.selectAll(".group")
								.data(this.data);

		groups.enter().append("g")
						.append("rect")
						.append("text");
		
		groups.select("rect")
				.transition()
				.duration(this.duration/2)
				.attr("class", "bar")
				.attr("y", d => this.y_key_scale(d[this.y_key]))
				.attr("width", d => this.x_scale(d[this.x_key]))
				.attr("height", this.y_key_scale.bandwidth())
				.attr("fill", (d) => this.color(d.team));

		groups.select("text")
				.transition()
				.duration(this.duration/2)
				.attr("class", "inner_text")
				.attr("text-anchor", "end")
				.attr("x", d=> this.x_scale(d[this.x_key]) - 5)
				.attr("y", d => this.y_key_scale(d[this.y_key]) + this.y_key_scale.bandwidth() / 2)
				.attr("dy", "0.35em")
				.attr("fill", d => this.colorText(d.team))
				.text(d => this.set_text(d));
		
		groups.exit()
				.transition()
				.duration(this.duration/2)
				.remove();

		this.svg.select(".y.axis")
				.transition()
				.duration(this.duration)
				.call(d3.axisLeft(this.y_key_scale))
				.selectAll("text")
				.attr("class", "axis_text")
				.style("text-anchor", "center")
		this.x_label.transition()
					.duration(this.duration)
					.text(this.labels[this.x_key]);

	}
}