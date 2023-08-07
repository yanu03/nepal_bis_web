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
            url: "/api/v1/bisItScenarioforms/modal",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        list.push(parent.axboot.modal.getData());
        /*if(list.length==0){
        	alert(COL("ax.promotion.plzformselect"));
        	return;
        }*/
       
        if (list.length > 0) {
            if (parent && parent.axboot && parent.axboot.modal) {
            	for(var i=0;i<list.length-1;i++){
            		parent.axboot.modal.callback(list[i]);
            	}
            	
            }
        } else {
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg: LANG("ax.script.requireselect"),
        	});
        }
        /*if(list[1].scenarioData[1]=="0" && list[0].formType=="1"){

					        	axDialog.alert({
						theme : "primary",
						title : " ",
						msg : "Image only.",
					});
        	return;
        }else if(list[1].scenarioData[1]=="1" && list[0].formType=="0"){
        	axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Video only.",
        	});
        	return;
        }else{
        	if (list.length > 0) {
                if (parent && parent.axboot && parent.axboot.modal) {
                	parent.axboot.modal.callback(list[0]);
                }
            } else {
            	axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: LANG("ax.script.requireselect"),
            	});
            }
        }*/
       
        
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
    	var temp=data.fileName.split('.')[1].toLowerCase();
    	console.log("temp : "+temp);
        if(temp=="jpg" || temp=="gif" || temp=="png"){
        	 $('#videoSelect').css("display","none");
        	 $('#selectFile').attr("src","/resource/BisFile/"+data.fileName);
             $('#selectFile').css("display","");
        }
        if(temp=="mp4" || temp=="avi"){
        	$('#selectFile').css("display","none");
        	$('#videoSelect').attr('src',"/resource/BisFile/"+data.fileName);
        	$('#videoSelect').css("display","");
        }
       /* ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);*/
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
        this.searchData = $("#searchData");
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
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
            showLineNumber: false,
            frozenColumnIndex: 0,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "formId", label: COL("ax.promotion.formId"), width: 120, align: "center"},
            	{key: "formType", label: COL("ax.promotion.formType"), width: 120, align: "center", formatter: function () {
            		var detailCode = getDetailCode("FORM_TYPE",this.item.formType);
                    return detailCode;
                 }},
            	{key: "formName", label: COL("ax.promotion.formName"), width: 120, align: "center"},
                {key: "formEname", label: COL("ax.promotion.formEname"), width: 120, align: "center"},
                {key: "fileName", label: COL("ax.promotion.fileName"), width: 100, align: "center"},
                {key: "remark", label: COL("ax.promotion.remark"), width: 70, align: "center"},
                {key: "useYn", label: COL("ax.promotion.useYn"), width: 70, align: "center"}
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