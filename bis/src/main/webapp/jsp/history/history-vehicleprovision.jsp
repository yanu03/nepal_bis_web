<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery.datetimepicker.css' />"/ >
    </jsp:attribute>
    <jsp:attribute name="script">
    	<ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.history" var="COL" />
        <ax:script-lang key="ax.promotion" var="PRO" />
        <ax:script-lang key="bis" var="BIS" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/common.js' />"></script>
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/history/history-vehicleprovision.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/jquery.datetimepicker.full.min.js' />"></script>
    </jsp:attribute>
   
    <jsp:body>
        <ax:page-buttons>
        	<button type="button" class="btn btn-info" data-page-btn="excel" id="excelExport">
        		<i class="cqc-file-excel-o"></i>
        		 Excel
        	</button>
        </ax:page-buttons>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="560" style="padding-right:10px;">
				        <div   data-fit-height-aside="grid-view-01">
				            <ax:form name="searchView0">
				                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
									<ax:tr>
				                        <ax:td label='ax.promotion.search.searchDiv' width="250px" labelWidth="80px">
				                        	<select class="form-control W150" data-ax-path="Select" id="Select">
				                        		<option value="plateNumber">PLATE NUMBER</option>
				                        	</select>
				                        </ax:td>
				                        <ax:td label='ax.promotion.search.searchData' width="300px" labelWidth="80px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="Keyword"  data-ax-path="Keyword" id="Keyword"/>
				                        		<span class="input-group-btn">
				                        			<button type="button" id="rightSearchButton" class="btn btn-primary" data-grid-view-01-btn="item-search">
					                                	<ax:lang id="ax.admin.search"/>
					                            	</button>
					                            </span>
				                        	</div>
				                        		
				                        </ax:td>
				                    </ax:tr>
				                </ax:tbl>
				            </ax:form>
				            <div class="H10"></div>
				        </div> 
                <!-- 목록 -->
               
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left:10px;" scroll="scroll">
            	 <div   data-fit-height-aside="grid-view-02">
				            <ax:form name="searchView1">
				                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
									<ax:tr>
				                        <ax:td label='ax.promotion.startDate' width="300px" labelWidth="100px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="startDate" placeholder="yyyymmddHHmm" data-ax-path="startDate" onchange="dateValidate()" />
				                        		<span class="input-group-addon"><i id="startCalendar" class="cqc-calendar"></i></span>
				                        	</div>
				                        </ax:td>
				                        <ax:td label='ax.promotion.endDate' width="300px" labelWidth="80px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="endDate" placeholder="yyyymmddHHmm" data-ax-path="endDate" onchange="dateValidate()" />
				                        		<span class="input-group-addon"><i id="endCalendar" class="cqc-calendar"></i></span>
				                        	</div>
				                        </ax:td>
				                        <%-- <ax:td>
				                        	 <button type="button" class="btn btn-default" data-grid-control="excel-export">
					                                Excel Export
					                         </button>     
				                        </ax:td> --%>
				                    </ax:tr>
				                </ax:tbl>
				            </ax:form>
				            <div class="H10"></div>
				        </div> 
                <div data-ax5grid="grid-view-02"  data-fit-height-content="grid-view-02" style="height: 300px;" ></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>