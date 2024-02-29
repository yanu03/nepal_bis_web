
var fnObj = {};
var selectType = "";
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	data=caller.searchView.getData();
    	data.useYn="Y";
    	axboot.ajax({
            type: "GET",
            url: '/api/v1/bisMtBits/terminal',
            data:data ,
            callback: function (res) {
                caller.gridView01.setData(res);
                selectType = data.Select;
	            if(data.Select == "BIT")
	           	 {
	           		$("#scheduleManaged").attr("style","");
	           		$("#monitorform").attr("style","");
	           		$("#masterform").attr("style","display:none");
	           		var str = "<option value=150 id='bitfw'>BIT firmware</option>";
	           		$("#filecode").html(str);
	           			
	           		$("#filecode").val("150");
	           	 }
	            else if(data.Select == "TERMINAL")
	            {
	            	$("#scheduleManaged").attr("style","display:none");
	            	$("#monitorform").attr("style","display:none");
	            	$("#masterform").attr("style","");
	            	var str = "<option value=100 id='terminalfw1'>Terminal firmware1</option>"+"<option value=101 id='terminalfw2'>Terminal firmware2</option>";
	            	$("#filecode").html(str);
	           		
	           	$("#filecode").val("100");
	            }
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
    MASTER_CHANGE: function (caller, act, data) {
    	debugger;
    	var date = $("#datetimepicker").val();
		if("" == date||null == date)
			{
			 date = currenttime();
			}
	/*	
		var sendList=[];
    	var senddata ={};
    	if(data !="ALL")
		{
    		var list= null;
    		list = caller.gridView01.target.getList("selected");
    		if(0 == list.length)
			{
    			axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "Please select a BIT"
                }); 
    			return false;
			}
    		for(var i = 0; i < list.length;i++)
			{
    			senddata.deviceId=list[i].systemId;
    			senddata.deviceType=3;
    			senddata.code="150";
    			senddata.value="1";
    			sendList.push(senddata);
			}
		}
    	else
		{
    		senddata.deviceType=3;
    		senddata.code="150";
    		senddata.value="1";
			sendList.push(senddata);
		}
    		axboot.ajax({
		         type: "POST",
		         async:false,
		         url:'/communication/control',
		         data:JSON.stringify(sendList) ,
		         callback: function (res) {
		        	 if(res.ret_code == "1")
		        		 {
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else if(res.ret_code=="0")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else{
		        		    axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg:res.ret_message
		                      });		
		        		
		        		 }
		         }
	         });*/
		
		
		var sendList=[];
    	
    	var msg ="";
		var deviceType=0;
		if("BIT" == selectType )
			{
			deviceType = 3;
			msg = "Please select a BIT";
			}
		else if("TERMINAL" == selectType)
			{
			deviceType = 2;
			msg = "Please select a TERMINAL";
			}
		
    	if("ALL" != data)
    		{
    		var list= null;
    		list = caller.gridView01.target.getList("selected");
    		if(0 == list.length)
			{
    			axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: msg
                }); 
    			return false;
			}
    		for(var i = 0; i < list.length;i++)
			{
    			var senddata ={};
    			senddata ={
    	    			"applyDate" :date,
    	    			  "deviceId" : list[i].systemId,
    	    			  "deviceType" : deviceType,
    	    			  "fileCode" :"1", //102?
    	    			  "ftpPath" : "/CMN/MASTER/",
    	    			  "ftpFile" : "CMN_AL_"+date+".zip"
    	    			};
    			sendList.push(senddata);
			}
    		
    		axboot.ajax({
		         type: "POST",
		         async:false,
		       //  url:'/api/v1/bisMtBitstations',
		         url:'/communication/ftp',
		         data: JSON.stringify(sendList),
		         callback: function (res) {
		        	 if(res.ret_code=="111")
	        		 {
	        		 var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });	
	        		 }
		        	 else if(res.ret_code!="1")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else{
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		         }	
	         });
    	}
    	else
    	{
    		var senddata ={};
    		senddata ={
    			"applyDate" :date,
    			  "deviceId" :"0000000000",
    			  "deviceType" : deviceType,
    			  "fileCode" :"1",
    			  "ftpPath" : "/CMN/MASTER/",
    			  "ftpFile" : "CMN_AL_"+date+".zip"
    			};
    		sendList.push(senddata);
    		axboot.ajax({
		         type: "POST",
		         async:false,
		       //  url:'/api/v1/bisMtBitstations',
		         url:'/communication/ftp',
		         data: JSON.stringify(sendList),
		         callback: function (res) {
		        	 if(res.ret_code=="111")
	        		 {
	        		 var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });	
	        		 }
		        	 else if(res.ret_code!="1")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else{
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		         }
	         });
    	}
    },
    ROUTESTATION_MODAL: function (caller, act, data) {

    	 axboot.modal.open({
             modalType: "ROUTESTATION-MODAL",
             param: "",
             sendData: function(){
                 return {
                 'routeId': $('[data-ax-path="routeId"]').val()
                 };
             },
             callback: function (data) {
            	 var json = caller.formView01.getData();
            	 json.fromStationId = data.stationId;
            	 json.fromStationName = data.stationName;
            	 caller.formView01.setData(json);
            	 /*
            	 $('[data-ax-path="fromStationId"]').val(data.stationId);
            	 $('[data-ax-path="fromStationName"]').val(data.stationName);
            	 */
            	  this.close();
             }
         });
    	
    },
    ROUTESTATION_MODAL2: function (caller, act, data) {

   	 axboot.modal.open({
            modalType: "ROUTESTATION-MODAL",
            param: "",
            sendData: function(){
                return {
                'routeId': $('[data-ax-path="routeId"]').val()
                };
            },
            callback: function (data) {
            	 var json = caller.formView01.getData();
            	 json.toStationId = data.stationId;
            	 json.toStationName = data.stationName;
            	 caller.formView01.setData(json);
           	this.close();
            }
        });
   	
   },
   ROUTESTATION_MODAL3: function (caller, act, data) {

  	 axboot.modal.open({
           modalType: "ROUTESTATION-MODAL",
           param: "",
           sendData: function(){
               return {
               'routeId': $('[data-ax-path="routeId"]').val()
               };
           },
           callback: function (data) {

          	 var json = caller.formView01.getData();
          	 json.turnStationId = data.stationId;
          	 json.turnStationName = data.stationName;
          	 caller.formView01.setData(json);
          	this.close();
           }
       });
  	
  },
  AREACODE_MODAL: function (caller, act, data) {

	  	 axboot.modal.open({
	           modalType: "AREACODE-MODAL",
	           param: "",
	           sendData: function(){

	           },
	           callback: function (data) {

	          	 var json = caller.formView01.getData();
	          	 json.areaCode = data.areaCode;
	          	 json.adminName1 = data.adminName1;
	          	 caller.formView01.setData(json);
	          	this.close();
	           }
	       });
	  	
	  },
    ITEM_CLICK: function (caller, act, data) {
    	//데이터 옆에뜨게 하기
    	
    	axboot.ajax({
            type: "GET",
            url: '/api/v1/bisItSystemversions',
            data:data ,
            callback: function (res) {
             //   caller.gridView02.setData(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });
    	
  $("#selectType").text(data.systemType +" : "+data.systemName+"("+data.systemId+")") ;
  $("#typeid").val(data.systemId);
  $("#type").val(data.systemType);
/* if(data.systemType == "BIT")
	 {
		$("#scheduleManaged").attr("style","");
		$("#monitorform").attr("style","");
		var str = "<option value=150 id='bitfw'>BIT firmware</option>";
		$("#filecode").html(str);
			
			
		$("#filecode").val("150");
	 }
 else if(data.systemType == "TERMINAL")
 {
	$("#scheduleManaged").attr("style","display:none");
 	$("#monitorform").attr("style","display:none");
 	var str = "<option value=100 id='terminalfw1'>Terminal firmware1</option>"+"<option value=101 id='terminalfw2'>Terminal firmware2</option>";
 	$("#filecode").html(str);
		
	$("#filecode").val("100");
 }*/
    },
    SCHEDULE_MANAGED : function(caller,act,data)
    {
    	var sdata = caller.schedule.getData();
    	for(var i  = 0;i < sdata.schedule.length;i++)
		{
        	if(0 == sdata.schedule[i])
    		{
    		
        		var sendList=[];
            	
            	if(data !="ALL")
        		{
            		var list= null;
            		list = caller.gridView01.target.getList("selected");
            		if(0 == list.length)
        			{
            			axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "Please select a BIT"
                        }); 
            			return false;
        			}
            		for(var i = 0; i < list.length;i++)
        			{
            			var senddata ={};
            			senddata.Select = "bitId";
            			senddata.Keyword = list[i].systemId;
            			senddata.bitId = senddata.Keyword;
            			sendList.push(senddata);
        			}
        		}
            	else
        		{
            		var senddata ={};
        			sendList.push(senddata);
        		}
        		axboot.ajax({
     		         type: "POST",
     		         async:false,
     		       //  url:'/api/v1/bisMtBitstations',
     		         url:'/api/v1/bisItBitscenarios/sendCenter',
     		         data: JSON.stringify(sendList),
     		         callback: function (res) {
     		        	 if(res.ret_code=="111")
      		        	 {
      		        		var list = res.list;
    		        		var length = list.length;
    		        		var str="";
    		        		for(var i = 0;i < length;i ++)
    		        			{
    		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
    		        				
    		        			}
    		        		 axDialog.alert({
    	                          theme: "primary",
    	                          title:" ",
    	                          msg: str
    	                      });		
      		        	 }
      		        	 else{
      		        			axDialog.alert({
      		                          theme: "primary",
      		                          title:" ",
      		                          msg: "applied"
      		                      }); 
      		        		 }
     		         }
     	         });
        		
        		
        		
        		
        		
        		
        		/*var obj=new Object();
                
        		if( data == null)
        			{
        			
        			}
        		else
        			{
        			obj.Select="bitId";
                    obj.Keyword=data;
                    obj.bitId=data;
        			}
        		axboot.ajax({
      		         type: "GET",
      		         async:false,
      		       //  url:'/api/v1/bisMtBitstations',
      		         url:'/api/v1/bisItBitscenarios/sendCenter',
      		         data: obj,
      		         callback: function (res) {
      		        	 if(res.ret_code == "1")
      		        		 {
      		        		axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
      		        		 }
      		        	 else if(res.ret_code=="0")
      		        	 {
      		        		 axDialog.alert({
      	                          theme: "primary",
      	                          title:" ",
      	                          msg:res.ret_message
      	                      });		
      		        	 }
      		        	 else{
      		        	    axDialog.alert({
     	                         theme: "primary",
     	                         title:" ",
     	                         msg: "not responding."
     			        	    });		
      		        		 }
      		         }
      	         });*/
    		}
        	if(1 == sdata.schedule[i])
    		{
        		var sendList=[];
            	
            	if(data !="ALL")
        		{
            		var list= null;
            		list = caller.gridView01.target.getList("selected");
            		if(0 == list.length)
        			{
            			axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "Please select a BIT"
                        }); 
            			return false;
        			}
            		for(var i = 0; i < list.length;i++)
        			{
            			var senddata ={};
            			senddata.Select = "bitId";
            			senddata.Keyword = list[i].systemId;
            			senddata.ScheduleCode = 0;
            			sendList.push(senddata);
        			}
        		}
            	else
        		{
            		var senddata ={};
        			senddata.ScheduleCode = 0;
        			sendList.push(senddata);
        		}

            	debugger;
            	axboot.ajax({
      		         type: "POST",
      		         async:false,
      		       //  url:'/api/v1/bisMtBitstations',
      		         url:'/communication/monitor',
      		         data: JSON.stringify(sendList),
      		         callback: function (res) {
      		        	 if(res.ret_code=="111")
      		        	 {
      		        		var list = res.list;
    		        		var length = list.length;
    		        		var str="";
    		        		for(var i = 0;i < length;i ++)
    		        			{
    		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
    		        				
    		        			}
    		        		 axDialog.alert({
    	                          theme: "primary",
    	                          title:" ",
    	                          msg: str
    	                      });		
      		        	 }
      		        	 else{
      		        			axDialog.alert({
      		                          theme: "primary",
      		                          title:" ",
      		                          msg: "applied"
      		                      }); 
      		        		 }
      		         }
      	         });
        		/*
        		var senddata=null;
        		if( data == null)
        			{
        				senddata= {ScheduleCode:0};
        			}
        		else
        			{
	        			senddata= {Select:"bitId",Keyword:data,ScheduleCode:0};
        			}
        		
        		axboot.ajax({
   		         type: "POST",
   		         async:false,
   		       //  url:'/api/v1/bisMtBitstations',
   		         url:'/communication/monitor',
   		         data: JSON.stringify(senddata),
   		         callback: function (res) {
   		        	 if(res.ret_message == "error")
   		        		 {
   			        	    axDialog.alert({
   	                         theme: "primary",
   	                         title:" ",
   	                         msg: "not responding."
   			        	    });		
   		        		 }
   		        	 else if(res.ret_code=="0")
   		        	 {
   		        		 axDialog.alert({
   	                          theme: "primary",
   	                          title:" ",
   	                          msg: "not responding."
   	                      });		
   		        	 }
   		        	 else{
   		        			axDialog.alert({
   		                          theme: "primary",
   		                          title:" ",
   		                          msg: "applied"
   		                      }); 
   		        		 }
   		         }
   	         });*/
    		}
        	if(2 == sdata.schedule[i])
    		{
  		var sendList=[];
            	
            	if(data !="ALL")
        		{
            		var list= null;
            		list = caller.gridView01.target.getList("selected");
            		if(0 == list.length)
        			{
            			axDialog.alert({
                            theme: "primary",
                            title:" ",
                            msg: "Please select a BIT"
                        }); 
            			return false;
        			}
            		for(var i = 0; i < list.length;i++)
        			{
            			var senddata ={};
            			senddata.Select = "bitId";
            			senddata.Keyword = list[i].systemId;
            			senddata.ScheduleCode = 1;
            			sendList.push(senddata);
        			}
        		}
            	else
        		{
            		var senddata ={};
        			senddata.ScheduleCode = 1;
        			sendList.push(senddata);
        		}
            	axboot.ajax({
      		         type: "POST",
      		         async:false,
      		       //  url:'/api/v1/bisMtBitstations',
      		         url:'/communication/illumination',
      		         data: JSON.stringify(sendList),
      		         callback: function (res) {
      		        	 if(res.ret_code=="111")
      		        	 {
      		        		var list = res.list;
    		        		var length = list.length;
    		        		var str="";
    		        		for(var i = 0;i < length;i ++)
    		        			{
    		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
    		        				
    		        			}
    		        		 axDialog.alert({
    	                          theme: "primary",
    	                          title:" ",
    	                          msg: str
    	                      });		
      		        	 }
      		        	 else{
      		        			axDialog.alert({
      		                          theme: "primary",
      		                          title:" ",
      		                          msg: "applied"
      		                      }); 
      		        		 }
      		         }
      	         });
        		
        		/*
        		var senddata=null;
        		if( data == null)
        			{
        			senddata= {ScheduleCode:1};
        			}
        		else
        			{
	        			senddata= {Select:"bitId",Keyword:data,ScheduleCode:1};
        			}
        		
        		axboot.ajax({
   		         type: "POST",
   		         async:false,
   		       //  url:'/api/v1/bisMtBitstations',
   		         url:'/communication/illumination',
   		         data: JSON.stringify(senddata),
   		         callback: function (res) {
   		        	 if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
   		        	 else if(res.ret_code!="1")
   		        	 {
   		        		 axDialog.alert({
   	                          theme: "primary",
   	                          title:" ",
   	                          msg: res.ret_message
   	                      });		
   		        	 }
   		        	 else{
   		        			axDialog.alert({
   		                          theme: "primary",
   		                          title:" ",
   		                          msg: "applied"
   		                      }); 
   		        		 }
   		         }
   	         });*/
    		}
		}

    },
    BIT_RESET: function(caller,act,data)
    {
    	var sendList=[];
    	
    	if(data !="ALL")
		{
    		var list= null;
    		list = caller.gridView01.target.getList("selected");
    		if(0 == list.length)
			{
    			axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "Please select a BIT"
                }); 
    			return false;
			}
    		for(var i = 0; i < list.length;i++)
			{
    			var senddata ={};
    			senddata.deviceId=list[i].systemId;
    			senddata.deviceType=3;
    			senddata.code="150";
    			senddata.value="1";
    			sendList.push(senddata);
			}
		}
    	else
		{
    		var senddata ={};
    		senddata.deviceType=3;
    		senddata.code="150";
    		senddata.value="1";
			sendList.push(senddata);
		}
    		axboot.ajax({
		         type: "POST",
		         async:false,
		         url:'/communication/control',
		         data:JSON.stringify(sendList) ,
		         callback: function (res) {
		        	 if(res.ret_code == "1")
		        		 {
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else{
		        		    axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg:res.ret_message
		                      });		
		        		
		        		 }
		         }
	         });
    		
    		
    	/*var senddata ={};
    	if(data != null)
    		{
    			senddata.deviceId=data;
    			
    		}
    	else
    		{
    		//senddata.deviceId="0000000000";
    		}
    	senddata.deviceType=3;
		senddata.code="150";
		senddata.value="1";
		axboot.ajax({
		         type: "POST",
		         async:false,
		       //  url:'/api/v1/bisMtBitstations',
		         url:'/communication/control',
		         data: JSON.stringify(senddata),
		         callback: function (res) {
		        	 if(res.ret_code == "1")
		        		 {
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
			        	 
		        		 }
		        	 else if(res.ret_code=="0")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else{
		        		   axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "not responding."
		                      });		
		        		
		        		 }
		         }
	         });*/
    },
    TERMINAL_RESET: function(caller,act,data)
    {
    	var sendList=[];
    	
    	if(data !="ALL")
		{
    		var list= null;
    		list = caller.gridView01.target.getList("selected");
    		if(0 == list.length)
			{
    			axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "Please select a TERMINAL"
                }); 
    			return false;
			}
    		for(var i = 0; i < list.length;i++)
			{
    			var senddata ={};
    			senddata.deviceId=list[i].systemId;
    			senddata.deviceType=2;
    			senddata.code="100";
    			senddata.value="1";
    			sendList.push(senddata);
			}
		}
    	else
		{
    		var senddata ={};
    		senddata.deviceType=2;
    		senddata.code="100";
    		senddata.value="1";
			sendList.push(senddata);
		}
    		axboot.ajax({
		         type: "POST",
		         async:false,
		         url:'/communication/control',
		         data:JSON.stringify(sendList) ,
		         callback: function (res) {
		        	 if(res.ret_code == "1")
		        		 {
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else if(res.ret_code=="0")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else{
		        		    axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg:res.ret_message
		                      });		
		        		
		        		 }
		         }
	         });
    	/*var senddata ={};
    	if(data != null)
		{
			senddata.deviceId=data;
			
		}
	else
		{
		//senddata.deviceId="0000000000";
		}
	senddata.deviceType=2;
	senddata.code="100";
	senddata.value="1";

    		axboot.ajax({
		         type: "POST",
		         async:false,
		       //  url:'/api/v1/bisMtBitstations',
		         url:'/communication/control',
		         data: JSON.stringify(senddata),
		         callback: function (res) {
		        	 
		        	 if(res.ret_code == "1")
	        		 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: "applied"
	                      }); 
	        		 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else if(res.ret_code=="0")
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });		
		        	 }
		        	 else
		        	 {
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: res.ret_message
	                      });
		        	 }
		         }
	         });*/
    },
    ILLUMINANCE_CONTROL: function(caller,act,data)
    {
    	var sendList=[];
    	
    	if(data !="ALL")
		{
    		var list= null;
    		list = caller.gridView01.target.getList("selected");
    		if(0 == list.length)
			{
    			axDialog.alert({
                    theme: "primary",
                    title:" ",
                    msg: "Please select a BIT"
                }); 
    			return false;
			}
    		for(var i = 0; i < list.length;i++)
			{
    			var senddata ={};
    			senddata.deviceId=list[i].systemId;
    			senddata.deviceType=3;
    			senddata.code="151";
    			senddata.value= Number($("#monitor").val());
    			sendList.push(senddata);
			}
		}
    	else
		{
    		var senddata ={};
			senddata.deviceType=3;
			senddata.code="151";
			senddata.value= Number($("#monitor").val());
			sendList.push(senddata);
		}
    		axboot.ajax({
		         type: "POST",
		         async:false,
		         url:'/communication/control',
		         data:JSON.stringify(sendList) ,
		         callback: function (res) {
		        	 if(res.ret_code == "1")
		        		 {
		        			axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg: "applied"
		                      }); 
		        		 }
		        	 else if(res.ret_code=="111")
		        	 {
		        		var list = res.list;
		        		var length = list.length;
		        		var str="";
		        		for(var i = 0;i < length;i ++)
		        			{
		        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
		        				
		        			}
		        		 axDialog.alert({
	                          theme: "primary",
	                          title:" ",
	                          msg: str
	                      });		
		        	 }
		        	 else{
		        		    axDialog.alert({
		                          theme: "primary",
		                          title:" ",
		                          msg:res.ret_message
		                      });		
		        		
		        		 }
		         }
	         });
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    },
    FIRMWARE_SAVE : function(caller,act,data)
    {
    	if(null !=$("#filename").val()&&"" != $("#filename").val())
		{
	    	if(	caller.firmware.validate())
			{
		    	var sendList=[];
		    	
		    	deviceType=0;
		    	var getdata=caller.firmware.getData();
		    	var list= null;
	    		list = caller.gridView01.target.getList("selected");
		    	
		    		
		    		var msg = "";
		    		if("BIT" == selectType )
		    		{
		    			deviceType = 3;
		    			msg = "Please select a BIT";
		    		}
		        	else if("TERMINAL" == selectType)
		    		{
		        		deviceType =2;
		        		msg = "Please select a TERMINAL";
		    		}
		        	else if("" == selectType )
		    		{
		        		msg = "Please select a BIT or TERMINAL";
		    		}
		    		if(data !="ALL")
					{
			    		if(0 == list.length)
						{
			    			axDialog.alert({
			                    theme: "primary",
			                    title:" ",
			                    msg: msg 
			                }); 
			    			return false;
						}
					}
		    	 	  var upFile=$('#upFile')[0].files[0];
	    	      	  var browserCheck=isBrowserCheck();
	    	      	  var formData = new FormData();
	                formData.append('upFile', upFile);
	                formData.append('fileCode', $("#filecode").val());
	               formData.append('deviceType', senddata.deviceType);
	                
	                formData.append('filename', $("#filename").val());
	                formData.append('applyDate',$("#applyDate").val());
	                $.ajax({
	                    url: '/api/v1/bisFirmwares/file',
	                    processData: false,
	                    contentType: false,
	                    data: formData,
	                    type: "POST",
	                    success: function(result){    
	                  	  if(result.warning != null){
	                  	    axDialog.alert({
		                         theme: "primary",
		                         title:" ",
		                         msg: result.warning
				        	    });		
	                          }else{
	                        	  if(data !="ALL")
	                				{
		                        		 for(var i = 0; i < list.length;i++)
			              				 {
		                        			 var senddata ={};
			              	    			senddata ={
					              	    				  "applyDate" : $("#applyDate").val(),
					              	    				  "deviceId" :list[i].systemId,
					              	    				  "deviceType" : deviceType,
					              	    				  "fileCode" : $("#filecode").val(),
					              	    				  "ftpPath" : result.ftpPath,
					              	    				  "ftpFile" : $("#filename").val()
			              	    						}
			              	    			sendList.push(senddata);
			              				 }
	                				}
	                        	  	else
	                				{
	                        	  		var senddata ={};
	                        	  		senddata ={
			              	    				  "applyDate" : $("#applyDate").val(),
			              	    				  "deviceId" :"0000000000",
			              	    				  "deviceType" : deviceType,
			              	    				  "fileCode" : $("#filecode").val(),
			              	    				  "ftpPath" : result.ftpPath,
			              	    				  "ftpFile" : $("#filename").val()
	            	    						}
	            	    			sendList.push(senddata);
	                				}
	                        	  
	                        	
	                        	   axboot.ajax({
			   					         type: "POST",
			   					         async:false,
			   					         url:'/communication/firmware',
			   					         data: JSON.stringify(sendList),
			   					         callback: function (res) {
			   					        	 if(res.ret_code == "1")
			   				        		 {
			   				        			axDialog.alert({
			   				                          theme: "primary",
			   				                          title:" ",
			   				                          msg: "applied"
			   				                      }); 
			   				        		 }
				   				        	 else if(res.ret_code=="111")
				   				        	 {
				   				        		var list = res.list;
				   				        		var length = list.length;
				   				        		var str="";
				   				        		for(var i = 0;i < length;i ++)
				   				        			{
				   				        				str += list[i].id+" : "+list[i].ret_message+"<br/>";
				   				        				
				   				        			}
				   				        		 axDialog.alert({
				   			                          theme: "primary",
				   			                          title:" ",
				   			                          msg: str
				   			                      });		
				   				        	 }
				   				        	 else{
				   				        		    axDialog.alert({
				   				                          theme: "primary",
				   				                          title:" ",
				   				                          msg:res.ret_message
				   				                      });		
				   				        		
				   				        		 }

			   					         }
		   					         });
	                        	   
	                          }
	                    }
	                });
			}
    	
		}	else
    		{
    		axDialog.alert({
                   theme: "primary",
                   title:" ",
                   msg: "Please select a file"
               }); 
    		}
    	/*
    if(null != $("#typeid").val()&& "" != $("#typeid").val() )
    	{
 
    	if(null !=$("#filename").val()&&"" != $("#filename").val())
    		{
    
		    	if(	caller.firmware.validate())
				{
		    		senddata=caller.firmware.getData();
		    		senddata={fileCode:$("#filecode").val()};
		        	if(data != "All")
		        		{
		        		senddata.deviceId=$("#typeid").val();
		        		}
		        	else
		        		{
		        		senddata.deviceId="0000000000";
		        		}
		    		
		    		senddata.applyDate=$("#applyDate").val();
		    		senddata.ftpFile=$("#filename").val();
	            	if(senddata.fileCode == "150")
	            		{
	            		senddata.deviceType=3;
	            		}
	            	else
	            		{
	            		senddata.deviceType=2;
	            		}
	            
	    	      	  var upFile=$('#upFile')[0].files[0];
	    	      	
	    	      	  var browserCheck=isBrowserCheck();
	    	      	  var formData = new FormData();
	                formData.append('upFile', upFile);
	                formData.append('fileCode', senddata.fileCode);
	                formData.append('deviceId', senddata.deviceId);
	                formData.append('filename', senddata.ftpFile);
	                formData.append('applyDate', senddata.applyDate);
	                $.ajax({
	                    url: '/api/v1/bisFirmwares/file',
	                    processData: false,
	                    contentType: false,
	                    data: formData,
	                    type: "POST",
	                    success: function(result){    
	                  	  if(result.warning != null){
	                  	    axDialog.alert({
		                         theme: "primary",
		                         title:" ",
		                         msg: result.warning
				        	    });		
	                          }else{ 
	                        	  senddata.ftpPath=result.ftpPath;
	                        	   axboot.ajax({
			   					         type: "POST",
			   					         async:false,
			   					         url:'/communication/firmware',
			   					         data: JSON.stringify(senddata),
			   					         callback: function (res) {

			   					        	 if(res.ret_message == "error")
			   					        		 {
			   					        	    axDialog.alert({
			   			                          theme: "primary",
			   			                          title:" ",
			   			                          msg: "not responding."
			   			                      });		
			   						        	 
			   					        		 }
			   					        	 else if(res.ret_code=="0")
			   					        	 {
			   					        		 axDialog.alert({
			   				                          theme: "primary",
			   				                          title:" ",
			   				                          msg: "not responding."
			   				                      });		
			   					        	 }
			   					        	 else{
			   					        			axDialog.alert({
			   					                          theme: "primary",
			   					                          title:" ",
			   					                          msg: "applied"
			   					                      }); 
			   					        		 }
			   					         }
		   					         });
	                          }
	                    }
	                });
				}
    		}
    	else
    		{
    		axDialog.alert({
                   theme: "primary",
                   title:" ",
                   msg: "Please select a file"
               }); 
    		}
    	}*/
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
$('.station_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL);
});
$('.station_button2').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL2);
});
$('.station_button3').click(function() {
	 ACTIONS.dispatch(ACTIONS.ROUTESTATION_MODAL3);
});
$('.areacode_button').click(function() {
	 ACTIONS.dispatch(ACTIONS.AREACODE_MODAL);
});
// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	this.pageButtonView.initView();
    this.searchView.initView();
    this.firmware.initView();
    this.schedule.initView();
    
    this.gridView01.initView();
 //   this.gridView02.initView();
    this.formView01.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    /* this.formView01.initView();*/
    axboot.buttonClick(this, "data-ui-btn", {
        "IlluminanceOne": function () {
        		axDialog.confirm({
	        		title:" ",
	                msg: COL("confirem.bit")
	            }, function () {
	                if (this.key == "ok") {
	                	ACTIONS.dispatch(ACTIONS.ILLUMINANCE_CONTROL);
	                	}
	            });
        },
        "IlluminanceAll": function () {
        	axDialog.confirm({
        		title:" ",
                msg: COL("confirem.bit")
            }, function () {
                if (this.key == "ok") 
                {
                	ACTIONS.dispatch(ACTIONS.ILLUMINANCE_CONTROL,"ALL");
                }
            });
         },
         "resetOne": function () {
        	 if ("BIT" == selectType)
        		 {
	        		 axDialog.confirm({
	             		title:" ",
	                     msg: COL("confirem.bit")
	                 }, function () {
	                     if (this.key == "ok") 
	                     {
	                    	 ACTIONS.dispatch(ACTIONS.BIT_RESET);
	                     }
	                 });
        		 }
        	 else if("TERMINAL" == selectType)
        		 {
        		 axDialog.confirm({
	             		title:" ",
	                     msg: COL("confirem.obe")
	                 }, function () {
	                     if (this.key == "ok") 
	                     {
	                    	 ACTIONS.dispatch(ACTIONS.TERMINAL_RESET);
	                     }
	                 });
        		 }else
        			 {
	        			 axDialog.alert({
	                         theme: "primary",
	                         title:" ",
	                         msg: "Please select a BIT or TERMINAL"
	                     }); 
        			 }
        	 
        	/* var type = $("#type").val();
        	 var typeid=$("#typeid").val();
        	 if("" == type && null == type)
        	 {
        		 axDialog.alert({
                     theme: "primary",
                     title:" ",
                     msg: "Please select a BIT or TERMINAL"
                 }); 
        	 }
        	 else if ("BIT" == type)
    		 {
        			axDialog.confirm({
                		title:" ",
                        msg: COL("bis.confirem.contentapply")
                    }, function () {
                        if (this.key == "ok") 
                        {
                        	ACTIONS.dispatch(ACTIONS.BIT_RESET,typeid);
                        }
                    });
    		 } else if ("TERMINAL" == type)
    		 {
    				axDialog.confirm({
                		title:" ",
                        msg: COL("bis.confirem.contentapply")
                    }, function () {
                        if (this.key == "ok") 
                        {
                        	ACTIONS.dispatch(ACTIONS.TERMINAL_RESET,typeid);
                        }
                    });
    		 }*/
        	 
          },
         "resetAll": function () {
        	 if ("BIT" == selectType)
    		 {
        		 axDialog.confirm({
             		title:" ",
                     msg: COL("confirem.bit")
                 }, function () {
                     if (this.key == "ok") 
                     {
                    	 ACTIONS.dispatch(ACTIONS.BIT_RESET,"ALL");
                     }
                 });
    		 }
    	 else if("TERMINAL" == selectType)
    		 {
    		 axDialog.confirm({
             		title:" ",
                     msg: COL("bis.confirem.obe")
                 }, function () {
                     if (this.key == "ok") 
                     {
                    	 ACTIONS.dispatch(ACTIONS.TERMINAL_RESET,"ALL");
                     }
                 });
    		 }else
			 {
    			 axDialog.alert({
                     theme: "primary",
                     title:" ",
                     msg: "Please select a BIT or TERMINAL"
                 }); 
			 }
        	 /*var type = $("#type").val();
        	 if("" == type && null == type)
        	 {
        		 axDialog.alert({
                     theme: "primary",
                     title:" ",
                     msg: "Please select a BIT or TERMINAL"
                 }); 
    		 }
        	 else if ("BIT" == type)
    		 {
     			axDialog.confirm({
            		title:" ",
                    msg: COL("bis.confirem.contentapply")
                }, function () {
                    if (this.key == "ok") 
                    {
                    	ACTIONS.dispatch(ACTIONS.BIT_RESET);
                    }
                });
    		 } else if ("TERMINAL" == type)
    		 {
    				axDialog.confirm({
                		title:" ",
                        msg: COL("bis.confirem.contentapply")
                    }, function () {
                        if (this.key == "ok") 
                        {
                        	ACTIONS.dispatch(ACTIONS.TERMINAL_RESET);
                        }
                    });
    		 }
        	 */
          }
    });
    axboot.buttonClick(this, "data-firmware-btn", {
        "send": function () {
        	var msg = "";
        	if("" != selectType)
   			 {
            	if("BIT" == selectType )
        		{
            		msg = COL("confirem.bit");
	    		
        		}
            	else if("TERMINAL" == selectType)
        		{
            		msg = COL("bis.confirem.obe");
        		
        		}
            	axDialog.confirm({
            		title:" ",
                    msg: msg
                }, function () {
                    if (this.key == "ok") 
                    {
                    	ACTIONS.dispatch(ACTIONS.FIRMWARE_SAVE);
                    }
                });
   			 }
        	else
			{
        		   axDialog.alert({
			       theme: "primary",
			       title:" ",
			       msg: "Please select a BIT or TERMINAL"
			   }); 
			}
/*
			axDialog.confirm({
        		title:" ",
                msg: COL("bis.confirem.contentapply")
            }, function () {
                if (this.key == "ok") 
                {
                	ACTIONS.dispatch(ACTIONS.FIRMWARE_SAVE);
                }
            });*/
        },
        "All": function () {
        	
        	
        	var msg = "";
        	if("" != selectType)
   			 {
            	if("BIT" == selectType )
        		{
        		msg = COL("confirem.bit");
        		}
            	else if("TERMINAL" == selectType)
        		{
        		msg = COL("confirem.obe");
        		}
            	axDialog.confirm({
            		title:" ",
                    msg: msg
                }, function () {
                    if (this.key == "ok") 
                    {
                    	ACTIONS.dispatch(ACTIONS.FIRMWARE_SAVE,"ALL");
                    }
                });
   			 }
        	else
			{
        		   axDialog.alert({
			       theme: "primary",
			       title:" ",
			       msg: "Please select a BIT or TERMINAL"
			   }); 
			}
        	
		/*	axDialog.confirm({
        		title:" ",
                msg: COL("bis.confirem.contentapply")
            }, function () {
                if (this.key == "ok") 
                {
                	ACTIONS.dispatch(ACTIONS.FIRMWARE_SAVE,"All");
                }
            });*/
         }
    });
};

fnObj.pageResize = function () {
};
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        "save": function () {
                ACTIONS.dispatch(ACTIONS.ROUTE_SAVE);
            },
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    }
});
/*
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    }
});
*/
//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
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
 * 
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = $(document["formView01"]);
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        this.target = axboot.gridBuilder({
        	showLineNumber: false,
            showRowSelector: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "systemType", label:"TYPE", width: 90, align: "center"},
             	{key: "systemId", label:"CLIENT ID", width: 90, align: "center"},
            	{key: "systemName", label:"CLIENT NAME", width: 138, align: "center"},
            	
            	{key: "localFw1", label:"LOCAL FW1", width: 91, align: "center"},
            	{key: "remoteFw1", label:"REMOTE FW1", width: 91, align: "center"},
            	{key: "localFw2", label:"LOCAL FW2", width: 91, align: "center"},
            	{key: "remoteFw2", label:"REMOTE FW2", width: 91, align: "center"},
            	{key: "localMdb", label:"LOCAL MDB", width: 91, align: "center"},
            	{key: "remoteMdb", label:"REMOTE MDB", width: 91, align: "center"}
            ],
          
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                   // ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
              
                    $("#datetimepicker").val(currenttime());
                    $("input:radio[name=box]").prop("checked",false);
                	var browser = isBrowserCheck();
                    if('Explorer' == browser)
					{
    					$("#upFile").replaceWith( $("#upFile").clone(true) ); 
					}
    				else if("Chrome" == browser)
					{
    					$("#upFile").val("");
					}
    				$("#filename").val("");
                }
            }
        });
   
    },
    getData: function (_type) {
        return this.target.getData();
    }
});

/**
 * gridView
 * 
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;
        this.target = $(document["formView01"]);
        this.target = axboot.gridBuilder({
      
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
            	{key: "name", label:"NAME", width: 200, align: "center"},
             	{key: "version", label:"APPLIED VERSION", width: 125, align: "center"},
             	{key: "sentversion", label:"SENT VERSION", width: 125, align: "center"},
            ],
          
            body: {
                onClick: function () {
                }
            }
        });
   
    },
    getData: function (_type) {
        return this.target.getData();
    }
});


//form view

fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
           
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

      axboot.buttonClick(this, "data-form-view-01-btn", {
            "Send": function () {
            	var msg = "";
            	if("" != selectType)
	   			 {
	            	if("BIT" == selectType )
	        		{
	        		msg = COL("confirem.bit");
	        		}
	            	else if("TERMINAL" == selectType)
	        		{
	        		msg = COL("confirem.obe");
	        		}
	            	axDialog.confirm({
	            		title:" ",
	                    msg: msg
	                }, function () {
	                    if (this.key == "ok") 
	                    {
	                    	ACTIONS.dispatch(ACTIONS.MASTER_CHANGE);
	                    }
	                });
	   			 }
            	else
				{
            		   axDialog.alert({
				       theme: "primary",
				       title:" ",
				       msg: "Please select a BIT or TERMINAL"
				   }); 
				}
            },
            "All": function () {
             	var msg = "";
            	if("" != selectType)
	   			 {
	            	if("BIT" == selectType )
	        		{
	        		msg = COL("confirem.bit");
	        		}
	            	else if("TERMINAL" == selectType)
	        		{
	        		msg = COL("confirem.obe");
	        		}
	            	axDialog.confirm({
	            		title:" ",
	                    msg: msg
	                }, function () {
	                    if (this.key == "ok") 
	                    {
	                    	ACTIONS.dispatch(ACTIONS.MASTER_CHANGE,"ALL");
	                    }
	                });
	   			 }
            	else
				{
            		   axDialog.alert({
				       theme: "primary",
				       title:" ",
				       msg: "Please select a BIT or TERMINAL"
				   }); 
				}
            	
            }
        });
    },
    
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        if (data.closeDate != null)
        {
               data.closeDate =data.closeDate.replace(/-/g, "");
        }
        if (data.beginDate != null)
        {
                data.beginDate =data.beginDate.replace(/-/g, "");
        }
        return $.extend({}, data);
    },
    setData: function (data) {


      this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert( rs.error[0].jquery.attr("title").replace(/\n/g, "") + COL("pleaseenter"));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});

//fromview02
fnObj.firmware = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
           
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#firmware");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        
        
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        if (data.closeDate != null)
        {
               data.closeDate =data.closeDate.replace(/-/g, "");
        }
        if (data.beginDate != null)
        {
                data.beginDate =data.beginDate.replace(/-/g, "");
        }
        return $.extend({}, data);
    },
    setData: function (data) {


      this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert( rs.error[0].jquery.attr("title").replace(/\n/g, "") + COL("pleaseenter"));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});

//monitorform
fnObj.schedule = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
           
            roleList: [],
            authList: []
        });
    },
    initView: function () {
        this.target = $("#schedule");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

      axboot.buttonClick(this, "data-schedule-btn", {
            "Send": function () {
            		axDialog.confirm({
                		title:" ",
                        msg: COL("confirem.bit")
                    }, function () {
                        if (this.key == "ok") 
                        {
                        	ACTIONS.dispatch(ACTIONS.SCHEDULE_MANAGED);
                        }
                    });
               
            },
            "All": function () {
         		axDialog.confirm({
            		title:" ",
                    msg: COL("confirem.bit")
                }, function () {
                    if (this.key == "ok") 
                    {
                    	ACTIONS.dispatch(ACTIONS.SCHEDULE_MANAGED,"ALL");
                    }
                });
             }
        });
    },
    
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
    },
    setData: function (data) {
    	this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
            alert( rs.error[0].jquery.attr("title").replace(/\n/g, "") +" "+ COL("pleaseenter"));
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});



//illuminanceschedule form
fnObj.illuminanceschedule = axboot.viewExtend(axboot.formView, {
  getDefaultData: function () {
      return $.extend({}, axboot.formView.defaultData, {
          roleList: [],
          authList: []
      });
  },
  initView: function () {
      this.target = $("#illuminanceschedule");
      this.model = new ax5.ui.binder();
      this.model.setModel(this.getDefaultData(), this.target);
      this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

    axboot.buttonClick(this, "data-illuminanceschedule-btn", {
          "send": function () {
             ACTIONS.dispatch(ACTIONS.ILLUMINANCE_SCHEDULE);
          }
      });
  },
  
  getData: function () {
      var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
      if (data.closeDate != null)
      {
             data.closeDate =data.closeDate.replace(/-/g, "");
      }
      if (data.beginDate != null)
      {
              data.beginDate =data.beginDate.replace(/-/g, "");
      }
      return $.extend({}, data);
  },
  setData: function (data) {
		  this.model.setModel(data);
	      this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
  },
  validate: function () {
      var rs = this.model.validate();
      if (rs.error) {
          alert( rs.error[0].jquery.attr("title").replace(/\n/g, "") + COL("pleaseenter"));
          rs.error[0].jquery.focus();
          return false;
      }
      return true;
  },
  clear: function () {
      this.model.setModel(this.getDefaultData());
  }
});


$(document).on("click","#fileButton",function(){
	$("#upFile").click();
});

function isBrowserCheck(){
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1){
		return 'Chrome';
	}
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	//if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		return 'Explorer';
	}
}
function getCmaFileInfo(obj,stype) {
    var fileObj, pathHeader , pathMiddle, pathEnd, allFilename, fileName, extName;
    if(obj == "[object HTMLInputElement]") {
        fileObj = obj.value
    } else {
        fileObj = document.getElementById(obj).value;
    }
    if (fileObj != "") {
            pathHeader = fileObj.lastIndexOf("\\");
            pathMiddle = fileObj.lastIndexOf(".");
            pathEnd = fileObj.length;
            fileName = fileObj.substring(pathHeader+1, pathMiddle);
            extName = fileObj.substring(pathMiddle+1, pathEnd);
            allFilename = fileName+"."+extName;
 
            if(stype == "all") {
            	
            	if(extName.toLowerCase() =="zip")
            		{         
            		var fileCode = $("#filecode").val();
            		if(fileCode == "100")
        			{
            			if(null == allFilename.match("BUS_F1_"))
        				{
            				var agt = navigator.userAgent.toLowerCase();
            				
            				alert("Naming convention is incorrect");
            				var browser = isBrowserCheck();
            				if('Explorer' == browser)
        					{
            					$("#upFile").replaceWith( $("#upFile").clone(true) ); 
        					}
            				else if("Chrome" == browser)
        					{
            					$("#upFile").val("");
        					}
            				return false;
        				}
        			}
            		else if(fileCode == "101")
            		{
            			if(null == allFilename.match("BUS_F2_"))
        				{	
            				alert("Naming convention is incorrect");
            				var browser = isBrowserCheck();
            				if('Explorer' == browser)
        					{
            					$("#upFile").replaceWith( $("#upFile").clone(true) ); 
        					}
            				else if("Chrome" == browser)
        					{
            					$("#upFile").val("");
        					}
            				return false;
        				}
            		}
            		else
        			{
            			if(null == allFilename.match("BIT_FW_"))
        				{
            				alert("Naming convention is incorrect");
            				var browser = isBrowserCheck();
            				if('Explorer' == browser)
        					{
            					$("#upFile").replaceWith( $("#upFile").clone(true) ); 
        					}
            				else if("Chrome" == browser)
        					{
            					$("#upFile").val("");
        					}
            				
            				return false;
        				}
        			}
            		var applydate =fileName.substring(7);
            		if(applydate.length == 12)
            			{
	            			$("#applyDate").val(applydate);
	            			$("#filename").val(allFilename);
	            			return true;
            			}
            		else
            			{
            			$("#filename").val("");
            			alert("Naming convention is incorrect");
            			return false;
            			}
            		}else
        			{
            			$("#filename").val("");
            			alert("Please select a zip file");
        			}
                    return allFilename; // 확장자 포함 파일명
            } else if(stype == "name") {
                    return fileName; // 순수 파일명만(확장자 제외)
            } else if(stype == "ext") {
                    return extName; // 확장자
            } else {
                    return fileName; // 순수 파일명만(확장자 제외)
            }
    } else {
    		$("#filename").val("");
            alert("Please select a file");
            return false;
    }
    // getCmaFileView(this,'name');
    // getCmaFileView('upFile','all');
 }

function getCmaFileView(obj,stype) {
     getCmaFileInfo(obj,'all');
    
}