var fnObj = {};
$(window).resize(function(){
    setTimeout(function(){
        map.updateSize();
    }, 200);
});
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisItSystemschedulegroups',
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
    GRIDVIEW_ADDROW:function(caller,cat,data)
    {
    	 var scheduleGroupId=caller.gridView02.scheduleGroupId;
    	 data.scheduleGroupId=scheduleGroupId;
    	 var list = caller.gridView02.getData();
    		for(var i = 0 ;i < list.length;i++)
			{
				if(data.scheduleGroupId==list[i].scheduleGroupId&&data.scheduleId==list[i].scheduleId) 
					{
					alert("Schedule already added");
					return false;
					}
			}
    	 caller.gridView02.addRow(data);
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
    Routestation_GET: function (caller, act, data) {
},
    ITEM_CLICK: function (caller, act, data) {
    	var senddata={scheduleGroupId:data.scheduleGroupId,Select:"scheduleGroupId"};
    	//데이터 옆에뜨게 하기
    	axboot.ajax({
              type: "GET",
              url: '/api/v1/bisItSchedulegroups',
              data: senddata,
              callback: function (res) {
                  //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            	  caller.gridView02.scheduleGroupId=data.scheduleGroupId;
            	  caller.gridView02.scheduleCode=data.scheduleCode;
                  caller.gridView02.setData(res);
              }
          });
    	
    	// ACTIONS.dispatch(ACTIONS.Routestation_GET, {routeId:data.routeId});
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    }, 
    SCHEDULE_SAVE: function (caller, act, data) {
    	
    	var saveList = [].concat(caller.gridView02.getData2("modified"));
         axboot.ajax({
             type: "PUT",
             url:'/api/v1/bisItSchedulegroups',
             data: JSON.stringify(saveList),
             callback: function (res) {
            	
              axToast.push("Saved");
             }
         });
         
         
    },   SCHEDULE_DELETE: function (caller, act, data) {
        caller.gridView02.delRow("selected");
    },
    Stationfind: function (caller, act, data) {
    	var routeId=data;
        axboot.modal.open({
            modalType: "STATION-MODAL",
            param: "",
            sendData: function(){
                return {
                'routeId':data
                };
            },
            callback: function (data) {
            	data.remainDistance=0;
                data.sumDistance=0;
                data.statDistance=0;
                data.nextDistance=0;
                data.statType=0;
                data.linkSequence =0;
                data.routeId=routeId;
                data.userId=loginid;
            	data.updownDir='0';
            	caller.gridView02.addRow(data);
            	var res = caller.gridView02.getData();
            	
            	if(1 == res.length)
            		{

                	var center = ol.proj.transform([res[0].gpsX, res[0].gpsY], 'EPSG:4326', 'EPSG:3857');
            		map.getView().setCenter(center); 
            		var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[0].stationName);
         	    	stationLayers.push(stationLayer);
         	    	addStationMaker();
            		}
            	else
            		{
	            		
	            	RouteStationLayer(res);
	            	
	            	  removeStationMaker();
	             	 
	                  for(var i = 0 ;i < res.length;i++)
	                  {
	                      	var center = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
	         	   		
	         	   		var stationLayer = makerLayer(center,'/assets/images/map/busstopicon.png',res[i].stationName);
	         	    	
	         	    	stationLayers.push(stationLayer);
	                  }
	                  addStationMaker();

            		}
            	
               /*var res = caller.gridView02.getData();
               var length= res.length;
               var coordinates= [];
				var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
				
               for(var i = 0; i < length;i++)
            	   {
            	   		coordinates.push(ol.proj.transform([res[i].gpsY, res[i].gpsX], 'EPSG:4326', 'EPSG:3857'));
            	   		var y = res[i].gpsY;
            	   		var x = res[i].gpsX;
            	   		if (minX > x && x > 0) minX = x;
        		        if (minY > y && y > 0) minY = y;
        		        if (maxX < x && x > 0) maxX = x;
        		        if (maxY < y && y > 0) maxY = y;
        				
            	   }
   
               if (minX != null && minY != null && maxX != null && maxY != null) {
					var bottomLeft = new ol.proj.transform([minY, minX], 'EPSG:4326', 'EPSG:3857');
			        var topRight = new ol.proj.transform([maxY, maxX], 'EPSG:4326', 'EPSG:3857');
			        var extent = new ol.extent.boundingExtent([bottomLeft, topRight]);
			        
			        map.getView().fitExtent(extent, map.getSize());
			    }
               removeRouteStationLayer();
               RouteStationLayer(coordinates);*/
            	   
                this.close();
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
    this.gridView02.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
 
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
                ACTIONS.dispatch(ACTIONS.SCHEDULE_SAVE);
            },
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    }
});
/*
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    }
});
*/
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
            	   {key: "scheduleGroupId", label: COL("bis.systemschedulegroup.schedulegroupid"), width:150, align: "center"},
                   {key: "scheduleCode", label: COL("bis.systemschedule.schedulecode"), width: 120, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCHEDULE_CODE",this.item.scheduleCode);
                    return detailCode;
                 }},
                   {key: "remark", label:COL("bis.remark"), width: 80, align: "center"}
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
            	{key: "scheduleGroupId", label: COL("bis.systemschedulegroup.schedulegroupid"), width: 140, align: "center"},
            	{key: "scheduleId", label: COL("bis.systemschedule.scheduleid"), width: 140, align: "center"},
                {key: "updateDate", label:COL("bis.updatedate"), width: 90, align: "center"},
                {key: "remark", label:COL("bis.remark"), width: 80, align: "center"},
                {key: "userId", label: COL("bis.userid"), width: 120, align: "center"},
                {key: "useYn", label: COL("bis.useyn"), width: 120, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    
                    	 temprow = this.list[this.dindex];
                    	 tempindex = this.dindex;
                    	 tempthis = this; 
                  /*  ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);*/
                }
            }
        });
        axboot.buttonClick(this, "data-grid-view-02-btn", {
    		"Stationfind": function () {
    			if(this.scheduleGroupId==null||this.scheduleGroupId=="")
    				{
                    axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: COL("bis.error.schedulegroup")
                    });
    				
    				}
    			else
    				{
    				var scheduleGroupId =this.scheduleGroupId;
    				var scheduleCode= this.scheduleCode;
    		    	 axboot.modal.open({
    		             modalType: "SCHEDULE-MODAL",
    		             param: "",
    		             sendData: function(){
    		                 return {
    		                 'scheduleCode':scheduleCode,
    		                 'scheduleGroupId':scheduleGroupId
    		                 };
    		             },
    		             callback: function (data) {/*
    		            	 var json = caller.formView01.getData();
    		            	 json.fromStationId = data.stationId;
    		            	 json.fromStationName = data.stationName;
    		            	 caller.formView01.setData(json);*/
    		            	
  		            	   ACTIONS.dispatch(ACTIONS.GRIDVIEW_ADDROW,data);
  		            	
    		            	 /*
    		            	 $('[data-ax-path="fromStationId"]').val(data.stationId);
    		            	 $('[data-ax-path="fromStationName"]').val(data.stationName);
    		            	 */
    		            	  this.close();
    		             }
    		         });
    				//	ACTIONS.dispatch(ACTIONS.Stationfind,this.routeId);
    				}
        },
    	"delete": function () {
    		if(this.scheduleGroupId==null||this.scheduleGroupId=="")
			{
    		    axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: COL("bis.error.schedulegroup")
                });
    		}
    		else
    		{
    			ACTIONS.dispatch(ACTIONS.SCHEDULE_DELETE);
            
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
                	return this.scheduleGroupId;
                	}
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
   
    },
    addRow: function (data) {
    	length = this.target.getList().length;
        data.stationSequence = length+1;
         this.target.addRow(data, "last");
    }
});