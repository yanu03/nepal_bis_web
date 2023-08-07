var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtStations',
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
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });
    },
// 변경
    STATIONROUTE_GET: function (caller, act, data) {
    	
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutestations',
          //async:false,
            data:  {select:"stationId",stationId: data.stationId,"useYn":"Y"},
            callback: function (res) {
            	if(0 < res.length)
            		{
	            		data.routeId=res[0].routeId;
	                 

	            		axboot.ajax({
	                        type: "GET",
	                        url: '/api/v1/bisMtRoutes',
	                        data:  {Select:"routeId",Keyword: data.routeId,"useYn":"Y"},
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
            	else
            		{
            			caller.gridView02.setData(res);
            		}
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
    	var center = ol.proj.transform([data.gpsX, data.gpsY], 'EPSG:4326', 'EPSG:3857');
		map.getView().setCenter(center); 
		map.getView().setZoom(17);
		removeRouteStationLayer();
		removeStationMaker();
		var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',data.stationName);
    	
    	stationLayers.push(stationLayer);
    	map.addLayer(stationLayer);
   	
    	
    	ACTIONS.dispatch(ACTIONS.STATIONROUTE_GET, {stationId:data.stationId});
    },
    ROUTE_CLICK:function (caller, act, data) {
     /*   axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutestations',
            data:  {routeId: data.routeId},
            callback: function (res) {
            	RouteStationLayer(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });*/
    	data.key="bisKey";
    	data.useYn="Y";
    	var url=COL("bis.apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    			 res= res.Information;
             	RouteStationLayer(res);
             	for(var i = 0;i <stationLayers.length ;i++)
             		{
             		
             			map.removeLayer(stationLayers[i]);
             		}
             	for(var i = 0;i <stationLayers.length ;i++)
         		{
         		
         			map.addLayer(stationLayers[i]);

         		}     
    		}else{
    			  console.log(err);
                  axDialog.alert({
                      theme: "primary",
                      title:" ",
                      msg: "not responding."
                  });			
    		}
    	},url,data);/*
   		axboot.ajax({
            type: "GET",
            url: COL("bis.apiserverip")+'routeVertex',
            dataType:"json",
          //async: false,
            data:data,
            callback: function (res) {
            	 res= res.Information;
            	RouteStationLayer(res);
            	for(var i = 0;i <stationLayers.length ;i++)
            		{
            		
            			map.removeLayer(stationLayers[i]);
            		}
            	for(var i = 0;i <stationLayers.length ;i++)
        		{
        		
        			map.addLayer(stationLayers[i]);

        		}     
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                    axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: "not responding."
                    });			
                }
            }
        });*/
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    }, 
    Station_save: function (caller, act, data) {
    	var saveList = [].concat(caller.gridView02.getData2("modified"));
         axboot.ajax({
             type: "PUT",
             url:'/api/v1/bisMtRoutestations',
             data: JSON.stringify(saveList),
             callback: function (res) {
            	 ACTIONS.dispatch(ACTIONS.Routestation_GET, {routeId:caller.gridView02.routeId});
            	 axToast.push("저장 되었습니다");
             }
         });
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
    /*this.formView01.initView();*/
    this.gridView02.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {
};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
                ACTIONS.dispatch(ACTIONS.Station_save);
            },
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
        this.Keyword = $("#Keyword");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(),this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        
        
    }, getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
  	  var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
  	  data.useYn="Y";
     var Keyword=this.Keyword.val();
     data.Keyword=Keyword;
  	  return $.extend({}, data);
     
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
                {key: "stationId", label: COL("bis.station.stationid"), width: 100, align: "center"},
                {key: "stationName", label: COL("bis.station.stationname"), width: 150, align: "center"},
              
                {key: "stationType", label: COL("bis.station.stationtype"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("STATION_TYPE",this.item.stationType);
                    return detailCode;
                    }}
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
        return this.target.getData();
    }
});

/**
 * gridView02
 */

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
    	var _gridView02 = this;
    	var temprow = null;
		var tempindex = null;
		var tempthis = null;
        this.target = axboot.gridBuilder({
        	//multipleSelect:true,
        //	showLineNumber: false,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
       /*         {key: "routeId", label: "ROUTE ID", width: 60, align: "center"},
                {key: "stationSequence", label: "STATION SEQUENCE", width:60, align: "center", editor: "text"},
                {key: "stationId", label: "STATION ID", width: 60, align: "center"},
                {key: "updownDir", label: "UPDOWN DIR", width: 60, align: "center"},
                {key: "sumDistance", label: "SUM DISTANCE", width: 60, align: "center"},
                {key: "remainDistance", label: "REMAIN DISTANCE", width: 60, align: "center"},
                {key: "statDistance", label: "STAT DISTANCE", width: 60, align: "center"},
                {key: "nextDistance", label: "NEXT DISTANCE", width: 60, align: "center"},
                {key: "statType", label: "STAT TYPE", width: 60, align: "center"},
                {key: "gpsX", label: "GPS X", width: 80, align: "center"},
                {key: "gpsY", label: "GPS Y", width: 80, align: "center"},
                {key: "linkSequence", label: "LINK SEQUENCE", width: 60, align: "center"},
                {key: "updateDate", label: "UPDATE DATE", width: 80, align: "center"},
                {key: "remark", label: "remark", width: 80, align: "center"},
                {key: "userId", label: "USER ID", width: 80, align: "center"}*/
             	{key: "routeId", label:  COL("bis.route.routeid"), width: 90, align: "center"},
                {key: "routeType", label: COL("bis.route.routetype"), width:130, align: "center",formatter: function () {
            		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                    return detailCode;
                    }},
                {key: "routeName", label: COL("bis.route.routename"), width: 200, align: "center"},
                {key: "routeEname", label: COL("bis.route.routeename"), width: 200, align: "center"},
                {key: "fromStationId", label: COL("bis.route.fromstationid"), width: 115, align: "center"},
                {key: "toStationId", label: COL("bis.route.tostationid"), width: 115, align: "center"},
                {key: "turnStationId", label:COL("bis.route.turnstationid"), width: 115, align: "center"},
                {key: "permissionCount", label:COL("bis.route.permissioncount"), width: 225, align: "center"},
                {key: "beginDate", label:COL("bis.route.begindate"), width: 160, align: "center"},
                {key: "closeDate", label: COL("bis.route.closedate"), width: 180, align: "center"},
                {key: "routeEx", label: COL("bis.route.routeex"), width: 80, align: "center"},
                {key: "routeDistance", label: COL("bis.route.routedistance"), width: 115, align: "center"},
                {key: "countryCode", label: COL("bis.countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
                {key: "areaCode", label: "AREA CODE", width: 80, align: "center",formatter: function () {
            		var areaCode =  getAreaCode("",this.item.areaCode);
                    return areaCode;
                    }},
                {key: "requestTime", label: COL("bis.route.requesttime"), width: 80, align: "center"},
                {key: "charge", label:COL("bis.route.charge"), width: 80, align: "center"},
                {key: "runType", label: COL("bis.route.runtype"), width: 80, align: "center",formatter: function () {
            		var detailCode = getDetailCode("RUN_TYPE",this.item.runType);
                    return detailCode;
                    }},
                {key: "updateDate", label:COL("bis.updatedate"), width: 90, align: "center"},
                {key: "remark", label:COL("bis.remark"), width: 80, align: "center"},
                {key: "userId", label: COL("bis.userid"), width: 120, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    
                    	 temprow = this.list[this.dindex];
                    	 tempindex = this.dindex;
                    	 tempthis = this; 
                    ACTIONS.dispatch(ACTIONS.ROUTE_CLICK, this.list[this.dindex]);
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
    addRow: function (data){
    	length = this.target.getList().length;
        data.stationSequence = length+1;
         this.target.addRow(data, "last");
    }, getData2: function (_type) {
        var list = [];
        var _list = this.target.getList();

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                if(this.useYn =='Y')
                	{
                	return this.routeId;
                	}
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
   
    }
});
//form view
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
            "compCd": "S0001",
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

      axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            }
        });
        //ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {});
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
    },
    setData: function (data) {
      this.model.setModel(data[0]);
      this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});