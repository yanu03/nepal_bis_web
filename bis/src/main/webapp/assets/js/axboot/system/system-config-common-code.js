var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            //url: ["commonCodes"],
            url: "/api/v1/bisCtCommonCodes/parent",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        var saveList = [].concat(caller.gridView01.getData("modified"));
        saveList = saveList.concat(caller.gridView01.getData("deleted"));

        axboot.ajax({
            type: "PUT",
            url: "/api/v1/bisCtCommonCodes/parent",
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push(LANG("onsave"));
            }
        });
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
       

        axDialog.confirm({
            msg: COLA("script.deleteconfirm")
        }, function () {
            if (this.key == "ok") {
            	 var delList = caller.gridView01.getData("selected");
            	 
                // 모든 선택된 항목에 대해 확인
                delList.forEach(function(item, index) {
                    axboot.ajax({
                        type: "GET",
                        url: "/api/v1/bisCtCommonCodes/child",
                        data: { Keyword: item.commonCode },
                        callback: function (res) {
                            // 하위 코드가 없는 경우
                            if (res.length === 0) {
                                // 행 삭제
                                caller.gridView01.delRow("selected");
                                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
                            } else {
                                // 하위 코드가 있는 경우 경고 메시지 출력
                                axDialog.alert({
                                    theme: "primary",
                                    title:" ",
                                    msg: COL("error.commoncode")
                                 });
                            }
                        }
                    });
                });               
            }
        });        
        

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
/*            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()*/
        	useYn:this.useYn.val(),
        	searchDiv: this.searchDiv.val(),
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
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	//기존 common_code_m
                /*{key: "groupCd", label: COLA("admin.commoncode.group.code"), width: 250, align: "center", editor: {type: "text", disabled: "notCreated"}},
                {key: "groupNm", label: COLA("admin.commoncode.group.name"), width: 200, align: "center", editor: "text"},
                {key: "code", label: COL("code.detail.code"), width: 100, align: "center", editor: {type: "text", disabled: "notCreated"}},
                {key: "name", label: COLA("admin.commoncode.name"), width: 150, align: "left", editor: "text"},
                {key: "sort", label: COLA("admin.sort"), editor: "number"},
                {key: "useYn", label: COL("useyn"), editor: "checkYn"},
                {key: "remark", label: COL("remark"), width: 200, align: "left", editor: "text"},
                {key: "data1", label: COLA("admin.commoncode.data1"), width: 70, align: "left", editor: "text"},
                {key: "data2", label: COLA("admin.commoncode.data2"), width: 70, align: "left", editor: "text"},
                {key: "data3", label: COLA("admin.commoncode.data3"), width: 70, align: "left", editor: "text"},
                {key: "data4", label: COLA("admin.commoncode.data4"), width: 70, align: "left", editor: "text"}*/
                
                
            	{key: "commonCode", label: COLA("code.group.Code"), width: 250, align: "center",  editor: {type: "text", disabled: "notCreated"}},
                {key: "commonCodeName", label:COLA("code.group.CodeName"), width: 200, align: "center", editor: "text"},
                {key: "useYn", label: COLA("code.useYn"), editor: "checkYn"},
                {key: "value1", label: COLA("admin.commoncode.data1"), width: 200, align: "left", editor: "text"},
                {key: "value2", label: COLA("admin.commoncode.data2"), width: 200, align: "left", editor: "text"},
                {key: "value3", label: COLA("admin.commoncode.data3"), width: 200, align: "left", editor: "text"},
                {key: "remark", label: COL("remark"), width: 200, align: "left", editor: "text"},
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
                return this.commonCode
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