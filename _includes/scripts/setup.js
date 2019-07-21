var main = d3.select("main");

var scrolly_bubble = main.select('#scrolly_bubble'),
	scrolly_wins = main.select("#scrolly_wins"),
	scrolly_podiums = main.select("#scrolly_podiums"),
	scrolly_averages = main.select("#scrolly_averages");

var figure_bubble = scrolly_bubble.select("figure"),
	figure_wins = scrolly_wins.select("figure"),
	figure_podiums = scrolly_podiums.select("figure"),
	figure_averages = scrolly_averages.select("figure");

var steps_bubble = scrolly_bubble.select("article").selectAll(".step"),
	steps_wins = scrolly_wins.select(".article").selectAll(".step"),
	steps_podiums = scrolly_podiums.select(".article").selectAll(".step"),
	steps_averages = scrolly_averages.select(".article").selectAll(".step");

var scroller_bubble = scrollama();
var scroller_wins = scrollama();
var scroller_podiums = scrollama();
var scroller_averages = scrollama();