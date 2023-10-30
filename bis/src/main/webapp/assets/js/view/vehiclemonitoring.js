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
    Routestation_GET: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";
    	var url = COL("bis.apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    			 res= res.Information;
          		 RouteStationLayer(res);
          		 url = COL("bis.apiserverip")+'routeNodeCoordinate';
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
            	{key: "routeId", label: COL("bis.route.routeid"), width: 140, align: "center"},
                {key: "routeType", label: COL("bis.route.routetype"), width:140, align: "center",formatter: function () {
            		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                    return detailCode;
                    }},
                {key: "routeName", label: COL("bis.route.routename"), width: 200, align: "center"}
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