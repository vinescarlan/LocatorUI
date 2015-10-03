// Access search box
var searchBox = document.getElementById("search-box");

// Access search button
var searchBtn = document.getElementById("search-button");

// On each keyup of search box, match the input in list of locations
var locations = [
	"SM Manila Concepcion Cor. Arroceros & San Marcelino Ermita, Manila",
	"SM Sta Mesa Ramon Magsaysay Cor G Araneta Ave Dona Imelda, Quezon City",
	"SM City North EDSA North Avenue corner EDSA Bagong Pag-Asa, Quezon City",
	"SM Caloocan, Rizal Ave Ext East Grace Park, Caloocan Metro Manila",
	"EDSA corner J. Vargas Avenue, Mandaluyong City, Ortigas Center, Mandaluyong"
];

// Call this function everytime the user input a character in search box
function displayHints(str) {
	// Access search hints box, then make it empty
	// So previous searches will be cleared
	var hints = document.getElementById("search-hints");
	hints.innerHTML = null;
	// "str" argument is the search box value
	var pattern = new RegExp(str, "i");
	// Loop throught the "locations" array
	for (var i = 0, len = locations.length; i < len; i++) {
		// Search for pattern
		var match = locations[i].search(pattern);
		// If a match is found
		if (match !== -1) {
			// Create a "p" element
			var p = document.createElement("p");
			// Set "p" content equal to current item inside location array
			p.innerHTML = locations[i].substr(0, match);
			// Highlight the matched string
			p.innerHTML += "<strong>" +
				locations[i].substr(match, searchBox.value.length) +
				"</strong>";
			// Add the remaining string
			p.innerHTML += locations[i].substr(match + searchBox.value.length, locations[i].length);
			// Display the p element
			hints.appendChild(p);
		}
	}
}

searchBox.onkeyup = function () {
	// Store value of search box first
	// since when we call the displayHints function, "this" inside it
	// will refer to the anonymous function
	var that = this.value;
	displayHints(that);
};
