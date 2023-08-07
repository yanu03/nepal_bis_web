var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisCtCommonCodes/parent",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            },
            /*data: $.extend({}, this.searchView.getData(), this.gridView01.getPageData()),
            callback: function (res) {
                caller.gridView01.setData(res);
            }*/
        });
       
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        //if (caller.formView01.validate()) {
    	
    		var detailCodeNameValidate="success";
    		var detailCodeValidate="success";
    		var detailCodeNameStr="";
    		var detailCodeStr="";
    		var calcDetailCode=0;
            var parentData = caller.formView01.getData();
            var tempList=caller.gridView02.target.list;
            if(tempList.length != 0){
            	tempList.forEach(function(n){
            		n.userId=$("#userId").val();
            	});
            }
            //코드 중복및 null 검사
            tempList.forEach(function(n){
            	if(n.__created__){
            		if(n.detailCode==null || n.detailCode==""){
            			detailCodeStr="ax.code.detailCode";
        				detailCodeValidate="fail";
        				return false;
            		}
            		tempList.forEach(function(t){
                		if(!t.__created__){
                			if(n.detailCode==t.detailCode){
                				detailCodeStr="ax.code.detailCode";
                				detailCodeValidate="fail";
                				return false;
                    		}
                		}
            		});
            	};
            });
          
           /* var childList = [].concat(caller.gridView02.getData("modified"));
            childList = childList.concat(caller.gridView02.getData("deleted"));*/
            var childList=[].concat(caller.gridView02.getData());
            // childList에 parentKey 삽입
            if(childList.length!=0){
            	childList.forEach(function (n) {
                	//코드명 null검사
                	n.allClearCheck="no"
                	if(n.detailCodeName==null || n.detailCodeName==""){
                		detailCodeNameValidate="fail";
                		detailCodeNameStr="ax.code.detailCodeName";
                		return;
                	};
                	
                	if(n.useYn==null || n.useYn==""){
                		n.useYn="N";
                	}
                	
                    n.parentKey = parentData.commonCode;
                });
            }else{
            	var obj=new Object();
            	obj["parentKey"]=parentData.scenarioId;
            	obj["allClearCheck"]="yes";
            	childList[0]=obj;
            }

            if(detailCodeNameValidate=="success" && detailCodeValidate=="success"){
	            axboot.promise()
	            	//parent입력시
	                /*.then(function (ok, fail, data) {
	                    axboot.ajax({
	                        type: "PUT",
	                        url: "/api/v1/bisCtCommonCodes/parent",
	                        data: JSON.stringify([parentData]),
	                        callback: function (res) {
	                            ok(res);
	                        }
	                    });
	                })*/
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                        type: "PUT",
	                        url: "/api/v1/bisCtCommonCodes/child",
	                        data: JSON.stringify(childList),
	                        callback: function (res) {
	                            ok(res);
	                        }
	                    });
	                })
	               .then(function (ok) {
	                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	                })
	                .catch(function () {
	
	                });
            }else if(detailCodeNameValidate=="success" && detailCodeValidate=="fail"){
            	axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: COL(detailCodeStr)
            	})
            }else{
            	axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: COL(detailCodeNameStr)
            	})
            }
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
            url: "/api/v1/bisCtCommonCodes/child",
            data: "Keyword=" + data.commonCode,
            callback: function (res) {
                caller.gridView02.setData(res);
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

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            sortable: false,
            columns: [
                {key: "commonCode", label: COL("ax.code.group.Code"), width: 100, align: "center"},
                {key: "commonCodeName", label:COL("ax.code.group.CodeName"), width: 100, align: "center"},
                {key: "commonCodeEname", label:COL("ax.code.group.CodeEname"), width: 140, align: "center"},
                {key: "useYn", label: COL("ax.code.useYn"), width: 70, align: "center"}
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
                return this.COMMON_CODE;
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
                msg: LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")),
                onStateChanged:function(){
                	if(this.state=="close"){
                		rs.error[0].jquery.focus();
                        return false;
                	}
                }
        	})
           // alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            
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
            showRowSelector: false,
            multipleSelect: false,
            sortable: true,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "sequence", label: COL("ax.code.detail.sequence"), width: 90, align: "center", editor: "text"},
                {key: "detailCode", label: COL("ax.code.detail.code"), width: 80, align: "center", editor: "text"},
                {key: "detailCodeName", label: COL("ax.code.detail.codeName"), width: 150, align: "center", editor: "text"},
                {key: "detailCodeEname", label: COL("ax.code.detail.codeEName"), width: 150, align: "center", editor: "text"},
                {key: "useYn", label: COL("ax.code.useYn"), width: 70, align: "center", editor: "checkYn"},
               /* {key: "userId", label: "등록자", width: 70, align: "center", editor: "text"},
                {key: "updateDate", label: "등록날짜", width: 100, align: "center", editor: "text"},*/
                {key: "value1", label: COL("ax.code.value1"), width: 70, align: "center", editor: "text"},
                {key: "value2", label: COL("ax.code.value2"), width: 70, align: "center", editor: "text"},
                {key: "value3", label: COL("ax.code.value3"), width: 70, align: "center", editor: "text"},
                {key: "remark", label: COL("ax.code.remark"), width: 100, align: "center", editor: "text"}
            ],
            body: {
                onClick: function () {
                    //this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "item-add": function () {
                this.addRow();
            },
        	"item-remove": function () {
                this.delRow();
            }
        });
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getData: function () {
        var _list = this.target.getList();
        return _list;
    },
/*    getData: function (_type) {
    	var list = [];
    	var _list = this.target.getList();
    	/var _list = this.target.getList(_type);
    	
    	if (_type == "modified" || _type == "deleted") {
    		list = ax5.util.filter(_list, function () {
    			return this.detailCode;
    		});
    	} else {
    		list = _list;
    	}
    	return list;
    },*/
    align: function () {
        this.target.align();

    }
});