var currentLocation = 0; // Variables used in multiple functions. 
// Array for all the hints for the user. 
var hints = [ 
		"Start zooming in.",
		"Zoom further.",
		"You're getting near the objective.",
		"You're getting closer.",
		"Zoom more you are on the right path.",
		"Keep going you are close.",
		"You are really close to the objective."
	];
var score; 
var hint;

function initMap() { // Init function that runs when page loads. Loads the map and the event handlers.
	var myLatlng = new google.maps.LatLng(0.0,0.0);
	var mapOptions = {zoom: 1, center: myLatlng}; // Setup the map for the start.
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	score = document.getElementById("score");
	hint = document.getElementById("hint");
	// My three locations for the user to find.
	var locations = [
		new google.maps.LatLng(50.04132,21.99901),  
		new google.maps.LatLng(34.0522300,-118.2436800),
		new google.maps.LatLng(33.3405800,44.4008800),
	];
	map.addListener('center_changed', function() { // Handles the center change.
		processEvent(locations, map);
	});
	map.addListener('zoom_changed', function() { // Handles the zoom change.
		console.log(map.getZoom());
		processEvent(locations, map);
	});
}

function processEvent(locations, map) { //Adds to your score when your location is at zoom level 8 in bounds.
	var bounds = map.getBounds();
		var zoomLevel = map.getZoom();
		if (bounds.contains(locations[currentLocation]) && zoomLevel >= 8) {
			currentLocation += 1;
			score.innerHTML = "Score: "+ currentLocation;
			alert("You have located an objective."); // Alert for every single location found. 
			if (currentLocation == locations.length) { // Sends to Win Page if location are found in correct order.
				window.location = "win_page.html";
			}
			
		} else if (bounds.contains(locations[currentLocation])){
			getHint(zoomLevel);
		} else {
			hint.innerHTML = "Hint: You are not near the objective."; // Hint when location in not in bounds.
		}
}

function getHint(level) { // Refreshes Hint based off of the zoom level.
	if (level >= 1 && level <=7) {
		hint.innerHTML = "Hint: "+ hints[level - 1];
	}
	else {
		hint.innerHTML = "Hint: "+ hints[0];
	}
		
}