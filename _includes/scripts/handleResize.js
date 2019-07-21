function resize_bubbles(h){
	steps_bubble.style('height', h + 'px');
	figure_bubble.style('top', '0px');
}

function resize_wins(h){
	steps_wins.style('height', h + 'px');
	figure_wins.style('top', '0px');
}

function resize_podiums(h){
	steps_podiums.style('height', h + 'px');
	figure_podiums.style('top', '0px');
}

function resize_averages(h){
	steps_averages.style('height', h + 'px');
	figure_averages.style('top', '0px');
}

function handleResize() {
	var step_height = Math.floor(window.innerHeight * 0.75);

	resize_bubbles(step_height);
	// resize_wins(step_height);
	// resize_podiums(step_height);
	// resize_averages(step_height);

	scroller_bubble.resize();
	// scroller_wins.resize();
	// scroller_podiums.resize();
	// scroller_averages.resize();
}