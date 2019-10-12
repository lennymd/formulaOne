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
		rank_p_average: +d.rank_p_average,
		distance: +d.distance
	}
};

function stepEnter(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 1 ){
		//do stuff
		console.log(section, index, "enter");
		if (index === 1) {
			//update to be about win percentages
			win_analysis.update("win_percentage");
		}
	} else {
		console.log("wrong section");
	}
}

function stepExit_wins(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 1 ){
		//do stuff
		console.log(section, index, "exit");
	} else {
		console.log("wrong section");
	}
}

function stepEnter_podiums(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 2 ){
		//do stuff
		console.log(section, index, "enter");
	} else {
		console.log("wrong section");
	}
}

function stepExit_podiums(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 2 ){
		//do stuff
		console.log(section, index, "exit");
	} else {
		console.log("wrong section");
	}
}

function stepEnter_averages(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 3 ){
		//do stuff
		console.log(section, index, "enter");
	} else {
		console.log("wrong section");
	}
}

function stepExit_averages(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-step"));
	const section = Number(element.attr("section-index"));

	if (section === 3 ){
		//do stuff
		console.log(section, index, "exit");
	} else {
		console.log("wrong section");
	}	
}