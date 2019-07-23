function step_enter_wins(response) {
	const el = d3.select(response.element);
	const index = Number(el.attr("data-step"));
	console.log(response)
	// if (response.direction === "down") {
	// 	el.classed("is-active", true);
	// }
}

function step_exit_wins(response) {
	const el = d3.select(response.element);
	const index = Number(el.attr("data-step"));
	console.log(response)
	// if (response.direction === "up") {
	// 	el.classed("is-active", false);
	// }
}

console.log("test");
scroller_wins.setup({
	step: '#scrolly_wins article .step',
	offset: 0.5,
	debug: false,
})
	.onStepEnter(step_enter_wins)
	.onStepExit(step_exit_wins);