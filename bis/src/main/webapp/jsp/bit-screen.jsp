<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
<jsp:attribute name="css">
      <link rel="stylesheet" href="<c:url value='/assets/js/openlayers/v3.4.0/css/ol.css' />" type="text/css"/>
       <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
       
     <style type="text/css">
        
        .areacode_button {cursor:pointer; }
        #date_button {cursor:pointer; }
        
        </style>
  </jsp:attribute>

    <jsp:attribute name="script">
   
	  <%-- <ax:script-lang key="ax.script" var="LANG" /> --%>
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
      <script type="text/javascript" src="<c:url value='/assets/js/view/bit-screen.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/validate.js' />"></script>
         <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
      </script>
      
    </jsp:attribute>
    <jsp:body>

      <ax:page-buttons>
       	 	<!-- <button type="button" class="btn btn-info" data-page-btn="excel" id="excelExport">
        		<i class="cqc-file-excel-o"></i>
        		 Excel
        	</button> -->
        </ax:page-buttons>
		  <div role="page-header">
            <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
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
								 <option value="bitName"><ax:lang id="bis.bit.bitname"/></option>	
									 <option value="bitId"><ax:lang id="bis.bit.bitid"/></option>
							</select>
                        </ax:td>
                        <ax:td label='bis.search' width="300px" labelWidth="80px">
                        	  <input style="width:200px;" type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
            </ax:form>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="600" >
                         <div data-fit-height-aside="grid-view-01">
                              <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                         		   <ax:lang id="bis.bitlist" /> </h2>
                    </div>
                  
                </div>
               </div>
                <!-- 목록 -->
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
           <ax:splitter></ax:splitter>
                        <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.sample.parent.fileList"/>
                        </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-form-view-01-btn="bit-capture">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.capture"/>
                        </button>
                    </div>
                </div>        	
                <div data-ax5grid="grid-view-02" style="height: 250px;"></div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="100px">
                            <%-- <ax:td label="bis.bit.filelist" width="300px">
                           	</ax:td> --%>
                  		     <ax:td label="" width="300px">
                  		    </ax:td>
                    	<ax:tr>
                    		<ax:td labelStyle="height:360px;" label="bis.bit.bitimage" labelClazz="required">
                    			<div style="width:600px; text-align:center;">
									<!-- <div style="border: 0px solid #D8D8D8;">
										<input type="file" id="employeeImg" name="employeeImg"
												accept="image/png"
												onchange="preview_ChangeImage(this, 'previewImg');"
												data-ax-path="employeeImg" />
									 </div> -->
									 <div style="height: 480px; padding: 10px;">
									 	<img id="previewImg" src="#" alt="BIT Image"
												style="width: 300px;height:450px;" 
												onError="preview_Image('previewImg');">
									 </div>
								</div>
                    		</ax:td>
                    	</ax:tr>                    
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>
