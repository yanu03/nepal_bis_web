function ajaxCall(callback,url,data ){
	$.ajax({
        type: "GET",
        url: url,
        data:data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 3000,
        error: function(xReq, status, error) {
        	if(typeof callback === 'function') {
				callback(false, error);
			}
        },
        success: function(json) {
        	if(typeof callback === 'function') {
				callback(true, json);
			}
        }
    });
}
function ajaxCallPost(callback,url,data ){
	$.ajax({
        type: "POST",
        url: url,
        data:data,
        dataType: "json",
        error: function(xReq, status, error) {
        	if(typeof callback === 'function') {
				callback(false, error);
			}
        },
        success: function(json) {
        	if(typeof callback === 'function') {
				callback(true, json);
			}
        }
    });
}

function defaultDateSetting(){
	var date=new Date();
	
	var monthCalc=date.getMonth()+1;
	var startDateCalc=date.getDate()-1;
	var endDateCalc=date.getDate();
	var hourCalc=date.getHours()-1;
	
	if(monthCalc < 10){
		monthCalc="0"+monthCalc;
	}
	
	if(startDateCalc <10){
		startDateCalc = "0"+startDateCalc;
	}
	
	if(endDateCalc < 10){
		endDateCalc = "0"+endDateCalc;
	}
	
	if(hourCalc < 10){
		hourCalc = "0"+hourCalc;
	}
	
	var startDate=date.getFullYear().toString()+monthCalc.toString()+startDateCalc.toString()+hourCalc.toString()+"00";
	var endDate=date.getFullYear().toString()+monthCalc.toString()+endDateCalc.toString()+hourCalc.toString()+"00";
	$("#startDate").val(startDate);
	$("#endDate").val(endDate);
}

function currenttime()
{
	 var d = new Date();
       var time = leadingZeros(d.getFullYear(), 4)  +
		    	leadingZeros(d.getMonth() + 1, 2) + 
		    	leadingZeros(d.getDate(), 2) + 
		    	leadingZeros(d.getHours(), 2) + 
		    	leadingZeros(d.getMinutes(), 2);
       return time;
}
function leadingZeros(n, digits)
{
	var zero = '';
	n = n.toString();
	
	if (n.length < digits) {
	for (i = 0; i < digits - n.length; i++)
	zero += '0';
	}
	return zero + n;
}

function todayCalc()
{
	var date=new Date();
	var today=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate()+(date.getHours()-1).toString()+"00";
	return today;
}

function dateValidate(){
	var startDate=$("#startDate").val();
	var endDate=$("#endDate").val();
	var date=new Date();
	var today=todayCalc();
//	console.log("today : "+today);
	startDate=Number(startDate);
	endDate=Number(endDate);
	if(startDate=="" || endDate==""){
		axDialog.alert({
            theme: "primary",
            title:" ",
            msg: "Please enter start date or end date."
    	})
		return false;
	}
	if(startDate>endDate){
		axDialog.alert({
            theme: "primary",
            title:" ",
            msg: "Start date can not be greater than end date."
    	})
		$("#startDate").val("");
		return false;
	}
}

var datetimepickerOptions = {
		validateOnBlur: false,
		format:'YmdH00'
	};

$(document).on("click","#startDate",function(){
	$(this).datetimepicker(datetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#endDate",function(){
	$(this).datetimepicker(datetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#startCalendar",function(){
	$("#startDate").datetimepicker(datetimepickerOptions).datetimepicker("show");
});

$(document).on("click","#endCalendar",function(){
	$("#endDate").datetimepicker(datetimepickerOptions).datetimepicker("show");
});

