// Access search box
var searchBox = document.getElementById("search-box");

// Access search button
var searchBtn = document.getElementById("search-button");

var locations = [
	{
		stringLocation: "LBC G/F Araneta Square Rizal Avenue Corner Samson Road Monumento Caloocan, 1400 Metro Manila",
		nearbyLocations: [1, 2, 3, 4],
		src: "pb=!1m18!1m12!1m3!1d3860.0021672727776!2d120.98450562048973!3d14.655818358380062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x4ac6b2475ba01163!2sLBC!5e0!3m2!1sen!2sph!4v1444111061730"
	},
	{
		stringLocation: "LBC G/F Victory Central Mall Rizal Ave Monumento 072, Caloocan, 1400 Metro Manila",
		nearbyLocations: [0, 2, 3, 4],
		src: "pb=!1m18!1m12!1m3!1d3860.0021207311065!2d120.98231100000001!3d14.655821000000019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b42bf34f7895%3A0x6a41b8fd8f5cf68d!2sLBC!5e0!3m2!1sen!2sph!4v1444104464368"
	},
	{
		stringLocation: "LBC Asuncion Corner Loreto St. Morning Breeze Subd 84, Caloocan 1400 Metro Manila",
		nearbyLocations: [0, 1, 3, 4],
		src: "pb=!1m18!1m12!1m3!1d3860.001618641819!2d120.98453780699789!3d14.655849497638203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x2e69fc77e0b8e434!2sLbc!5e0!3m2!1sen!2sph!4v1444111107142"
	},
	{
		stringLocation: "LBC 95 10th Ave. Cor. Heroes 65, Caloocan 1408 Metro Manila",
		nearbyLocations: [0, 1, 2, 4],
		src: "pb=!1m18!1m12!1m3!1d3860.048065634142!2d120.9793879656893!3d14.653213024776457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x713e4f176a4f9658!2sLBC!5e0!3m2!1sen!2sph!4v1444111284311"
	},
	{
		stringLocation: "LBC 1604 Rizal Ave. Ext. Between 10th And 11th Ave 68, Caloocan 1400 Metro Manila",
		nearbyLocations: [0, 1, 2, 3],
		src: "pb=!1m18!1m12!1m3!1d3860.03398605097!2d120.98422667075215!3d14.654012273837289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x15f5ed1109de8d49!2sLBC!5e0!3m2!1sen!2sph!4v1444111210308"
	}
];

// Call this function everytime the user input a character in search box
function displayHints(str) {
	if (window.event.which == 38 || window.event.which == 40 ||
		window.event.which == 13) return false;
	// Access search hints box, then make it empty
	// So previous searches will be cleared
	var hints = document.getElementById("search-hints");
	hints.innerHTML = null;
	// If search box value is empty, stop further execution of code
	if (str === "") return false;
	// "str" argument is the search box value
	var pattern = new RegExp(str, "i");
	// Loop throught the "locations" array
	for (var i = 0, len = locations.length; i < len; i++) {
		var currentItem = locations[i].stringLocation;
		// Search for pattern
		var match = currentItem.search(pattern);
		// If a match is found
		if (match !== -1) {
			// Create a "p" element
			var p = document.createElement("p");
			// Set "p" content equal to current item inside location array
			p.innerHTML = currentItem.substr(0, match);
			// Highlight the matched string
			p.innerHTML += "<strong>" +
				currentItem.substr(match, searchBox.value.length) +
				"</strong>";
			// Add the remaining string
			p.innerHTML += currentItem.substr(match + searchBox.value.length, currentItem.length);
			// Display the p element
			hints.appendChild(p);
		}
	}

	function setInput() {
		// Remove the strong elements before setting input
		var str = this.innerHTML.replace("<strong>", "");
		str = str.replace("</strong>", "");
		searchBox.value = str;
		hints.innerHTML = null;
		// Reset pos to 0
		pos = 0;
	}
	
	// Get all displayed hints
	var pHints = hints.querySelectorAll("p");
	// If there's a hint displayed, set bgcolor of the first one to light green
	if (pHints.length !== 0) pHints[0].style.background = "#efd";
	// Listen for click event to all hints displayed
	for (i = 0, len = pHints.length; i < len; i++) {
		pHints[i].addEventListener("click", setInput);
	}
}

var pos = 0; // For tracking pHints position

function highlightText() {
	// Get all displayed hints
	var pHints = document.querySelectorAll("#search-hints p");
	// If there is no hints displayed, STOP
	if (pHints === undefined || pHints.length === 0) return false;

	// Change all pHints background to white
	for (var i = 0, len = pHints.length; i < len; i++) {
		pHints[i].style.background = "#fdfdfd";
	}

	// When up arrow key (38)
	if (window.event.which == 38) {
		if (pos > 0) pos--; // Prevent negative numbers
		pHints[pos].style.background = "#efd";
		pHints[pos].scrollIntoView();
		// or down arrow key (40) is press
	} else if (window.event.which == 40) {
		// Prevent numbers higher than no. of displayed hints
		if (pos < pHints.length - 1) pos++;
		pHints[pos].style.background = "#efd";
		pHints[pos].scrollIntoView();
	} else if (window.event.which == 13) {
		// Remove the strong elements before setting input
		var str = pHints[pos].innerHTML.replace("<strong>", "");
		str = str.replace("</strong>", "");
		searchBox.value = str;
		addNearbyBranch();
		// Hide the hints container
		document.getElementById("search-hints").innerHTML = null;
		// Find a match between searchBox input and locations
		for (i = 0, len = locations.length; i < len; i++) {
			if (searchBox.value == locations[i].stringLocation) {
				// When match is found, set iframe's src to current "locations" src
				loadMap(locations[i].src);
				break;
			}
		}
		// Reset pos to 0
		pos = 0;
	}

}

// Call highlightText function in each keydown
document.body.addEventListener("keydown", highlightText);

function addNearbyBranch() {
	// Loop throught locations array and check for match with searchBox content
	var content = searchBox.value;
	// Get nearby branch section
	var container = document.getElementById("nearby-branch");
	// If value of searchbox is empty
	if (content === "") {
		// Display "no nearby branches"
		container.innerHTML = "<h3>Nearby branches</h3>";
		container.innerHTML += "<p>No nearby branches</p>";
		return false; // Then STOP
	}
	// If search-box has input value, loop throught "locations"
	for (var i = 0, len = locations.length; i < len; i++) {
		// Check if search-box value is equal to current "locations".stringlocation
		if (content == locations[i].stringLocation) {
			// Add heading first
			container.innerHTML = "<h3>Nearby branches</h3>";
			// Get nearbyNum property value
			var nearbyNum = locations[i].nearbyLocations.length;
			// Loop through it
			for (var j = 0; j < nearbyNum; j++) {
				// J = nearbyNum item position
				var nearbys = locations[i].nearbyLocations[j];
				// Generate a p element containing the stringLocation
				var p = document.createElement("p");
				p.innerHTML = locations[nearbys].stringLocation;
				// Finally, append it
				container.appendChild(p);
			}
		}
	}
}

// Display nearby branches when the hint is clicked
searchBtn.onclick = addNearbyBranch;

searchBox.onkeyup = function () {
	// Store value of search box first
	// since when we call the displayHints function, "this" inside it
	// will refer to the anonymous function
	var that = this.value;
	displayHints(that);
};

// Google Map
function loadMap(url) {
	// Get map container
	var map = document.getElementById("google-map");
	// Set src
	map.src = "https://www.google.com/maps/embed?" + url;
}
// Load all branches
loadMap("pb=!1m12!1m8!1m3!1d15440.032333793673!2d120.98674643710937!3d14.655482563301007!3m2!1i1024!2i768!4f13.1!2m1!1slbc!5e0!3m2!1sen!2sph!4v1444102396793");