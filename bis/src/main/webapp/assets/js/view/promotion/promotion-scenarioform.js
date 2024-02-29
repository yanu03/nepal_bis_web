var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItScenarioforms/parent",
            data: this.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
       // if (caller.formView01.validate()) {
        var parentData = caller.formView01.getData();
       
       /* var childList = [].concat(caller.gridView02.getData("modified"));
        childList = childList.concat(caller.gridView02.getData("deleted"));*/
        var childList=[].concat(caller.gridView02.getData());
        // childList에 parentKey 삽입
        if(childList.length!=0){
	        childList.forEach(function (n) {
	            n.parentKey = parentData.scenarioId;
	            n.userId=$("#userId").val();
	            n.allClearCheck="no";
	        });
        } else{
        	var obj=new Object();
        	obj["parentKey"]=parentData.scenarioId;
        	obj["allClearCheck"]="yes";
        	childList[0]=obj;
        }

        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "PUT", url: "/api/v1/bisItScenarioforms/parent", data: JSON.stringify([parentData]),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "PUT", url: "/api/v1/bisItScenarioforms/child",
                    data: JSON.stringify(childList),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok) {
            	ACTIONS.dispatch(ACTIONS.ITEM_CLICK, caller.gridView01.getData("selected")[0]);
                //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);

            })
            .catch(function () {

            });
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
    
    GRID2_ITEM_CLICK:function(caller, act, data){
    	var divId="#"+data.formId+data.sequence;
    	$(".img_div").css("border","1px solid deepskyblue");
    	$(divId).css("border","3px solid deepskyblue");
    },
    
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data);
        console.log("fffffff");
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItScenarioforms/child",
            data: "parentKey=" + data.scenarioId,
            callback: function (res) {
            	var temp="";
            	var useYn="";
                caller.gridView02.setData(res);
                caller.gridView02.scenarioId=data.scenarioId;
                caller.gridView02.scenarioType=data.scenarioType;
                $("#imageArea").empty();
                for(count in res){
                	temp=res[count].fileName.split(".")[1].toLowerCase();
                	useYn=res[count].useYn;
                	if(useYn=='Y' && (temp=="jpg" || temp=="png" || temp=="gif")){
                		$("#imageArea").append('<div class="img_div" id='+res[count].formId+res[count].sequence+'><img class="img_scale" alt="이미지" src="/resource/BisFile/'+res[count].fileName+'"/></div>');
                	}else if(useYn=='Y' && (temp=="mp4" || temp=="avi")){
                		$("#imageArea").append('<div class="img_div" id='+res[count].formId+res[count].sequence+'><video controls width="300px" height="300px" loop autoplay><source src="/resource/BisFile/'+res[count].fileName+'"></video></div>');
                	}
            		
            	}
            }
        });
    },
    
    SEARCH_FORM: function (caller, act, data) {
        axboot.modal.open({
            modalType: "SEARCHFORM-MODAL",
            param: "",
            sendData: function(){
                // 모달창에 전달할 객체
                return {
                    "scenarioData": data
                };
            },
            callback: function (calldata) {
                // 모달창에서 실행 data를 넘겨 받습니다.
            	caller.gridView02.addRow(calldata);
            	

                // 모달창을 닫으려면 여기서 this는 modal UI 객체가 됩니다.
                this.close();
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
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "scenarioId", label: COL("ax.promotion.scenarioId"), width: 90, align: "center"},
               /* {key: "scenarioType", label: COL("ax.promotion.scenarioType"), width: 100, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCENARIO_TYPE",this.item.scenarioType);
                    return detailCode;
                   }},*/
                {key: "scenarioName", label: COL("ax.promotion.scenarioName"), width: 110, align: "center"},
                {key: "startDate", label: COL("ax.promotion.startDate"), width: 90, align: "center"},
                {key: "startTime", label: COL("ax.promotion.startTime"), width: 90, align: "center"},
                {key: "endDate", label: COL("ax.promotion.endDate"), width: 90, align: "center"},
                {key: "endTime", label: COL("ax.promotion.endTime"), width: 90, align: "center"},
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

/**
 * gridView02
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;
    	var temprow = null;
		var tempindex = null;
		var tempthis = null;
		
        this.target = axboot.gridBuilder({
            showLineNumber: false,
            showRowSelector: false,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "sequence", label: COL("ax.promotion.sequence"), width: 80, align: "center",  editor:"text"},
                {key: "formId", label: COL("ax.promotion.formId"), width: 80, align: "center",  editor: {type: "text", disabled: "notCreated"}},
                {key: "formName", label: COL("ax.promotion.formName"), width: 80, align: "center",  editor: {type: "text", disabled: "notCreated"}},
                {key: "fileName", label: COL("ax.promotion.fileName"), width: 90, align: "center",  editor: {type: "text", disabled: "notCreated"}},
                {key: "formType", label: COL("ax.promotion.formType"), width: 80, align: "center",  editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("FORM_TYPE",this.item.formType);
                    return detailCode;
                   }},
                {key: "displayTime", label: COL("ax.promotion.displayTime"), width: 90, align: "center", editor: "text"},
                {key: "useYn", label: COL("ax.promotion.useYn"), width: 70, align: "center", editor: "checkYn"}
            ],
            
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.GRID2_ITEM_CLICK, this.list[this.dindex]);
	               	 temprow = this.list[this.dindex];
	               	 tempindex = this.dindex;
	               	 tempthis = this; 
                    ACTIONS.dispatch(ACTIONS.GRID2_ITEM_CLICK, this.item);
                    
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "item-add": function () {
            	var scenarioCheck=[this.scenarioId,this.scenarioType];
            	if(scenarioCheck[0] == null || scenarioCheck[0] == ""){
            		axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: COL("ax.promotion.addwarning")
                    });
            	}else{
            		ACTIONS.dispatch(ACTIONS.SEARCH_FORM,scenarioCheck);
            	}
            	
                //this.addRow();
            },
            "item-remove": function () {
                this.delRow("selected");
                var list=this.target.getList();
                for(var i in list){
                	list[i].sequence=Number(i)+1;
                	this.target.updateRow(list[i],Number(i));
                }
            },
            "up": function () {
            	if(0 < tempindex)
            		{
            		 temprow2 = tempthis.list[tempindex-1];
            		 temprow.sequence = tempindex ;
            		 temprow2.sequence = tempindex+1 ;
            		 
            		 tempthis.self.updateRow(temprow,tempindex-1);
            		 tempthis.self.updateRow(temprow2,tempindex);
            		 tempindex = tempindex - 1;
            		 tempthis.self.clearSelect();
            		 tempthis.self.select(tempindex);
            		}
            },	"down": function () {
            	if(tempindex < (this.target.getList().length - 1))
        		{
            			temprow2 = tempthis.list[tempindex+1];
            		 
            		 temprow.sequence = tempindex + 2 ;
            		 temprow2.sequence = tempindex + 1 ;
            		 
            		 tempthis.self.updateRow(temprow,tempindex+1);
            		 tempthis.self.updateRow(temprow2,tempindex);
            		 tempindex = tempindex + 1;
            		 tempthis.self.clearSelect();
            		 tempthis.self.select(tempindex);
        		}
            }
        });
        $("#imageArea").empty();
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getData: function () {
        var _listAll = this.target.getList();
        /* var _list = this.target.getList(_type);
        if (_type == "modified" || _type == "deleted") {
        	list = ax5.util.filter(_list, function () {
        		return this.formId;
        	});
        } else {
            list = _list;
        }*/
        return _listAll;
    },
/*    getData: function (_type) {
    	var list = [];
    	var _list = this.target.getList(_type);
    	      var _list = this.target.getList(_type);
    	  if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.formId;
            });
        } else {
            list = _list;
        }
    	 return _list;
    },
*/    align: function () {
        this.target.align();
    },
    addRow: function (data){
    	var list=data;
    	var length=this.target.getList().length;
    	list.sequence=length+1;
    	list.displayTime=0;
    	this.target.addRow(list,"last");
    }
    
    
});


