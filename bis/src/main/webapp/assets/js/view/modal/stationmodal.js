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
            url: '/api/v1/bisMtStations',
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
            url: '/api/v1/bisMtStations',
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
            	/* if(parent.axboot.modal.getData().routeId != null)
            		 {
            		 	list.routeId = parent.axboot.modal.getData().routeId;
            		 }*/
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
        	 
        	{optionValue: "stationName", optionText:COL("bis.station.stationname") },
        	 {optionValue: "stationId", optionText: COL("bis.station.stationid")}
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
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
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
            	{key: "stationId", label: COL("bis.station.stationid"), width: 100, align: "center"},
                {key: "stationName", label: COL("bis.station.stationname"), width: 150, align: "center"},
                {key: "stationEname", label:COL("bis.station.stationename"), width: 150, align: "center"},
                {key: "stationType", label: COL("bis.station.stationtype"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("STATION_TYPE",this.item.stationType);
                    return detailCode;
                    }},
                {key: "nodeId", label: COL("bis.node.nodeid"), width: 100, align: "center"},
                {key: "displayName", label: COL("bis.station.displayname"), width: 100, align: "center"},
                {key: "displayEname", label: COL("bis.station.displayename"), width: 100, align: "center"},
                {key: "gpsX", label:COL("bis.station.gpsx"), width: 100, align: "center"},
                {key: "gpsY", label:COL("bis.station.gpsx"), width: 100, align: "center"},
                {key: "tmX", label: COL("bis.station.tmx"), width: 100, align: "center"},
                {key: "tmY", label:COL("bis.station.tmy"), width: 100, align: "center"},
                {key: "centerYn", label: COL("bis.station.centeryn"), width: 100, align: "center",formatter: function () {
            		var detailCode = getDetailCode("CENTER_YN",this.item.centerYn);
                    return detailCode;
                    }},
                {key: "mobileNo", label: COL("bis.station.mobileno"), width: 100, align: "center"},
                {key: "representationYn", label: COL("bis.station.representationyn"), width: 170, align: "center"},
                {key: "countryCode", label: COL("bis.countrycode"), width: 105, align: "center",formatter: function () {
            		var detailCode = getDetailCode("COUNTRY_CODE",this.item.countryCode);
                    return detailCode;
                    }},
                    {key: "areaCode", label:  COL("bis.areacode"), width: 80, align: "center",formatter: function () {
                		var areaCode =  getAreaCode("",this.item.areaCode);
                        return areaCode;
                        }},
                {key: "updateDate", label: COL("bis.updatedate"), width: 90, align: "center"},
                {key: "userId", label:COL("bis.userid"), width: 100, align: "center"}
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