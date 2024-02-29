var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItScenarios/parent",
            data:  this.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
       
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var parentData = caller.formView01.getData();
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", url: "/api/v1/bisItScenarios/parent",
                        data: JSON.stringify([parentData]),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
                })
                .catch(function () {

                });
        }

    },
    FORM_CLEAR: function (caller, act, data) {
    	 caller.formView01.clear();
        /*axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });*/
    	 scDefaultDateSetting();
    },
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);
    }
});

fnObj.pageStart = function () {
    var _this = this;

    axboot.promise()
        .then(function (ok, fail, data) {
            axboot.ajax({
                type: "GET", url: ["commonCodes"], data: {groupCd: "USER_ROLE", useYn: "Y"},
                callback: function (res) {
                    var userRole = [];
                    res.list.forEach(function (n) {
                        userRole.push({
                            value: n.code, text: n.name + "(" + n.code + ")",
                            roleCd: n.code, roleNm: n.name,
                            data: n
                        });
                    });
                    CODE.userRole = userRole;

                    ok();
                }
            });
        })
        .then(function (ok) {
            _this.pageButtonView.initView();
            _this.searchView.initView();
            _this.gridView01.initView();
            _this.formView01.initView();
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        })
        .catch(function () {

        });
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
        this.searchData = $("#searchData");
        this.useYn = $("#useYn");
        this.searchDiv = $("#searchDiv");
    },
    getData: function () {
        return {
        	searchData:this.searchData.val(),
            useYn:this.useYn.val(),
            searchDiv:this.searchDiv.val()
            
        }
    }
});

/**
 * gridView01
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;
        this.target = $(document["formView01"]);
        /*this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });*/
        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "scenarioId", label: COL("ax.promotion.scenarioId"), width: 90, align: "center"},
                /*{key: "scenarioType", label: COL("ax.promotion.scenarioType"), width: 120, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCENARIO_TYPE",this.item.scenarioType);
                    return detailCode;
                 }},*/
                {key: "scenarioName", label: COL("ax.promotion.scenarioName"), width: 120, align: "center"},
                //{key: "scenarioEname", label: COL("ax.promotion.scenarioEname"), width: 120, align: "center"},
                {key: "startDate", label: COL("ax.promotion.startDate"), width: 80, align: "center"},
                {key: "endDate", label: COL("ax.promotion.endDate"), width: 80, align: "center"},
                //{key: "startTime", label: COL("ax.promotion.startTime"), width: 80, align: "center"},
                //{key: "endTime", label: COL("ax.promotion.endTime"), width: 80, align: "center"}
                //{key: "remark", label: COL("ax.promotion.remark"), width: 70, align: "center"},
                //{key: "useYn", label: COL("ax.promotion.useYn"), width: 70, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.scenarioId;
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

/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();

        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            }
        });
    },
    initEvent: function () {
        var _this = this;             
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        data.userId=$("#userId").val();
        data.startDate=$("#scStartDate").val();
        data.endDate=$("#scEndDate").val();
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.target.find('[data-ax-path="key"]').attr("readonly", "readonly");
        if(data.scenarioType=="ba"){
        	$("#scenarioType").val("ba").prop("selected", true);

        }else{
        	$("#scenarioType").val("sc").prop("selected", true);
        }
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg: LANG("ax.script.form.validate", rs.error[0].jquery.attr("title").replace(/\n/g, "")),
                onStateChanged:function(){
                	if(this.state=="close"){
                		 rs.error[0].jquery.focus();
                         return false;
                	}
                	
                }
        	});
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});


function byteCalc(obj){
	 var thisObject = $(obj);
   
   var limit = thisObject.attr("limitbyte"); //제한byte를 가져온다.
   var str = thisObject.val();
   var strLength = 0;
   var strTitle = "";
   var strPiece = "";
   var check = false;
             
   for (i = 0; i < str.length; i++){
       var code = str.charCodeAt(i);
       var ch = str.substr(i,1).toUpperCase();
       //체크 하는 문자를 저장
       strPiece = str.substr(i,1)
         
       code = parseInt(code);
         
       if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))){
           strLength = strLength + 3; //UTF-8 3byte 로 계산
       }else{
           strLength = strLength + 1;
       }
         
       if(strLength>limit){ //제한 길이 확인
           check = true;
           break;
       }else{
           strTitle = strTitle+strPiece; //제한길이 보다 작으면 자른 문자를 붙여준다.
       }
         
   }
     
   if(check){
	   axDialog.alert({
           theme: "primary",
           title:" ",
           msg:limit+COL("ax.promotion.byte"),
   	});
   }
     
   thisObject.val(strTitle);
}

function scDateValidate(){
	var startDate=$("#scStartDate").val();
	var endDate=$("#scEndDate").val();
	var date=new Date();
	var today=todayCalc();
	
	startDate=Number(startDate);
	endDate=Number(endDate);
	if(startDate=="" || endDate==""){
		axDialog.alert({
            theme: "primary",
            title:" ",
            msg: "Please enter start date or end date."
    	})
		return false;
	}
	if(startDate>endDate){
		axDialog.alert({
            theme: "primary",
            title:" ",
            msg: "Start date can not be greater than end date."
    	})
		$("#scStartDate").val("");
		return false;
	}
}

function scDefaultDateSetting(){
	var date=new Date();
	
	var monthCalc=date.getMonth()+1;
	var startDateCalc=date.getDate()-1;
	var endDateCalc=date.getDate();
	var hourCalc=date.getHours()-1;
	
	if(monthCalc < 10){
		monthCalc="0"+monthCalc;
	}
	
	if(startDateCalc <10){
		startDateCalc = "0"+startDateCalc;
	}
	
	if(endDateCalc < 10){
		endDateCalc = "0"+endDateCalc;
	}
	
	if(hourCalc < 10){
		hourCalc = "0"+hourCalc;
	}
	
	var startDate=date.getFullYear().toString()+monthCalc.toString()+startDateCalc.toString();
	var endDate=date.getFullYear().toString()+monthCalc.toString()+endDateCalc.toString();
	$("#scStartDate").val(startDate);
	$("#scEndDate").val(endDate);
}

var scDatetimepickerOptions = {
		timepicker:false,
		validateOnBlur: false,
		format:'Ymd'
	};

function timeCheck(){
	var startTime=$("#startTime").val();
	var endTime=$("#endTime").val();
	
	startTime=Number(startTime);
	endTime=Number(endTime);
	if(startTime>endTime){
		axDialog.alert({
            theme: "primary",
            title:" ",
            msg: COL("ax.promotion.timeCheck"),
    	});
		$("#startTime option:eq(0)").prop("selected","selected");
		return;
	}
};

$(document).on("click","#scStartDate",function(){
	$(this).datetimepicker(scDatetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#scEndDate",function(){
	$(this).datetimepicker(scDatetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#scStartCalendar",function(){
	$("#startDate").datetimepicker(scDatetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#scEndCalendar",function(){
	$("#endDate").datetimepicker(scDatetimepickerOptions).datetimepicker("show");
});

