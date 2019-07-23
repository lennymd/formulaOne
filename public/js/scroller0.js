function stepEnter_bubble(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-index"));
	const section = Number(element.attr("section-index"));
	console.log(section, index);
	if (response.direction === "down") {
		element.classed("is-active", true);
	}
}

function stepExit_bubble(response) {
	const element = d3.select(response.element);
	const index = Number(element.attr("data-index"));
	const section = Number(element.attr("section-index"));
	console.log(section, index);
	if (response.direction === "up") {
		element.classed("is-active", false);
	}
	
}