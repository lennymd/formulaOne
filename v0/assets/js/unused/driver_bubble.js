var graph_target = d3.select("#driver_bubble");
var parent = graph_target.node();

var diameter = parent.getBoundingClientRect().height;
// var diameter = 600;
var svg = graph_target.append("svg")
						.attr("width", diameter)
						.attr("height", diameter)
						.attr("class", "bubble img-fluid text-center");

// var color = d3.scaleOrdinal(d3.schemeCategory20);

d3.json("public/data/winning_drivers.json", (data) => {

	var dataset = {"children": data}
	
	var bubble = d3.pack(dataset)
					.size([diameter, diameter])
					.padding(1.5);

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
		.attr("dy", "1.3em")
		.style("text-anchor", "middle")
		.text(d => d.data.Count)
		.attr("font-family", "sans-serif")
		.attr("font-size", d => d.r/5)
		.attr("fill", "white");

	d3.select(self.frameElement)
		.style("height", diameter + "px");
})