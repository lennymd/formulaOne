dataset = {
	"children": [
		{"Name":"Michael Schumacher","Count":7},
		{"Name":"Juan Manuel Fangio","Count":5},
		{"Name":"Lewis Hamilton","Count":5},
		{"Name":"Alain Prost","Count":4},
		{"Name":"Sebastian Vettel","Count":4},
		{"Name":"Jac Brabham","Count":3},
		{"Name":"Jackie Stewart","Count":3},
		{"Name":"Niki Lauda","Count":3},
		{"Name":"Nelson Piquet","Count":3},
		{"Name":"Ayrton Senna","Count":3},
		{"Name":"Alberto Ascari","Count":2},
		{"Name":"Graham Hill","Count":2},
		{"Name":"Jim Clark","Count":2},
		{"Name":"Emerson Fittipaldi","Count":2},
		{"Name":"Mika Häkkinen","Count":2},
		{"Name":"Fernando Alonso","Count":2},
		{"Name":"Giuseppe Farina","Count":1},
		{"Name":"Mike Hawthorn","Count":1},
		{"Name":"Phil Hill","Count":1},
		{"Name":"John Surtees","Count":1},
		{"Name":"Denny Hulme","Count":1},
		{"Name":"Jochen Rindt","Count":1},
		{"Name":"James Hunt","Count":1},
		{"Name":"Mario Andretti","Count":1},
		{"Name":"Jody Scheckter","Count":1},
		{"Name":"Alan Jones","Count":1},
		{"Name":"Keke Rosberg","Count":1},
		{"Name":"Nigel Mansell","Count":1},
		{"Name":"Damon Hill","Count":1},
		{"Name":"Jacques Villeneuve","Count":1},
		{"Name":"Kimi Räikkönen","Count":1},
		{"Name":"Jenson Button","Count":1},
		{"Name":"Nico Rosberg","Count":1}
	]
};

var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20);

	var bubble = d3.pack(dataset)
					.size([diameter, diameter])
					.padding(1.5);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble");

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
		.style("fill", (d,i) => color(i));

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