var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	console.log("gggg");
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItScenarios/parent",
            data: this.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItBitscenarios/parent",
            //data: "parentKey=" + data.scenarioId,
            callback: function (res) {
            	res.forEach(function(n){
            		if( n.applyDate==null || n.applyDate==""){
            			n.applyDate=todayCalc();
            		}
            	})
                caller.gridView02.setData(res);
                //caller.gridView02.scenarioId=data.scenarioId;
            }
        });
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
       // if (caller.formView01.validate()) {
        var parentData = caller.gridView01.getData();
        var childList = caller.gridView02.getData();
        //var checkChildList=caller.gridView02.getAllData();
        
        if(parentData.length == 0){
        	 axDialog.alert({
	                theme: "primary",
	                title:" ",
	                msg: COL("ax.promotion.BITAddWarning")
	               });
        }else{
        	if(childList.length == 0){
        		axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: COL("ax.promotion.bitCheck")
                   });
        		return;
        	}else{
        		 childList.forEach(function (n) {
        			n.parentKey = parentData[0].scenarioId;
       	            n.userId=$("#userId").val();
       	            n.useYn="Y";
       	            var tempArray=new Array();
       	            tempArray.push(n);
        			if(n.applyDate == null || n.applyDate==""){
        				 axDialog.alert({
        		                theme: "primary",
        		                title:" ",
        		                msg: "Please enter the APPLY DATE."
        		               });
        				 return false;
        			}else{
        				 if(n.scenarioId == null || n.scenarioId==""){
            				 axboot.ajax({
                                 type: "PUT",
                                 url: "/api/v1/bisItBitscenarios/insert",
                                 data: JSON.stringify(tempArray),
                                 callback: function (res) {
                                 }
                             });
            			 }else{
            				 axboot.ajax({
                                 type: "PUT",
                                 url: "/api/v1/bisItBitscenarios/update",
                                 data: JSON.stringify(tempArray),
                                 callback: function (res) {
                                 }
                             });
            			 }
        			}
     	        });
        		 axboot.promise()
                 /* .then(function (ok, fail, data) {
                      axboot.ajax({
                          type: "PUT", url: "/api/v1/bisItBitscenarios/parent", data: JSON.stringify([parentData]),
                          callback: function (res) {
                              ok(res);
                          }
                      });
                  })*/
                  /*.then(function (ok, fail, data) {
                      axboot.ajax({
                          type: "PUT", url: "/api/v1/bisItBitscenarios/child",
                          data: JSON.stringify(childList),
                          callback: function (res) {
                              ok(res);
                          }
                      });
                  })*/
                  .then(function (ok) {
                  	//ACTIONS.dispatch(ACTIONS.ITEM_CLICK, caller.gridView01.getData("selected")[0]);
                     // ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                      window.location.reload();
                  })
                  .catch(function () {

                  });
        	}
        }
        // childList에 parentKey 삽입
        	/*var obj=new Object();
        	obj["parentKey"]=parentData.scenarioId;
        	obj["allClearCheck"]="yes";
        	childList[0]=obj;*/

        
       // }

    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                caller.gridView02.clear();
            }
        });
    },
     
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItBitscenarios/parent",
            data: "parentKey=" + data.scenarioId,
            callback: function (res) {
                caller.gridView02.setData(res);
                caller.gridView02.scenarioId=data.scenarioId;
            }
        });
    },
    
    SEARCH_FORM: function (caller, act, data) {
        axboot.modal.open({
            modalType: "BITSCENARIO-MODAL",
            param: "",
            sendData: function(){
                // 모달창에 전달할 객체
                return {
                    "scenarioData": data
                };
            },
            callback: function (calldata) {
                // 모달창에서 실행 data를 넘겨 받습니다.
            	var parentList=caller.gridView02.getData();
            	var result="true";
            	/*parentList.forEach(function(n){
            		if(n.scenarioId==calldata.scenarioId){
            			alert(COL("ax.promotion.bitscenario.warning"));
            			result="error";
            			return;
            		}*/
            		
            		/*if(n.scenarioType==calldata.scenarioType && calldata.scenarioType=="0"){
            			alert(COL("ax.promotion.bitscenario.typewarning"));
            			result="error";
            			return;
            		}
            		
            			
            			
            	});
            	*/
            	/*if(result=="true"){
            		
            	}*/
            	
            	caller.gridView02.addRow(calldata);
            	this.close();
            	
                // 모달창을 닫으려면 여기서 this는 modal UI 객체가 됩니다.
                
            }
        });
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
            _this.gridView02.initView();
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

        this.target = axboot.gridBuilder({
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "scenarioId", label: COL("ax.promotion.scenarioId"), width: 110, align: "center"},
            	{key: "scenarioName", label: COL("ax.promotion.scenarioName"), width: 110, align: "center"},
            	{key: "startDate", label: COL("ax.promotion.scenarioStartDate"), width: 110, align: "center"},
            	{key: "startTime", label: COL("ax.promotion.scenarioStartTime"), width: 110, align: "center"},
            	{key: "endDate", label: COL("ax.promotion.scenarioEndDate"), width: 110, align: "center"},
            	{key: "endTime", label: COL("ax.promotion.scenarioEndTime"), width: 110, align: "center"}
            	/*{key: "scenarioType", label: COL("ax.promotion.scenarioType"), width: 110, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCENARIO_TYPE",this.item.scenarioType);
                    return detailCode;
                   }},*/

            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    /*ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);*/
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
        var _list = this.target.getList("selected");
       
        /*if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.scenarioId;
            });
        } else {
            list = _list;
        }*/
        return _list;
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
        
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.target.find('[data-ax-path="key"]').attr("readonly", "readonly");

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

/**
 * gridView02
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: false,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "bitId", label: COL("ax.promotion.bitId"), width: 90, align: "center"},
             	{key: "bitName", label:COL("ax.promotion.bitName"), width: 90, align: "center"},
             	{key: "scenarioId", label: COL("ax.promotion.scenarioId"), width: 90, align: "center"},
             	{key: "scenarioName", label: COL("ax.promotion.scenarioName"), width: 110, align: "center"},
             	{key: "applyDate", label: COL("ax.promotion.applyDate"), width: 110, align: "center", editor:"text"} 
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.GRID2_ITEM_CLICK, this.list[this.dindex]);
                    /*ACTIONS.dispatch(ACTIONS.GRID2_ITEM_CLICK, this.item);*/
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "item-add": function () {
            	var scenarioCheck=fnObj.gridView01.getData();
            	var scenarioData=[scenarioCheck[0].scenarioId,scenarioCheck[0].scenarioName];
            	if(scenarioData.length == 0){
            		axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: COL("ax.promotion.BITAddWarning")
                    });
            	}
            	else{
            		ACTIONS.dispatch(ACTIONS.SEARCH_FORM,scenarioData);
            	}
            	
                //this.addRow();
            },
            "item-remove": function () {
                this.delRow("selected");
            },
            "item-control": function(){
            	//var data=this.target.getList("selected");
            	var obj=new Object();
            	obj.Select="bitId";
            	obj.Keyword="B000000001";
            		axboot.ajax({
                        type: "GET",
                        url: "/api/v1/bisItBitscenarios/sendCenter",
                        data: obj,
                        callback: function (res) {
                        	   axDialog.alert({
                                   theme: "primary",
                                   title:" ",
                                   msg: res.res_msg
                               });
                         }
                    });
            	
/*            	if(data.length == 0){
            		axDialog.alert({
            			theme: "primary",
            			title:" ",
            			msg: COL("ax.promotion.bitCheck")
            		});
            	}else{
            		axboot.ajax({
            			type: "GET",
            			url: "/api/v1/bisItBitscenarios/sendCenter",
            			data: JSON.stringify(obj),
            			callback: function (res) {
            				axDialog.alert({
            					theme: "primary",
            					title:" ",
            					msg: res.res_msg
            				});
            			}
            		});
            	}
*/            }
        });
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getAllData:function(){
    	var list=this.target.getList();
    	return list;
    },
    getData: function () {
        var _list = this.target.getList("selected");
/*        var _list = this.target.getList(_type);
        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.scenarioId;
            });
        } else {
            list = _list;
        }*/
        return _list;
    },
    align: function () {
        this.target.align();
    },
    addRow: function (data){
    	var list=data;
    	var length=this.target.getList().length;
    	list.applyDate=getFormatDate();
    	this.target.addRow(list,"last");
    }
    
});

function getFormatDate(){
	var date=new Date();
	var year = date.getFullYear();                                 //yyyy

	var month = (1 + date.getMonth());                     //M

	month = month >= 10 ? month : '0' + month;     // month 두자리로 저장

	var day = date.getDate();                                        //d

	day = day >= 10 ? day : '0' + day;                            //day 두자리로 저장
	
	var hour =date.getHours();
	hour = hour>=10? hour : '0'+hour;
	
	var min =date.getHours();
	min = min>=10? min : '0'+min;
	
	var sec =date.getHours();
	sec = sec>=10? sec : '0'+sec;

	return  year + '' + month + '' + day+''+hour+''+min+''+sec;

}