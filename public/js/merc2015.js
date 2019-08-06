var table_root = d3.select("#merc2015").append("table");

var header = table_root.append("thead")
						.append("tr")
						.attr("class", "table_header");

var tbody = table_root.append("tbody");

var converter = (d) => {
	return {
		race: d.race,
		nico: +d["Nico Rosberg"],
		lewis: +d["Lewis Hamilton"]
	}
};

header.selectAll("td")
		// .data(["\xa0", "Nico Rosberg", "Lewis Hamilton"])
		.data(["Grand Prix", "Nico Rosberg", "Lewis Hamilton"])
		.enter()
		.append("td")
		.attr("class", "head")
		.text(d=> d);

d3.csv("../public/data/mercedes2015_v2.csv", converter, (dataset) => {
	console.log(dataset);

	var nest = d3.nest()
			.key(d=>d.race)
			.entries(dataset);

	var rows = tbody.selectAll("tr")
						.data(nest)
						.enter()
						.append("tr")
						.attr("class", "race_row");

	var cells = rows.selectAll("td")
					.data(d => d.values)
					.enter();

	var races = cells.append("td")
						.text(d => d.race)
						.attr("class", "race");

	var nico = cells.append("td")
					.text(d => d.nico)
					.attr("class", "nico result");

	var lewis = cells.append("td")
					.text(d => d.lewis)
					.attr("class", "lewis result");
})