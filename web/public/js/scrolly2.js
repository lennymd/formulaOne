var scroller = scrollama();
const container = d3.select('#scrolly-overlay');
const stepSel = container.selectAll('.step');

function updateChart(index) {

    const sel = container.select(`[data-index="${index}"]`);
    const width = sel.attr("data-width");
    stepSel.classed("is-active", (d, i) => i === index);
    container.select(".bar-inner").style("width", width);

}

function handleStepEnter(response) {
  var el = response.element;
  if (response.direction === "down") {
    const index = +d3.select(el).attr("data-index");
    updateChart(index);
    console.log("entering")
  }
}

function handleStepExit(response) {
  var el = response.element;
  if (response.direction === "up") {
    console.log("exiting");
    let index = +d3.select(el).attr('data-index');
    index = Math.max(0, index - 1);
    updateChart(index);
  }
}

Stickyfill.add(d3.select('.sticky').node())

scroller.setup({
  step: ".step",
  debug: true,
  offset: 0.6
}).onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);


window.addEventListener('resize', scroller.resize);
