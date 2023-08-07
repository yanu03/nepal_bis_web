var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/bisItBitscenarios/bitModalList",
            data: caller.searchView.getData(),
            callback: function (res) {
            	/*
            	var sc=parent.axboot.modal.getData();
            	res.scenarioId=sc;
            	var temp=sc.scenarioData.substring(0,2);
            	console.log("scenarioId : "+sc.scenarioData.substring(0,2));	
            	for(var i=0; i<res.length; i++){
            		if(temp=="SB" && (res[i].imageCount>=1)){ //sb니까 img카운트만 새면됨
            			console.log("이미지");
            			res.splice(i,1);
            			i=i-1;
            		}
            		
            		if(temp=="SC" && (res[i].videoCount>=1)){
            			console.log("비디오");
            			res.splice(i,1);
            			i=i-1;
            		}
            	}
            	if(res.length==0){
            		axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: "There is no selectable BIT.",
                        onStateChanged:function(){
                        	if(this.state=="close"){
                        		parent.axboot.modal.close();
                        	}
                        	
                        }
                    });
            		
            	}*/
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        
        if(list.length==0){
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg: COL("ax.promotion.plzscenarioselect")
        	})
        }else{
        	var items=parent.axboot.modal.getData();
        	 list.forEach(function (n) {
                 n.scenarioId = items.scenarioData[0];
                 n.scenarioName = items.scenarioData[1];
             });
	        
	        if (list.length > 0) {
	        	for(var i=0; i<list.length; i++){
	        		if (parent && parent.axboot && parent.axboot.modal) {
		            	parent.axboot.modal.callback(list[i]);
		            }	
	        	}
	            
	        } else {
	        	axDialog.alert({
	                theme: "primary",
	                title:" ",
	                msg: LANG("ax.script.requireselect")
	        	})
	        }
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
        /*ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);*/
    },
    GRID_0_PAGING: function (caller, act, data) {
        caller.searchView.setPageNumber(data);
    }
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    _this.pageButtonView.initView();
    _this.searchView.initView();
    _this.gridView01.initView();

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
        this.useYn=$("#useYn");
        this.searchDiv=$("#searchDiv");
        this.searchData=$("#searchData");
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
            useYn: this.useYn.val(),
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
            showLineNumber: false,
            showRowSelector: false,
            frozenColumnIndex: 0,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	 {key: "bitId", label: COL("ax.promotion.bitId"), width: 90, align: "center"},
              	{key: "bitName", label:COL("ax.promotion.bitName"), width: 90, align: "center"},
              	{key: "bitEname", label: COL("ax.promotion.bitEName"), width: 90, align: "center"},
              	//{key: "terminalVersion", label: COL("ax.promotion.terminalVersion"), width: 130, align: "center"},
              	//{key: "ipAddress", label: COL("ax.promotion.ipAddress"), width: 90, align: "center"},
              	//{key: "cameraIpAddress", label: COL("ax.promotion.cameraIpAddress"), width: 130, align: "center"},
              	{key: "installDate", label: COL("ax.promotion.installDate"), width: 100, align: "center"},
              	//{key: "countryCode", label: COL("ax.promotion.countryCode"), width: 105, align: "center"},
              	//{key: "areaCode", label: COL("ax.promotion.areaCode"), width: 90, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
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