var ferrari = "dc0300",
		mclaren = "fb8703",
    williams = "898989",
    mercedes = "2ed2be",
    lotus = "555555",
    redbull = "2041ff",
    brabham = "f4d258",
    renault = "fdf503",
    cooper = "004225",
    benetton = "2086c0",
    tyrrell = "800080",
    alfa = "9B0502",
    brm = "8b4513",
    matra = "f08080",
    brawn = "80f080",
    maserati = "ff682a";

Highcharts.chart('stacked_bar', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Formula One Championship teams'
    },
    xAxis: {
        categories: ['Ferrari', 'McLaren', 'Mercedes', 'Williams', 'Lotus', "Brabham", "Red Bull", "Alfa Romeo", "Benetton", "Cooper", "Renault", "Tyrrell", "Brawn GP", "BRM", "Maserati", "Matra"]
    },
    yAxis: {
        min: 0,
        max: 15,
        title: {
            text: 'Wins'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
    	name: "Emerson Fittipaldi",
      data: [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fdf503"
    },
    {
    	name: "Damon Hill",
      data: [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fef01c"
    },
    {
    	name: "Denny Hulme",
      data: [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
      color: "#ffeb29"
    },
    {
    	name: "Fernando Alonso",
      data: [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
      color: "#ffe632"
    },
    {
    	name: "Giuseppe Farina",
      data: [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
      color: "#ffe139"
    },
    {
    	name: "Jack Brabham",
      data: [0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
      color: "#ffdc3f"
    },
    {
    	name: "Jackie Stewart",
      data: [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1],
      color: "#ffd844"
    },
    {
    	name: "Jacques Villeneuve",
      data: [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffd349"
    },
    {
    	name: "James Hunt",
      data: [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffce4d"
    },
    {
    	name: "Jenson Button",
      data: [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
      color: "#ffc950"
    },
    {
    	name: "Jochen Rindt",
      data: [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffc453"
    },
    {
    	name: "Jody Scheckter",
      data: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffbf56"
    },
    {
    	name: "John Surtees",
      data: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffba59"
    },
    {
    	name: "Kimi Räikkönen",
      data: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffb55b"
    },
    {
    	name: "Mario Andretti",
      data: [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffaf5d"
    },
    {
    	name: "Mike Hawthorn",
      data: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ffaa5e"
    },
    {
    	name: "Graham Hill",
      data: [0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
      color: "#ffa55f"
    },
    {
    	name: "Jim Clark",
      data: [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ff9f60"
    },
    {
    	name: "Keke Rosberg",
      data: [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ff9a60"
    },
    {
    	name: "Nelson Piquet",
      data: [0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0],
      color: "#ff9460"
    },
    {
    	name: "Nico Rosberg",
      data: [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ff8f60"
    },
    {
    	name: "Nigel Mansell",
      data: [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ff895f"
    },
    {
    	name: "Phil Hill",
      data: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#ff835e"
    },
    {
    	name: "Sebastian Vettel",
      data: [0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0],
      color: "#ff7d5d"
    },
    {
    	name: "Juan Manuel Fangio",
      data: [1,0,2,0,0,0,0,1,0,0,0,0,0,0,1,0],
      color: "#ff775b"
    },
    {
    	name: "Lewis Hamilton",
      data: [0,1,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fe7159"
    },
    {
    	name: "Niki Lauda",
      data: [2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fe6b56"
    },
    {
    	name: "Mika Häkkinen",
      data: [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fd6553"
    },
    {
    	name:"Alan Jones",
      data: [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fd5e4f"
    },
    {
    	name: "Alain Prost",
      data: [0,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fc584b"
    },
    {
    	name: "Ayrton Senna",
      data: [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fb5146"
    },
    {
    	name: "Alberto Ascari",
      data: [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      color: "#fa4a40"
    },
    {
      name: 'Michael Schumacher',
      data: [5,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
      color: "#f9423a"
    }]
});