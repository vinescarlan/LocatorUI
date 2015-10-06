// Access search box
var searchBox = document.getElementById("search-box");

// Access search button
var searchBtn = document.getElementById("search-button");

// On each keyup of search box, match the input in list of locations
var location1 = [
	// Caloocan
	"LBC G/F Araneta Square Rizal Avenue Corner Samson Road Monumento Caloocan, 1400 Metro Manila",
	"LBC G/F Victory Central Mall Rizal Ave Monumento 072, Caloocan, 1400 Metro Manila",
	"LBC Asuncion Corner Loreto St. Morning Breeze Subd 84, Caloocan 1400 Metro Manila",
	"LBC 1604 Rizal Ave. Ext. Between 10th And 11th Ave 68, Caloocan 1400 Metro Manila",
	"LBC 95 10th Ave. Cor. Heroes 65, Caloocan 1408 Metro Manila",
	// Quezon
	"LBC L2, Gateway Mall General Roxas Ave Quezon City",
	"LBC Nice Hotel Building , P. A. Bernardo Cor. Malabito Street, San Martin De Porres , San Martin De Pores , 1111 Quezon City , Metro Manila",
	"LBC Farmers Market Gen. Araneta Ave Socorro, Quezon City 1109 Metro Manila",
	"LBC GF Saint Anthony Building 891 Aurora Blvd E. Rodriguez, Quezon City, 1109 Metro Manila",
	// Manila
	"LBC Unit 110, 8000 Plaza Residences Lacson Street 303 Sta. Cruz, Manila 1003 Metro Manila",
	"LBC 624 P. Paterno Street, Quiapo Manila 1001 Metro Manila",
	"LBC Rizal Avenue 304 Zone 29 Santa Cruz, Manila City 1003 Metro Manila",
	"LBC Recto Ave 1391, Manila 1008 Metro Manila",
	"LBC 2Nd Floor Ora Electronics Center 734 Gonzalo Puyat 307, Manila, 1001 Metro Manila",
	// Mandaluyong
	"LBC Sierra Centre 8 Libertad Hiway Hills, Mandaluyong 1550 Metro Manila",
	"LBC Shaw Blvd Mandaluyong 1555 Metro Manila",
	// Pasig
	"LBC RN 17 Shaw Boulevard San Antonio, Pasig 1600 Metro Manila",
	"LBC Unit 9, Roogen Shaw Boulevard San Antonio, Pasig 1609 Metro Manila",
	// Makati
	"Lbc Ground Floor Baron Building II 761 Dr Jose P. Rizal St Poblacuon, Makati, 1210 Metro Manila",
	"LBC Unit 102, MJM Building 650 J.P Rizal Street Makati 1208 Metro Manila",
	"LBC Makati Avenue Poblacion, Makati 1210 Metro Manila",
	"LBC GF Jazz Mall N.Garcia St.Former Repuso St. Bel-Air II, Makati, 1209 Metro Manila"
];

/*
string location
coordinates
nearby location
[
{
stringLocation: ,
nearbylocation: ,
lat: , 
lng:
}
]

*/
var locations = [
	{
		stringLocation: "LBC G/F Araneta Square Rizal Avenue Corner Samson Road Monumento Caloocan, 1400 Metro Manila",
		nearbyLocations: [1, 2, 3, 4],
		src: "pb=!1m18!1m12!1m3!1d3860.0021207311065!2d120.98231100000001!3d14.655821000000019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b42bf34f7895%3A0x6a41b8fd8f5cf68d!2sLBC!5e0!3m2!1sen!2sph!4v1444104464368"
	},
	{
		stringLocation: "LBC G/F Victory Central Mall Rizal Ave Monumento 072, Caloocan, 1400 Metro Manila",
		nearbyLocations: [0, 2, 3, 4],
		lat: 14.655821,
		lng: 120.982311
	},
	{
		stringLocation: "LBC Asuncion Corner Loreto St. Morning Breeze Subd 84, Caloocan 1400 Metro Manila",
		nearbyLocations: [0, 1, 3, 4],
		lat: 14.657591,
		lng: 120.98757
	},
	{
		stringLocation: "LBC 95 10th Ave. Cor. Heroes 65, Caloocan 1408 Metro Manila",
		nearbyLocations: [0, 1, 2, 4],
		lat: 14.651816,
		lng: 120.977301
	},
	{
		stringLocation: "LBC 1604 Rizal Ave. Ext. Between 10th And 11th Ave 68, Caloocan 1400 Metro Manila",
		nearbyLocations: [0, 1, 2, 3],
		lat: 14.6522169,
		lng: 120.9836649
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
		var str = this.innerHTML.replace("<strong>", "");
		str = str.replace("</strong>", "");
		searchBox.value = str;
		hints.innerHTML = null;
	}

	var pHints = hints.querySelectorAll("p");
	if (pHints.length !== 0) pHints[0].style.background = "#efd";
	for (i = 0, len = pHints.length; i < len; i++) {
		pHints[i].addEventListener("click", setInput);
	}
}

var pos = 0; // For tracking pHints position

function highlightText() {
	var pHints = document.querySelectorAll("#search-hints p");
	if (pHints === undefined || pHints.length === 0) return false;

	// Change all pHints background to white
	for (var i = 0, len = pHints.length; i < len; i++) {
		pHints[i].style.background = "#fdfdfd";
	}

	// When up arrow key (38)
	if (window.event.which == 38) {
		if (pos > 0) pos--;
		pHints[pos].style.background = "#efd";
		// or down arrow key (40) is press
	} else if (window.event.which == 40) {
		if (pos < pHints.length - 1) pos++;
		pHints[pos].style.background = "#efd";
	} else if (window.event.which == 13) {
		var str = pHints[pos].innerHTML.replace("<strong>", "");
		str = str.replace("</strong>", "");
		searchBox.value = str;
		addNearbyBranch();
		document.getElementById("search-hints").innerHTML = null;
		for (i = 0, len = locations.length; i < len; i++) {
			if (searchBox.value == locations[i].stringLocation) {
				loadMap(locations[i].src);
				break;
			}
		}
	}

}

document.body.addEventListener("keydown", highlightText);

function addNearbyBranch() {
	// Loop throught locations array and check for match with searchBox content
	var content = searchBox.value;
	var container = document.getElementById("nearby-branch");
	if (content === "") {
		container.innerHTML = "<h3>Nearby branches</h3>";
		container.innerHTML += "<p>No nearby branches</p>";
		return false;
	}
	for (var i = 0, len = locations.length; i < len; i++) {
		if (content == locations[i].stringLocation) {
			container.innerHTML = "<h3>Nearby branches</h3>";
			var nearbyNum = locations[i].nearbyLocations.length;
			for (var j = 0; j < nearbyNum; j++) {
				var nearbys = locations[i].nearbyLocations[j];
				var p = document.createElement("p");
				p.innerHTML = locations[nearbys].stringLocation;
				container.appendChild(p);
			}
		}
	}
}

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
	var map = document.getElementById("google-map");
	map.src = "https://www.google.com/maps/embed?" + url;
}
// Load all branches
loadMap("pb=!1m12!1m8!1m3!1d15440.032333793673!2d120.98674643710937!3d14.655482563301007!3m2!1i1024!2i768!4f13.1!2m1!1slbc!5e0!3m2!1sen!2sph!4v1444102396793");