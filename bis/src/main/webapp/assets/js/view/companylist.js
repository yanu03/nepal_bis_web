var fnObj = {};

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisMtCompanys",
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
	    	if(data.companyId==null||data.companyId==""){
			 axboot.ajax({
		         type: "GET",
		         url:"/api/v1/bisMtCompanys/maxplus",
		       //async: false,
		         //url: '/api/v1/bisMtRoutes',
		         data: "" ,
		         callback: function (res) {
		     		data.companyId ="C"+res.max;
		     		 axboot.ajax({
				         type: "PUT",
				         url:"/api/v1/bisMtCompanys",
				         //url: '/api/v1/bisMtRoutes',
				         data: JSON.stringify(data) ,
				         callback: function (res) {
				        	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
				        	 axToast.push("Saved");
				         }
				     });
		         }
		     });
	    		}
	    	else{
	    		 axboot.ajax({
			         type: "PUT",
			         url:"/api/v1/bisMtCompanys",
			         //url: '/api/v1/bisMtRoutes',
			         data: JSON.stringify(data) ,
			         callback: function (res) {
			        	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
			        	 axToast.push("Saved");
			         }
			     });
	    	}
	    	
			
		}
    	
},
    FORM_CLEAR: function (caller, act, data) {

                caller.formView01.clear();
            
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
    ITEM_CLICK: function (caller, act, data) {
    	//데이터 옆에뜨게 하기
    	caller.formView01.setData(data);
   
    	
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

$('.areacode_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.AREACODE_MODAL);
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
            	{key: "companyId", label: COL("bis.company.companyid"), width: 90, align: "center"},
            	{key: "companyName", label:COL("bis.company.companyname"), width: 205, align: "center"},
            	{key: "companyEname", label: COL("bis.company.companyename"), width: 205, align: "center"},
            	{key: "telephoneNumber", label: COL("bis.company.telephonenumber"), width: 140, align: "center"},
            	{key: "faxNumber", label:COL("bis.company.faxnumber"), width: 90, align: "center"},
            	{key: "address", label: COL("bis.company.address"), width: 90, align: "center"},
            	{key: "ceoName", label: COL("bis.company.ceoname") ,width: 90, align: "center"},
            	{key: "companyType", label: COL("bis.company.companytype"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COMPANY_TYPE",this.item.companyType);
                    return detailCode;
                    }},
            	{key: "busCount", label: COL("bis.company.buscount"), width: 90, align: "center"},
            	{key: "registCount", label: COL("bis.company.registcount"), width: 220, align: "center"},
            	{key: "spareCount", label: COL("bis.company.sparecount"), width: 190, align: "center"},
                {key: "areaCode", label:  COL("bis.areacode"), width: 80, align: "center",formatter: function () {
            		var areaCode =  getAreaCode("",this.item.areaCode);
                    return areaCode;
                    }},
            	{key: "countryCode", label:COL("bis.countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
            	{key: "updateDate", label:COL("bis.updatedate"), width: 90, align: "center"},
            	{key: "remark", label:COL("bis.remark"), width: 80, align: "center"},
                {key: "userId", label: COL("bis.userid"), width: 120, align: "center"},
                {key: "useYn", label: COL("bis.useyn"), width: 80, align: "center"}
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
	excelExport.excel("CompanyList.xls");
});
        
        