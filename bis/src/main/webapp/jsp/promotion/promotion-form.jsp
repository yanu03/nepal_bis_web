<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>
<ax:layout name="base">
	<jsp:attribute name="css">
    	<link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
    	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery.datetimepicker.css' />"/>
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    </jsp:attribute>
    <jsp:attribute name="script">
    	
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.promotion" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/promotion/promotion-form.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/jquery.datetimepicker.full.min.js' />"></script>
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
        <style>
        	.img_scale{
        	  width: auto;
        	  height: auto;
   			  max-width: 500px;
   			  max-height: 450px;
        	}
        </style>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                	<ax:tr>
                        <ax:td label='ax.promotion.search.useYn' width="200px" labelWidth="80px">
                        	<select id="useYn" data-ax-path="useYn" style="vertical-align: middle;" class="form-control" >
                        		<option value=""><ax:lang id="ax.admin.useAll"/></option>
                        		<option value="Y"><ax:lang id="ax.admin.useY"/></option>
                        		<option value="N"><ax:lang id="ax.admin.useN"/></option>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchDiv' width="230px" labelWidth="80px">
                        	<select id="searchDiv" data-ax-path="searchDiv" style="vertical-align: middle;" class="form-control" >
                        			<option value="FORM_NAME"><ax:lang id="ax.promotion.formName"/></option>
                        			<option value="FORM_ID"><ax:lang id="ax.promotion.formId"/></option>
	                        		<%-- <option value="FORM_TYPE"><ax:lang id="ax.promotion.formType"/></option> --%>
	                        </select>
                        </ax:td>
                        <ax:td label='ax.promotion.search.searchData' width="200px" labelWidth="80px">
                        	<input id="searchData" type="text" data-ax-path="searchData" class="form-control W150" />
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="700" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.promotion.form.list"/> </h2>
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
                            <ax:td label="ax.promotion.formId" width="300px">
                                <input type="text" id="formId" data-ax-path="formId" class="form-control"  readonly="readonly"/>
                                
                            </ax:td>
                             <ax:td label="ax.promotion.useYn" width="300px">
                               <select data-ax-path="useYn" class="form-control W100">
                                   <option value="Y"><ax:lang id="ax.admin.useY"/></option>
                                   <option value="N"><ax:lang id="ax.admin.useN"/></option>
                               </select>
                         	</ax:td>
                         	 <ax:td label="ax.promotion.formType" width="300px">
                         	 	<ax:pro-form id="formType" dataPath="formType" name="formTypeSelect" clazz="W100"/>
                         	 	<%-- <ax:BisCtDetailCode groupCd="FORM_TYPE" dataPath="formType" clazz="form-control"/>  --%> 
                         	 	<%-- <ax:BisCtDetailCode groupCd="FORM_TYPE" id="formType" dataPath="formType" clazz="W100"/> --%>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.promotion.formName" width="300px">
                                <input id="formName" type="text" limitbyte="40" onblur="byteCalc(this)" data-ax-path="formName" class="form-control" />
                            </ax:td>
                            <ax:td label="ax.promotion.formEname" width="300px">
                                <input type="text" limitbyte="40" onblur="byteCalc(this)" data-ax-path="formEname" class="form-control" />
                            </ax:td>
                            <ax:td label="ax.promotion.fileName" width="300px">
                                <input type="text" data-ax-path="fileName" class="form-control" readonly="readonly" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.promotion.file" width="300px">
                            	<input type="hidden" id="upFilePath" data-ax-path="upFilePath">
                            	<button id="fileButton" class="btn btn-primary">Search</button>
	                            <input style="display:none;" type="file" accept="image/*" data-ax-path="upFile" id="upFile" name="upFile" onchange="javascript:getThumbnailPrivew(this,$('#selectFile'),$('#videoSelect'));" />
	                        </ax:td>
	                        <ax:td label='ax.promotion.applyDate' width="300px" >
	                        	<div class="input-group">
	                        		<input type="text" class="form-control" id="applyDate" placeholder="yyyymmddHHmm" data-ax-path="applyDate" />
	                        		<span class="input-group-addon"><i id="applyIcon" class="cqc-calendar"></i></span>
	                        	</div>
                       		</ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.promotion.remark" width="100%">
                                <textarea data-ax-path="remark" limitbyte="100" onblur="byteCalc(this)" class="form-control"></textarea>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
                <input type="hidden" value="${loginUser.userNm}" id="userId"/>
                <img id="selectFile"  class="img_scale" alt="Image" src="" style="display:none;">
                <video id="videoSelect" controls width="300px" height="300px" loop autoplay style="display:none;"></video>
            </ax:split-panel>
        </ax:split-layout>
	
    </jsp:body>
</ax:layout>
