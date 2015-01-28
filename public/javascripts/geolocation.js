var API_KEY = "AIzaSyAcyyyONN-n_e7xuRjAdPS63h9TxEqiXpU";

var getLocation = function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (pos) {
			// console.log("Latitude: " + pos.coords.latitude);
			// console.log("Longitude: " + pos.coords.longitude);
			
			// Receive data from Google's Geocoding API
			var getFromURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "&result_type=locality&key=" + API_KEY;
			$.getJSON(getFromURL, function (data) {
				var location_data = data["results"][0]["address_components"];
				var city = location_data[0]["long_name"];
				var region = location_data[location_data.length-2]["long_name"];
				var country = location_data[location_data.length-1]["long_name"];
				var location = city + ", " + region + ", " + country;
				// console.log(location);
				updateWeather(location);
			});
		}, function (error) {
			console.log("Error occured. Error code: " + error.code);
			$("#loading-weather").css("display", "none");
		}, {timeout: 10000});
	} else {
		console.log("Geolocation is not supported.");
		$("#loading-weather").css("display", "none");
	}
};

// Docs at http://simpleweatherjs.com
var updateWeather = function (geolocated_location) {
	$.simpleWeather({
		location: geolocated_location,
		woeid: '',
		unit: 'f',
		success: function (weather) {
			$("#loading-weather").css("display", "none");

			html = '<i class="icon-'+weather.code+'"></i> <div id="temp">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
			$("#weather-temp").html(html);

			html = '<div id="location">'+ weather.city+ (weather.region === "" ? '' : ', ' + weather.region) +'</div>';
			$("#weather-location").html(html);

			html = '<div id="conditions">'+weather.currently+'</div>';
			$("#weather-conditions").html(html);

			html = '<div id="wind">'+weather.wind.direction+' '+ weather.wind.speed+' '+weather.units.speed+'</div>';
			$("#weather-wind").html(html);
		},
		error: function(error) {
			$("#weather").html('<p>'+error+'</p>');
		}
	});
};

$(document).ready(function () {
	// console.log("Getting location...");
	getLocation();
});