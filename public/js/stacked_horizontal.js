// Enter data (this could have been imported)
const socialMedia = [
	{
		month: 'April',
		counts: { "Michael Schumacher": 5, YouTube: 3, Twitter: 3, Instagram: 1 }
	},
	{
		month: 'May',
		counts: { "Michael Schumacher": 2, YouTube: 1, Twitter: 1, Instagram: 1 }
	},
	{
		month: 'June',
		counts: { "Michael Schumacher": 3, YouTube: 2, Twitter: 2, Instagram: 2 }
	}
];

// Add a total value for each month
const smTotal = socialMedia.map(d => {
	const counts = d3.entries(d.counts);
	const total = d3.sum(counts, c => c.value);
	return { month: d.month, counts, total };
});

// create a Y scale for the data
const scaleY = d3
	.scaleLinear()
	.range([0, 200])
	.domain([0, d3.max(smTotal, d => d.total)]);

// create a color scale for the data where Facebook is red
const scaleColor = d3
	.scaleOrdinal()
	.range(['#FE4A49', '#cccccc', '#dddddd', '#eeeeee'])
	.domain(['Michael Schumacher', 'YouTube', 'Twitter', 'Instagram']);

// Select the figure element
const stack = d3.select('.stack');

// Add a div for each month
const group = stack
	.selectAll('.group')
	.data(smTotal)
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

// Add a month label
const label = group
	.append('text')
	.text(d => d.month)
	.attr('class', 'label');

// Add a total count label
const count = group
	.append('text')
	.text(d => d3.format('0.2s')(d.total))
	.attr('class', 'count');