// var sticky = new Waypoint.Sticky({
// 	element: $(".bubble")[0]
// 	})
scrolly0 = d3.select("#driver_bubble");

var scroller1 = new Waypoint({
	element: document.getElementById('driver_bubble'),
	handler: function (direction) {
		if (direction === "down"){
			scrolly0.classed('stuck',true);
		} else {
			scrolly0.classed('stuck',false);
		}

	}
  })