function step_enter_bubble(response) {
	const el = d3.select(response.element);
	const index = Number(el.attr("data-step"));

	if (response.direction === "down") {
		el.classed("is-active", true);
	}
}

function step_exit_bubble(response) {
	const el = d3.select(response.element);
	const index = Number(el.attr("data-step"));

	if (response.direction === "up") {
		el.classed("is-active", false);
	}
}

scroller_bubble.setup({
	step: '#scrolly_bubble article .step',
	offset: 0.5,
	debug: false,
})
	.onStepEnter(step_enter_bubble)
	.onStepExit(step_exit_bubble);