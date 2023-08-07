var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisMaParams",
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
	    if(saveList.length != 0){
	    	saveList.forEach(function(n){
	    		n.userId=$("#userId").val();
	    	});
	    }
	        axboot.ajax({
	            type: "PUT",
	            url: "/api/v1/bisMaParams",
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
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
        	searchDiv:this.searchDiv.val(),
            searchData: this.searchData.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	 {key: "paramId", label: COL("ax.code.paramId"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
                 {key: "paramName", label: COL("ax.code.paramName"), width: 130, align: "center", editor: "text"},
                 {key: "data1", label: COL("ax.code.value1"), width: 70, align: "left", editor: "text"},
                 {key: "data2", label: COL("ax.code.value2"), width: 70, align: "left", editor: "text"},
                 {key: "data3", label: COL("ax.code.value3"), width: 70, align: "left", editor: "text"},
                 {key: "remark", label: COL("ax.code.remark"), width: 200, align: "left", editor: "text"},
                 {key: "useYn", label: COL("ax.code.useYn"),width:70, editor: "checkYn"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                }
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
                delete this.deleted;
                return this.paramId;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true, posUseYn: "N", useYn: "Y"}, "last");
    }
});