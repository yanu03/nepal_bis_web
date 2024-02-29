var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItForms",
            data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
            	caller.gridView01.setData(res);
            }
        });
        ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
    	axMask.open({
    		content:'<h1><i class="fa fa-spinner fa-spin"></i> Loading...</h1>'
    	});
    	var browserCheck=isBrowserCheck();
        var formData = new FormData();
        var upFile=$('#upFile')[0].files[0];
        var formName=$("#formName").val();
        var formId=$('#formId').val();
        var upFilePath=$('#upFilePath').val();
        var formType=$('#formType').val();
        var applyDate=$('#applyDate').val();
        
        if(formName==null || formName==""){
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg:COL("ax.promotion.formNameCheck"),
        	});
        	axMask.close();
        	return;
        }
        
        if(upFile==null &&(formId==null || formId=="")){
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg:COL("ax.promotion.fileCheck"),
        	});
        	axMask.close();
        	return;
        }
        
        formData.append('upFile', upFile);
        formData.append('formId', formId);
        formData.append('upFilePath',upFilePath);
        formData.append('browserCheck',browserCheck);
        formData.append('formType',formType);
        formData.append('applyDate',applyDate);

        var formId=$('#formId').val();
        
        $.ajax({
        	
            url: '/api/v1/bisItForms/file',
            processData: false,
            contentType: false,
            data: formData,
            type: "POST",
            success: function(result){            	
                if(result.warning != null){
                	axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: result.warning,
                	});
                }else{
	                if (caller.formView01.validate()) {
	                	var jsonArray=new Array();
	                    var parentData = caller.formView01.getData();
	                    jsonArray.push(parentData);
	                    jsonArray.push(result);
	                    axboot.promise()
	                        .then(function (ok, fail, data) {
	                            axboot.ajax({
	                                type: "PUT", url: "/api/v1/bisItForms/parent",
	                                data:JSON.stringify(jsonArray),
	                                callback: function () {
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
	            }
               
                axMask.close();
                window.location.reload();
            }
        
        });
    },
    FORM_CLEAR: function (caller, act, data) {
    	 $("#formType").removeAttr("disabled");
    	 $("#selectFile").css("display","none");
    	 $("#videoSelect").css("display","none");
    	 $("#upFile").attr("accept","image/*");
    	 caller.formView01.clear();
    	 applyDateSetting();
       /* axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
            }
        });*/
    },
    ITEM_CLICK: function (caller, act, data) {
    	$("#formType").attr("disabled","disabled");
        caller.formView01.setData(data);
        fileTypeSelect();
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
        this.useYn=$("#useYn");
        this.searchDiv=$("#searchDiv");
        this.searchData = $("#searchData");
    },
    getData: function () {
        return {
        	useYn:this.useYn.val(),
        	searchDiv: this.searchDiv.val(),
        	searchData: this.searchData.val()
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
        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "formId", label: COL("ax.promotion.formId"), width: 100, align: "center"},
                {key: "formName", label: COL("ax.promotion.formName"), width: 180, align: "center"},
                {key: "formType", label: COL("ax.promotion.formType"), width: 80, align: "center", formatter: function () {
            		var detailCode = getDetailCode("FORM_TYPE",this.item.formType);
                    return detailCode;
                   }},
                
               /* {key: "formEname", label: COL("ax.promotion.formEname"), width: 120, align: "center"},*/
                {key: "fileName", label: COL("ax.promotion.fileName"), width: 120, align: "center"},
                {key: "applyDate", label: COL("ax.promotion.applyDate"), width:120, align: "center"}
               /* {key: "remark", label: COL("ax.promotion.remark"), width: 70, align: "center"},
                {key: "useYn", label: COL("ax.promotion.useYn"), width: 70, align: "center"}*/
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    var imgName=this.item.fileName;
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
        data.applyDate=$("#applyDate").val();
        return $.extend({}, data);
    },
    setData: function (data) {
        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);
        this.target.find('[data-ax-path="key"]').attr("readonly", "readonly");
        
        var temp=data.fileName.split('.')[1].toLowerCase();
		
        if(temp=="jpg" || temp=="gif" || temp=="png"){
        	 $('#videoSelect').css("display","none");
        	 $('#selectFile').attr("src","/resource/BisFile/"+data.fileName);
             $('#selectFile').css("display","");
        }
        if(temp=="mp4" || temp=="avi"){
        	$('#selectFile').css("display","none");
        	$('#videoSelect').attr('src',"/resource/BisFile/"+data.fileName);
        	$('#videoSelect').css("display","");
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
        $("#selectFile").css("display","none");
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

function getThumbnailPrivew(html, $img, $video) {
	axMask.open({
		content:'<h1><i class="fa fa-spinner fa-spin"></i> Loading...</h1>'
	});
	var browserCheck=isBrowserCheck();
	var formData = new FormData();
	formData.append('upFile', $('#upFile')[0].files[0]);
	formData.append('browserCheck',browserCheck);
	$.ajax({
		url:'/api/v1/bisItForms/getFileSource',
		processData : false,	//서버에 전달되는 데이터는 jquery내부적으로 queryString으로 만들어 전달되는데, 파일전송의 경우 이를하면 안되기때문에 false 
		contentType : false,	//default값이"application/x-www-form-urlencoded; charset=UTF-8"인데 multipart/form-data로 전송이 되기 위해 false값을 준다.
		data : formData,
		type: 'POST',
		success:function(result){
			var filePath=result.fileSource;
			$('#upFilePath').attr('value',filePath);
			axMask.close();
		}
	});
	
    if (html.files && html.files[0]) {
    	var ext = $(html).val().split('.').pop().toLowerCase();
	    var reader = new FileReader();
	    reader.onload = function (e) {
	    	if(ext=="jpg"||ext=="png"||ext=="gif"){
	    		$video.css("display","none");
	    		$img.attr('src',e.target.result);
	    		$img.css("display","");
	    	}
	    	else if(ext=="mp4" || ext=="avi"){
	    		$img.css("display","none");
	    		$video.attr('src',e.target.result);
	    		$video.css("display","");
	    	}
	    	else{
	    		axDialog.alert({
	                theme: "primary",
	                title:" ",
	                msg:"Unsupported format.",
	        	});

	    	}
	    }
	    reader.readAsDataURL(html.files[0]);
	}
}

function isBrowserCheck(){
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1){
		return 'Chrome';
	}
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	//if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		return 'Explorer';
	}
}

function fileTypeSelect(){
	var formType=$("#formType").val();
	if(formType=="1"){
		$("#upFile").attr("accept","image/*");
	}
	if(formType=="2"){
		$("#upFile").attr("accept","video/*");
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

    	 axDialog.alert({
    	                         theme: "primary",
    	                         title:" ",
    	                         msg: limit+COL("ax.promotion.byte"),
    	                 	});
     }
       
     thisObject.val(strTitle);
}
var datetimepickerOptions = {
	validateOnBlur: false,
	format:'YmdH00'
};

$(document).on("click","#fileButton",function(){
	$("#upFile").click();
});
	
$(document).on("click","#applyDate",function(){
	$(this).datetimepicker(datetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#applyIcon",function(){
	$("#applyDate").datetimepicker(datetimepickerOptions).datetimepicker("show");
});

function applyDateSetting(){
	var date=new Date();
	
	var monthCalc=date.getMonth()+1;
	var startDateCalc=date.getDate();
	var endDateCalc=date.getDate();
	var hourCalc=date.getHours();
	
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
	
	var applyDate=date.getFullYear().toString()+monthCalc.toString()+startDateCalc.toString()+hourCalc.toString()+"00";
	$("#applyDate").val(applyDate);
}



