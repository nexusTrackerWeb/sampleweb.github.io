
$(document).ready(function () {
    $("button#followShip").click(function(){
        $("div#home2").show(100);
        $("div#shipmentDetails").show(100);
        $("div#map2").show(100); 
        $("div#map").hide(50); 
        $("div#home").hide(50);  
        markers2[tempkey].setMap(null);
        myChart.destroy();
        $("#inventoryLabel").text(x.value);
        chartData();
      });
    
      $("button#cameraShow").click(function(){
        var tempDisplay = document.getElementById("imageContents2");
          if(window.getComputedStyle(tempDisplay).display == "none")
          {
            $("div#imageContents2").show(400);
            $("label#lblsnapshot").hide(); 
          }
          else
          {
            $("div#imageContents2").hide(400);
          }
    })
    
      $("button#inventoryShow").click(function(){
       
        var tempDisplay = document.getElementById("productContents");
          if(window.getComputedStyle(tempDisplay).display == "none")
          {
            $("div#productContents").show(400);
          }
          else
          {
            $("div#productContents").hide(400);
          }
    })
    
      $("a#back").click(function(){
        $("div#shipmentDetails").hide(100);
        $("div#home2").hide(100); 
        $("div#map2").hide(100); 
        $("div#map").show(100); 
        $("div#home").show(100); 
      
        markers2[tempkey].setMap(null);
        myChart.destroy();
     
      });
    
      $("a#nav1").click(function(){
        $('div#over_map3').show();
        changeMap2();
        if(x.value != "All")
        {
          $("div#map2").show(10); 
         
        }
        else
        {
          $("div#map").show(10); 
        }
        $("div#over_map").show(10);  
        $('div#barchartContents').hide();
        $("a#nav2").removeClass("navActive");
        $("a#nav3").removeClass("navActive");
        $("a#nav4").removeClass("navActive");
        $("a#nav5").removeClass("navActive");
        $("div#monitoringID").hide();
        $("div#snapshotsID").hide();
      });
      
      $("a#nav2").click(function(){ 
        $('div#barchartContents').show();
        $('div#over_map3').hide();
        $("div#shipmentDetails").hide(100);
        $("div#map").hide(10); 
        $("div#map2").hide(10); 
        $("a#nav1").removeClass("navActive");
        $("a#nav2").addClass("navActive");
        $("a#nav3").removeClass("navActive");
        $("a#nav4").removeClass("navActive");
        $("a#nav5").removeClass("navActive");
        $("div#over_map").hide(10); 
        $("div#snapshotsID").show();
        $("div#monitoringID").hide(); 
        chartDoorData();
        chartShockData();
         /*$('select#shipmentPos > option').each(function() {
          alert(  $(this).val());
      });*/
   
     
      });
    
      $("a#nav3").click(function(){
        $('div#over_map3').hide(); 
        $('div#barchartContents').hide();
        $("div#shipmentDetails").hide(100);
        $("a#nav1").removeClass("navActive");
        $("a#nav2").removeClass("navActive");
        $("a#nav3").addClass("navActive");
        $("a#nav4").removeClass("navActive");
        $("a#nav5").removeClass("navActive");
        $("div#map").hide(10); 
        $("div#map2").hide(10); 
        $("div#over_map").hide(10);  s
      
      });
    
      $("a#nav4").click(function(){ 
        $('div#barchartContents').hide();
        $('div#over_map3').hide();
        $("div#shipmentDetails").hide(100);
        $("a#nav1").removeClass("navActive");
        $("a#nav2").removeClass("navActive");
        $("a#nav3").removeClass("navActive");
        $("a#nav4").addClass("navActive");
        $("a#nav5").removeClass("navActive");
        $("div#map").hide(10); 
        $("div#map2").hide(10); 
 
        $("div#over_map").hide(10); 
      });
      
      $("a#nav5").click(function(){

        accountFunction();
      });
      $('select#shipmentPos').on('change', function() {
        $("div#over_map").hide(10); 
        changeMap();
      });
      
      function changeMap()
      {
    
        if(tempkey != null)
        {
            markers2[tempkey].setMap(null);  
            myChart.destroy();
        }
        if(x.value == "All")
        {
            $("div#map2").hide(); 
            $("div#map").show();  
        }
        else
        {
            btnFollow();
            $("div#over_map").hide(10); 
            $("div#shipmentDetails").show(100);
            $("#inventoryLabel").text(x.value);
            chartData();
            $("div#map2").show(); 
            $("div#map").hide(); 
            var cars_Ref2 =  firebase.database().ref('/location/shipments');
            cars_Ref2.child(x.value).once('value',  function (data) {
            updateData(data); 
            tempkey = data.key; 
            });
        }
        
      }
      function changeMap2()
      {
        $("#inventoryLabel").text(x.value);
        chartData();
        btnFollow();
        if(tempkey != null)
        {
            markers2[tempkey].setMap(null);  
            myChart.destroy();
        }
        if(x.value == "All")
        {
            $("div#map2").hide(); 
            $("div#map").show();  
        }
        else
        {
            btnFollow();
            $("div#over_map").hide(10); 
            $("#inventoryLabel").text(x.value);
            chartData();
            $("div#map2").show(); 
            $("div#map").hide(); 
            var cars_Ref2 =  firebase.database().ref('/location/shipments');
            cars_Ref2.child(x.value).once('value',  function (data) {
            updateData(data); 
            tempkey = data.key; 
            });
        }
      }
    })