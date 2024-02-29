<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="system-common-code-version" value="1.0.0"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
		<c:choose>
			<c:when test="${loginLocale == 'nep'}">
				<ax:script-lang key="axnep" var="COLA" />
				<ax:script-lang key="axnep" var="COL" />
			</c:when>
			<c:when test="${loginLocale == 'en'}">
				<ax:script-lang key="axen" var="COLA" />
				<ax:script-lang key="axen" var="COL" />
			</c:when>
			<c:when test="${loginLocale == 'ko'}">
				<ax:script-lang key="axko" var="COLA" />
				<ax:script-lang key="axko" var="COL" />
			</c:when>
		</c:choose>        
        <%-- <ax:script-lang key="ax.admin" var="COL" /> --%>
        <script type="text/javascript" src="<c:url value='/assets/js/axboot/system/system-config-common-code.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='bis.useyn' width="200px" labelWidth="80px">
                        	<select id="useYn" data-ax-path="useYn" style="vertical-align: middle;" class="form-control" >
                        		<option value=""><ax:lang id="ax.admin.useAll"/></option>
                        		<option value="Y"><ax:lang id="ax.admin.useY"/></option>
                        		<option value="N"><ax:lang id="ax.admin.useN"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
                        	<select id="searchDiv" data-ax-path="searchDiv" style="vertical-align: middle;" class="form-control">
                        		<option value="COMMON_CODE_NAME"><ax:lang id="ax.code.group.CodeName"/></option>
                        		<option value="COMMON_CODE"><ax:lang id="ax.code.group.Code"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='bis.search' width="200px" labelWidth="80px" >
                        	<input id="searchData" type="text" data-ax-path="searchData" class="form-control W100" />
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
                        <h2>
                            <i class="cqc-list"></i>
                            <ax:lang id="ax.admin.commoncode.title"/>
                        </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-circle-with-plus"></i> <ax:lang id="ax.admin.add"/></button>
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="delete"><i class="cqc-circle-with-minus"></i> <ax:lang id="ax.admin.delete"/></button>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
        </ax:split-layout>


    </jsp:body>
</ax:layout>