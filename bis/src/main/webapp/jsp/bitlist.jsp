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
   
	  <ax:script-lang key="ax.script" var="LANG" />
	  <!-- JSTL 세션따라 en, nep 확인함 -->
	  <c:choose>
	  	<c:when test="${loginLocale == 'nep'}">
	  		<ax:script-lang key="bisnep" var="COL" />
	  	</c:when>
	  	<c:when test="${loginLocale == 'en'}">
	  		<ax:script-lang key="bisen" var="COL" />
	  	</c:when>
	  	<c:when test="${loginLocale == 'ko'}">
	  		<ax:script-lang key="bisko" var="COL" />
	  	</c:when>
	  </c:choose>
      <%-- <ax:script-lang key="bis" var="COL" /> --%>
      
      <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/view/bitlist.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/validate.js' />"></script>
         <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
        $(function() {
        	  $( "#datepicker1" ).datepicker({
        	    dateFormat: 'yymmdd'
        	  });
        	  $("#date_button").on("click", function(e){
                  $('#datepicker1').datepicker('show');
              });
        	});
      </script>
      
    </jsp:attribute>
    <jsp:body>

      <ax:page-buttons>
       	 	<button type="button" class="btn btn-info" data-page-btn="excel" id="excelExport">
        		<i class="cqc-file-excel-o"></i>
        		 Excel
        	</button>
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
            <ax:split-panel width="500" >
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
                        <ax:tr labelWidth="120px">
                            <ax:td label="bis.bit.bitid" width="300px">
                                <input type="text" title="<ax:lang id="bis.bit.bitid" />" data-ax-path="bitId" maxlength="15" class="form-control" value="" readonly/>
                            </ax:td>
                            <ax:td color="red" label="bis.bit.bittype" width="300px">
                              <ax:BisCtDetailCode groupCd="BIT_TYPE" dataPath="bitType"   clazz="form-control"/>  
                                </ax:td>
                             <ax:td color="red" label="bis.bit.bitname" width="300px">
                                <input type="text" title="<ax:lang id="bis.bit.bitname" />" data-ax-validate="required"  name="bitName" data-ax-path="bitName" maxlength="50" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        
                        <%-- <ax:tr labelWidth="120px">
                          <ax:td label="bis.bit.bitename" width="300px" style="height:46px;">
                                <input type="text" name="bitEname" data-ax-path="bitEname" maxlength="50" title="" class="form-control" value=""/>
                            </ax:td>
                                <ax:td label="bis.bit.terminalversion" width="300px">
                            	     <input type="text" name="terminalVersion" data-ax-path="terminalVersion" maxlength="16" title="" class="form-control" value=""/>
                          
                            </ax:td>
                                   <ax:td label="bis.bit.ipaddress" width="300px" style="height:46px;">
                            	     <input type="text" name="ipAddress" data-ax-path="ipAddress" maxlength="15" title="" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr> --%>
                        <ax:tr labelWidth="120px">
                               <%-- <ax:td label="bis.bit.cameraipaddress" width="300px">
                            	     <input type="text" name="cameraIpAddress" data-ax-path="cameraIpAddress" maxlength="15" title="" class="form-control" value=""/>
                          	  </ax:td> --%>
                            <%--   <ax:td label="bis.bit.installdate" width="300px" style="height:46px;">
                               <div class="input-group"  >
                                <input type="text" class="form-control" id="datepicker1" placeholder="yyyy-mm-dd" data-ax-path="installDate" readonly/>
                                <span class="input-group-addon" id="date_button"><i class="cqc-calendar"></i></span>
                            </div>
                         	   	   </ax:td> --%>
                         	  <%--  <ax:td label="SERIAL NO" width="300px">
                            	     <input type="text" name="serialNo" data-ax-path="serialNo" maxlength="15" title="" class="form-control" value=""/>
                          	  </ax:td> --%>
                          	  <ax:td color="red" label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode" />" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
			            </ax:tr>
                        <ax:tr labelWidth="120px">
	                         <%-- <ax:td label="bis.countrycode" width="300px" style="height:46px;">
	                                	<ax:BisCtDetailCode groupCd="COUNTRY_CODE" dataPath="countryCode" clazz="form-control"/>  
	                               <!--  	 <input type="text" name="countryCode" data-ax-path="countryCode" maxlength="100" title="" class="form-control" value=""/>-->
	                          </ax:td> --%>
			                     <ax:td label="bis.updatedate" width="300px">
			                        <input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
			                     </ax:td>
			                     <ax:td label="bis.userid" width="300px">
                           		  <input type="text" name="userId" data-ax-path="userId" maxlength="100" title="" class="form-control" value="" readonly/>
                          		  </ax:td>   
	                            <ax:td label="bis.useyn" width="300px">
	                          		  <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control"/>
	                           	</ax:td>
	                           
	                  		     <ax:td label="" width="300px">
	                  		    </ax:td>  
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>
