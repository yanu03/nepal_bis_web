<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
        <style type="text/css">
               #datepickerbutton1,#datepickerbutton2 {cursor:pointer; }
        </style>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.promotion" var="COLA" />
         <ax:script-lang key="bis" var="COL" />
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/schedule/schedulelist.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
                   <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
        $(function() {
        	  $( "#datepicker1" ).datepicker({
        	    dateFormat: 'mmdd'
        	  });
        	  $("#datepickerbutton1").on("click", function(e){
                  $('#datepicker1').datepicker('show');
              });
        	  
        	  $( "#datepicker2" ).datepicker({
          	    dateFormat: 'mmdd'
          	  });
          	  $("#datepickerbutton2").on("click", function(e){
                    $('#datepicker2').datepicker('show');
                });
        	});
      </script>
    </jsp:attribute>
    
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl">
                    <ax:tr>
                    <ax:td label='bis.useyn' width="180px" labelWidth="80px">
							<select class="form-control" id="" name="" data-ax-path="useYn" >
								 <option value=""><ax:lang id="bis.useyn.all"/></option>
								 <option value="Y"><ax:lang id="bis.useyn.y"/></option>
								 <option value="N"><ax:lang id="bis.useyn.n"/></option>
							</select>
						 </ax:td>
						 <ax:td label='bis.division' width="250px" labelWidth="80px">
  						 	<select class="form-control" id="" name="" data-ax-path="Select" >
								<option value="scheduleId"><ax:lang id="bis.systemschedule.scheduleid"/></option>
							</select>
                        </ax:td>
                         <ax:td label='bis.search' width="180px" labelWidth="80px">
                        	  <input type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="550" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                          SCHEDULE LIST </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.sample.parent.information"/>
                        </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                    </div>
                </div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="bis.systemschedule.scheduleid" width="300px" >
                                <input type="text" data-ax-path="scheduleId" class="form-control" style="margin-top:3px;" readonly="readonly"  value=""/>
                            </ax:td>
                             <ax:td label="bis.systemschedule.schedulecode" width="300px" style="height:46px;">
 								<ax:BisCtDetailCode groupCd="SCHEDULE_CODE" dataPath="scheduleCode" clazz="form-control"/>  
                         
                            </ax:td>
                               <ax:td label="ax.promotion.startDate" width="300px">
		                            <div class="input-group">
	<!-- 	                            <div class="input-group" data-ax5picker="date"> -->
		                                <input  readonly="readonly" type="text" data-ax-validate="required"  title="START DATE" class="form-control"  id="datepicker1" placeholder="mmdd" data-ax-path="startDate" />
		                               <span class="input-group-addon" id="datepickerbutton1"><i class="cqc-calendar"></i></span>
		                            </div>
	                          </ax:td>
                        </ax:tr>
                        <ax:tr>
	                     
                            <ax:td label="ax.promotion.endDate" width="300px">
                            	<div class="input-group">
	                                <input readonly="readonly" type="text" data-ax-validate="required"  title="END DATE" class="form-control" id="datepicker2"  placeholder="mmdd" data-ax-path="endDate" />
	                                <span class="input-group-addon" id="datepickerbutton2"><i class="cqc-calendar"></i></span>
	                            </div>
                            </ax:td>
                            <ax:td label="ax.promotion.startTime" width="300px">

								<div style="float:left" class="input-group">
	                               <select style="width:93px;" id="startTime" data-ax-path="startTime" class="form-control" >
		                               <option value="00">00 </option>
		                               <option value="01">01 </option>
		                               <option value="02">02 </option>
		                               <option value="03">03 </option>
		                               <option value="04">04 </option>
		                               <option value="05">05 </option>
		                               <option value="06">06 </option>
		                               <option value="07">07 </option>
		                               <option value="08">08 </option>
		                               <option value="09">09 </option>
		                               <option value="10">10 </option>
		                               <option value="11">11 </option>
		                               <option value="12">12 </option>
		                               <option value="13">13 </option>
		                               <option value="14">14 </option>
		                               <option value="15">15 </option>
		                               <option value="16">16 </option>
		                               <option value="17">17 </option>
		                               <option value="18">18 </option>
		                               <option value="19">19 </option>
		                               <option value="20">20 </option>
		                               <option value="21">21 </option>
		                               <option value="22">22 </option>
		                               <option value="23">23 </option>
                               	   </select>
                                </div>
								<div style="float:left" class="input-group">
	                               <select style="width:93px;"id="startMin" data-ax-path="startMin" class="form-control" >
	                               <option value="00">00 </option>
	                               <option value="01">01 </option>
	                               <option value="02">02 </option>
	                               <option value="03">03 </option>
	                               <option value="04">04 </option>
	                               <option value="05">05 </option>
	                               <option value="06">06 </option>
	                               <option value="07">07 </option>
	                               <option value="08">08 </option>
	                               <option value="09">09 </option>
	                               <option value="10">10 </option>
									<c:forEach var="i" begin="11" end="59" step="1">
										   <option value="${i}">${i} </option>
									</c:forEach>
                                </select>
                                </div>
                            </ax:td>
                          	<ax:td label="ax.promotion.endTime" width="300px">
                           	   <div style="float:left" class="input-group">
	                               <select style="width:93px;" id="endTime" data-ax-path="endTime" class="form-control">
		                               <option value="00">00  </option>
		                               <option value="01">01  </option>
		                               <option value="02">02  </option>
		                               <option value="03">03  </option>
		                               <option value="04">04  </option>
		                               <option value="05">05  </option>
		                               <option value="06">06  </option>
		                               <option value="07">07  </option>
		                               <option value="08">08  </option>
		                               <option value="09">09  </option>
		                               <option value="10">10 </option>
		                               <option value="11">11 </option>
		                               <option value="12">12 </option>
		                               <option value="13">13 </option>
		                               <option value="14">14 </option>
		                               <option value="15">15 </option>
		                               <option value="16">16 </option>
		                               <option value="17">17 </option>
		                               <option value="18">18 </option>
		                               <option value="19">19 </option>
		                               <option value="20">20 </option>
		                               <option value="21">21 </option>
		                               <option value="22">22 </option>
		                               <option value="23">23 </option>
	                               </select>
	                          
                               </div>
                                  <div style="float:left" class="input-group">
                                    <select  id="endMin" style="width:93px;" data-ax-path="endMin" class="form-control" >
		                               <option value="00">00 </option>
		                               <option value="01">01 </option>
		                               <option value="02">02 </option>
		                               <option value="03">03 </option>
		                               <option value="04">04 </option>
		                               <option value="05">05 </option>
		                               <option value="06">06 </option>
		                               <option value="07">07 </option>
		                               <option value="08">08 </option>
		                               <option value="09">09 </option>
		                               <option value="10">10 </option>
										<c:forEach var="i" begin="11" end="59" step="1">
											   <option value="${i}">${i} </option>
										</c:forEach>
                                </select>
                                </div>
                			 </ax:td>
                        </ax:tr>
		                <ax:tr>
		                   <ax:td label="bis.systemschedule.schedulevalue" width="300px">
                           	 	<select id="scheduleValue" style="margin-top:3px;" data-ax-path="scheduleValue" class="form-control">  <!--  onchange="timeCheck()" -->
	                                	<option value="1">1</option>
	                                	<option value="2">2</option>
	                                	<option value="3">3</option>
	                                	<option value="4">4</option>
	                                	<option value="5">5</option>
	                                	<option value="6">6</option>
	                                	<option value="7">7</option>
	                                	<option value="8">8</option>
	                                	<option value="9">9</option>
	                                	<option value="10">10</option>
                                </select>
                            </ax:td>
                            	<div  style="width:300px;" data-ax-td="">
								    <div style="width:100px; height:46px "data-ax-td-label="" ><ax:lang id="bis.remark"/></div>
									 <div data-ax-td-wrap="">
										  <input type="text" style="margin-top:3px;" name="remark" data-ax-path="remark" maxlength="255" title="" class="form-control" value=""/>
							   		 </div>
								</div>
               			      <div  style="width:300px;" data-ax-td="">
								    <div style="width:100px; height:46px "data-ax-td-label="" ><ax:lang id="bis.updatedate"/></div>
									 <div data-ax-td-wrap="">
   										<input type="text" style="margin-top:3px;" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
							   		 </div>
								</div>
						</ax:tr>       
						<ax:tr>              
                            <ax:td label="bis.useyn" width="300px">
                                <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control"/>
                            </ax:td>
                              <ax:td label="bis.userid" width="300px">
                                <input type="text" name="userId" data-ax-path="userId" maxlength="100" title="" class="form-control" value="" readonly/>
                            </ax:td>
						</ax:tr>  
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>