<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
		<c:choose>
			<c:when test="${loginLocale == 'nep'}">
				<ax:script-lang key="axnep" var="COLA" />
			</c:when>
			<c:when test="${loginLocale == 'en'}">
				<ax:script-lang key="axen" var="COLA" />
			</c:when>
			<c:when test="${loginLocale == 'ko'}">
				<ax:script-lang key="axko" var="COLA" />
			</c:when>
		</c:choose>        
        <%-- <ax:script-lang key="ax.code" var="COL" /> --%>
        <script type="text/javascript" src="<c:url value='/assets/js/view/managed/manage-code.js' />"></script>
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

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="400" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.managed.parent.list"/> </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <%-- <div class="ax-button-group" role="panel-header">
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
                </div> --%>
                <ax:form name="formView01">
                	
                    <%--  <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.key" width="300px">
                                <input type="text" data-ax-path="key" title="Key" class="form-control" data-ax-validate="required" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.value" width="300px">
                                <input type="text" data-ax-path="value" class="form-control" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.etc1" width="300px">
                                <input type="text" data-ax-path="etc1" class="form-control" data-ax5formatter="money" />
                            </ax:td>
                            <ax:td label="ax.admin.sample.form.etc2" width="300px">
                                <select data-ax-path="etc2" class="form-control W100">
                                    <option value="ko_KR"><ax:lang id="ax.admin.sample.language.korean"/></option>
                                    <option value="en_US"><ax:lang id="ax.admin.sample.language.english"/></option>
                                </select>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.etc3" width="300px">
                                <select data-ax-path="etc3" class="form-control W100">
                                    <option value="Y"><ax:lang id="ax.admin.used"/></option>
                                    <option value="N"><ax:lang id="ax.admin.not.used"/></option>
                                </select>
                            </ax:td>
                            <ax:td label="ax.admin.sample.form.etc4" width="220px">
                                <ax:common-code groupCd="USER_STATUS" dataPath="userStatus"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.etc5" width="100%">
                                <textarea data-ax-path="etc5" class="form-control"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl> --%>

                   
                    <div class="ax-button-group" data-fit-height-aside="grid-view-02">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.managed.child.list"/></h3>
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

                    <div data-ax5grid="grid-view-02"  data-fit-height-content="grid-view-02" style="height: 300px;"></div>
					<input type="hidden" value="${loginUser.userNm}" id="userId"/>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>