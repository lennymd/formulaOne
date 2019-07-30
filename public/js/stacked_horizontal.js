// Enter data (this could have been imported)
const constructors =[
	{
		team: "Ferrari",
		counts: { "Michael Schumacher": 5, "Niki Lauda": 2, "Alberto Ascari": 2, "Juan Manuel Fangio": 1, "Jody Scheckter": 1, "John Surtees": 1, "Kimi Räikkönen": 1, "Mike Hawthorn": 1, "Phill Hill": 1 }
	},
	{
		team: "McLaren",
		counts: { "Ayrton Senna": 3, "Alain Prost": 3, "Emerson Fittipaldi": 1, "Mika Häkkinen": 1, "Niki Lauda": 1, "James Hunt": 1, "Lewis Hamilton": 1 }
	},
	{
		team: "Williams",
		counts: { "Alan Jones": 1, "Keke Rosberg": 1, "Nelson Piquet": 1, "Nigel Mansell": 1, "Alain Prost": 1, "Damon Hill": 1, "Jacques Villeneuve": 1 }
	},
	{
		team: "Mercedes",
		counts: { "Lewis Hamilton": 4, "Juan Manuel Fangio": 2, "Nico Rosberg": 1}
	},
	{
		team: "Lotus",
		counts: { "Jim Clark": 2, "Graham Hill": 1, "Jochen Rindt": 1, "Emerson Fittipaldi": 1, "Mario Andretti": 1}
	},
	{
		team: "Red Bull",
		counts: { "Sebastian Vettel": 4}
	},
	{
		team: "Brabham",
		counts: { "Nelson Piquet": 2, "Jack Brabham": 1, "Denny Hulme": 1}
	},
	{
		team: "Renault",
		counts: { "Fernando Alonson": 2}
	},
	{
		team: "Cooper",
		counts: { "Jack Brabham": 2}
	},
	{
		team: "Benetton",
		counts: { "Michael Schumacher": 2 }
	},
	{
		team: "Tyrrell",
		counts: { "Jackie Stewart": 2 }
	},
	{
		team: "Alfa Romeo",
		counts: { "Juan Manuel Fangio": 1, "Giuseppe Farina": 1 }
	},
	{
		team: "BRM",
		counts: { "Graham Hill": 1}
	},
	{
		team: "Matra",
		counts: { "Jackie Stewart": 1 }
	},
	{
		team: "Maserati",
		counts: { "Juan Manuel Fangio": 1 }
	},
	{
		team: "Brawn GP",
		counts: { "Jenson Button": 1}
	}];
	

	// Add a total value for each team
	const countTotal = constructors.map(d => {
		const counts = d3.entries(d.counts);
		const total = d3.sum(counts, c => c.value);
		return { team: d.team, counts, total };
	});

	// create a Y scale for the data
	const scaleY = d3
		.scaleLinear()
		.range([0, 200])
		.domain([0, d3.max(countTotal, d => d.total)]);
	
	const scaleX = d3.scaleLinear()
						.range([0,200])
						.domain([0, d3.max(countTotal, d => d.total)])

	// create a color scale for the data where Facebook is red
	const scaleColor = d3.scaleOrdinal()
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

	// Select the figure element
	const stack = d3.select('.stack');

	// Add a div for each team
	const group = stack
		.selectAll('.group')
		.data(countTotal)
		.enter()
		.append('div')
		.attr('class', 'group');

	// Add a block for each social media type
	const block = group
		.selectAll('.block')
		.data(d => d.counts)
		.enter()
		.append('div')
		.attr('class', 'block')
		// And scale the height of the box based on the value
		.style('height', d => `${scaleY(d.value)}px`)
		// Scale the color based on the social media type
		.style('background-color', d => scaleColor(d.key));

	// Add a team label
	const label = group
		.append('text')
		.text(d => d.team)
		.attr('class', 'label');

	// Add a total count label
	const count = group
		.append('text')
		.text(d => d3.format('0.2s')(d.total))
		.attr('class', 'count');