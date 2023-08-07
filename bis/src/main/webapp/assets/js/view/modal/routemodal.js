var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    STATION_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutes',
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_SEARCH: function (caller, act, data) {
    	 axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutes',
            data: caller.searchView.getData(),
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
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
    _this.searchView.initView();
    _this.gridView01.initView();
    $('[data-ax5select]').ax5select({
        columnKeys: {
            optionValue: "optionValue", optionText: "optionText"
        },
        options: [   
        	 {optionValue: "routeName", optionText: COL("bis.route.routename")},
        	 {optionValue: "routeId", optionText: COL("bis.route.routeid")}
        
        ]
    });
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "modal": function () {
            	  ACTIONS.dispatch(ACTIONS.STATION_SEARCH);
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
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.STATION_SEARCH);");
        this.Keyword = $("#Keyword");
      
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
            'Keyword': this.Keyword.val(),
            'Select' : $('[data-ax5select="select1"]').ax5select("getValue")[0].optionValue,
            'useYn':"Y"
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
            showLineNumber: false,
            
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "routeId", label:  COL("bis.route.routeid"), width: 60, align: "center"},
                {key: "routeType", label: COL("bis.route.routetype"), width:60, align: "center",formatter: function () {
            		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                    return detailCode;
                    }},
                {key: "routeName", label: COL("bis.route.routename"), width: 200, align: "center"},
                {key: "routeEname", label: COL("bis.route.routeename"), width: 200, align: "center"},
                {key: "fromStationId", label: COL("bis.route.fromstationid"), width: 80, align: "center"},
                {key: "toStationId", label: COL("bis.route.tostationid"), width: 80, align: "center"},
                {key: "turnStationId", label:COL("bis.route.turnstationid"), width: 80, align: "center"},
                {key: "permissionCount", label:COL("bis.route.permissioncount"), width: 80, align: "center"},
                {key: "beginDate", label:COL("bis.route.begindate"), width: 80, align: "center"},
                {key: "closeDate", label: COL("bis.route.closedate"), width: 80, align: "center"},
                {key: "routeEx", label: COL("bis.route.routeex"), width: 80, align: "center"},
                {key: "routeDistance", label: COL("bis.route.routedistance"), width: 80, align: "center"},
                {key: "countryCode", label: COL("bis.countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
                {key: "areaCode", label: "AREA CODE", width: 80, align: "center",formatter: function () {
            		var areaCode =  getAreaCode("",this.item.areaCode);
                    return areaCode;
                    }},
                {key: "requestTime", label: COL("bis.route.requesttime"), width: 80, align: "center"},
                {key: "charge", label:COL("bis.route.charge"), width: 80, align: "center"},
                {key: "runType", label: COL("bis.route.runtype"), width: 80, align: "center",formatter: function () {
            		var detailCode = getDetailCode("RUN_TYPE",this.item.runType);
                    return detailCode;
                    }},
                {key: "updateDate", label:COL("bis.updatedate"), width: 80, align: "center"},
                {key: "remark", label:COL("bis.remark"), width: 80, align: "center"},
                {key: "userId", label: COL("bis.userid"), width: 120, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                   
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
    }
});