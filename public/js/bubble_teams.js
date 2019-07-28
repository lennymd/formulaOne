var margin = {top: 40, left: 10, bottom: 40, right:10},
	height = window.innerHeight - margin.top - margin.bottom,
	width = window.innerWidth - margin.left - margin.right;

var svg = d3.select("#bubble")
			.append("svg")
			.attr("viewBox", [0, 0, width, height])
			.style("width", "100%")
			.style("height", "auto")
			.attr("class", "bubble")
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.style("font", "10px sans-serif")
			.attr("text-anchor", "middle");;

d3.json("public/data/winning_teams.json", (data) => {

	pack = data => d3.pack()
		.size([width - 2, height - 2])
		.padding(3)
		(d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => b.value - a.value))
	
	const root = pack(data);

	var nodes = d3.hierarchy(dataset)
					.sum(d=> d.Count);
				
	var node = svg.selectAll(".node")
					.data(bubble(nodes).descendants())
					.enter()
					.filter(d => !d.children)
					.append("g")
					.attr("class", "node")
					.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
					node.append("title")
					.text(d => d.Name + ": " + d.Count);
						
	node.append("circle")
		.attr("r", d => d.r)
		.attr("class", "drivers")
		.style("fill", "#555");
		// .style("fill", (d,i) => color(i));
						
	node.append("text")
		.attr("dy", ".2em")
		.style("text-anchor", "middle")
		.text(d => d.data.Name)
		.attr("font-family", "sans-serif")
		.attr("font-size", d => d.r/5)
		.attr("fill", "white");
			
	node.append("text")
		.attr("dy", "1.1em")
		.style("text-anchor", "middle")
		.text(d => d.data.Count)
		.attr("font-family", "sans-serif")
		.attr("font-size", d => d.r/2)
		.attr("fill", "white");

	d3.select(self.frameElement)
		// .style("height", diameter + "px");
})