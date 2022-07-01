		// using d3 for convenience
		var main = d3.select('main');
		var scrolly = main.select('#scrolly_bubbles');
		var figure = scrolly.select('figure');
		var step = scrolly.selectAll("article .step");
		// var article = scrolly.select('article');
		// var step = article.selectAll('.step');

		// initialize the scrollama
		var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.75);
			step.style('height', stepH + 'px');

			var figureWidth= window.innerWidth;
			var figureMarginTop = 0;

			figure
				.style('width', figureWidth + 'px')
				.style('top', figureMarginTop + 'px');


			// 3. tell scrollama to update new element dimensions
			scroller.resize();
		}

		// scrollama event handlers
		function handleStepEnter(response) {
			const el = d3.select(response.element);
			const index = Number(el.attr("data-step"));
			const sect = Number(el.attr("section-index"));
			// console.log(response.element, index, response.direction);

			if (response.direction === "down") {
				el.classed("is-active", true);
			}
		}

		function handleStepExit(response) {
			const el = d3.select(response.element);
			const index = Number(el.attr("data-step"));
			const section = Number(el.attr("section-index"));
			var circs = d3.selectAll(".circle");
			// console.log(response.element, index, response.direction);
			if (response.direction === "up") {
				el.classed("is-active", false);
			}
		}

		function setupStickyfill() {
			d3.selectAll('figure').each(function () {
				Stickyfill.add(this);
			});
		}

		function init() {
			setupStickyfill();

			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly_bubbles article .step',
				offset: 0.5,
				debug: false,
			})
				.onStepEnter(handleStepEnter)
				.onStepExit(handleStepExit);

			// setup resize event
			
		}

		// kick things off
		init();