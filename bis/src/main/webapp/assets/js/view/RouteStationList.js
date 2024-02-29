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
    
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });
    },
    STATION_DELETE: function (caller, act, data) {
    	
        caller.gridView02.delRow("selected");
        /*
         var list = caller.gridView02.getData();
        var length = list.length;
        for(var i = 0;i < length;i++)
     	   {
     	   	list[i].stationSequence =i+1;
     	   }
        caller.gridView02.setData(list);
       */
    /*   var list = caller.gridView02.getData();
       var length = list.length;
       for(var i = 0;i < length;i++)
    	   {
    	   	list[i].stationSequence =i+1;
    	    caller.gridView02.target.updateRow($.extend({}, firstGrid.list[i], list[i]), i);
    	   }*/
      //  caller.gridView02.target.focus(clickindex);
    },
// 변경
    Routestation_GET: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";
    	var url = COL("bis.apiserverip")+'routeVertex';
    	ajaxCall(function(result,res){
    		if(result){
    		 	 res= res.Information;
             	RouteStationLayer(res);
             	
             	url  = COL("bis.apiserverip")+'routeNodeCoordinate';
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
    	},url,data);/*
   		axboot.ajax({
            type: "GET",
           // url: '/openAPI/routeVertex',
            url: COL("bis.apiserverip")+'routeVertex',
            dataType:"json",
            data:data,
          //async: false,
            callback: function (res) {
            	 res= res.Information;
            	RouteStationLayer(res);
            	
            	axboot.ajax({
                    type: "GET",
                    //url: '/openAPI/routeNodeCoordinate',
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
        });
   		*/
            	
   		
   		

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
                       axDialog.alert({
                           theme: "primary",
                           title:" ",
                           msg: "not responding."
                       });			
                   }
               }
        });
},
    ITEM_CLICK: function (caller, act, data) {
    	//데이터 옆에뜨게 하기
    /*	 axboot.ajax({
              type: "GET",
              url: '/api/v1/bisMtRoutes',
              data: {routeid:data.ROUTE_ID },
              callback: function (res) {
                  //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                  caller.formView01.setData(res);
              }
          });*/
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
    	var length =saveList.length;
    	for(var i = 0;i < length;i++)
    	{
    		saveList[i].userId=loginid;
    		saveList[i].stationSequence =i+1;
    	}
         axboot.ajax({
             type: "PUT",
             url:'/api/v1/bisMtRoutestations',
             data: JSON.stringify(saveList),
             callback: function (res) {
            	 //ACTIONS.dispatch(ACTIONS.Routestation_GET, {routeId:caller.gridView02.routeId});
              axToast.push("Saved");
             }
         });
         
         
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
            },
            "transfer": function () {
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
        return this.target.getData();
    }
});

/**
 * gridView02
 */
//var clickindex=null;
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
                {key: "routeId", label: COL("bis.route.routeid"), width: 80, align: "center"},
               /* {key: "stationSequence", label: COL("bis.routestation.stationsequence"), width:140, align: "center"},*/
                {key: "stationId", label: COL("bis.station.stationid"), width: 100, align: "center"},
                {key: "stationName", label: COL("bis.station.stationname"), width: 100, align: "center"},
                {key: "updownDir", label:COL("bis.routestation.updownDir"), width: 195, align: "center", editor: "text",formatter: function () {
            		var detailCode = getDetailCode("UPDOWN_DIR",this.item.updownDir);
                    return detailCode;
                    }},
             /*   {key: "sumDistance", label: COL("bis.routestation.sumDistance"), width:120, align: "center", editor: "text"},
                {key: "remainDistance", label: COL("bis.routestation.remainDistance"), width: 285, align: "center", editor: "text"},
                {key: "statDistance", label:COL("bis.routestation.statDistance"), width: 210, align: "center", editor: "text"},*/
                {key: "nextDistance", label: COL("bis.routestation.nextDistance"),width: 180, align: "center", editor: "text"},
                {key: "statType", label: COL("bis.routestation.statType"),width: 80, align: "center", editor: "text",formatter: function () {
            		var detailCode = getDetailCode("STAT_tYPE",this.item.statType);
                    return detailCode;
                    }},
                {key: "gpsX", label:COL("bis.station.gpsx"), width: 80, align: "center"},
                {key: "gpsY", label:COL("bis.station.gpsy"), width: 80, align: "center"},/*
                {key: "linkSequence", label: COL("bis.routestation.linkSequence"), width: 120, align: "center"},*/
                {key: "updateDate", label: COL("bis.updatedate"),width: 90, align: "center"},
                {key: "remark", label:COL("bis.remark"), width: 80, align: "center",editor: "text"},
                {key: "userId", label: COL("bis.userid"), width: 80, align: "center"},
                {key: "useYn", label: COL("bis.useyn"), width: 60, align: "center", editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
  //                  clickindex = this.dindex;
                    	 temprow = this.list[this.dindex];
                    	 tempindex = this.dindex;
                    	 tempthis = this; 
                  /*  ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);*/
                }
            }
        });
        axboot.buttonClick(this, "data-grid-view-02-btn", {
    		"Stationfind": function () {
    			if(this.routeId==null||this.routeId=="")
    				{
                    axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: COL("bis.error.routeselect")
                    });
    				
    				}
    			else
    				{
    					ACTIONS.dispatch(ACTIONS.Stationfind,this.routeId);
    				}
        },	
    	"delete": function () {
    		if(this.routeId==null||this.routeId=="")
			{
    		    axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: COL("bis.error.routeselect")
                });
    		}
    		else
    		{
    			ACTIONS.dispatch(ACTIONS.STATION_DELETE);
            
    		}
    	},
        	"up": function () {
        	if(this.routeId==null||this.routeId=="")
			{
            axDialog.alert({
                theme: "primary",
                title:" ",
                msg: COL("bis.error.routeselect")
            });
			
			}
        	else
			{
				if(0 < tempindex)
        		{
        		 temprow2 = tempthis.list[tempindex-1];
        		 temprow.stationSequence = tempindex ;
        		 temprow2.stationSequence = tempindex+1 ;
        		 
        		 tempthis.self.updateRow(temprow,tempindex-1);
        		 tempthis.self.updateRow(temprow2,tempindex);
        		 tempindex = tempindex - 1;
        		
        		// 
        		 tempthis.self.focus("UP");
        		/*
        		 tempthis.self.clearSelect();
        		 tempthis.self.select(tempindex);*/
        		}
			}
        },	"down": function () {
        	if(this.routeId==null||this.routeId=="")
			{
            axDialog.alert({
                theme: "primary",
                title:" ",
                msg: COL("bis.error.routeselect")
            });
			
			}
		else
			{
	        	if(tempindex < (this.target.getList().length - 1))
	    		{
	        			temprow2 = tempthis.list[tempindex+1];
	        		 
	        		 temprow.stationSequence = tempindex + 2 ;
	        		 temprow2.stationSequence = tempindex + 1 ;
	        		 
	        		 tempthis.self.updateRow(temprow,tempindex+1);
	        		 tempthis.self.updateRow(temprow2,tempindex);
	        		 tempindex = tempindex + 1;
	        		
	        		 tempthis.self.focus("DOWN");
	        		 tempthis.self.clearSelect();
	        		 tempthis.self.select(tempindex);
	    		}
        	
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
    addRow: function (data) {
    	length = this.target.getList().length;
        data.stationSequence = length+1;
         this.target.addRow(data, "last");
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

/*        data.authList = [];
        if (data.grpAuthCd) {
            data.grpAuthCd.forEach(function (n) {
                data.authList.push({
                    userCd: data.userCd,
                    grpAuthCd: n
                });
            });
        }

        data.roleList = ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_GET);
*/
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