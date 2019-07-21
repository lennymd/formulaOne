
		// generic window resize listener event
		function handleResize_bubble() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.75);
			step.style('height', stepH + 'px');

			var figureMarginTop = 0;
			figure.style('top', figureMarginTop + 'px');
			// 3. tell scrollama to update new element dimensions
			scroller_bubbles.resize();
		}

		// scrollama event handlers
		function handleStepEnter_bubble(response) {
			const el = d3.select(response.element);
			const index = Number(el.attr("data-step"));

			if (response.direction === "down") {
				el.classed("is-active", true);
			}
		}

		function handleStepExit_bubble(response) {
			const el = d3.select(response.element);
			const index = Number(el.attr("data-step"));

			if (response.direction === "up") {
				el.classed("is-active", false);
			}
		}

		function setupStickyfill() {
			scrolly.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

		function init() {
			setupStickyfill();

			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize_bubble();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller_bubbles.setup({
				step: '#scrolly_bubble article .step',
				offset: 0.5,
				debug: false,
			})
				.onStepEnter(handleStepEnter_bubble)
				.onStepExit(handleStepExit_bubble);


			// setup resize event
			window.addEventListener('resize', handleResize_bubble);
		}

		// kick things off
		init();