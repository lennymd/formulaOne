class table {

	constructor(opts) {
		// inputs
		this.data = opts.plot_data;
		this.base_data = opts.plot_data;
		this.element = opts.element;
		this.x = opts.x;
		this.filter = opts.filter;

		// other setup
		this.rank = "rank_" + this.x;
		this.duration = 1000;
		this.margin = {top: 40, right: 60, bottom: 40, left: 60};
		this.w = window.innerWidth,
		this.h = window.innerHeight,
		this.width = w - this.margin.left - this.margin.right,
		this.height = h - this.margin.top - this.margin.bottom;
	}

	organize_data() {
		let sorted_data = this.base_data.sort((b, a) => b[this.rank] - a[this.rank]);
		this.data = sorted_data.filter((d) => d[this.rank] < this.filter + 1);
	}

	init() {



	}

}