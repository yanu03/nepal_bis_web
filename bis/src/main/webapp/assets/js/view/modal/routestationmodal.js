var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    STATION_SEARCH: function (caller, act, data) {
    	console.log(caller.searchView.getData());
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtStations',
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    ROUTESTATION_SEARCH: function (caller, act, data) {
    	 axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutestations',
            data: caller.gridView01.routeId,
            callback: function (res) {
                caller.gridView01.setData(res);
                
            }
        });
        return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        
        if (list.length > 0) {
            if (parent && parent.axboot && parent.axboot.modal) {
            	 list = list[0];
                 list.routeId = parent.axboot.modal.getData().routeId;
                parent.axboot.modal.callback(list);
            }
        } else {
            alert(LANG("ax.script.requireselect"));
        }
    },
    PAGE_DEL: function (caller, act, data) {
        if (!confirm(LANG("ax.script.deleteconfirm"))) return;

        var list = caller.gridView01.getData("selected");
        list.forEach(function (n) {
            n.__deleted__ = true;
        });

        axboot.ajax({
            type: "PUT",
            url: "/api/v1/files",
            data: JSON.stringify(list),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.ROUTESTATION_SEARCH);
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
    },
    GRID_0_PAGING: function (caller, act, data) {
        caller.searchView.setPageNumber(data);
    }
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    
  //  console.log(parent.axboot.modal.getData());

    _this.pageButtonView.initView();
   /* _this.searchView.initView();
*/    _this.gridView01.initView();
    _this.gridView01.routeId = parent.axboot.modal.getData();
    $('[data-ax5select]').ax5select({
        columnKeys: {
            optionValue: "optionValue", optionText: "optionText"
        },
        options: [   
        	 {optionValue: "stationName", optionText: "STATION NAME"},
        	 {optionValue: "stationId", optionText: "STATION ID"}
        
        ]
    });
    ACTIONS.dispatch(ACTIONS.ROUTESTATION_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.ROUTESTATION_SEARCH);
            },
            "choice": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
            },
            "fn1": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DEL);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 *//*
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.ROUTESTATION_SEARCH);");
        this.Keyword = $("#Keyword");
        axboot.buttonClick(this, "data-searchview-btn", {
            "modal": function () {
                ACTIONS.dispatch(ACTIONS.ROUTESTATION_SEARCH);
            }
        });
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
            'Keyword': this.Keyword.val(),
            'Select' : $('[data-ax5select="select1"]').ax5select("getValue")[0].optionValue
        }
    }
});*/

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: false,
            
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "routeId", label: "ROUTE ID", width: 60, align: "center"},
                {key: "stationSequence", label: "STATION SEQUENCE", width:60, align: "center", editor: "text"},
                {key: "stationId", label: "STATION ID", width: 60, align: "center"},
                {key: "updownDir", label: "UPDOWN DIR", width: 60, align: "center"},
                {key: "sumDistance", label: "SUM DISTANCE", width: 60, align: "center"},
                {key: "remainDistance", label: "REMAIN DISTANCE", width: 60, align: "center"},
                {key: "statDistance", label: "STAT DISTANCE", width: 60, align: "center"},
                {key: "nextDistance", label: "NEXT DISTANCE", width: 60, align: "center"},
                {key: "statType", label: "STAT TYPE", width: 60, align: "center"},
                {key: "gpsX", label: "GPS X", width: 80, align: "center"},
                {key: "gpsY", label: "GPS Y", width: 80, align: "center"},
                {key: "linkSequence", label: "LINK SEQUENCE", width: 60, align: "center"},
                {key: "updateDate", label: "UPDATE DATE", width: 90, align: "center"},
                {key: "remark", label: "remark", width: 80, align: "center"},
                {key: "userId", label: "USER ID", width: 80, align: "center"},
                {key: "useYn", label: "USE YN", width: 60, align: "center", editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                   
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
          
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
    }
});