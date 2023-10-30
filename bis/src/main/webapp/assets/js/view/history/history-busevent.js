var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	caller.gridView02.initView();
    	var rightItem=caller.gridView01.target.getList("selected");	//rightGridSelectData
    	if(rightItem.length==0){
    		axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Please select from the left."
        	})
        	
    	}else{
    		var sendData=caller.searchView2.getData();	//startDate,endDate
        	var division=caller.searchView.getData();	//searchData
        	rightItem.push(sendData);
        	rightItem.push(division);
        	
        	/*rightItem.forEach(function(n){
        		n.startDate=sendData.startDate;
        		n.endDate=sendData.endDate;
        		n.Select=division.Select;
        	});*/
        	//sendData.itemList=rightItem;
        	//sendData.Select=division.Select;
        	axboot.ajax({
                type: "PUT",
                url: "/api/v1/bisMaHistory",
                data: JSON.stringify(rightItem),
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

    	}
    	
    },
    
    RIGHT_PAGE_SEARCH: function (caller, act, data) {
    	defaultDateSetting();
    	var temp=caller.searchView.getData();
    	caller.gridView01.initView();	//컬럼명을 세팅
	    if(temp.Select=="routeName"){
		   	 axboot.ajax({
		               type: "GET",
		               url: '/api/v1/bisMtRoutes',
		               data: temp,
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
	    	}else{
	    		  axboot.ajax({
	    	            type: "GET",
	    	            url: '/api/v1/bisMtVehicles',
	    	            data: temp,
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
	    	}
    },
    Routestation_GET: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";
    	var url = BIS("bis.apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    			 res= res.Information;
          		 RouteStationLayer(res);
          		 url = BIS("bis.apiserverip")+'routeNodeCoordinate';
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
          				console.log(err);
                        axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "not responding."
                        });		
          			}
          		 },url,data);
    		}else{
    			console.log(err);
                axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "not responding."
                });		
    		}
    	},url,data);
    	
   	 axboot.ajax({
         type: "GET",
         url: '/api/v1/bisMtRoutestations',
         data:  {routeId: data.routeId},
         callback: function (res) {
             caller.gridView02.setData(res);
             caller.gridView02.routeId=data.routeId;
            
             	
            },
         options: {
             // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
             onError: function (err) {
                 console.log(err);
             }
         }
     });    
},
    ITEM_CLICK: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.Routestation_GET, {routeId:data.routeId});
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
    this.searchView2.initView();
    this.gridView01.initView();
    this.gridView02.initView();

    ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
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
       /* this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);");*/
		this.keyword=$("#Keyword");
		this.select=$("#Select");
		this.useYn='Y';
    },
    getData: function () {
    	return {
			Keyword:this.keyword.val(),
			Select:this.select.val(),
			useYn: 'Y',
		}
    }
});

fnObj.searchView2 = axboot.viewExtend(axboot.searchView, {
	initView: function () {
		/*this.target = $(document["searchView1"]);
		this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");*/
		this.startDate=$("#startDate");
		this.endDate=$("#endDate");
	},
	getData: function () {
		return {
			startDate:this.startDate.val(),
			endDate:this.endDate.val()
		}
	}
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
    	var temp=fnObj.searchView.getData();
    	var swapColumns=null;
    	if(temp.Select=="routeName"){
    		swapColumns= [
    			{key: "routeId", label: BIS("bis.route.routeid"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
	            {key: "routeName", label: BIS("bis.route.routename"), width: 200, align: "center", editor: {type: "text", disabled: "notCreated"}},
	            {key: "routeType", label: BIS("bis.route.routetype"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                    return detailCode;
                   }},
	        ];
    	}else{
    		swapColumns= [
    			{key: "vehicleId", label: BIS("bis.vehicle.vehicleid"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
    			{key: "plateNumber", label: BIS("bis.vehicle.platenumber"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}},
	            {key: "vehicleType", label: BIS("bis.vehicle.vehicletype"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("VEHICLE_TYPE",this.item.vehicleType);
                    return detailCode;
                   }},
	        ];
    	}
        var _this = this;
        this.target = axboot.gridBuilder({
        	showLineNumber: false,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: swapColumns,
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.paramId;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true, posUseYn: "N", useYn: "Y"}, "last");
    }
});

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
        	showLineNumber:false,
           
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	 {key: "routeId", label: COL("ax.history.routeId"),width:120, align: "center", editor: {type: "text", disabled: "notCreated"}},
            	 {key: "routeName", label: COL("ax.history.routeName"),width:200, align: "center", editor: {type: "text", disabled: "notCreated"}},
            	 {key: "plateNumber", label: COL("ax.history.plateNumber"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}},
            	 //{key: "vehicleId", label: COL("ax.history.vehicleId"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "collectDate", label: COL("ax.history.collectDate"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "eventNumber", label: COL("ax.history.eventNumber"),width:110, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "eventCode", label: COL("ax.history.eventCode"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("EVENT_CODE",this.item.eventCode);
                    return detailCode;
                   }},
                 //{key: "eventName", label: COL("ax.history.eventName"), width: 90, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "eventData", label: COL("ax.history.eventData"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "spotName", label: COL("ax.history.spotName"),width:90, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 //{key: "terminalId", label: COL("ax.history.terminalId"),width:90, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "runCode", label: COL("ax.history.runCode"),width:90, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("RUN_CODE",this.item.runCode);
                    return detailCode;
                   }},
                 //{key: "runName", label: COL("ax.history.runName"),width:90, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "gpsX", label: COL("ax.history.gpsX"),width:70, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "gpsY", label: COL("ax.history.gpsY"),width:70, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "heading", label: COL("ax.history.heading"),width:70, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "speed", label: COL("ax.history.speed"),width:70, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "stopTime", label: COL("ax.history.stopTime"),width:90, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "systemDate", label: COL("ax.history.systemDate"),width:130, align: "center", editor: {type: "text", disabled: "notCreated"}}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
	               	temprow = this.list[this.dindex];
	            	tempindex = this.dindex;
	            	tempthis = this; 
	            	 
	            	removeBusMaker(); 
	            	var gps = ol.proj.transform([temprow.gpsX, temprow.gpsY], 'EPSG:4326', 'EPSG:3857');
	         		var busLayer = makerLayer(gps,'/assets/images/map/icon_bus_vehicle_42_blue.png',temprow.plateNumber);
	         		busLayers.push(busLayer);
	         		addBusMaker();
	         		
	         		map.getView().setCenter(gps); 
	         		map.getView().setZoom(17);                    
                }
            }
        });

        /*axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });*/
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.paramId;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true, posUseYn: "N", useYn: "Y"}, "last");
    },
    excel:function(n){
    	this.target.exportExcel(n);
    }
});

$('#excelExport').click(function(){
	var excelExport=fnObj.gridView02;
	excelExport.excel("BusOperationHistory.xls");
});

$(document).on("click","#rightSearchButton",function(){
	 ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
});

$(document).ready(function(){
	console.log("ready");
	$('#Keyword').keypress(function(e){
	    if(e.keyCode==13){
	    	ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
	    }
	  });
});