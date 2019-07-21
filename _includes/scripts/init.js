function init() {
	// setupStickyfill();
	handleResize();

	{% include scripts/scroller_bubble.js %}

	{% include scripts/analysis.js %}
	window.addEventListener('resize', () => {
		handleResize();
	});
}

init();