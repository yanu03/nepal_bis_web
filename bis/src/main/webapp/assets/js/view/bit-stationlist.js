var fnObj = {};  

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.useYn="Y";
    	/*axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtBits',
            data:data ,
            callback: function (res) {
            	
                caller.gridView01.setData(res);
            },
            options: {
                onError: function (err) {
                    console.log(err);
                }
            }
        });
        */
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
    SET_FROM_VIEW: function (caller, act, data) {
    	caller.formView01.setData(data);
		},
    BIT_SAVE: function (caller, act, data) {
    	 var saveList = [].concat(caller.gridView02.getData());
     //    saveList = saveList.concat(caller.gridView02.getData("deleted"));
         if(saveList.length == 0){ 
             data ={};
             data.bitId=caller.gridView02.bitId;
             saveList.push(data);
             }
         
			 axboot.ajax({
		         type: "PUT",
		       //  url:'/api/v1/bisMtBitstations',
		         url:'/api/v1/bisMtBitstations',
		         //url: '/api/v1/bisMtRoutes',
		         data: JSON.stringify(saveList) ,
		         callback: function (res) {
		        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK);
		        	axToast.push("Saved");
		         }
		     });
			
		    
},
    FORM_CLEAR: function (caller, act, data) {

                caller.formView01.clear();
            
    },
    BIT_MODAL: function (caller, act, data) {

	  	 axboot.modal.open({
	           modalType: "BIT-MODAL",
	           param: "",
	           sendData: function(){

	           },
             callback: function (data) {
            	 
            	 data.stationId=caller.gridView02.stationId;
            	 data.stationName=caller.gridView02.stationName;
            	 data.updateDate="";
            	 data.userId=loginid;
            	 list = caller.gridView02.getData();
            	 var check= 0;
            	 if(list.length != 0)
            	 {
            	 	for(var i = 0 ;i < list.length;i++)
            	 	{
            	 	if(list[i].stationId == data.stationId &&list[i].bitId==data.bitId)	
            	 		{
            	 		check=1;
            	 		}
            	 	}
            	 }
             	 if(check == 0)
            	{
             		 caller.gridView02.addRow(data);
            	}else
            		{
            		alert("BIT already added");
            		}

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
	          	this.close();
	           }
	       });
	  	
	  },
    STATION_MODAL: function (caller, act, data) {

    	 axboot.modal.open({
             modalType: "STATION-MODAL",
             param: "",
             sendData: function(){},
             callback: function (data) {
            	 
            	 data.bitId=caller.gridView02.bitId;
            	 data.bitName=caller.gridView02.bitName;
            	 data.updateDate="";
            	 data.userId=loginid;
            	 list = caller.gridView02.getData();
            	 var check= 0;
            	 if(list.length != 0)
            	 {
            	 	for(var i = 0 ;i < list.length;i++)
            	 	{
            	 	if(list[i].stationId == data.stationId &&list[i].bitId==data.bitId)	
            	 		{
            	 		check=1;
            	 		}
            	 	}
            	 }
             	 if(check == 0)
            	{
             		 caller.gridView02.addRow(data);
            	}else
            		{
            		alert("Station already added");
            		}

            	 /*
            	 $('[data-ax-path="fromStationId"]').val(data.stationId);
            	 $('[data-ax-path="fromStationName"]').val(data.stationName);
            	 */
            	  this.close();
             }
         });
    	
    },
    ITEM_CLICK: function (caller, act, data) {
    	//데이터 옆에뜨게 하기
    	 if(data!=null)
    		 {
    		 	//caller.gridView02.bitId=data.bitId;
    		 	//caller.gridView02.bitName=data.bitName;
     		 	caller.gridView02.stationId=data.stationId;
    		 	caller.gridView02.stationName=data.stationName;
    			data.Select ="stationId";
    	    	data.Keyword=data.stationId;
    		 }
    	 else
    		 {
    		 data={};
    			data.Select ="stationId";
    	    	data.Keyword=caller.gridView02.stationId;
    		 }
    
    	axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtBitstations',
            data:data ,
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
    	//caller.formView01.setData(data);
    },
    ADD_BITSTATION: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    STATION_DELETE: function (caller, act, data) {
        caller.gridView02.delRow("selected");
    },
    BIT_DELETE: function (caller, act, data) {
        caller.gridView02.delRow("selected");
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
    this.gridView02.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        "save": function () {
                ACTIONS.dispatch(ACTIONS.BIT_SAVE);
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
    	  var Keyword=this.Keyword.val();
    	  data.Keyword=Keyword;
    	  return $.extend({}, data);
       
    }
});
/**
 * gridView
 * 
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = $(document["formView01"]);
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        this.target = axboot.gridBuilder({
      
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "stationName", label: COL("bis.station.stationname"), width: 170, align: "center"},
                {key: "stationType", label: COL("bis.station.stationtype"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("STATION_TYPE",this.item.stationType);
                    return detailCode;
                    }},

                {key: "gpsX", label:COL("bis.station.gpsx"), width: 100, align: "center"},
                {key: "gpsY", label:COL("bis.station.gpsx"), width: 100, align: "center"},

                {key: "representationYn", label: COL("bis.station.representationyn"), width: 170, align: "center"},
                {key: "countryCode", label: COL("bis.countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
                    {key: "areaCode", label:  COL("bis.areacode"), width: 80, align: "center",formatter: function () {
                		var areaCode =  getAreaCode("",this.item.areaCode);
                        return areaCode;
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

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        axboot.buttonClick(this, "data-grid-view-02-btn", {
        	"add": function () {
        		if(this.stationId==null||this.stationId=="")
				{
        		      axDialog.alert({
                          theme: "primary",
                          title:" ",
                          msg: COL("bis.error.stationselect")
                      });
				}
        		else
        		{
  
            		ACTIONS.dispatch(ACTIONS.BIT_MODAL);
        		}
        	},
        	"delete": function () {
        		if(this.stationId==null||this.stationId=="")
				{
        		    axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: COL("bis.error.stationselect")
                    });
        		}
        		else
        		{
        			ACTIONS.dispatch(ACTIONS.BIT_DELETE);
                
        		}
        	}
        });
        this.target = axboot.gridBuilder({
      
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "bitId", label: COL("bis.bit.bitid"), width: 90, align: "center"},
            	{key: "bitName", label: COL("bis.bit.bitname"), width: 90, align: "center"},
            	{key: "stationId", label: COL("bis.station.stationid"), width: 90, align: "center"},
            	{key: "stationName", label: COL("bis.station.stationname"), width: 170, align: "center"},
                {key: "updateDate", label:COL("bis.updatedate"), width: 90, align: "center"},
                {key: "userId", label:COL("bis.userid"), width: 120, align: "center"},
                {key: "useYn", label: COL("bis.useyn"), width: 80, align: "center"}
            ],
         
            body: {
                onClick: function () {
                    this.self.select(this.dindex);

                }
            }
        });
   
    },
    getData: function (_type) {
    	
        return this.target.getList(_type);
       
    },
    addRow: function (data) {
        this.target.addRow(data, "last");
/*                 caller.gridView02.addRow(data);*/
   },
   excel:function(n){
   	this.target.exportExcel(n);
   }
});

$('#excelExport').click(function(){
	var excelExport=fnObj.gridView02;
	excelExport.excel("BIT-StationList.xls");
});
