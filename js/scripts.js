// Places Business Logic

function Places() {
  this.locations = {};
  this.currentId = 0;
}

Places.prototype.addLocation = function(location) {
  location.id = this.assignId();
  this.locations[location.id] = location
};

Places.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

Places.prototype.findLocation = function(id) {
  if (this.locations[id] != undefined) {
    return this.locations[id];
  }
  return false;
};

Places.prototype.deleteLocation = function(id) {
  if (this.locations[id] === undefined) {
    return false;
  }
  delete this.locations[id];
  return true;
}

// Location Business Logic

function Locations(name, country, landmarks, notes, foods, time) {
  this.name = name;
  this.country = country;
  this.landmarks = landmarks;
  this.foods = foods;
  this.time = time;
  this.notes = notes;
}

// UI Logic

function displayLocations(places) {
  let locationsList = $("ul#locations")
  let htmlForLocationInfo = "";
  Object.keys(places.locations).forEach(function(key) {
    const location = places.findLocation(key);
    htmlForLocationInfo += "<li id=" + location.id + ">" + location.country + ": " + location.name + " " + "</li>"
  });
  locationsList.html(htmlForLocationInfo);
}

function attachLocationListeners() {
  $("ul#locations").on("click", "li", function(){
    showLocation(this.id);
  });
}

let places = new Places();

$(document).ready(function() {
  attachLocationListeners();
  $("form#location-form").submit(function(event) {
    event.preventDefault();
    let newLocation = new Locations($("input#name").val(), $("input#country").val(), $("input#landmarks").val(), $("input#foods").val(), $("input#time").val(), $("input#notes").val());
    places.addLocation(newLocation);
    displayLocations(places);
  });
});