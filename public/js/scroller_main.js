// a row converting function for the big three charts
var row_converter = function(d) {
	return {
		run_id: d.run_id,
		year: +d.year,
		team: d.team,
		wins: +d.wins,
		rank_wins: +d.rank_win,
		win_percentage: +d.win_percentage,
		rank_win_percentage: +d.rank_win_percentage,
		podiums: +d.podium_spots_claimed,
		rank_podiums: +d.rank_podiums,
		podium_percentage: +d.podium_percentage,
		rank_podium_percentage: +d.rank_podium_percentage,
		p_average: +d.p_average,
		rank_p_average: +d.rank_p_average
	}
};