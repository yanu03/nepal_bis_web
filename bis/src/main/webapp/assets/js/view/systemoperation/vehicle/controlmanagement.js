
var fnObj = {};

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	data=caller.searchView.getData();
    	data.useYn="Y";
    	axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtVehicles',
            data:data ,
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
   // 	caller.formView01.setData(data);
    	$("#vehicleid").text(data.vehicleId) ;
    	
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    },
    ALRAM: function (caller, act, data) {
       console.log( caller.alram.getData());
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
$('.station_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL);
});
$('.station_button2').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL2);
});
$('.station_button3').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL3);
});
$('.areacode_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.AREACODE_MODAL);
});
// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	//this.pageButtonView.initView();
    //this.searchView.initView();
    this.alram.initView();
 
    //this.gridView01.initView();
   // this.formView01.initView();
    
  //  ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        "save": function () {
                ACTIONS.dispatch(ACTIONS.ROUTE_SAVE);
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
              	{key: "vehicleId", label: COL("bis.vehicle.vehicleid"), width: 90, align: "center"},
            	{key: "vehicleType", label: COL("bis.vehicle.vehicletype"),  width: 90, align: "center",formatter: function () {
            		var detailCode = getDetailCode("VEHICLE_TYPE",this.item.vehicleType);
                    return detailCode;
                    }},
            	{key: "plateNumber", label:  COL("bis.vehicle.platenumber"),  width: 90, align: "center"},
            	{key: "companyId", label: COL("bis.company.companyid"),  width: 90, align: "center"},
            	{key: "busType", label:  COL("bis.vehicle.platenumber"), width: 90, align: "center",formatter: function () {
            		var detailCode = getDetailCode("BUS_TYPE",this.item.busType);
                    return detailCode;
                    }},
            	{key: "vehicleCapa", label:  COL("bis.vehicle.vehiclecapa"),  width: 90, align: "center"},
            	{key: "countryCode", label: COL("bis.countrycode"),  width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
            	{key: "areaCode", label: COL("bis.areacode"),  width: 90, align: "center",formatter: function () {
            		var areaCode =  getAreaCode("",this.item.areaCode);
                    return areaCode;
                    }},
                {key: "updateDate", label: COL("bis.updatedate"),  width: 90, align: "center"},
                {key: "remark", label: COL("bis.remark"),  width: 80, align: "center"},
                {key: "userId", label: COL("bis.userid"),  width: 120, align: "center"}
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


//
//form view

fnObj.alram = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
           
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#alram");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

      axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            }
        });
      axboot.buttonClick(this, "data-alram-btn", {
          "alram": function () {
              ACTIONS.dispatch(ACTIONS.ALRAM);
          }
      });
        //ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {});
    },
    
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        if (data.closeDate != null)
        {
               data.closeDate =data.closeDate.replace(/-/g, "");
              
        }
        if (data.beginDate != null)
        {
                data.beginDate =data.beginDate.replace(/-/g, "");
        }
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
$(document).on("click","#fileButton",function(){
	$("#upFile").click();
});

function getCmaFileInfo(obj,stype) {
    var fileObj, pathHeader , pathMiddle, pathEnd, allFilename, fileName, extName;
    if(obj == "[object HTMLInputElement]") {
        fileObj = obj.value
    } else {
        fileObj = document.getElementById(obj).value;
    }
    if (fileObj != "") {
            pathHeader = fileObj.lastIndexOf("\\");
            pathMiddle = fileObj.lastIndexOf(".");
            pathEnd = fileObj.length;
            fileName = fileObj.substring(pathHeader+1, pathMiddle);
            extName = fileObj.substring(pathMiddle+1, pathEnd);
            allFilename = fileName+"."+extName;
 
            if(stype == "all") {
                    return allFilename; // 확장자 포함 파일명
            } else if(stype == "name") {
                    return fileName; // 순수 파일명만(확장자 제외)
            } else if(stype == "ext") {
                    return extName; // 확장자
            } else {
                    return fileName; // 순수 파일명만(확장자 제외)
            }
    } else {
            alert("파일을 선택해주세요");
            return false;
    }
    // getCmaFileView(this,'name');
    // getCmaFileView('upFile','all');
 }
 
function getCmaFileView(obj,stype) {
    var s = getCmaFileInfo(obj,'all');
    $("#filename").val (s);
}