$(window).resize(function(){
    setTimeout(function(){
        map.updateSize();
    }, 200);
});
var vehicleListInterval;
var fnObj = {};

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutes',
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
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
    PAGE_SAVE: function (caller, act, data) {
        var saveList = [].concat(caller.gridView01.getData("modified"));
        saveList = saveList.concat(caller.gridView01.getData("deleted"));

        axboot.ajax({
            type: "PUT",
            url: ["samples", "parent"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("저장 되었습니다");
            }
        });
    },
    ROUTEMAP: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";

    	if(!($("#"+data.routeId).length))
		{
			 var str=" <div id='"+data.routeId+"' style='border:1px solid #b5b5b5'>";
		     str+= " </div>";
		     //$("#route").append(str);
		}
    	  routeMap(data);
    },    
    
    Routestation_GET: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";
    	var url = COL("apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    			 res= res.Information;
          		 RouteStationLayer(res);
          		 /*url = COL("apiserverip")+'routeNodeCoordinate';
          		ajaxCall(function(result,res){
          			if(result){
          				  res= res.Information;
	                   	 
						  removeStationMaker();
						 
						  for(var i = 0 ;i < res.length;i++)
						  {
						      	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
						
						      	var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
								
								stationLayers.push(stationLayer);
						  }
						  addStationMaker();
          			}else{
          				//console.log(err);
                        axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "not responding."
                        });		
          			}
          		 },url,data);*/
    		}else{
    			console.log(err);
                axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "not responding."
                });		
    		}
    	},url,data);
   	
   	 /*axboot.ajax({
         type: "GET",
         url: '/api/v1/bisMtRoutestations',
         data:  {routeId: data.routeId},
         callback: function (res) {
        	 
            },
         options: {
             // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
             onError: function (err) {
                 console.log(err);
             }
         }
     });*/
},    
    ITEM_CLICK: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.Routestation_GET, {routeId:data.routeId});
        if (vehicleListInterval) {
            clearInterval(vehicleListInterval);
        }
        vehicleList(data);
        vehicleListInterval = setInterval(function() {
            vehicleList(data);
        }, 10000);
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
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
    this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
        this.filter = $("#filter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "routeId", label: COL("route.routeid"), width: 140, align: "center"},
                {key: "routeType", label: COL("route.routetype"), width:140, align: "center",formatter: function () {
            		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                    return detailCode;
                    }},
                {key: "routeName", label: COL("route.routename"), width: 200, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});


function routeMap(data)
{
	var url=COL("apiserverip")+'routeLine';
	ajaxCall(function(result,res){
		if(result){
			res = res.Information;
        	if(0 < res.length)
        		{
        	    if($("#"+res[0].routeId).length)
        	    	{
        	    		var length = res.length;
        	    		var str="";
        	        	str+= "<div style='height:20px;background-color:#e3e3e3;'>";
        	    	    str+= "<div style='float:right;'> <a href='javascript:void(0);' onclick='routeClose(\""+ data.routeId+"\","+data.dindex+")'><img src='/assets/images/map/close.gif'> </a></div>";
        	    	    str+= "<div id=time"+data.routeId+" style='float:right;'>refreshTime:30</div>";
        	    	    str+= "<div> "+COL("route.routename")+" : "+data.routeName+"</div>";
        	    	    
        	    	    str+= "</div>";
        	    	    str+=" <div style='height:240px;overflow:auto;overflow-y:hiden;'>";
        	    	    str+=" <ol class='rt-line' style='position: relative;width:"+(90*length+60)+"px;'>";

        	    	    for(var i = 0; i < length;i++)
        	    	    	{
        	    	    		var img="/assets/images/map/icon_bus_up.png";
        	    	    		if(res[i].updownDir == 1)
        	    	    			{
        	    	    			img="/assets/images/map/icon_bus_down.png";
        	    	    			}
        	    	    		if(i == 0)
        	    				{
        	    	    			img = "/assets/images/map/icon_bus_start.png"
        	    				}
        	    	    		else if(i == length-1)
        	    				{
        	    	    			img = "/assets/images/map/icon_bus_end.png"
        	    				}
        	    	            str+=" <li class='line-up' >";
        	    	            str+="<a class='busstopStart' href='javascript:void(0);' onclick=''><img src='"+img+"' alt='기점'></a>";
        	    	            str+="<span class='busstop-name' title='"+res[i].stationName+"'>"+res[i].stationName+"</span>";
        	    	            str+="<span class='busstop-stno' title='"+(i+1)+"'>"+(i+1)+"</span>";
        	    	           
        	    	                	if(res[i].updownDir == 0)
        	    	        			{
        	    	                		 if(res[i].vehicleId!=null)
        	        	    	            	{
        	    	                			 	str+="<span class='busicon' id='"+data.routeId+(i+1)+"'><img src='/assets/images/map/icon_bus_vehicle_42_blue.png' ></span>";
        	        	    	            	}else
    	        	    	            		{
        	        	    	            		str+="<span class='busicon' id='"+data.routeId+(i+1)+"' style='display:none;'><img src='/assets/images/map/icon_bus_vehicle_42_blue.png' ></span>";
    	        	    	            		}
        	        	    	           }
        	    	                	else
        	    	            		{
        	    	                		if(res[i].vehicleId!=null)
    	        	    	            	{
        	    	                			str+="<span class='busicon' id='"+data.routeId+(i+1)+"'><img src='/assets/images/map/icon_bus_vehicle_42_red.png' ></span>";        	    	            		
    	        	    	            	}
        	    	                		else
        	    	                		{
        	    	                			str+="<span class='busicon' id='"+data.routeId+(i+1)+"'  style='display:none;'><img src='/assets/images/map/icon_bus_vehicle_42_red.png' ></span>";
        	    	                		}
    	    	                		}
        	    	            	
        	    	            if(i != length-1)
        	    	            	{
        	    	            		str+="<span class='traffic-ok' onmouseover='displaySpe('spe1')' onmouseout='undisplSpe('spe1')'></span>";
        	    	            	}
        	    	            
        	    	            str+= "</li>";   
        	    	    	}
        	    	    str+= "</ol>";
        	    	    str+= " </div>";
        	    	    $("#"+res[0].routeId).html(str);

        	    	    var divid="#time"+data.routeId;
        	    	    for(var j = 0;j < divtimecheck.length;j++)
        				{
        					if(divtimecheck[j].divid==divid)
    						{
    							clearTimeout(divtimecheck[j].timeout);
    							divtimecheck.splice(j,1);
    							break;
    						}
        				}
        	  for(var j = 0;j < divcheck.length;j++)
        				{
        					if(divcheck[j].divid==divid)
        						{
        							clearTimeout(divcheck[j].timeout);
        							divcheck.splice(j,1);
        							break;
        						}
        				}
		        	  var d = new Date();
		        	  var time = d.getSeconds();
		        	  if(29 < time )
	        		  {
	        		  time = time - 30;
	        		  }
		        	  time = time - 30;
		        	  
		        	  time = Math.abs(time);
		        	  
        	    	routeTime(divid,time);
        	    	
        	    	var timeout = setTimeout(function(){routeBus(data,length);},time*1000);
        	    	var check={"divid":divid,"timeout":timeout};
        			divcheck.push(check);
        	    	}
        		}else
        		{
        			routeClose(data.routeId,data.dindex);
        			alert("There are no registered stations");
        		}
			}
		else{
    			console.log(err);
                axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "not responding."
                });		
    		}
	},url,data);
};

//var vehicleList = [];
function vehicleList(data){
	var url = "/api/v1/bisMaHistory/vehicleMonitor";
	data = JSON.stringify(data);
	
	//map.getView().setCenter(gps); 
	removeBusMaker();
	$.ajax({
        type: "PUT",
        url: url,
        data:data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 3000,
        success: function(json) {
        	for(var i=0; i<json.length; i++){
        		var gps = ol.proj.transform([json[i].gpsX, json[i].gpsY], 'EPSG:4326', 'EPSG:3857');
        	   	var busLayer = makerLayerWithText(gps,'/assets/images/map/icon_bus_vehicle_42_black.png',json[i].plateNumber);
        	    busLayers.push(busLayer);        		
        	}
        	 addBusMaker();
        },
        error: function(xReq, status, error) {
        	console.log(error);
        }
    });	
	
};