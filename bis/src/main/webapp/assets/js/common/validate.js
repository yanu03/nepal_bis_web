
function onlyNumber(obj) {
    $(obj).keyup(function(){
    	var val = parseInt($(this).val().replace(/[^0-9]/g,""));
    	if(2147483647 < val)
    		{
    		axDialog.alert({
                theme: "primary",
                msg: COL("maxnumber")
            });
    		  $(this).val("").focus();

    		}
    		else
    		{
    		    $(this).val($(this).val().replace(/[^0-9]/g,""));
    		}
         
    }); 
}
// onkeydown="onlyNumber(this)"
