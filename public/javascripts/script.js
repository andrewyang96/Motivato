var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var toTimeString = function (d) {
	return d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2);
}

var toDateString = function (d) {
	return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

var updateDateTimeLabel = function () {
	var d = new Date();
	$("#time").html(toTimeString(d));
	$("#date").html(toDateString(d));
	// console.log(d.toLocaleString());
}

$(document).ready(function () {
	// Date and time labels
	setInterval(updateDateTimeLabel, 1000);

	// Weather animations
	$("#top-right").mouseenter(function () {
		// console.log("Showing conditions and wind");
		$("weather-conditions, #weather-wind").css("visibility", "visible");
		$("#weather-conditions, #weather-wind").stop().animate({
			"opacity" : "1.0"
		}, 250);
	}).mouseleave(function () {
		// console.log("Hiding conditions and wind");
		$("#weather-conditions, #weather-wind").stop().animate({
			"opacity" : "0.0"
		}, 250, function () {
			$("weather-conditions, #weather-wind").css("visibility", "hidden");
		});
	});

	// Quote animations
	$("#bottom").mouseenter(function () {
		// console.log("Moving quote up");
		$("#quote").stop().animate({
			"top": "0%"
		}, 250, function () {
			// console.log("Showing quote author");
			$("#quote-author").css("display", "inline");
			$("#quote-author").stop().animate({
				"opacity" : "1.0"
			}, 150);
		});
	}).mouseleave(function () {
		// console.log("Hiding quote author");
		$("#quote-author").stop().animate({
			"opacity": "0"
		}, 150, function () {
			$("#quote-author").css("display", "none");
			// console.log("Moving quote down");
			$("#quote").stop().animate({
				"top" : "40%",
			}, 250);
		});
	});

});