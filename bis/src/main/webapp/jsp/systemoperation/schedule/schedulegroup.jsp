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
		<c:choose>
			<c:when test="${loginLocale == 'nep'}">
			<ax:script-lang key="axnep" var="COLA" />
			<ax:script-lang key="bisnep" var="COL" />
			</c:when>
			<c:when test="${loginLocale == 'en'}">
			<ax:script-lang key="axen" var="COLA" />
			<ax:script-lang key="bisen" var="COL" />
			</c:when>
			<c:when test="${loginLocale == 'ko'}">
			<ax:script-lang key="axko" var="COLA" />
			<ax:script-lang key="bisko" var="COL" />
			</c:when>
		</c:choose>
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/schedule/schedulegroup.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
                   <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
        $(function() {
        	  $( "#datepicker1" ).datepicker({
        	    dateFormat: 'yymmdd'
        	  });
        	  $("#datepickerbutton1").on("click", function(e){
                  $('#datepicker1').datepicker('show');
              });
        	  
        	  $( "#datepicker2" ).datepicker({
          	    dateFormat: 'yymmdd'
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
  						 	<select class="form-control" id="" name="" data-ax-path="Select" readonly>
								<option value="scheduleGroupId"><ax:lang id="bis.systemschedulegroup.schedulegroupid"/></option>
							</select>
                        </ax:td>
                         <ax:td label='bis.search' width="300px" labelWidth="80px">
                        	  <input style="width:200px; type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="696" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="bis.systemschedulegroup.scheduleList"/></h2>
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
                            <ax:td label="bis.systemschedulegroup.schedulegroupid" width="300px" >
                                <input type="text" data-ax-path="scheduleGroupId" class="form-control" style="margin-top:3px;" readonly="readonly"  value=""/>
                            </ax:td>
                             <ax:td color="red" label="bis.systemschedule.schedulecode" width="300px" style="height:46px;">
								<ax:BisCtDetailCode groupCd="SCHEDULE_CODE" dataPath="scheduleCode" clazz="form-control"/>  
                            </ax:td>
                        </ax:tr>
		                <ax:tr>
               			      <div  style="width:300px;" data-ax-td="">
								    <div style="width:100px;"data-ax-td-label="" ><ax:lang id="bis.updatedate"/></div>
									 <div data-ax-td-wrap="">
   										<input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
							   		 </div>
								</div>
								 <ax:td label="bis.useyn" width="300px">
                                <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control"/>
                            </ax:td>
                            <ax:td label="bis.userid" width="300px">
                                <input type="text" name="userId" data-ax-path="userId" maxlength="100" title="" class="form-control" value="" readonly/>
                            </ax:td>
						</ax:tr>
						<ax:tr>
							<div  style="width:300px;" data-ax-td="">
							    <div style="width:100px; "data-ax-td-label="" ><ax:lang id="bis.remark"/></div>
								 <div data-ax-td-wrap="">
									  <input type="text" name="remark" data-ax-path="remark" maxlength="255" title="" class="form-control" value=""/>
						   		 </div>
							</div>
						</ax:tr>
						       
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>