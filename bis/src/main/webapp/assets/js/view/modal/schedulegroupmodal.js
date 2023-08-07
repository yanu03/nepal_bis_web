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
            url: '/api/v1/bisItSystemschedulegroups',
            data: caller.searchView.getData(),
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
        return false;
    },    
    GRID_CLICK: function (caller, act, data) {
},
    PAGE_SEARCH: function (caller, act, data) {
    	  var getdata= parent.axboot.modal.getData();
    	  data = caller.searchView.getData();
    	 axboot.ajax({
             type: "GET",
             url: "/api/v1/bisItSystemschedulegroups",
             data: data,
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
         return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
    	
            var list = caller.gridView01.getData("selected");
            if (list.length > 0) {
            	
                if (parent && parent.axboot && parent.axboot.modal) {
                	  
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
    
    $('[data-ax5select="select1"]').ax5select({
        columnKeys: {
            optionValue: "optionValue", optionText: "optionText"
        },
        options: [
             {optionValue: "scheduleGroupId", optionText: COL("bis.systemschedulegroup.schedulegroupid")}
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
            "useYn" :"Y"
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
            	  {key: "scheduleGroupId", label: COL("bis.systemschedulegroup.schedulegroupid"), width: 150, align: "center"},
                  {key: "scheduleCode", label: COL("bis.systemschedule.schedulecode"), width: 120, align: "center", formatter: function () {
            		var detailCode = getDetailCode("SCHEDULE_CODE",this.item.scheduleCode);
                    return detailCode;
                 }},
                 /* , formatter: function () {
              		var detailCode = getDetailCode("SCHEDULE_CODE",this.item.scheduleCode);
                      return detailCode;
                   }},*/
                  {key: "updateDate", label:COL("bis.updatedate"), width: 90, align: "center"},
                  {key: "remark", label:COL("bis.remark"), width: 80, align: "center"},
                  {key: "userId", label: COL("bis.userid"), width: 120, align: "center"}
            	],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.GRID_CLICK, this.list[this.dindex]);
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




$(function() {
	  $( "#datepicker1" ).datepicker({
	    dateFormat: 'yymmdd'
	  });
	  $("#datepickerbutton1").on("click", function(e){
        $('#datepicker1').datepicker('show');
    });
	  
	});

        