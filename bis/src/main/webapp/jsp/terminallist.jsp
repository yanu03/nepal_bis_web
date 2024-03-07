	<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
<jsp:attribute name="css">
      <link rel="stylesheet" href="<c:url value='/assets/js/openlayers/v3.4.0/css/ol.css' />" type="text/css"/>
<style type="text/css">
            .vehicle_button {cursor:pointer; }
          	.areacode_button{cursor:pointer;}

     
        </style>
  </jsp:attribute>

    <jsp:attribute name="script">
     <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
    </script>
		<c:choose>
			<c:when test="${loginLocale == 'nep'}">
				<ax:script-lang key="bisnep" var="COL" />
				<ax:script-lang key="axnep" var="COLA" />
			</c:when>
			<c:when test="${loginLocale == 'en'}">
				<ax:script-lang key="bisen" var="COL" />
				<ax:script-lang key="axen" var="COLA" />
			</c:when>
			<c:when test="${loginLocale == 'ko'}">
				<ax:script-lang key="bisko" var="COL" />
				<ax:script-lang key="axko" var="COLA" />
			</c:when>
		</c:choose>
      <script type="text/javascript" src="<c:url value='/assets/js/view/terminallist.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/validate.js' />"></script>
      
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
  						 	<select class="form-control" id="" name="" data-ax-path="Select">
								 <option value="plateNumber"><ax:lang id="bis.vehicle.platenumber"/></option>
								 <option value="terminalId"><ax:lang id="bis.terminal.terminalid"/></option>
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
            <ax:split-panel width="945" >
                <!-- 목록 -->
                                      <div data-fit-height-aside="grid-view-01">
                              <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                         		   <ax:lang id="bis.terminallist" /> </h2>
                    </div>
                  
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
                        <ax:tr labelWidth="120px">
                            <ax:td label="bis.terminal.terminalid" width="300px">
                                <input type="text" name="terminalId"   title="TERMINAL ID"  data-ax-path="terminalId" maxlength="15" class="form-control" value="" readonly/>
                            </ax:td>
                            <ax:td color="red" label="bis.terminal.terminaltype" width="300px">
                              		<ax:BisCtDetailCode groupCd="TERMINAL_TYPE" dataPath="terminalType" clazz="form-control"/>
                                </ax:td>
                             <ax:td color="red" label="bis.vehicle.vehicleid" width="300px">
                           		<div class="input-group">
                            		<input type="text" name="vehicleId" data-ax-validate="required"  title="<ax:lang id="bis.vehicle.vehicleid"/>"  data-ax-path="vehicleId" maxlength="100" title="" class="form-control" value="" readonly/>
                              		<span class="input-group-addon vehicle_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td label="bis.terminal.terminalversion" width="300px">
                                <input type="text" name="terminalVersion" data-ax-path="terminalVersion" maxlength="16" title="" class="form-control" value=""/>
                            </ax:td>
                            <ax:td color="red" label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
		                     <ax:td label="bis.updatedate" width="300px">
		                        <input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
		                     </ax:td>
                            <%-- <ax:td label="bis.terminal.ipaddress" width="300px" style="height:46px">
                            	 <input type="text" name="ipAddress" data-ax-path="ipAddress" maxlength="15" title="" class="form-control" value=""/>
                            </ax:td>
                            <ax:td label="SERIAL NO" width="300px">
                            	     <input type="text" name="serialNo" data-ax-path="serialNo" maxlength="15" title="" class="form-control" value=""/>
                          	  </ax:td> --%>
                        </ax:tr>
                        
                        <%-- <ax:tr labelWidth="120px">
              		          <ax:td label="bis.countrycode" width="300px" style="height:46px">
      								<ax:BisCtDetailCode groupCd="COUNTRY_CODE" dataPath="countryCode" clazz="form-control"/>
                     	       </ax:td>
                               <ax:td label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
		                     <ax:td label="bis.updatedate" width="300px">
		                        <input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
		                     </ax:td>
		                    
			            </ax:tr> --%>
                        
                        <ax:tr labelWidth="120px">
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
