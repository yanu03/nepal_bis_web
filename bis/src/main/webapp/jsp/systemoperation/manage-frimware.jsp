<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/manage-frimware.js' />"></script>
         <ax:script-lang key="bis" var="COL" />
      <script>
      var datetimepickerOptions = {
    			validateOnBlur: false,
    			format:'YmdH00'
    		};
    	$(document).on("click","#datetimepicker",function(){
    		$(this).datetimepicker(datetimepickerOptions).datetimepicker("show");
    	});

    	$(document).on("click","#Calendar",function(){
    		$("#datetimepicker").datetimepicker(datetimepickerOptions).datetimepicker("show");
    	});
    	
    	
       $( "#slider-vertical" ).slider({
         range: "min",
         min: 0,
         max: 10,
         value: 0,
         slide: function( event, ui ) {
           $( "#amount" ).val( ui.value );
         }
       });
       $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
         </script>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>

        </ax:page-buttons>
        <div role="page-header">
              <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                   <%--    <ax:td label='bis.useyn' width="180px" labelWidth="80px">
                     <select class="form-control" id="" name="" data-ax-path="useYn" >
                      <option value="">All</option>
                      <option value="Y">사용</option>
                      <option value="N">미사용</option>
                     </select>
                   </ax:td> --%>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
                        <select class="form-control" id="" name="" data-ax-path="Select" >
                        	<option value="BIT">BIT</option>
                        	<option value="TERMINAL">TERMINAL</option>
                     </select>
                        </ax:td>
                        <ax:td label='bis.search' width="300px" labelWidth="80px">
                             <input type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
        </div>
        
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="918" >

                <!-- 목록 -->
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
              
            </ax:split-panel>
            
           <ax:splitter></ax:splitter>
        
                        <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                        
          <!--  <div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">

			<div data-ax-tr="" id="" class="" style="">
					<div  style="width:100%;" data-ax-td="">
					    <div style="width:100%; " data-ax-td-label="" >
								<div id="selectType"></div>
								<div style="display:none;" id="typeid"></div>
								<div style="display:none;" id="type"></div>
						</div>
					</div>
				</div>
			</div>
			<div data-fit-height-aside="grid-view-02">
				<div class="ax-button-group">
					<div class="left">
						<h2><i class="cqc-list"></i>Version Info</h2>
					</div>
				</div>
			</div>
			 <div data-ax5grid="grid-view-02"  style="height: 200px;"></div>
			 
			<br/> -->
			
		<ax:form name="formView01">
			<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
					
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:100%;" data-ax-td="">
				    <div style="width:100%; " data-ax-td-label="" >Master Information</div>
				</div>
				
			</div>
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:320;" data-ax-td="">
					<div style="width:120px; " data-ax-td-label="" >Apply Date</div>
					<div data-ax-td-wrap="">
						<div class="input-group">
                    		<input type="text" class="form-control" id="datetimepicker" placeholder="yyyymmddHHmm" readonly/>
                    		<span class="input-group-addon"><i id="Calendar" class="cqc-calendar"></i></span>
                    	</div>
		 		  	</div>
				</div>
				<div  style="width:300px" data-ax-td="">
				   <!--  <div style="width:120px; " data-ax-td-label="" >Send</div> -->
				    <div data-ax-td-wrap="">
				        	<button class="btn btn-primary" data-form-view-01-btn="Send">Send</button>
				        	<button class="btn btn-primary" data-form-view-01-btn="All">All</button>
				    </div>
				</div>
			</div>
		</div>
	</ax:form> 
	<br/>
			<ax:form name="firmware">
					<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:100%;" data-ax-td="">
				    <div style="width:100%; " data-ax-td-label="" >Firmware</div>
				</div>
			</div>
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:300px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >Type</div>
					 <div data-ax-td-wrap="">
					 <div class="form-inline">
							<div class="form-group">
								<select id="filecode" data-ax-path="fileCode" style="vertical-align: middle;" class="form-control" >
	                       			<option value=100 id="terminalfw1">Terminal firmware1</option>
	                       			<option value=101 id="terminalfw2">Terminal firmware2</option>
	                       			<option value=150 id="bitfw"  style="display:none;">BIT firmware</option>
                      			</select>
							</div>
						</div>	
			   		 </div>
				</div>
				     <input type="hidden" class="form-control" id="applyDate" readonly/>
				<!-- 적용시간 -->

				<div  style="width:400px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >File</div>
					 <div data-ax-td-wrap="">
							 	<div  style="float:left">
							 		<input type="text" id="filename" name="filename" title="File" style="width:200px" data-ax-validate="required" class="form-control" size="30" value="" readonly/>
							 	 		
							 	  	</div>
							 	  	  	 <button id="fileButton" style="float:left" class="btn btn-primary">Search</button>
							 	  	  
			                        <input style="display:none;" type="file" accept=".zip" data-ax-path="upFile" id="upFile" name="upFile" onchange="javascript:getCmaFileView(this,'stype');"/>
				   		 </div>
					</div>
				<div  style="width:100px" data-ax-td="">
				  <!--   <div style="width:120px; " data-ax-td-label="" >Send</div> -->
				    <div data-ax-td-wrap="">
				        	<button class="btn btn-primary"  data-firmware-btn="send">Send</button>
							<button class="btn btn-primary"  data-firmware-btn="All">All</button>
				    </div>
				</div>
		</div>
			</div>
			</ax:form>
 		
			  <br/>
				<div id="" class="ax-form-tbl" style="" data-ax-tbl="control">
					<div data-ax-tr="" id="" class="" style="">
						<div  style="width:100%;" data-ax-td="">
							<div style="width:120px; " data-ax-td-label="" >Control</div>
						</div>
					</div>
					<div data-ax-tr="" id="" class="" style="">
						<div  style="width:220px;" data-ax-td="">
							<div style="width:120px; " data-ax-td-label="" >Power Restart</div>
							<div data-ax-td-wrap="">
								<div style="float:right;">
						        	<button class="btn btn-primary"  data-ui-btn="resetOne">Send</button>
					        		<button class="btn btn-primary"  data-ui-btn="resetAll">All</button>
					 		  	</div>
				 		  	</div>
						</div>
					
							<div  style="width:300px;display:none;" id="monitorform" data-ax-td="">
								<div style="width:120px; " data-ax-td-label="" >Monitor ON/OFF</div>
								<div data-ax-td-wrap="">
									<div class="form-inline">
								   		  	<select class="form-control" style="width:80px" id="monitor" name="" data-ax-path="modem" >
								   		  			 <option value="1">ON</option>
													 <option value="2">OFF</option>
											</select>
											<div style="float:right;">
								      		  	<button class="btn btn-primary"  data-ui-btn="MonitorOne">Send</button>
							        			<button class="btn btn-primary"  data-ui-btn="MonitorAll">All</button>
						 		  		</div>		
									</div>
					 		  	</div>									
							</div>
					</div>
				</div>
				<br/>
	<ax:form name="schedule">
		<div id="scheduleManaged" style="display:none" class="ax-form-tbl" style="" data-ax-tbl="controll">
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:100%;" data-ax-td="">
				    <div style="width:100%; " data-ax-td-label="" >BIT Schedule</div>
				</div>
			</div>
				<div data-ax-tr="" id="" class="" style="">
					<div  style="width:445px;" data-ax-td="">
					    <div style="width:120px; " data-ax-td-label="" >Command</div>
					    <div data-ax-td-wrap="">
						    <ul class="checkList" style="margin-top:7px">
								<li><input type="radio" name="box" data-ax-path="schedule"  value="0">Scenario</li>
							 	<li><input type="radio" name="box" data-ax-path="schedule" value="1">Monitor ON/OFF</li>
								<li><input type="radio" name="box" data-ax-path="schedule" value="2">Illuminance</li>
			       			</ul>
					    </div>
					</div>
					
					<div  style="width:300px" data-ax-td="">
					    <div data-ax-td-wrap="">
				        	<button class="btn btn-primary" data-schedule-btn="Send">Send</button>
				        	<button class="btn btn-primary" data-schedule-btn="All">All</button>
					    </div>
					</div>
			    </div>
			</div>
		</ax:form> 
				</ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>