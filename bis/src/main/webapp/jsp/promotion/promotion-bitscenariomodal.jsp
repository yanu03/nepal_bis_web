<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>
<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.promotion" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/promotion/promotion-bitscenarioModal.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.promotion.scenario.list"/></h3>
        </h1>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
           <%--  <button type="button" class="btn btn-info" data-page-btn="search"><ax:lang id="ax.admin.sample.modal.button.search"/></button> --%>
            <button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
            <button type="button" class="btn btn-primary" data-page-btn="search"><i class="cqc-magnifier"></i><ax:lang id="ax.admin.search"/></button>
        </ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                   <ax:tr>
                       <%--  <ax:td label='ax.promotion.search.useYn' width="180px" labelWidth="80px">
                        	<select id="useYn" data-ax-path="useYn" style="vertical-align: middle;" class="form-control" >
                        		<option value=""><ax:lang id="ax.admin.useAll"/></option>
                        		<option value="Y"><ax:lang id="ax.admin.useY"/></option>
                        		<option value="N"><ax:lang id="ax.admin.useN"/></option>
	                        </select>
                        </ax:td> --%>
                        <ax:td label='ax.promotion.search.searchDiv' width="230px" labelWidth="80px">
                        	<select id="searchDiv" data-ax-path="searchDiv" style="vertical-align: middle;" class="form-control"> 
                        		<option value="BIT_NAME"><ax:lang id="ax.promotion.bitName"/></option>
                        		<option value="BIT_ID"><ax:lang id="ax.promotion.bitId"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchData' width="200px" labelWidth="80px">
                        	<input id="searchData" type="text" data-ax-path="searchData"  class="form-control W150"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <%-- <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            List </h2>
                    </div>
                    <div class="right">

                    </div>
                </div> --%>

                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

        <%--     </ax:split-panel>
        </ax:split-layout> --%>
    </jsp:body>
</ax:layout>