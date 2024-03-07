var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	data =caller.searchView.getData();
        data.useYn="Y";
    	axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutes',
            data: data,
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
    Routestation_GET: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";
    	var url = COL("apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    			 res= res.Information;
          		 RouteStationLayer(res);
          		 url = COL("apiserverip")+'routeNodeCoordinate';
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
    	
 /*   	
   		axboot.ajax({
            type: "GET",
            url: COL("bis.apiserverip")+'routeVertex',
            dataType:"json",
          //async: false,
            data:data,
            callback: function (res) {
            	 res= res.Information;
            	 RouteStationLayer(res);
            	
            	axboot.ajax({
                    type: "GET",
                    url: COL("bis.apiserverip")+'routeNodeCoordinate',
                    dataType:"json",
                    data:data,
                    callback: function (res) {
                    	 res= res.Information;
                    	 
                    	  removeStationMaker();
                    	 
                        for(var i = 0 ;i < res.length;i++)
                        {
                            	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
               	   		
               	   		var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
               	    	
               	    	stationLayers.push(stationLayer);
                        }
                        addStationMaker();
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
                });
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
   		
   	
   	 axboot.ajax({
         type: "GET",
         url: '/api/v1/bisMtRoutestations',
         data:  {routeId: data.routeId},
         callback: function (res) {
        	 for(var i=0; i<res.length; i++) {
        		 if(res[i].nextDistance){
        			 res[i].nextDistance = res[i].nextDistance.toLocaleString();
        		 }
        		 
        	 }
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
                {key: "routeId", label: COL("route.routeid"), width: 80, align: "center"},
                {key: "stationSequence", label: COL("routestation.stationsequence"), width:140, align: "center", editor: "text"},
                {key: "stationId", label: COL("station.stationid"), width: 100, align: "center"},
                {key: "stationName", label: COL("station.stationname"), width: 100, align: "center"},
                {key: "updownDir", label:COL("routestation.updownDir"), width: 195, align: "center", editor: "text",formatter: function () {
            		var detailCode = getDetailCode("UPDOWN_DIR",this.item.updownDir);
                    return detailCode;
                    }},
                {key: "nextDistance", label: COL("routestation.nextDistance"),width: 180, align: "center", editor: "text"},
                {key: "statType", label: COL("routestation.statType"),width: 80, align: "center", editor: "text",formatter: function () {
            		var detailCode = getDetailCode("STAT_tYPE",this.item.statType);
                    return detailCode;
                    }},
                {key: "gpsX", label:COL("station.gpsx"), width: 80, align: "center"},
                {key: "gpsY", label:COL("station.gpsy"), width: 80, align: "center"}/*,
                {key: "updateDate", label: COL("bis.updatedate"),width: 90, align: "center"},
                {key: "remark", label:COL("bis.remark"), width: 80, align: "center",editor: "text"},
                {key: "userId", label: COL("bis.userid"), width: 80, align: "center"}*/
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    
                    	 temprow = this.list[this.dindex];
                    	 tempindex = this.dindex;
                    	 tempthis = this; 
                    	 
                    	 var gps = ol.proj.transform([temprow.gpsX, temprow.gpsY], 'EPSG:4326', 'EPSG:3857');
                 		map.getView().setCenter(gps); 
                 		map.getView().setZoom(17);
                  /*  ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);*/
                 		
                    	removeStationMaker();
                	   	var stationLayer = makerLayer(gps,'/assets/images/map/busstopicon.png',"");
                	    stationLayers.push(stationLayer);
                    
                	    addStationMaker();                 		
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
   
    },
    addRow: function (data){
    	length = this.target.getList().length;
        data.stationSequence = length+1;
         this.target.addRow(data, "last");
    },
    excel:function(n){
    	this.target.exportExcel(n);
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
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title").replace(/\n/g, "")));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});

$('#excelExport').click(function(){
	var selectedList = fnObj.gridView01.getData("selected");
	if(selectedList.length > 0){
		var excelExport=fnObj.gridView02;
		excelExport.excel("Route-StationList.xls")
	} else {
        axDialog.alert({
            theme: "primary",
            title:" ",
            msg: COL("error.routeselect")
        });		
	}
	/*var excelExport=fnObj.gridView02;
	excelExport.excel("Route-StationList.xls");*/
});
