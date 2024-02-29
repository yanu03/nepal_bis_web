var fnObj = {};
var selectedData = null;
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtBits',
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
    PAGE_SAVE: function (caller, act, data) {

    },
    ITEM_CLICK: function (caller, act, data) {
    	//selectedData = data;
    	let test = caller;
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtBits/sftpFileList',
            data: "bitId=" + data.bitId,
            //data: JSON.stringify(data),
            callback: function (res) {
            	caller.gridView02.setData(res);
            	//caller.treeView01.setData(searchData, res.list, data)
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });
    },
    CHILD_ITEM_CLICK : function (caller, act, data) {
    	//$("#previewImg").attr("src", data.src);
    	$("#previewImg").attr("src", "/images/" + data.bitId + "/"+ data.fileName);
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
    },
    BIT_CAPTURE: function (caller, act, data) {
    	var selectedData=caller.gridView01.target.getList("selected");	//rightGridSelectData
    	if(selectedData.length==0){
    		axDialog.alert({
                theme: "primary",
                title:" ",
                msg: "Please select from the left."
        	})
        	
    	}
    	else{
        	var sendList=[];
    		var senddata ={};
    		senddata.deviceId=selectedData[0].bitId;
    		senddata.deviceType=3;
    		senddata.code="152";
    		sendList.push(senddata);
    		
            axboot.ajax({
                type: "POST",
                url: '/communication/control',
                //url: 'comm.nepalbis.com:8385/bis/control',
                data: JSON.stringify(sendList),
                callback: function (res) {
    	        	 if(res.ret_code == "1") {
    	         		axDialog.alert({
    	                    theme: "primary",
    	                    title:" ",
    	                    msg: "Capture request success."
    	            	}) 
    	        	 }//정상
    	        	 else {
    	         		axDialog.alert({
    	                    theme: "primary",
    	                    title:" ",
    	                    msg: "Error occurred during capture."
    	            	}) 
    	        		 
    	        	 } //오류	 
            		          	
                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                    }
                }
            });    	    		
    	}
    	

    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.gridView02.initView();

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
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "excel": function () {

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
        this.filter = $("#filter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = $(document["formView01"]);
   
        this.target = axboot.gridBuilder({
      
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "bitId", label: COL("bit.bitid"), width: 90, align: "center"},
            	{key: "bitType", label: COL("bit.bittype"), width: 145, align: "center",formatter: function () {
            		var detailCode = getDetailCode("BIT_TYPE",this.item.bitType);
                return detailCode;
                }},
            	{key: "bitName", label:COL("bit.bitname"), width: 150, align: "center"},
            	{key: "bitEname", label: COL("bit.bitename"), width: 150, align: "center"},
            ],
         
            body: {
                onClick: function () {
                    this.self.select(this.dindex);

                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            },
            excel:function(n){
            	this.target.exportExcel(n);
            }
        });
        axboot.buttonClick(this, "data-form-view-01-btn", {
            "bit-capture": function () {
                ACTIONS.dispatch(ACTIONS.BIT_CAPTURE);
            }
        });        
   
    },
    getData: function (_type) {
    	
        return this.target.getData();
       
    },
    excel:function(n){
    	this.target.exportExcel(n);
    }
});

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        //this.target = $(document["formView01"]);
   
        this.target = axboot.gridBuilder({
      
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "lastModified", label: COLA("promotion.updateDateTime"), width: 300, align: "center"},
            	{key: "fileName", label:COLA("promotion.fileName"), width: 200, align: "center"},
            ],
         
            body: {
                onClick: function () {
                    this.self.select(this.dindex);

                    ACTIONS.dispatch(ACTIONS.CHILD_ITEM_CLICK, this.list[this.dindex]);
                }
            },
            excel:function(n){
            	this.target.exportExcel(n);
            }
        });
    },
    getData: function (_type) {
    	
        return this.target.getData();
       
    },
    excel:function(n){
    	this.target.exportExcel(n);
    }
});


function preview_Image(id){
	var path;
	path = "/assets/images/ImageDefault.jpg";//default path
	document.getElementById(id).src=path;
}