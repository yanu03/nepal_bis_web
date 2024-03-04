var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	caller.gridView01.initView();
        axboot.ajax({
            type: "GET",
            url: "/api/v2/userhistory/parent",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
    	
    },
    ITEM_ADD: function (caller, act, data) {
    	
    },
    ITEM_DEL: function (caller, act, data) {
    	
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	defaultDateSetting();
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
        this.startDate=$("#startDate");
		this.endDate=$("#endDate");
        this.filter = $("#filter");
        this.keyword=$("#Keyword");
		this.select=$("#Select");
		this.useYn='Y';
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val(),
			startDate:this.startDate.val(),
			endDate:this.endDate.val(),
			Keyword:this.keyword.val(),
			Select:this.select.val()
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
            showLineNumber: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "userCode", label: COLA("admin.user.id"), width: 300, align: "left"},
                {key: "userName", label: COLA("admin.user.name"), width: 350, align: "left"},
                {key: "collectDate", label: COLA("history.collectDate"), width: 120, align: "center"},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                }
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.progNm && this.progPh;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true, useYn: "N", authCheck: "N"}, "last");
    }
});

$(document).ready(function(){
	console.log("ready");
	$('#Keyword').keypress(function(e){
	    if(e.keyCode==13){
	    	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	    }
	  });
});