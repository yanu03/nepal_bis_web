var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItSystemschedules",
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
        	
            data = caller.formView01.getData();
            data.endTime= data.endTime+data.endMin;
            data.startTime = data.startTime+data.startMin;
            data.userId=loginid;
            var gridViewData = [].concat(caller.gridView01.getData("modified"));
            gridViewData = gridViewData.concat(caller.gridView01.getData("deleted"));
            if(data.scheduleId==""||data.scheduleId==null)
    		{
            	gridViewData.push(data);
            	for(var i=0; i<gridViewData.length; i++) {
            		gridViewData[i].scheduleValue = parseInt(gridViewData[i].scheduleValue);
            	}
            	axboot.ajax({
   	             type: "GET",
   	             url:'/api/v1/bisItSystemschedules/maxplus',
   	             data:"",
   	             callback: function (res) 
   	             {
    	             	if(res.max == null)
       	             	{
    	             		data.scheduleId="SC00000001";
       	             	}else
       	             	{
       	             		data.scheduleId="SC0"+res.max;
       	             	}
   	            	axboot.ajax({
   	                    type: "PUT",
   	                    url: "/api/v1/bisItSystemschedules",
   	                    data: JSON.stringify(gridViewData),
   	                    callback: function (res) {
   	                    	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
   	                         ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
   	                         axToast.push("Saved");
   	                    }
   	                });
   	             }
       			});
    		}
            else
            {
            	gridViewData.push(data);
            	for(var i=0; i<gridViewData.length; i++) {
            		gridViewData[i].scheduleValue = parseInt(gridViewData[i].scheduleValue);
            	}
            	axboot.ajax({
	                    type: "PUT",
	                    url: "/api/v1/bisItSystemschedules",
	                    data: JSON.stringify(gridViewData),
	                    callback: function (res) {
	                    	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	                         ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
	                         axToast.push("Saved");
	                    }
	                });
            }	
            
        }

    },
    FORM_CLEAR: function (caller, act, data) {
    	caller.formView01.clear();
		var value = $('select[data-ax-path="scheduleCode"]').val();
		if(value == 0) { //Power On/Off
			$('#scheduleValue').val(null);
			$('#scheduleValue').attr('disabled', true);
			$('#scheduleValue').attr('readonly', true);
		} else if(value == 1) { //Illuminance
			$('#scheduleValue').val(1);
			$('#scheduleValue').attr('disabled', false);
			$('#scheduleValue').attr('readonly', false);
		}
        /*axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });*/
    },
    ITEM_CLICK: function (caller, act, data) {
    	
    	var temp ={};
        temp.endDate= data.endDate;
    	temp.remark = data.remark;
    	temp.scheduleCode = data.scheduleCode;
    	temp.scheduleId = data.scheduleId;
    	temp.scheduleValue = data.scheduleValue;
    	temp.startDate = data.startDate;
    	temp.updateDate = data.updateDate;
    	temp.useYn = data.useYn;
    	temp.userId = data.userId;
    	temp.endMin = data.endTime.substring(2,4);
    	temp.endTime= data.endTime.substring(0,2);
    	temp.startMin = data.startTime.substring(2,4);
    	temp.startTime= data.startTime.substring(0,2);
        caller.formView01.setData(temp);
		var value = $('select[data-ax-path="scheduleCode"]').val();
		if(value == 0) { //Power On/Off
			$('#scheduleValue').val(null);
			$('#scheduleValue').attr('disabled', true);
			$('#scheduleValue').attr('readonly', true);
		} else if(value == 1) { //Illuminance
			$('#scheduleValue').val(1);
			$('#scheduleValue').attr('disabled', false);
			$('#scheduleValue').attr('readonly', false);
		}
       
    },
    ITEM_DEL: function (caller, act, data) {
    	axDialog.confirm({
    		msg: COLA("script.deleteconfirm")
    	}, function () {
    		if (this.key == "ok"){
    			caller.gridView01.delRow("selected");
    			var gridViewData = caller.gridView01.getData("deleted");
            	axboot.ajax({
                    type: "PUT",
                    url: "/api/v1/bisItSystemschedules",
                    data: JSON.stringify(gridViewData),
                    callback: function (res) {
                    	 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                         ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
                         axToast.push("Saved");
                    }
                });
    		}
    	});
    },    
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

            },
            "fn1": function() { //삭제
            	ACTIONS.dispatch(ACTIONS.ITEM_DEL);
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
	    	  var Keyword=this.Keyword.val();
	    	  data.Keyword=Keyword;
	    	  return $.extend({}, data);
	       
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
            //frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "useYn", label: COL("useyn"), width: 80, align: "center"},
                {key: "scheduleId", label: COL("systemschedule.scheduleid"), width: 90, align: "center"},
                {key: "scheduleCode", label: COL("systemschedule.schedulecode"), width: 150, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCHEDULE_CODE",this.item.scheduleCode);
                    return detailCode;
                 }},
                {key: "startDate", label: COLA("promotion.startDate"), width: 80, align: "center"},
                {key: "endDate", label: COLA("promotion.endDate"), width: 80, align: "center"},
                {key: "startTime", label: COLA("promotion.startTime"), width: 80, align: "center"},
                {key: "endTime", label: COLA("promotion.endTime"), width: 80, align: "center"},
                //{key: "scheduleValue", label: COL("systemschedule.schedulevalue"), width: 70, align: "center"},
                
                {key: "updateDate", label:COL("updatedate"), width: 90, align: "center"},
                {key: "remark", label:COL("remark"), width: 200, align: "center"},
                {key: "userId", label: COL("userid"), width: 120, align: "center"},
                
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
                return this.scheduleId;
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
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title").replace(/\n/g, "")));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

function startDateCheck(obj){
	var startDate=$("#startDate").val();
	var tempStartDate="";
	var endDate=$("#endDate").val();
	var tempEndDate="";
	var temp=[];
	
	temp=startDate.split("-");
	
	for(var i in temp){
		tempStartDate=tempStartDate+temp[i];
	}
	tempStartDate = Number(tempStartDate);
	if(endDate != ""){
		temp=endDate.split("-");
		for(var i in temp){
			tempEndDate=tempEndDate+temp[i];
		}
		tempEndDate = Number(tempEndDate);
		if(tempStartDate > tempEndDate){
			alert(COLA("promotion.startDateCheck"));
			$(obj).val("");
		}
	}
}

function endDateCheck(obj){
	var startDate=$("#startDate").val();
	var tempStartDate="";
	var endDate=$("#endDate").val();
	var tempEndDate="";
	var temp=[];
	
	temp=endDate.split("-");
	
	for(var i in temp){
		tempEndDate=tempEndDate+temp[i];
	}
	
	if(startDate != ""){
		temp=startDate.split("-");
		for(var i in temp){
			tempStartDate=tempStartDate+temp[i];
		}
		if(tempStartDate > tempEndDate){
			alert(COLA("promotion.startDateCheck"));
			$(obj).val("");
		}
	}
}

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
       alert(limit+COLA("promotion.byte"));
   }
     
   thisObject.val(strTitle);
}


function codeChange() {
	debugger;
}

$(document).ready(function() {
    // ax:BisCtDetailCode에서 생성된 요소를 선택합니다. 실제 클래스명이나 ID에 따라 달라질 수 있습니다.
    // 예를 들어, .form-control이 해당 요소에 사용된 클래스라고 가정합니다.
    // 또한 'groupCd'와 'dataPath'를 기반으로 구체적인 식별이 필요할 수 있습니다.
	$('select[data-ax-path="scheduleCode"]').on("change", function(){
		var value = $('select[data-ax-path="scheduleCode"]').val();
		if(value == 0) { //Power On/Off
			$('#scheduleValue').val(null);
			$('#scheduleValue').attr('disabled', true);
			$('#scheduleValue').attr('readonly', true);
		} else if(value == 1) { //Illuminance
			$('#scheduleValue').val(1);
			$('#scheduleValue').attr('disabled', false);
			$('#scheduleValue').attr('readonly', false);
		}
	});
});

