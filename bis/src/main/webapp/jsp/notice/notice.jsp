<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
    <jsp:attribute name="script">
    	<ax:script-lang key="ax.script" />
        <ax:script-lang key="bis.notice" var="COL" />
        <ax:script-lang key="ax.promotion" var="NOTICE" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/notice/notice.js' />"></script>
    </jsp:attribute>
    
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl">
                    <ax:tr>
                        <ax:td label='ax.promotion.search.searchDiv' width="230px" labelWidth="80px">
                        	<select id="searchDiv" data-ax-path="searchDiv" style="vertical-align: middle;" class="form-control"> 
                        		<option value="NOTICE_NAME"><ax:lang id="bis.notice.name"/></option>
                        		<option value="NOTICE_CONTENT"><ax:lang id="bis.notice.content"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchData' width="200px" labelWidth="80px">
                        	<input id="searchData" type="text" data-ax-path="searchData" class="form-control W100"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="380" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="bis.notice.list"/> </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="bis.notice.detail"/>
                        </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear"/>
                        </button>
                         <button type="button" class="btn btn-default" data-grid-view-01-btn="delete">
                                <i class="cqc-minus"></i>
                                <ax:lang id="ax.admin.delete"/>
                         </button>
                    </div>
                </div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="bis.notice.id" width="300px" style="height:46px;">
                                <input type="text" id="noticeId" data-ax-path="noticeId" class="form-control" onblur="byteCalc(this)" style="margin-top:3px;" readonly="readonly"  value=""/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="bis.notice.name" width="300px">
                                <input style="margin-top:3px;" type="text" data-ax-path="noticeName"  limitbyte="50" onblur="byteCalc(this)" data-ax-validate="required"  title="<ax:lang id="ax.promotion.scenarioName"/>" class="form-control" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                             <ax:td label="bis.notice.content" style="width:99%;">
                                <textarea data-ax-path="noticeContent" class="form-control" style="height:300px;"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>

					<input type="hidden" value="${loginUser.userNm}" id="userId"/>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>