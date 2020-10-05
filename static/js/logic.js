// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
let config = "static/js/config.js"
let myMap = L.map("map", {
    center: [39.8283,-98.5795],
    zoom: 5
});

var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: "pk.eyJ1Ijoia2F0YXN0cjBwaGljIiwiYSI6ImNrZmVqbDd0NjAybXoydG83ejU2aGx3cHMifQ.MtO9FDp8gOFPc3KamOV4hg"
}).addTo(myMap);

let baseURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


//Should there be less option for colors? I.E Just focus on >6,>4,>2,>0?
d3.json(baseURL, function(earthquakeinfo) {
    console.log(earthquakeinfo)
    let array = earthquakeinfo.features;
    for (let i = 0; i < array.length; i ++){
    let coord = array[i].geometry.coordinates;
    let mag = array[i].properties.mag;
    let radius = mag * 20000
    let location = array[i].properties.place;
    let color = "";
    if (mag > 5.5) {
        color = "red"
    }
    else if (mag > 5.0){
        color = "yellow"
    }
    else if (mag > 4.0) {
        color = "orange"
    }
    else if (mag > 3.0){
        color = "green"
    }
    else if (mag > 2.0){
        color = "blue"
    }
    else {
        color = "purple"
    }
    L.circle([coord[1], coord[0]], {
        color: "none",
        stroke: 0.1,
        strokeOpacity: 0.25,
        fillOpacity: 0.75,
        fillColor: color,
        radius: radius
    }).bindPopup("<h1> " + location +  "<h3> Magnitude : " + mag + "</h3>").addTo(myMap)
    
    function getColor(d) {
        return d > 5 ? 'red' :
               d > 4  ? 'yellow' :
               d > 3  ? 'orange' :
               d > 2  ? 'green' :
               d > 1  ? 'blue' :
                        'purple';
      }
    
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function (myMap) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0, 1, 2, 3, 4, 5],
            labels = [];
    
            
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    



}
legend.addTo(myMap);

})
    