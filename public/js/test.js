var margin = {top: 40, right: 60, bottom: 40, left: 60};
var w = window.innerWidth,
	h = window.innerHeight,
	width = w - margin.left - margin.right,
	height = h - margin.top - margin.bottom;

var converter = (d) => {
	return {
		year: +d.year,
		team: d.team,
		wins: +d.wins,
		rank_wins: +d.rank_win,
		win_percentage: +d.win_percentage,
		rank_win_percentage: +d.rank_win_percentage,
		run_id: d.run_id
	}
}
d3.csv("../../public/data/analysis_test.csv", converter, (dataset) => {
	const data = dataset.sort((b, a) => b.rank_wins - a.rank_wins);

	const test = d3.select("#test");

	
})