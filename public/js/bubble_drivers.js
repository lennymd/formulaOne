var target= d3.select("#scrolly");
var parent = target.node();
var margin = {top: 10, left: 10, bottom: 10, right:10};

var height = window.innerHeight - margin.top - margin.bottom,
	width = window.innerWidth - margin.left - margin.right;

var svg = d3.select("#bubble")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class", "bubble")
			.attr('transform', `translate(${margin.left},${margin.top})`);

d3.json("public/data/winning_drivers.json", (data) => {
	var dataset = {"children": data}
	var bubble = d3.pack(dataset)
					.size([width, height])
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
		// .style("height", diameter + "px");
})