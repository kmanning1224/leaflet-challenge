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
  id: "mapbox/satellite-v9",
  accessToken: "pk.eyJ1Ijoia2F0YXN0cjBwaGljIiwiYSI6ImNrZmVqbDd0NjAybXoydG83ejU2aGx3cHMifQ.MtO9FDp8gOFPc3KamOV4hg"
}).addTo(myMap);
//How to layer MapBox maps to create proper base?

//Teacher walked through a legend set up in class, however.. it doesnt work.
let legend = L.control({positon: "bottomright"});
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits =["0-1","1-2","2-3","3-4","4-5","5+"];
    let colors = ["green","blue","red","yellow","purple","pink"];
    let labels = [];

colors.forEach(function(color, index) {
    labels.push(`<li><div style="background-color:'${color}'; display:'block'; height:lem; width:lem;">.</div><div>${limits[index]}</div></li>`)

});

div.innerHTML += "<ul>" + labels.join("") + "</ul>";
return div;
}

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




}
})
    