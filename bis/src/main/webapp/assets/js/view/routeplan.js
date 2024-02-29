var fnObj = {};

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisMtRouteplans",
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
    COMPANY_SAVE: function (caller, act, data) {
	    if(caller.formView01.validate())
		{
	    	
			data = caller.formView01.getData();
	    	data.userId=loginid;
			 axboot.ajax({
		         type: "PUT",
		         url:"/api/v1/bisMtRouteplans",
		         data: JSON.stringify(data) ,
		         callback: function (res) {
		        	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		        	 axToast.push("Saved");
		         }
		     });
		}
    	
},
    FORM_CLEAR: function (caller, act, data) {

                caller.formView01.clear();
            
    },
    ROUTESTATION_MODAL: function (caller, act, data) {

    	 axboot.modal.open({
             modalType: "ROUTESTATION-MODAL",
             param: "",
             sendData: function(){
                 return {
                 'routeId': $('[data-ax-path="routeId"]').val()
                 };
             },
             callback: function (data) {
            	 var json = caller.formView01.getData();
            	 json.fromStationId = data.stationId;
            	 json.fromStationName = data.stationName;
            	 caller.formView01.setData(json);
            	 /*
            	 $('[data-ax-path="fromStationId"]').val(data.stationId);
            	 $('[data-ax-path="fromStationName"]').val(data.stationName);
            	 */
            	  this.close();
             }
         });
    	
    },
    ROUTESTATION_MODAL2: function (caller, act, data) {

   	 axboot.modal.open({
            modalType: "ROUTESTATION-MODAL",
            param: "",
            sendData: function(){
                return {
                'routeId': $('[data-ax-path="routeId"]').val()
                };
            },
            callback: function (data) {
            	 var json = caller.formView01.getData();
            	 json.toStationId = data.stationId;
            	 json.toStationName = data.stationName;
            	 caller.formView01.setData(json);
           	this.close();
            }
        });
   	
   },
   ROUTESTATION_MODAL3: function (caller, act, data) {

  	 axboot.modal.open({
           modalType: "ROUTESTATION-MODAL",
           param: "",
           sendData: function(){
               return {
               'routeId': $('[data-ax-path="routeId"]').val()
               };
           },
           callback: function (data) {

          	 var json = caller.formView01.getData();
          	 json.turnStationId = data.stationId;
          	 json.turnStationName = data.stationName;
          	 caller.formView01.setData(json);
          	this.close();
           }
       });
  	
  },
    ITEM_CLICK: function (caller, act, data) {
    	//데이터 옆에뜨게 하기
    	caller.formView01.setData(data);
   
    	
    },
    ROUTE_MODAL: function(caller, act, data) {
    	//데이터 옆에뜨게 하기
    	 axboot.modal.open({
             modalType: "ROUTE-MODAL",
             param: "",
             sendData: function(){
                 return {
                 'routeId': $('[data-ax-path="routeId"]').val()
                 };
             },
             callback: function (data) {
             	 var json = caller.formView01.getData();
             	 json.routeId = data.routeId;
             	 caller.formView01.setData(json);
            	this.close();
             }
         });
    	
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
$('.route_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTE_MODAL);
});
// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	this.pageButtonView.initView();
    this.searchView.initView();

 
    this.gridView01.initView();
    this.formView01.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        "save": function () {
                ACTIONS.dispatch(ACTIONS.COMPANY_SAVE);
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
            	{key: "routeId", label:COL("bis.route.routeid"), width: 90, align: "center"},
            	{key: "routeName", label:COL("bis.route.routename"), width: 135, align: "center"},
            	{key: "dayType", label: COL("bis.routeplan.daytype"),  width: 90, align: "center",formatter: function () {
            		var detailCode = getDetailCode("DAY_TYPE",this.item.dayType);
                    return detailCode;
                    }},
            	{key: "serviceCount", label: COL("bis.routeplan.servicecount"),  width: 130, align: "center"},
            	{key: "stFirstTime", label:COL("bis.routeplan.stfirsttime"),  width: 180, align: "center"},
            	{key: "stLastTime", label: COL("bis.routeplan.stlasttime"), width: 180, align: "center"},
              	{key: "edFirstTime", label: COL("bis.routeplan.edfirsttime"),  width: 210, align: "center"},
              	{key: "edLastTime", label:COL("bis.routeplan.edlasttime"),  width: 210, align: "center"},
            	{key: "minInterval", label: COL("bis.routeplan.mininterval"),  width: 200, align: "center"},
            	{key: "maxInterval", label: COL("bis.routeplan.maxinterval"),  width: 200, align: "center"},
            	{key: "updateDate", label:COL("bis.updatedate"),  width: 90, align: "center"},
            	{key: "remark", label:COL("bis.remark"),  width: 80, align: "center"},
                {key: "userId", label:COL("bis.userid"),  width: 120, align: "center"},
                {key: "useYn", label:COL("bis.useyn"),  width: 80, align: "center"}
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
     /*   data.routeType = $('[data-ax5select="routeType"]').ax5select("getValue")[0].optionValue;
        if (data.closeDate != null)
        {
               data.closeDate =data.closeDate.replace(/-/g, "");
              
        }
        if (data.beginDate != null)
        {
                data.beginDate =data.beginDate.replace(/-/g, "");
        }*/
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

  /*      if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        if (data.authList) {
            data.grpAuthCd = [];
            data.authList.forEach(function (n) {
                data.grpAuthCd.push(n.grpAuthCd);
            });
        }*/
        //ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {userCd: data.userCd, roleList: data.roleList});

      this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert( rs.error[0].jquery.attr("title").replace(/\n/g, "") + COL("bis.pleaseenter"));
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
	excelExport.excel("RouteplanList.xls");
});
        
        
        