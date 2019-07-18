// let row_converter_overall = (d) => {
// 	return {
// 		year: +d.year,
// 		team: d.team,
// 		wins: +d.wins,
// 		win_percentage: +d.win_percentage,
// 		rank_win_percentage: +d.rank_win_percentage,
// 		podium_percentage: +d.podium_percentage,
// 		rank_podium_percentage: +d.rank_podium_percentage,
// 		run_id: d.run_id,
// 		p_average: +d.p_average,
// 		rank_p_average: +d.rank_p_average,
// 		std: +d.std,
// 		avg_rank: +d.avg_rank,
// 		rank_composite: +d.rank_composite
// 	}
// }

let row_converter = d => {
	return {
		name: d.driver,
		wins: +d.championships
	}
}

d3.csv("../../public/data/winning_drivers.csv", row_converter, (dataset) => {
	debugger

});