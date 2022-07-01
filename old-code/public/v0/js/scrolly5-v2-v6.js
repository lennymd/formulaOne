Stickyfill.add(d3.select('.sticky').node())
var scroller = scrollama();

var row_converter = (d) => {
    return {
        year: +d.year,
        constructor_clean: d.constructor_clean,
        run: d.run,
        races: +d.races,
        wins: +d.wins,
        podiums: +d.podiums,
        available_podium_spots: +d.available_podium_spots,
        win_percentage: +d.win_percentage,
        podium_percentage: +d.podium_percentage
    }
}

d3.csv("../../public/data/wins_and_podiums.csv", row_converter, (dataset) => {

    // create the plot for the section
    var plot = new sucker_chart({
        plot_data: dataset,
        element: "#m0",
        normalize: 2,
        x: "podiums",
        y: "run"
    })

    // start scrollytelling component
    function step_enter(response) {
        const el = d3.select(response.element);
        const i = Number(el.attr("data-index"));
        if (response.direction === "down") {
            if (i === 1) {
                // do nothing
            } else if (i === 2) {
                plot.norm("podium_percentage");
            } else if (i === 3) {
                // do nothing
            }
        } else {
            // response.direction === up
            if (i === 0) {
                // do nothing
            } else if (i === 1) {
                // do nothing
                plot.reset("podiums");
            } else if (i === 2) {
                // do nothing
            } else if (i === 3) {
                // do nothing
            }
        }
    }

    function step_exit(response) {
        const el = d3.select(response.element);
        const i = Number(el.attr("data-index"));
        if (response.direction === "down") {
            // do nothing
        } else {
            // response.direction === up
            if (i === 0) {
                // do nothing
            } else if (i === 1) {
                // do nothing
            } else if (i === 2) {
                plot.reset("podiums");
            } else if (i === 3) {
                // do nothing
            }
        }
    }

    scroller.setup({
        step: ".step",
        debug: false,
        offset: 0.55
    })
        .onStepEnter(step_enter)
        .onStepExit(step_exit);


    window.addEventListener('resize', scroller.resize());

});

var scroller = scrollama();
const container = d3.select('#scrolly-overlay');
const stepSel = container.selectAll('.step');

function handleStepEnter(response) {

}

function handleStepExit(response) {

}
