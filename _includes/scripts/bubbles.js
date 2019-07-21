
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