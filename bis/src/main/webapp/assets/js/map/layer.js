
var stationLayers = [];
var busLayers = [];
var RouteStationLayers = [];
var busTimeout;
function makerLayer(gps,icon,Name)
{
	var iconFeature = new ol.Feature({
		  geometry: new ol.geom.Point([gps[0], gps[1]]),
		  name: Name,
		  population: 4000,
		  rainfall: 500
		});
	
	var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [0.5, 46],
		    anchorXUnits: 'fraction',
		    anchorYUnits: 'pixels',
		    opacity: 1,
		    src: icon
		  }))
		});

		iconFeature.setStyle(iconStyle);

		var vectorSource = new ol.source.Vector({
		  features: [iconFeature]
		});
		var	Layer = new ol.layer.Vector({
  		  source: vectorSource
  		});
		return Layer;
	}
function removeStationMaker()
{
	for(var i = 0;i < stationLayers.length;i++)
	{
		map.removeLayer(stationLayers[i]);
	}
	stationLayers = [];
}

function addStationMaker()
{
	for(var i = 0;i < stationLayers.length;i++)
	{
		map.addLayer(stationLayers[i]);
	}
	
}
function removeBusMaker()
{
	clearTimeout(busTimeout);
	for(var i = 0;i < busLayers.length;i++)
	{
		map.removeLayer(busLayers[i]);
	}
	busLayers = [];
}
function addBusMaker()
{
	for(var i = 0;i < busLayers.length;i++)
	{
		map.addLayer(busLayers[i]);
	}
	
}
function removeRouteStationLayer()
{
	   for(var i  = 0;i < RouteStationLayers.length;i++)
		   {
		   map.removeLayer(RouteStationLayers[i]);
		   }
	   RouteStationLayers = [];
}

function RouteStationLayer(res)
{
    var length= res.length;
    var upDir= [];
    var downDir=[];
    var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
  

    for(var i = 0; i < length;i++)
 	   {
 	  		var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
 	
 	  	  if(res[i].updownDir== "0")
	    	{
	    	upDir.push(center);
	    	}
	    else if(res[i].updownDir== "1")
	    	{
	    	downDir.push(center);
	    	}
 	   				
 	   				var y = res[i].gpsY;
         	   		var x = res[i].gpsX;
         	   		if (minX > x && x > 0) minX = x;
     		        if (minY > y && y > 0) minY = y;
     		        if (maxX < x && x > 0) maxX = x;
     		        if (maxY < y && y > 0) maxY = y;
 	   			
 	   }
    if (minX != null && minY != null && maxX != null && maxY != null) {
			var bottomLeft = new ol.proj.transform([minX, minY], 'EPSG:4326', 'EPSG:3857');
	        var topRight = new ol.proj.transform([maxX, maxY], 'EPSG:4326', 'EPSG:3857');
	        var extent = new ol.extent.boundingExtent([bottomLeft, topRight]);
	        
	        map.getView().fitExtent(extent, map.getSize());
	    }
    removeRouteStationLayer();
    RouteLayer(upDir,1);
    RouteLayer(downDir,2);
    	}
//버스노선을 그린다

function RouteLayer(coordinates,dir)
{
	
	var color = "";
	if( dir == 1)
		{
		 color = 'rgba(0, 0, 153, 1)';
		
		}
	else if( dir == 2)
		{
		color='rgba(255, 0, 0, 1)';
		}
	
	var lineString = new ol.geom.LineString(coordinates);
	      
   	
   	var lineStyle1 = new ol.style.Style({ // 테두리
             stroke: new ol.style.Stroke({
                 color: color,
                 lineCap: 'square',
                 lineJoin: 'round',
                 width: 8
             })
       });
 	var RouteStationLayer1 = new ol.layer.Vector({
 		name: "RouteStationLayer",
 	    source: new ol.source.Vector({
 	        features: [new ol.Feature({
 	            geometry: lineString,
 	            name: ""
 	        })]
 	    }),
 	    style: lineStyle1
 	});


 	    var lineStyle2 = new ol.style.Style({ // 라인 안 점선 
 	          stroke: new ol.style.Stroke({
 	              color: 'rgba(255, 255, 255, 1)',
 	              lineDash: [1, 5],
 	              width: 2
 	          })
 	    });//
 	  
 		var RouteStationLayer2 = new ol.layer.Vector({
 			name: "RouteStationLayer",
 		    source: new ol.source.Vector({
 		        features: [new ol.Feature({
 		            geometry: lineString,
 		            name: ""
 		        })]
 		    }),
 		    style: lineStyle2
 		});
 	RouteStationLayers.push(RouteStationLayer1);
 	RouteStationLayers.push(RouteStationLayer2);
 	map.addLayer(RouteStationLayer1);
 	map.addLayer(RouteStationLayer2);
 	
}

	function allBusMaker(){
  		/*removeRouteStationLayer();
  		if(!$("#MapLayer_stationInfo").parent().hasClass("active"))
  			{
  			 removeStationMaker();
  			}*/
  		 removeBusMaker();
  		 
  		 var url = COL("bis.apiserverip")+'busLocation';
  		 var data = {};
  		 data.key="bisKey";
  		ajaxCall(function(result,res){
  			if(result)
  				{
  				res= res.Information;
                var length= res.length;
           //     var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
                for(var i = 0;i < length;i++)
             	   {
                	var gps = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
            		//map.getView().setCenter(gps); 
            	   	var busLayer = makerLayer(gps,'/assets/images/map/icon_bus_vehicle_42_blue.png',res[i].busName);
            	    
            	    busLayers.push(busLayer);
             	   }
                addBusMaker();
                busTimeout = setTimeout("allBusMaker()",1000*30);
  				}
  			else
  				{
	  				console.log(err);
	                axDialog.alert({
	                    theme: "primary",
	                    title:" ",
	                    msg: "not responding."
	                });
  				}
  		},url,data);
  	/*	
  		$.ajax({
            type: "GET",
            url: COL("bis.apiserverip")+'busLocation',
            data:{"key":"bisKey"},
            dataType:"json",
            //async: false,
            success: function (res) {
            	res= res.Information;
                var length= res.length;
           //     var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
                for(var i = 0;i < length;i++)
             	   {
                	var gps = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
            		//map.getView().setCenter(gps); 
            	   	var busLayer = makerLayer(gps,'/assets/images/map/icon_bus_vehicle_42_blue.png',res[i].busName);
            	    
            	    busLayers.push(busLayer);
             	   }
                addBusMaker();
                busTimeout = setTimeout("allBusMaker()",1000*30);
            },
           error : function (e)
           {
               console.log(err);
               axDialog.alert({
                   theme: "primary",
                   title:" ",
                   msg: "not responding."
               });
           }
            
        });*/
  		
  	}
function setRouteBusMaker(data){
		data.key="bisKey";
		
 		 var url = COL("bis.apiserverip")+'busLocation';
  		ajaxCall(function(result,res){
  			if(result)
  				{
	  				res= res.Information;
	                var length= res.length;
	                removeBusMaker();
	           //     var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
	                for(var i = 0;i < length;i++)
	             	   {
	                	var gps = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
	            		//map.getView().setCenter(gps); 
	                	img="/assets/images/map/icon_bus_vehicle_42_blue.png"
	                	if(res[i].updownDir == 1)
	                	{
	                		var img="/assets/images/map/icon_bus_vehicle_42_red.png";
	                	}
	            	   	var busLayer = makerLayer(gps,img,res[i].busName);
	            	    
	            	    busLayers.push(busLayer);
	             	   }
	                addBusMaker();
	                busTimeout = setTimeout(function(){setRouteBusMaker(data)},1000*30);
  				}
  			else
  				{
	  				console.log(err);
	                axDialog.alert({
	                    theme: "primary",
	                    title:" ",
	                    msg: "not responding."
	                });
  				}
  		},url,data);
		
	/*	
		$.ajax({
	            type: "GET",
	            
	            dataType:"json",
	            //url: 'http://192.168.34.250:8080/busLocation',
	            url: COL("bis.apiserverip")+'busLocation',
	            dataType:"json",
	            data: data,
	          //  async: false,
	            success: function (res) {
	            	res= res.Information;
	                var length= res.length;
	                removeBusMaker();
	           //     var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
	                for(var i = 0;i < length;i++)
	             	   {
	                	var gps = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
	            		//map.getView().setCenter(gps); 
	                	img="/assets/images/map/icon_bus_vehicle_42_blue.png"
	                	if(res[i].updownDir == 1)
	                	{
	                		var img="/assets/images/map/icon_bus_vehicle_42_red.png";
	                	}
	            	   	var busLayer = makerLayer(gps,img,res[i].busName);
	            	    
	            	    busLayers.push(busLayer);
	             	   }
	                addBusMaker();
	                busTimeout = setTimeout(function(){setRouteBusMaker(data)},1000*30);
	            },
	            error : function (e)
	            {
	                console.log(err);
	                axDialog.alert({
	                    theme: "primary",
	                    title:" ",
	                    msg: "not responding."
	                });
	            }
	        });*/
		
		}