var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: ["samples", "parent"],
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
    ROUTEMAP: function (caller, act, data) {
    	data.key="bisKey";
    	data.useYn="Y";

    	if(!($("#"+data.routeId).length))
		{
			 var str=" <div id='"+data.routeId+"' style='border:1px solid #b5b5b5'>";
		     str+= " </div>";
		     $("#route").append(str);
		}
    	
    	
    	
    	  routeMap(data);
    
    	
    	/* 	
   		axboot.ajax({
            type: "GET",
           //url: '/openAPI/routeLine',
            url: COL("bis.apiserverip")+'routeLine',
          //async: false,
            dataType:"json",
            data:data,
            callback: function (res) {
            	res = res.Information;
            	if(0 < res.length)
            		{
	                    routeMap(res,data);
            		}else
            		{
            			alert("등록된 정류장이 없습니다");
            		}
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                    axDialog.alert({
                        theme: "primary",
                        title:" ",
                        msg: "not responding."
                    });			
                }
            }
        });*/
    },
    ROUTE_SEARCH: function (caller, act, data) {
    	data = caller.searchView.getData();
    	data.Select = "routeName";
    	data.useYn="Y";
        axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtRoutes',
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
    GRID_SELECT_FLASE: function (caller, act, data) {
    	caller.gridView01.target.select(data, {selectedClear: false});
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
    this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
           
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
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);");
        this.filter = $("#Keyword");
        axboot.buttonClick(this, "data-searchview-btn", { 
        	"search": function () {
            ACTIONS.dispatch(ACTIONS.ROUTE_SEARCH);
        }
        });
    },
    getData: function () {
        return {
           
            Keyword: this.filter.val()
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
        	  multipleSelect: true,
        	  showRowSelector: true,
        	  frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "routeId", label: COL("route.routeid"), width: 120, align: "center"},
                {key: "routeName", label: COL("route.routename"), width: 150, align: "center"}
            ],
            body: {
                onClick: function () {
                	
                    this.self.select(this.dindex, {selectedClear: false});
                  data = this.list[this.dindex];
                  data.dindex=this.dindex;
                  if(data.__selected__==true)
                	  {
                	  		ACTIONS.dispatch(ACTIONS.ROUTEMAP,data);
                	  }
                  else
            		  {
                	  $("#"+ data.routeId).remove();
            		  }
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
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);
/*
        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }*/
        
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});
var divtimecheck=[];
var divcheck=[];
function routeMap(data)
{
	var url=COL("apiserverip")+'routeLine';
	ajaxCall(function(result,res){
		if(result){
			res = res.Information;
        	if(0 < res.length)
        		{
        	    if($("#"+res[0].routeId).length)
        	    	{
        	    		var length = res.length;
        	    		var str="";
        	        	str+= "<div style='height:20px;background-color:#e3e3e3;'>";
        	    	    str+= "<div style='float:right;'> <a href='javascript:void(0);' onclick='routeClose(\""+ data.routeId+"\","+data.dindex+")'><img src='/assets/images/map/close.gif'> </a></div>";
        	    	    str+= "<div id=time"+data.routeId+" style='float:right;'>refreshTime:30</div>";
        	    	    str+= "<div> "+COL("route.routename")+" : "+data.routeName+"</div>";
        	    	    
        	    	    str+= "</div>";
        	    	    str+=" <div style='height:240px;overflow:auto;overflow-y:hiden;'>";
        	    	    str+=" <ol class='rt-line' style='position: relative;width:"+(90*length+60)+"px;'>";

        	    	    for(var i = 0; i < length;i++)
        	    	    	{
        	    	    		var img="/assets/images/map/icon_bus_up.png";
        	    	    		if(res[i].updownDir == 1)
        	    	    			{
        	    	    			img="/assets/images/map/icon_bus_down.png";
        	    	    			}
        	    	    		if(i == 0)
        	    				{
        	    	    			img = "/assets/images/map/icon_bus_start.png"
        	    				}
        	    	    		else if(i == length-1)
        	    				{
        	    	    			img = "/assets/images/map/icon_bus_end.png"
        	    				}
        	    	            str+=" <li class='line-up' >";
        	    	            str+="<a class='busstopStart' href='javascript:void(0);' onclick=''><img src='"+img+"' alt='기점'></a>";
        	    	            str+="<span class='busstop-name' title='"+res[i].stationName+"'>"+res[i].stationName+"</span>";
        	    	            str+="<span class='busstop-stno' title='"+(i+1)+"'>"+(i+1)+"</span>";
        	    	           
        	    	                	if(res[i].updownDir == 0)
        	    	        			{
        	    	                		 if(res[i].vehicleId!=null)
        	        	    	            	{
        	    	                			 	str+="<span class='busicon' id='"+data.routeId+(i+1)+"'><img src='/assets/images/map/icon_bus_vehicle_42_blue.png' ></span>";
        	        	    	            	}else
    	        	    	            		{
        	        	    	            		str+="<span class='busicon' id='"+data.routeId+(i+1)+"' style='display:none;'><img src='/assets/images/map/icon_bus_vehicle_42_blue.png' ></span>";
    	        	    	            		}
        	        	    	           }
        	    	                	else
        	    	            		{
        	    	                		if(res[i].vehicleId!=null)
    	        	    	            	{
        	    	                			str+="<span class='busicon' id='"+data.routeId+(i+1)+"'><img src='/assets/images/map/icon_bus_vehicle_42_red.png' ></span>";        	    	            		
    	        	    	            	}
        	    	                		else
        	    	                		{
        	    	                			str+="<span class='busicon' id='"+data.routeId+(i+1)+"'  style='display:none;'><img src='/assets/images/map/icon_bus_vehicle_42_red.png' ></span>";
        	    	                		}
    	    	                		}
        	    	            	
        	    	            if(i != length-1)
        	    	            	{
        	    	            		str+="<span class='traffic-ok' onmouseover='displaySpe('spe1')' onmouseout='undisplSpe('spe1')'></span>";
        	    	            	}
        	    	            
        	    	            str+= "</li>";   
        	    	    	}
        	    	    str+= "</ol>";
        	    	    str+= " </div>";
        	    	    $("#"+res[0].routeId).html(str);

        	    	    var divid="#time"+data.routeId;
        	    	    for(var j = 0;j < divtimecheck.length;j++)
        				{
        					if(divtimecheck[j].divid==divid)
    						{
    							clearTimeout(divtimecheck[j].timeout);
    							divtimecheck.splice(j,1);
    							break;
    						}
        				}
        	  for(var j = 0;j < divcheck.length;j++)
        				{
        					if(divcheck[j].divid==divid)
        						{
        							clearTimeout(divcheck[j].timeout);
        							divcheck.splice(j,1);
        							break;
        						}
        				}
		        	  var d = new Date();
		        	  var time = d.getSeconds();
		        	  if(29 < time )
	        		  {
	        		  time = time - 30;
	        		  }
		        	  time = time - 30;
		        	  
		        	  time = Math.abs(time);
		        	  
        	    	routeTime(divid,time);
        	    	
        	    	var timeout = setTimeout(function(){routeBus(data,length);},time*1000);
        	    	var check={"divid":divid,"timeout":timeout};
        			divcheck.push(check);
        	    	}
        		}else
        		{
        			routeClose(data.routeId,data.dindex);
        			alert("There are no registered stations");
        		}
			}
		else{
    			console.log(err);
                axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "not responding."
                });		
    		}
	},url,data);
	
	
    
}
function routeBus(data,slength)
{
	var url=COL("apiserverip")+'busLocation';
	ajaxCall(function(result,res){
		if(result){
			res = res.Information;
        	
        	    if($("#"+data.routeId).length)
        	    	{
        	    	  var divid="#time"+data.routeId;
        	    		var length = res.length;
        	    		 for(var i = 0; i < slength;i++)
     	    	    	{
     	    	    		$("#"+data.routeId+i).attr("style","display:none");
     	    	    	}
        	    		if(0 < res.length)
                		{
	        	    	    for(var i = 0; i < length;i++)
        	    	    	{
    	    	    			if(res[i].busId!=null)
    	    	            	{
	                			 $("#"+data.routeId+res[i].stationSeq).attr("style","");
    	    	            	}
        	    	    	}
	
	        	    	    for(var j = 0;j < divtimecheck.length;j++)
	        				{
	        					if(divtimecheck[j].divid==divid)
	    						{
	    							clearTimeout(divtimecheck[j].timeout);
	    							divtimecheck.splice(j,1);
	    							break;
	    						}
	        				}
	        	    	    for(var j = 0;j < divcheck.length;j++)
	        				{
	        					if(divcheck[j].divid==divid)
	        						{
	        							clearTimeout(divcheck[j].timeout);
	        							divcheck.splice(j,1);
	        							break;
	        						}
	        				}
                		}
		        	  var d = new Date();
		        	  var time =d.getSeconds();
		        	  if(29 < time )
	        		  {
	        		  time = time - 30;
	        		  }
		        	  time = time - 30;
		        	  
		        	  time = Math.abs(time);
		        	  
        	    	routeTime(divid,time);
        	    	
        	    	var timeout = setTimeout(function(){routeBus(data,slength);},time*1000);
        	    	var check={"divid":divid,"timeout":timeout};
        			divcheck.push(check);
        	    	}
        		
			}
		else{
    			console.log(err);
                axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "not responding."
                });		
    		}
	},url,data);
    
}
function routeTime(divid,time)
{
	if($(divid).length > 0)
		{
			$(divid).text("refresh Time:"+time);
			if(time!=1)
			{
			var timeout=	setTimeout(function(){
					time--;
				routeTime(divid,time);
				},1000);
			
			for(var i = 0;i <divtimecheck.length;i++)
			{
				if(divtimecheck[i].divid==divid)
					{
					divtimecheck[i].timeout=timeout;
					return;
					}
			}
			
			var check={"divid":divid,"timeout":timeout};
			divtimecheck.push(check);
			}
		}

}
function routeClose(routeId,dindex)
{
	$("#"+routeId).remove();
	 ACTIONS.dispatch(ACTIONS.GRID_SELECT_FLASE,dindex);
	}

function preview_Image(id){
	var path;
	//path 바꾸기
	path = "/assets/images/BM0108/EmployeeDefault.jpg";//default path
	document.getElementById(id).src=path;
}