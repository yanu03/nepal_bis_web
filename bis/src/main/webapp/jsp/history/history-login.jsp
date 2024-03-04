<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="system-config-program-version" value="1.0.0"/>
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
        <%-- <ax:script-lang key="ax.admin" var="COL" /> --%>
        <script type="text/javascript" src="<c:url value='/assets/js/view/history/history-login.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/jquery.datetimepicker.full.min.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <%-- <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.input.search"/>
                            <ax:input type="text" name="filter" id="filter" clazz="form-control"/>
                        </ax:td> --%>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
                        	<select class="form-control W150" data-ax-path="Select" id="Select">
                        		<option value="userCode"><ax:lang id="ax.admin.user.id"/></option>
                        		<option value="userName"><ax:lang id="ax.admin.user.name"/></option>
                        	</select>
                        </ax:td>
                        <ax:td label='bis.search' width="300px" labelWidth="80px">
                        	<div class="input-group">
                        		<input type="text" class="form-control" id="Keyword"  data-ax-path="Keyword" id="Keyword"/>
                        	</div>
                        </ax:td>
                        <ax:td label='ax.promotion.startDate' width="300px" labelWidth="100px">
                        	<div class="input-group">
                        		<input type="text" class="form-control" id="startDate" placeholder="yyyymmddHHmm" data-ax-path="startDate" onchange="dateValidate()" readonly/>
                        		<span class="input-group-addon"><i id="startCalendar" class="cqc-calendar"></i></span>
                        	</div>
                        </ax:td>
                        <ax:td label='ax.promotion.endDate' width="300px" labelWidth="80px">
                        	<div class="input-group">
                        		<input type="text" class="form-control" id="endDate" placeholder="yyyymmddHHmm" data-ax-path="endDate" onchange="dateValidate()" readonly/>
                        		<span class="input-group-addon"><i id="endCalendar" class="cqc-calendar"></i></span>
                        	</div>
                        </ax:td>                        
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.user.title"/> </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>