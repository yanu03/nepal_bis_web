$(window).resize(function(){
    setTimeout(function(){
        map.updateSize();
    }, 200);
});

var selectId={routeId:"",key:"bisKey"};

busStatus();
bitStatus();
var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    ROUTE_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.Select = "routeName";
    	data.useYn="Y";
    	axboot.ajax({
            type: "GET",
            //http://192.168.34.250:8080/route
            url: '/api/v1/bisMtRoutes',
            data: data,
            callback: function (res) {
                caller.gridView03.setData(res);
            },
            error:function(e){
               	alert("error");
               }
        });

        return false;
    },
    SEARCH: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
        ACTIONS.dispatch(ACTIONS.STATION_SEARCH);

        return false;
    },
    STATION_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.Select = "stationName";
    	data.useYn="Y";
        axboot.ajax({
            type: "GET",
            //http://192.168.34.250:8080/station
            url: '/api/v1/bisMtStations',
            data: data,
            callback: function (res) {
                caller.gridView02.setData(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                    
                }
            }
        });

        return false;
    },
    BUSINFO_MAKER:function(caller,act,data)
    {
    	if(selectId.routeId != "")
		{
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
	 	                busTimeout = setTimeout(function(){ACTIONS.dispatch(ACTIONS.BUSINFO_MAKER);},1000*30);
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
	   		},url,selectId);
		}
   		else
		{
    		$("#MapLayer_busInfo").parent().removeClass("active");
            axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Please select a route"
            });		
		}
   		
    },
    STATIONINFO_MAKER:function(caller,act,data)
    {
    	if(selectId.routeId != "")
    		{
    		url= COL("bis.apiserverip")+'routeNodeCoordinate';

        	
    		ajaxCall(function(result,res){
    		             			if(result)
    		         				{
    		             				 res= res.Information;
    			                     	  removeStationMaker();
    			                         for(var i = 0 ;i < res.length;i++)
    			                         {
    			                         	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
    			                         	var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
    			                         	stationLayers.push(stationLayer);
    			                         }
    			                         addStationMaker();
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
    		             		},url,selectId);

    		}
    	else
		{
    		$("#MapLayer_stationInfo").parent().removeClass("active");
            axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Please select a route"
            });		
		}
    		
    },
    ROUTESTATION_MAKER: function (caller, act, data) {
// http://192.168.34.250:8080/routeNodeCoordinate?key=bisKey&routeId=R000000001&callback=callback
//  	
    	selectId.routeId=data.routeId;
    	$("#MapLayer_busInfo").parent().addClass("active");
    	$("#MapLayer_stationInfo").parent().addClass("active");
    	
    	/*
    	if($("#MapLayer_busInfo").parent().hasClass("active")) {
			$("#MapLayer_busInfo").parent().removeClass("active");
		}
    	if($("#MapLayer_stationInfo").parent().hasClass("active")) {
			$("#MapLayer_stationInfo").parent().removeClass("active");
		}*/
    	data.key="bisKey";
    	data.useYn="Y";
    	
    	
    	var url = COL("bis.apiserverip")+'routeVertex';
    	ajaxCall(function(result,res)
    			{
    		if(result)
				{
    				res= res.Information;
             	
             		RouteStationLayer(res);
             		url= COL("bis.apiserverip")+'routeNodeCoordinate';
             		
             		ajaxCall(function(result,res){
             			if(result)
         				{
             				 res= res.Information;
	                     	  removeStationMaker();
	                         for(var i = 0 ;i < res.length;i++)
	                         {
	                         	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
	            	   		
	                         	var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
	            	    	
	                         	stationLayers.push(stationLayer);
	                         }
	                         addStationMaker();
	                         setRouteBusMaker(data);
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
            url: COL("bis.apiserverip")+'routeVertex',
            dataType:"json",
            data:data,
            success: function (res) {
            	 res= res.Information;
            	
            	RouteStationLayer(res);
            	$.ajax({
                    type: "GET",
                   // url: '/openAPI/routeNodeCoordinate',
                    url: COL("bis.apiserverip")+'routeNodeCoordinate',
                   // async: false,
                    data:data,
                    dataType:"json",
                    success: function (res) {
                    	 res= res.Information;
                    	  removeStationMaker();
                        for(var i = 0 ;i < res.length;i++)
                        {
                        	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
           	   		
                        	var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
           	    	
                        	stationLayers.push(stationLayer);
                        }
                        addStationMaker();
                        setRouteBusMaker(data);
                    },
                    error: function (err) {
                        console.log(err);
                        axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "not responding."
                        });			
                }
                });
            },
            error:function(e){
          	   axDialog.alert({
                     theme: "primary",
                     title:" ",
                     msg: "not responding."
                 });				
             }
        });
   		*/
  	
   		//http://192.168.34.250:8889/routeNodeCoodinate?key=bisKey&routeId=R000000001&startIndex=1&endIndex=10&callback=?	
   		//http://192.168.34.250:8889/routeNodeCoordinate?key=bisKey&routeId=R000000001&startIndex=1&endIndex=10&callback=?
  
        return false;
    },
    STATION_MAKER: function (caller, act, data) {
    	removeRouteStationLayer();
    	data.Select="stationId";
    	data.Keyword=data.stationId;
   		axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtStations',
            data: data,
            callback: function (res) {
            	removeBusMaker();
              	removeStationMaker();
           		var gps = ol.proj.transform([res[0].gpsX, res[0].gpsY], 'EPSG:4326', 'EPSG:3857');
           		map.getView().setCenter(gps); 
           	   	var stationLayer = makerLayer(gps,'/assets/images/map/busstopicon.png',res[0].stationName);
           	    stationLayers.push(stationLayer);
           	    addStationMaker();
           	    
            }
        });
        return false;
    },
    PAGE_SEARCH: function (caller,act,data)
    {
    	   ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
    	   ACTIONS.dispatch(ACTIONS.STATION_SEARCH);
    	   return false;
    },
    ITEM_CLICK: function (caller, act, data) {

    },
    ITEM_ADD: function (caller, act, data) {
    },
    ITEM_DEL: function (caller, act, data) {
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    
    this.gridView02.initView();
    this.gridView03.initView();
    ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
    ACTIONS.dispatch(ACTIONS.STATION_SEARCH);
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
            },
            "excel": function () {

            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
	    initView: function () {
	        this.target = $(document["searchView0"]);
	        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
	       //this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);");
	        this.filter = $("#Keyword");
	        axboot.buttonClick(this, "data-searchview-btn", {
	            "search": function () {
	                ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
	                ACTIONS.dispatch(ACTIONS.STATION_SEARCH);
	            }
	        });  
	    },
	    getData: function () {
	        return {
	            Keyword: this.filter.val()
	        }
	    }
	});



/**
 * gridView02
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	  {key: "stationId", label: COL("bis.station.stationid"), width: 90, align: "center"},
                  {key: "stationName", label: COL("bis.station.stationname"), width: 159, align: "center"}
            ],
            body: {
                onClick: function () {
                	selectId.routeId="";
                	if($("#MapLayer_busInfo").parent().hasClass("active")) {
            			$("#MapLayer_busInfo").parent().removeClass("active");
            		}
                	if($("#MapLayer_stationInfo").parent().hasClass("active")) {
            			$("#MapLayer_stationInfo").parent().removeClass("active");
            		}
                	 this.self.select(this.dindex, {selectedClear: true});
                     data = this.list[this.dindex];
                     ACTIONS.dispatch(ACTIONS.STATION_MAKER,data);
                }
            }
        });

    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});



fnObj.gridView03 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	   {key: "routeId", label: COL("bis.route.routeid"), width: 90, align: "center"},
                   {key: "routeName", label: COL("bis.route.routename"), width: 159, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    data = this.list[this.dindex];
                    ACTIONS.dispatch(ACTIONS.ROUTESTATION_MAKER,data);
                }
            }
        });

    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});

/**
 * gridView
 *//*
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "routeId", label: COL("bis.route.routeid"), width: 90, align: "center"},
                {key: "routeName", label: COL("bis.route.routename"), width: 159, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    data = this.list[this.dindex];
                    ACTIONS.dispatch(ACTIONS.ROUTESTATION_MAKER,data);
                }
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});
*//*
function getRefreshTime(){
	   $.ajax({
           type: "GET",
           url: COL("bis.apiserverip")+'getRefreshTime?',
         //async: false,
           dataType:'json',
           success: function (res) {
				refreshTime=res.refreshTime;
           },
           error:function(e){
        	   setTimeout("getRefreshTime()",refreshTime);
           }
	 	});
}*/
function busStatus(){
	var url= COL("bis.apiserverip")+'busStatus?key=bisKey';
	ajaxCall(function(result,res){
		if(result)
			{
			businfo = res.Information[0];
	    	busTotal=res.Information[0].total;
	    	busRun=res.Information[0].run;
	    	busEtc=res.Information[0].etc;
	    	
	    	$("#busTotal").text(busTotal);
	    	$("#busRun").text(busRun);
	    	$("#busEtc").text(busEtc);
	    	setTimeout("busStatus()",refreshTime);

			}
		else
			{
			setTimeout("busStatus()",refreshTime);
			}
	},url);/*
$.ajax({
    type: "GET",
    url: COL("bis.apiserverip")+'busStatus?key=bisKey',
    dataType:'json',
    success: function (res) {
     	$("#busTotal").append();
    	$("#busRun").append(res.Information[0].RUN);
    	$("#busWait").append(res.Information[0].ETC); 
    	businfo = res.Information[0];
    	busTotal=res.Information[0].total;
    	busRun=res.Information[0].run;
    	busEtc=res.Information[0].etc;
    	
    	$("#busTotal").text(busTotal);
    	$("#busRun").text(busRun);
    	$("#busEtc").text(busEtc);
    	setTimeout("busStatus()",refreshTime);

    },
    error:function(e){
    	setTimeout("busStatus()",refreshTime);
    }
    
	});*/
};

function bitStatus(){
	var url =  COL("bis.apiserverip")+'bitStatus?key=bisKey';
	
	ajaxCall(function(result,res)
			{
				if(result)
				{
					bitinfo = res.Information[0];
			    	bitTotal=res.Information[0].total;
			    	bitRun=res.Information[0].run;
			    	bitEtc=res.Information[0].etc;
			    	
			    	$("#bitTotal").text(bitTotal);
			    	$("#bitRun").text(bitRun);
			    	$("#bitEtc").text(bitEtc);
			    	setTimeout("bitStatus()",refreshTime);
				}
				else
				{
					setTimeout("bitStatus()",refreshTime);
				}
			},url);
	
/*	
$.ajax({
    type: "GET",
    url: COL("bis.apiserverip")+'bitStatus?key=bisKey',
    dataType:'json',
    success: function (res) {
     	$("#busTotal").append();
    	$("#busRun").append(res.Information[0].RUN);
    	$("#busWait").append(res.Information[0].ETC); 
    	bitinfo = res.Information[0];
    	bitTotal=res.Information[0].total;
    	bitRun=res.Information[0].run;
    	bitEtc=res.Information[0].etc;
    	
    	$("#bitTotal").text(bitTotal);
    	$("#bitRun").text(bitRun);
    	$("#bitEtc").text(bitEtc);
    	setTimeout("bitStatus()",refreshTime);

    },
    error : function(){
    	setTimeout("bitStatus()",refreshTime);
    }
    });*/
};
