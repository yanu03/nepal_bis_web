var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["samples", "parent"],
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
    PAGE_SAVE: function (caller, act, data) {
        var saveList = [].concat(caller.gridView01.getData("modified"));
        saveList = saveList.concat(caller.gridView01.getData("deleted"));

        axboot.ajax({
            type: "PUT",
            url: ["samples", "parent"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("저장 되었습니다");
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {

    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    }, FIRMWARE_SAVE : function(caller,act,data)
    {
    	if(	caller.firmware.validate())
		{
        	data=caller.firmware.getData();
        	if("zip" == data.upFile.substring(data.upFile.indexOf(".")+1))
        		{
        		
	            	data.applyDate=data.startdate+data.starthour+data.startmin;
	            	if(data.fileCode == "150")
	            		{
	            		data.fileName="BIT_FW_00001_"+data.time+".ZIP"
	            		}
	            
	    	      	  var upFile=$('#upFile')[0].files[0];
	    	
	    	      	  var browserCheck=isBrowserCheck();
	    	      	  var formData = new FormData();
	                formData.append('upFile', upFile);
	                formData.append('fileName', data.fileName);
	                formData.append('fileCode', data.fileCode);
	                $.ajax({
	                    url: '/api/v1/bisFirmwares/file',
	                    processData: false,
	                    contentType: false,
	                    data: formData,
	                    type: "POST",
	                    success: function(result){    
	                  	  if(result.warning != null){
	                          	alert(result.warning);
	                          }else{ 
	                        	  ajaxCallPost(function(result,res){
	        		                		if(result)
	        		                			{
	        		   		                	 axDialog.alert({
	        		   		                          theme: "primary",
	        		   		                          title:" ",
	        		   		                          msg: "applied"
	        		   		                      });
	        		                			}
	        		                		else
	        		                			{
	        	   		                		console.log(res);
	        	   		                         axDialog.alert({
	        	   		                             theme: "primary",
	        	   		                             title:" ",
	        	   		                             msg: "not responding."
	        	   		                         });		
	        		                			}
	        		                	},"http://localhost:8080/communication/control",data);
	                          }
	                    }
	                });
        
        		}else{
        			
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

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.firmware.initView();

};

fnObj.pageResize = function () {

};

/*
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
});*/
//fromview02
fnObj.firmware = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
           
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#firmware");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

      axboot.buttonClick(this, "data-firmware-btn", {
            "send": function () {
               ACTIONS.dispatch(ACTIONS.FIRMWARE_SAVE);
             
            }
        });
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
        return $.extend({}, data);
    },
    setData: function (data) {


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
$( "#datepicker2" ).datepicker({
    dateFormat: 'yymmdd'
  });
 $("#datepickerbutton2").on("click", function(e){
     $('#datepicker2').datepicker('show');
 });
function getCmaFileView(obj,stype) {
    var s = getCmaFileInfo(obj,'all');
    $("#filename").val (s);
}