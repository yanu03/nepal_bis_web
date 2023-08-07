<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery.datetimepicker.css' />"/ >
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.promotion" var="COL" />
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
          <script type="text/javascript" src="<c:url value='/assets/js/common/common.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/promotion/promotion-scenario.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
         <script type="text/javascript" src="<c:url value='/assets/js/jquery.datetimepicker.full.min.js' />"></script>
    </jsp:attribute>
    
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl">
                    <ax:tr>
                        <ax:td label='ax.promotion.search.useYn' width="200px" labelWidth="80px" >
                        	<select id="useYn" data-ax-path="useYn" style="vertical-align: middle;" class="form-control" >
                        		<option value=""><ax:lang id="ax.admin.useAll"/></option>
                        		<option value="Y"><ax:lang id="ax.admin.useY"/></option>
                        		<option value="N"><ax:lang id="ax.admin.useN"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchDiv' width="230px" labelWidth="80px">
                        	<select id="searchDiv" data-ax-path="searchDiv" style="vertical-align: middle;" class="form-control"> 
                        		<option value="SCENARIO_NAME"><ax:lang id="ax.promotion.scenarioName"/></option>
                        		<option value="SCENARIO_ID"><ax:lang id="ax.promotion.scenarioId"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchData' width="200px" labelWidth="80px">
                        	<input id="searchData" type="text" data-ax-path="searchData" class="form-control W150"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="432" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.promotion.scenario.list"/> </h2>
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
                            <ax:td label="ax.promotion.scenarioId" width="300px" style="height:46px;">
                                <input type="text" data-ax-path="scenarioId" class="form-control" style="margin-top:3px;" readonly="readonly"  value=""/>
                            </ax:td>
                             <ax:td label="ax.promotion.useYn" width="300px" style="height:46px;">
                               <select data-ax-path="useYn" class="form-control W100" style="margin-top:3px;">
                                   <option value="Y"><ax:lang id="ax.admin.useY"/></option>
                                   <option value="N"><ax:lang id="ax.admin.useN"/></option>
                               </select>
                         	</ax:td>
                           <%--  <ax:td label="ax.promotion.scenarioType" width="300px">
                            	<ax:BisCtDetailCode id="scenarioType" groupCd="SCENARIO_TYPE" dataPath="scenarioType" />
			               </ax:td> --%>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.promotion.scenarioName" width="300px">
                                <input style="margin-top:3px;" type="text" data-ax-path="scenarioName"  limitbyte="40" onblur="byteCalc(this)" data-ax-validate="required"  title="<ax:lang id="ax.promotion.scenarioName"/>" class="form-control" />
                            </ax:td>
                            <ax:td label="ax.promotion.scenarioEname" width="300px">
                                <input style="margin-top:3px;" type="text" data-ax-path="scenarioEname" limitbyte="40" onblur="byteCalc(this)" class="form-control" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.promotion.startDate" width="300px">
	                            <div class="input-group">
	                                <input  readonly="readonly" type="text" class="form-control"  id="scStartDate" onchange="scDateValidate()" placeholder="yyyymmdd" data-ax-path="startDate" />
	                                <span class="input-group-addon"><i id="scStartCalendar" class="cqc-calendar"></i></span>
	                            </div>
	                        </ax:td>
	                        <ax:td label="ax.promotion.startTime" width="300px">
                           	 	<select id="startTime" data-ax-path="startTime" class="form-control W60" onchange="timeCheck()">
	                                <c:forEach begin="0" end="23" varStatus="status">
	                                	<option value="${status.count-1}">${status.count-1} h</option>
	                                </c:forEach>
                                </select>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                        	 <ax:td label="ax.promotion.endDate" width="300px">
                            	<div class="input-group">
	                                <input readonly="readonly" type="text" class="form-control" id="scEndDate" onchange="scDateValidate()" placeholder="yyyymmdd" data-ax-path="endDate" />
	                                <span class="input-group-addon"><i id="scEndCalendar" class="cqc-calendar"></i></span>
	                            </div>
                            </ax:td>
                            <ax:td label="ax.promotion.endTime" width="300px">
                                <select id="endTime" data-ax-path="endTime" class="form-control W60" onchange="timeCheck()">
	                               <c:forEach begin="0" end="23" varStatus="status">
	                                	<option value="${status.count-1}">${status.count-1} h</option>
	                                </c:forEach>
                                </select>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.promotion.remark" width="100%">
                                <textarea data-ax-path="remark" limitbyte="100" onblur="byteCalc(this)" class="form-control"></textarea>
                            </ax:td>
                        </ax:tr>
                      
                            
                    </ax:tbl>

                    <%-- <div class="H5"></div>
                    <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.sample.child.list"/></h3>
                        </div>
                        <div class="right">
                            <button type="button" class="btn btn-default" data-grid-view-02-btn="item-add">
                                <i class="cqc-plus"></i>
                                <ax:lang id="ax.admin.add"/>
                            </button>
                            <button type="button" class="btn btn-default" data-grid-view-02-btn="item-remove">
                                <i class="cqc-minus"></i>
                                <ax:lang id="ax.admin.delete"/>
                            </button>
                        </div>
                    </div> 

                    <div data-ax5grid="grid-view-02" style="height: 300px;"></div>  --%>
					<input type="hidden" value="${loginUser.userNm}" id="userId"/>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>