// Define Base Map
// var mapboxAccessToken = 'pk.eyJ1IjoibmpkZXBza3kiLCJhIjoiY2p5a255c2ozMGdwMTNjbjRuN2ZqcXduZCJ9.QW48Rnofx3wlIb02byRGrA';
// var baseMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     minZoom: 12,
//     zoomControl: false,
//     id: 'mapbox.streets',
//     accessToken: mapboxAccessToken
// });

var map = L.map('map', {
    zoomSnap: 0.5,
}).setView([0, 0], 4.5);

var customControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-resetzoom');
        container.onclick = function () {
            map.setView([0, 0], 4.5);
            console.log('buttonClicked');
        }
        return container;
    }
});

map.addControl(new customControl());

// Get initial dropdown menu value
var menuval = document.getElementById("menu-select").value;

// Define Layer Style and Interactive Functions
// County Color Scheme
function getCtyColor(d) {
    return d > 5000 ? '#7f2704' :
        d > 1000 ? '#df4f05' :
            d > 500 ? '#fd9243' :
                d > 50 ? '#fed2a6' :
                    d > 5 ? '#fff5eb' :
                        '#ffffff';
}

// Feature Highlight
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#456dff',
        opacity: 0.9,
        dashArray: ''
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

var Cty_resetHighlight = function (e) {
    countyData.resetStyle(e.target);
    info.update();
}

function CD_resetHighlight(e) {
    CDData.resetStyle(e.target);
    info.update();
}

function Cty_onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: Cty_resetHighlight
    });
}

function CD_onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: CD_resetHighlight
    });
}

// Load, Define, Add Layers 
map.createPane('land');
var countyData = L.geoJson.ajax("layers/ne_10m_land_noANT.geojson", {
    pane: 'land',
    style: function (feature) {
        return {
            // fillColor: getCtyColor(feature.properties[menuval]),
            fillColor: '#ffffff',
            fillOpacity: 1,
            color: '#f0f0f0',
            opacity: 1,
            weight: 0.7
        };
    },
    onEachFeature: Cty_onEachFeature
}).addTo(map);

// ----------------------------------------------------------- //
// // Get dropdown menu value and update map
// function myFunction(val) {
//     function NewCty_onEachFeature(feature, layer) {
//         layer.on({
//             mouseover: highlightFeature,
//             mouseout: function (e) {
//                 NewcountyData.resetStyle(e.target);
//                 info.update();
//             },
//         });
//     }

//     var NewcountyData = L.geoJson.ajax("layers/US_County_wNAICS_FFdata.geojson", {
//         pane: 'counties',
//         style: function (feature) {
//             return {
//                 fillColor: getCtyColor(feature.properties[val]),
//                 fillOpacity: 1,
//                 color: '#f0f0f0',
//                 opacity: 1,
//                 weight: 0.7
//             };
//         },
//         onEachFeature: NewCty_onEachFeature
//     }).addTo(map);

//     info.update = function (props) {
//         this._div.innerHTML = (props ?
//             '<b>' + props.maplab + '</b><br />' + props[val] + ' employees'
//             : 'Hover over a County');
//     };

//     function highlightFeature(e) {
//         var layer = e.target;

//         layer.setStyle({
//             weight: 4,
//             color: '#456dff',
//             opacity: 0.9,
//             dashArray: ''
//         });

//         if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//             layer.bringToFront();
//         }
//         info.update(layer.feature.properties);
//     }
// }
// // ----------------------------------------------------------- //

// map.createPane('states');
// var stateData = L.geoJson.ajax("layers/statesAKHIclose.geojson", {
//     pane: 'states',
//     interactive: false,
//     style: function (feature) {
//         return {
//             fillColor: '#ffffff',
//             fillOpacity: 0,

//             color: 'black',
//             opacity: 0.7,
//             weight: 1
//         };
//     }
// }).addTo(map);

// map.createPane('usa');
// var stateData = L.geoJson.ajax("layers/usaBorder_AKHIclose.geojson", {
//     pane: 'usa',
//     interactive: false,
//     style: function (feature) {
//         return {
//             fillColor: '#ffffff',
//             fillOpacity: 0,

//             color: 'black',
//             opacity: 0.7,
//             weight: 1.5
//         };
//     }
// }).addTo(map);

// map.createPane('districts');
// var CDData = L.geoJson.ajax("layers/CD_2017_AKHIclose.geojson", {
//     pane: 'districts',
//     style: function (feature) {
//         return {
//             fillColor: '#ffffff',
//             fillOpacity: 0,
//             color: '#331a70',
//             dashArray: '3',
//             opacity: 0.5,
//             weight: 1.7
//         };
//     },
//     onEachFeature: CD_onEachFeature
// });

// var info = L.control();

// info.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// // method that we will use to update the control based on feature properties passed
// info.update = function (props) {
//     this._div.innerHTML = (props ?
//         '<b>' + props.maplab + '</b><br />' + props[menuval] + ' employees'
//         : '<h4>Hover over a County</h4>');
// };

// info.addTo(map);

// var legend = L.control({ position: 'bottomright' });

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 5, 50, 500, 1000, 5000],
//         labels = [];

//     // legend title
//     div.innerHTML = '<h4>Employed Persons</h4>'

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="opacity:1; background:' + getCtyColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }
//     return div;
// };

// legend.addTo(map);

// // Add Layer Control
// var overlayMaps = {
//     "Congressional Districts": CDData
// }
// L.control.layers({}, overlayMaps, { collapsed: false }).addTo(map);

