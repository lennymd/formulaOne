var scroller = scrollama();
const container = d3.select('#scrolly-overlay');
const stepSel = container.selectAll('.step');

function handleStepEnter(response) {
  var el = response.element;
  d3.select(el).classed("is-active", true)
  if (response.direction === "down") {
    console.log("moving down")
  }
}

function handleStepExit(response) {
  var el = response.element;
  d3.select(el).classed("is-active", false)
  if (response.direction === "up") {
    console.log("moving up");
  }
}

Stickyfill.add(d3.select('.sticky').node())

scroller.setup({
  step: ".step",
  debug: false,
  offset: 0.5
}).onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);


window.addEventListener('resize', scroller.resize());
