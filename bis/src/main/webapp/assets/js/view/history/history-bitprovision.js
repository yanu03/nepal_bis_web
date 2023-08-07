var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	var rightItem=caller.gridView01.target.getList("selected");	//rightGridSelectData
    	if(rightItem.length==0){
    		axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Please select from the left."
        	})
        	
    	}else{
    		var sendData=caller.searchView2.getData();	//startDate,endDate
        	var division=caller.searchView.getData();	//searchData
        	rightItem.push(sendData);
        	rightItem.push(division);
        	
        	/*rightItem.forEach(function(n){
        		n.startDate=sendData.startDate;
        		n.endDate=sendData.endDate;
        		n.Select=division.Select;
        	});*/
        	//sendData.itemList=rightItem;
        	//sendData.Select=division.Select;
        	axboot.ajax({
                type: "PUT",
                url: "/api/v1/bisMaHistory/serviceBit",
                data: JSON.stringify(rightItem),
                callback: function (res) {
                    caller.gridView02.setData(res);
                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                    }
                }
            });

    	}
    	
    },
    
    RIGHT_PAGE_SEARCH: function (caller, act, data) {
    	defaultDateSetting();
    	var temp=caller.searchView.getData();
    	var sendUrl="";
    	this.gridView01.initView();	//컬럼명을 세팅
    	this.gridView02.initView();
	    sendUrl="/api/v1/bisMtBits";
	   	 axboot.ajax({
	               type: "GET",
	               url: sendUrl,
	               data: temp,
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
    this.searchView2.initView();
    this.gridView01.initView();
    this.gridView02.initView();

    ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
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
       /* this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);");*/
		this.keyword=$("#Keyword");
		this.select=$("#Select");
		this.useYn='Y';
    },
    getData: function () {
    	return {
			Keyword:this.keyword.val(),
			Select:this.select.val(),
			useYn: 'Y',
		}
    }
});

fnObj.searchView2 = axboot.viewExtend(axboot.searchView, {
	initView: function () {
		/*this.target = $(document["searchView1"]);
		this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");*/
		this.startDate=$("#startDate");
		this.endDate=$("#endDate");
	},
	getData: function () {
		return {
			startDate:this.startDate.val(),
			endDate:this.endDate.val()
		}
	}
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
    	var temp=fnObj.searchView.getData();
    	var swapColumns= [
    			{key: "bitId", label: PRO("ax.promotion.bitId"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
    			{key: "bitName", label: PRO("ax.promotion.bitName"), width: 100, align: "center", editor: {type: "text", disabled: "notCreated"}},
	            {key: "bitType", label: PRO("ax.promotion.bitType"), width: 150, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
            		var detailCode = getDetailCode("BIT_TYPE",this.item.bitType);
                    return detailCode;
                   }},
	        ]
    
        var _this = this;
        this.target = axboot.gridBuilder({
        	showLineNumber: false,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: swapColumns,
            body: {
                /*onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                }*/
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

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
    	var temp=fnObj.searchView.getData();
    	var swapColumns=[
			{key: "bitId", label: COL("ax.history.bitId"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
			{key: "bitName", label: COL("ax.history.bitName"), width: 100, align: "center", editor: {type: "text", disabled: "notCreated"}},
			//{key: "vehicleId", label: COL("ax.history.vehicleId"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}},
            {key: "vehicleName", label: COL("ax.history.plateNumber"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}},
            {key: "systemDate", label: COL("ax.history.systemDate"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}},
            {key: "routeId", label: COL("ax.history.routeId"), width: 90, align: "center", editor: {type: "text", disabled: "notCreated"}},
            {key: "routeName", label: COL("ax.history.routeName"), width: 200, align: "center", editor: {type: "text", disabled: "notCreated"}},
            {key: "routeType", label: COL("ax.history.routeType"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
           		var detailCode = getDetailCode("ROUTE_TYPE",this.item.routeType);
                return detailCode;
            }},
            {key: "busType", label: COL("ax.history.busType"), width: 120, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
           		var detailCode = getDetailCode("BUS_TYPE",this.item.busType);
                return detailCode;
            }},
            {key: "arriveType", label: COL("ax.history.arriveType"), width: 130, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
           		var detailCode = getDetailCode("ARRIVE_TYPE",this.item.arriveType);
                return detailCode;
            }},
            {key: "runCode", label: COL("ax.history.runCode"), width: 200, align: "center", editor: {type: "text", disabled: "notCreated"}, formatter: function () {
           		var detailCode = getDetailCode("RUN_CODE",this.item.runCode);
                return detailCode;
            }},
            {key: "locationNo", label: COL("ax.history.locationNo"), width: 90, align: "center", editor: {type: "text", disabled: "notCreated"}}
        ]
 
        var _this = this;
        this.target = axboot.gridBuilder({
        	showLineNumber:false,
            showRowSelector: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: swapColumns,
            body: {
                /*onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                }*/
            }
        });

        /*axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });*/
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
    },
    excel:function(n){
    	this.target.exportExcel(n);
    }
});

$('#excelExport').click(function(){
	var excelExport=fnObj.gridView02;
	excelExport.excel("FileTransferHistory.xls");
});

$(document).on("click","#rightSearchButton",function(){
	 ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
});

$(document).ready(function(){
	console.log("ready");
	$('#Keyword').keypress(function(e){
	    if(e.keyCode==13){
	    	ACTIONS.dispatch(ACTIONS.RIGHT_PAGE_SEARCH);
	    }
	  });
});