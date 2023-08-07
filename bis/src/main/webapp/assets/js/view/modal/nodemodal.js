var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    STATION_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.useYn="Y"
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtNodes',
            data: data,
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    NODE_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.useYn="Y"
    	 axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtNodes',
            data: data,
            callback: function (res) {
                caller.gridView01.setData(res);
                
            }
        });
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
   _this.searchView.initView();
   _this.gridView01.initView();
    _this.gridView01.routeId = parent.axboot.modal.getData();
    ACTIONS.dispatch(ACTIONS.NODE_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.NODE_SEARCH);
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
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        
        this.Keyword = $("#Keyword");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(),this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        
        
    }, getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
    	  var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
          var Keyword=this.Keyword.val();
          data.Keyword=Keyword;
    	  return $.extend({}, data);
       
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
                {key: "nodeId", label: "NODE ID", width: 60, align: "center"},
                {key: "nodeType", label: "NODE TYPE", width:60, align: "center", editor: "text"},
                {key: "nodeName", label: "NODE NAME", width: 60, align: "center"},
                {key: "nodeEname", label: "NODE ENAME", width: 60, align: "center"},
                {key: "turnRestType", label: "TURN REST TYPE", width: 60, align: "center"},
                {key: "gpsX", label: "GPS X", width: 60, align: "center"},
                {key: "gpsY", label: "GPS Y", width: 60, align: "center"},
                {key: "tmX", label: "TM X", width: 60, align: "center"},
                {key: "tmY", label: "TM Y", width: 60, align: "center"},
                {key: "entryRecogRads", label: "ENTRY RECOG RADS", width: 60, align: "center"},
                {key: "advncRecogRads", label: "ADVNC RECOG RADS", width: 60, align: "center"},
                {key: "countryCode", label: "COUNTRY CODE", width: 105, align: "center"},
                {key: "areaCode", label: "AREA CODE", width: 80, align: "center"},
                {key: "updateDate", label: "UPDATE DATE", width: 90, align: "center"},
                {key: "userId", label: "USER ID", width: 80, align: "center"}
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
function searchbutton(){
	 ACTIONS.dispatch(ACTIONS.STATION_SEARCH);
	
}