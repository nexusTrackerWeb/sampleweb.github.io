
function eventTrigger()
{
    var cars_Ref2 =  firebase.database().ref('/location/shipments');
    cars_Ref2.child(x1.value).once('value',  function (data) {
    eventTracker(data); 
    tempkey2 = data.key;
});

}
function placeMarker(location) {
    // first remove all markers if there are any
    mk1 = new google.maps.Marker({position: location, map: map});
    mk2 = new google.maps.Marker({position: uluru1, map: map});
    distance = haversine_distance(mk1, mk2)*1.617;
    deleteOverlays();
    cityCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: eventMap,
    center:location
  });          
 
    var marker = new google.maps.Marker({
        position: location, 
        map: eventMap
    });
    // add marker in markers array
    markersArray.push(marker);
    markersArray.push(mk1);
    markersArray.push(mk2);
    var contentString = '<div class="iw-content"style="font-size: 22px; height:100px;">'  
      + ' <label id="msg">'+"Distance to destination: " + distance.toFixed(2) + " km."+'</label>'
      +'<div class="iw-content">'  
      + ' <input  id="radiusText"type="text"style="font-size: 15px; margin:15px; border:2px solid black; text-align: center; width=80%;" placeholder="Set radius in KM"></input>' 
     
      + ' <button onclick="changeRadius()" id="btn">Save</button>' ;
      + ' <button onclick="changeRadius()" id="btn">Cancel</button>' ;
      // + '<p>455 street</p>' + '<p>City, World</p>' + '<p>Canada, Postalcode</p>' + '</div>'
    var infowindow = new google.maps.InfoWindow({
        content:  contentString
    });
    line = new google.maps.Polyline({path: [location, uluru1], map: eventMap});
    infowindow.open(eventMap,marker); 
    // Calculate and display the distance between markers
 // Calculate and display the distance between markers
}
function changeRadius()
{
  var radiusSet = parseInt($("input#radiusText").val()) * 1000
  cityCircle.setRadius(radiusSet);
  if(distance<= parseInt($("input#radiusText").val()))
  {
    alert("Shipment is on the area");
  }

  if($("input#radiusText").val() != "" )
  {
      firebase.database().ref('/location/shipments/'+x1.value+'').update({
          radius: String(radiusSet),
          radiusLat:String(cityCircle.getCenter().lat()),
          radiusLng:String(cityCircle.getCenter().lng())
      });
      alert("Assigning designation done");
 
       
  }
}
// Deletes all markers in the array by removing references to them
function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            cityCircle.setMap(null);
            markersArray[i].setMap(null);
            line.setMap(null);
        }
    markersArray.length = 0;
    }
}