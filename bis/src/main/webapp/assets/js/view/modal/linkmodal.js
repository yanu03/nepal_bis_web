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
            url: '/api/v1/bisMtLinks',
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
            url: '/api/v1/bisMtLinks',
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
               //  list.routeId = parent.axboot.modal.getData().routeId;
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
        	 
        	 {optionValue: "linkName", optionText:COL("bis.link.linkname") },
        	 {optionValue: "linkId", optionText: COL("bis.link.linkid")}
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
            	{key: "linkId", label: COL("bis.link.linkid"), width: 100, align: "center"},
                {key: "linkType", label: COL("bis.link.linktype"), width: 150, align: "center",formatter: function () {
            		var detailCode = getDetailCode("LINK_TYPE",this.item.linkType);
                    return detailCode;
                    }},
                {key: "linkName", label:COL("bis.link.linkname"), width: 150, align: "center"},
                {key: "linkEname", label: COL("bis.link.linkename"), width: 100, align: "center"},
                {key: "fromNodeId", label: COL("bis.link.fromnodeid"), width: 100, align: "center"},
                {key: "toNodeId", label: COL("bis.link.tonodeid"), width: 100, align: "center"},
                {key: "linkNumber", label: COL("bis.link.linknumber"), width: 100, align: "center"},
                {key: "linkDistance", label:COL("bis.link.linkdistance"), width: 100, align: "center"},
                {key: "laneCount", label:COL("bis.link.lanecount"), width: 100, align: "center"},
                {key: "linkGrade", label: COL("bis.link.linkgrade"), width: 100, align: "center"},
                {key: "multiYn", label:COL("bis.link.multiyn"), width: 100, align: "center"},
                {key: "connectCode", label: COL("bis.link.connectcode"), width: 100, align: "center"},
                {key: "maxRestSpeed", label:COL("bis.link.maxrestspped"), width: 100, align: "center"},
                {key: "restVehcle", label: COL("bis.link.restvehicle"), width: 100, align: "center"},
                {key: "restWeight", label:COL("bis.link.restweight"), width: 100, align: "center"},
                {key: "restHeight", label: COL("bis.link.resthegiht"), width: 100, align: "center"},
                {key: "entryAngle", label:COL("bis.link.entryangle"), width: 100, align: "center"},
                {key: "advanceAngle", label: COL("bis.link.advanceangle"), width: 100, align: "center"},

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