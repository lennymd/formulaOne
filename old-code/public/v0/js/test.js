var margin = {top: 40, right: 60, bottom: 40, left: 60};
var w = window.innerWidth,
	h = window.innerHeight,
	width = w - margin.left - margin.right,
	height = h - margin.top - margin.bottom;
// var svg = d3.select("#test")
// 			.append("svg")
// 			.attr("viewBox", [0, 0, width, height])
// 			.append("g")
// 			.attr("transform", `translate(${this.margin.left},${this.margin.top})`);

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
d3.csv("https://lennymartinez.com/newhousevis-capstone/v0/public/data/analysis_test.csv", converter, (dataset) => {
	const data = dataset.sort((b, a) => b.rank_wins - a.rank_wins).filter((d) => d.rank_wins < 11);

	const data_update = dataset.sort((b, a) => b.rank_win_percentage - a.rank_win_percentage).filter((d) => d.rank_win_percentage < 11);

	var nest = d3.nest()
					.key(d=>d.run_id)
					.entries(data);

	var head_col = ["Team", "Win percentage", "Wins"];

	var table = d3.select("#test")
					.append("table");

	var header = table.append("thead").append("tr");
	var body = table.append("tbody");

	header.selectAll("th")
			.data(head_col)
			.enter()
			.append("th")
			.attr("class", "header")
			.text(d => d);
	
	var rows = body.selectAll("tr")
					.data(nest)
					.enter()
					.append("tr");

	var cells = rows.selectAll("td")
				.data(d => d.values)
				.enter();
	
	var teams = cells.append("td")
				.text(d => d.run_id)
				.attr("class", "team");

	var win_percentage = cells.append("td")
				.text(d => d.win_percentage)
				.attr("class", "win_percent main");

	var wins = cells.append("td")
				.text(d => d.wins)
				.attr("class", "wins");

	debugger
})