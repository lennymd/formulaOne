var rowConverter = function (d) {
  return {
    driver: d.driver,
    championships: +d.championships
  }
};

var dataset;

d3.csv("../public/data/winning_drivers.csv", rowConverter, function (data) {
  dataset = data;
});

