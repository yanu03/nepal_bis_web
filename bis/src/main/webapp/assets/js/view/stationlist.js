$(window).resize(function(){
    setTimeout(function(){
        map.updateSize();
    }, 200);
});

var fnObj = {};

var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
   	 axboot.ajax({
           type: "GET",
           url: '/api/v1/bisMtStations',
           data: caller.searchView.getData(),
           callback: function (res) {
               caller.gridView01.setData(res);
           }
       });
       return false;
   },
   NODE_MODAL: function (caller, act, data) {

  	 axboot.modal.open({
           modalType: "NODE-MODAL",
           param: "",
           sendData: function(){
           },
           callback: function (data) {
          	 var json = caller.formView01.getData();
          	 json.nodeId= data.nodeId;
          	 caller.formView01.setData(json);
          	 /*
          	 $('[data-ax-path="fromStationId"]').val(data.stationId);
          	 $('[data-ax-path="fromStationName"]').val(data.stationName);
          	 */
          	  this.close();
           }
       });
  	
  },
  AREACODE_MODAL: function (caller, act, data) {

	  	 axboot.modal.open({
	           modalType: "AREACODE-MODAL",
	           param: "",
	           sendData: function(){

	           },
	           callback: function (data) {

	          	 var json = caller.formView01.getData();
	          	 json.areaCode = data.areaCode;
	          	 json.adminName1 = data.adminName1;
	          	 caller.formView01.setData(json);
	          	this.close();
	           }
	       });
	  	
	  },
	  LINK_MODAL: function (caller, act, data) {

		  	 axboot.modal.open({
		           modalType: "LINK-MODAL",
		           param: "",
		           sendData: function(){

		           },
		           callback: function (data) {

		          	 var json = caller.formView01.getData();
		          	 json.linkId = data.linkId;
		          	 caller.formView01.setData(json);
		          	this.close();
		           }
		       });
		  	
		  },
    FORM_CLEAR: function (caller, act, data) {

                caller.formView01.clear();
          
    },
    //자도위에 정류장 마커를 만든다
    STATION_MAP: function (caller, act, data) {
    		var coord = map.getCoordinateFromPixel(data.pixel);
    		
    		removeStationMaker();
    	   	var stationLayer = makerLayer(coord,'/assets/images/map/busstopicon.png');
    	    stationLayers.push(stationLayer);
    	    addStationMaker();
    		
			coord = ol.proj.transform([coord[1], coord[0]], 'EPSG:3857', 'EPSG:4326');
			var formdata = caller.formView01.getData();
			formdata.gpsX = coord[0];
			formdata.gpsY = coord[1];
			caller.formView01.setData(formdata);

	    
			
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
    	caller.formView01.setData(data);

    	
    	var gps = ol.proj.transform([data.gpsX, data.gpsY], 'EPSG:4326', 'EPSG:3857');
		map.getView().setCenter(gps); 
    	removeStationMaker();
	   	var stationLayer = makerLayer(gps,'/assets/images/map/busstopicon.png',data.stationName);
	    stationLayers.push(stationLayer);
    
	    addStationMaker();
    	
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    }, 
    Station_save: function (caller, act, data) {
    	
   //console.log(JSON.stringify(caller.formView01.getData()));
    
    	
    	if(caller.formView01.validate())
		{
    		data = caller.formView01.getData();
    		data.userId=loginid;
    		if(data.stationId==""||data.stationId==null)
    			{
	    			axboot.ajax({
	   	             type: "GET",
	   	             url:'/api/v1/bisMtStations/maxplus',
	   	             //url: '/api/v1/bisMtRoutes',
	   	        //async: false,
	   	             data:"",
	   	             callback: function (res) {
	   	            	data.stationId="s1"+res.max;
	   	            	axboot.ajax({
		   	                 type: "PUT",
		   	                 url:'/api/v1/bisMtStations',
		   	                 data: JSON.stringify(data),
		   	                 callback: function (res) {
		   	                	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		   	                	 
			   	              axToast.push("Saved");
		   	                 }
	   	            	});
	   	             	}
	       			});
        		
    			}else{
    		  	     axboot.ajax({
    	                 type: "PUT",
    	                 url:'/api/v1/bisMtStations',
    	                 data: JSON.stringify(data),
    	                 callback: function (res) {
    	                	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    	                	
 	   	              axToast.push("Saved");
    	                 }
    	             });
    			}
    	
    		
  
		}
    
    	
    
         
         
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
$('.node_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.NODE_MODAL);
});
$('.areacode_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.AREACODE_MODAL);
});
$('.link_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.LINK_MODAL);
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
                {key: "stationId", label: COL("station.stationid"), width: 100, align: "center"},
                {key: "stationName", label: COL("station.stationname"), width: 170, align: "center"},
                //{key: "stationEname", label:COL("station.stationename"), width: 170, align: "center"},
                {key: "stationType", label: COL("station.stationtype"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("STATION_TYPE",this.item.stationType);
                    return detailCode;
                    }},
                {key: "linkId", label: COL("link.linkid"), width: 100, align: "center"},
                {key: "nodeId", label: COL("node.nodeid"), width: 100, align: "center"},
               /* {key: "displayName", label: COL("station.displayname"), width: 125, align: "center"},
                {key: "displayEname", label: COL("station.displayename"), width: 125, align: "center"},*/
                {key: "gpsX", label:COL("station.gpsx"), width: 100, align: "center"},
                {key: "gpsY", label:COL("station.gpsx"), width: 100, align: "center"},
                {key: "tmX", label: COL("station.tmx"), width: 100, align: "center"},
                {key: "tmY", label:COL("station.tmy"), width: 100, align: "center"},
                /*{key: "centerYn", label: COL("station.centeryn"), width: 130, align: "center",formatter: function () {
            		var detailCode = getDetailCode("CENTER_YN",this.item.centerYn);
                    return detailCode;
                    }},*/
                /*{key: "mobileNo", label: COL("station.mobileno"), width: 100, align: "center"},*/
                /*{key: "representationYn", label: COL("station.representationyn"), width: 170, align: "center"},*/
                /*{key: "countryCode", label: COL("countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},*/
                {key: "areaCode", label:  COL("areacode"), width: 80, align: "center",formatter: function () {
                		var areaCode =  getAreaCode("",this.item.areaCode);
                        return areaCode;
                        }},
                {key: "updateDate", label: COL("updatedate"), width: 90, align: "center"},
                {key: "userId", label:COL("userid"), width: 100, align: "center"},
                {key: "useYn", label: COL("useyn"), width: 100, align: "center"},
                {key: "remark", label: COL("remark"), width: 200, align: "center"}
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
    },
    excel:function(n){
    	this.target.exportExcel(n);
    }
});

//
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
    },
    
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.

        return $.extend({}, data);
    },
    setData: function (data) {

      this.model.setModel(data);
      this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경


    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert( rs.error[0].jquery.attr("title") + COL("pleaseenter"));
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
	var excelExport=fnObj.gridView01;
	excelExport.excel("StationList.xls");
});
        
        