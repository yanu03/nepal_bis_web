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
           .areacode_button {cursor:pointer; }
           .company_button{cursor:pointer; }
       </style>
  </jsp:attribute>

    <jsp:attribute name="script">
     <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
    </script>
      <ax:script-lang key="bis" var="COL" />
      <script type="text/javascript" src="<c:url value='/assets/js/view/vehiclelist.js' />"></script>
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
  						 	<select class="form-control" id="" name="" data-ax-path="Select" >
								 <option value="plateNumber"><ax:lang id="bis.vehicle.platenumber"/></option>
								 <option value="vehicleId"><ax:lang id="bis.vehicle.vehicleid"/></option>
							</select>
                        </ax:td>
                        <ax:td label='bis.search' width="180px" labelWidth="80px">
                        	  <input type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
            </ax:form>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" >
                <!-- 목록 -->
                                       <div data-fit-height-aside="grid-view-01">
                              <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                         		VEHICLE LIST</h2>
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
                            <ax:td label="bis.vehicle.vehicleid" width="300px">
                            
                            
                                <input type="text" name="vehicleId" title="<ax:lang id="bis.vehicle.vehicleid"/>" data-ax-path="vehicleId" maxlength="15" class="form-control" value="" readonly/>
                            </ax:td>
                            <ax:td label="bis.vehicle.vehicletype" width="300px">
                                  <ax:BisCtDetailCode groupCd="VEHICLE_TYPE" dataPath="vehicleType" clazz="form-control"/>
                               </ax:td>
                             <ax:td label="bis.vehicle.platenumber" width="300px">
                                <input type="text" name="plateNumber" data-ax-validate="required"  title="<ax:lang id="bis.vehicle.platenumber"/>" data-ax-path="plateNumber" maxlength="20" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        
                        <%-- <ax:tr labelWidth="120px">
                          <ax:td label="bis.company.companyname" width="300px" style="height:62px;">
                                     <input type="hidden" name="companyId" title="<ax:lang id="bis.company.companyid"/>" data-ax-path="companyId" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="companyName" data-ax-path="companyName" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon company_button"><i class="cqc-magnifier"></i></span>
                                </div> </ax:td>
                             <ax:td label="bis.vehicle.bustype" width="300px" style="height:62px;">
                                     <ax:BisCtDetailCode groupCd="BUS_TYPE" dataPath="busType" clazz="form-control"/>
                          
                                <!--    <input type="text" name="busType" data-ax-path="busType" maxlength="100" title="" class="form-control" value=""/>
                          -->   </ax:td>
                                <ax:td label="bis.vehicle.vehiclecapa" width="300px">
                            	    <input type="text" name="vehicleCapa" data-ax-validate="required" onkeydown="onlyNumber(this)" title="<ax:lang id="bis.vehicle.vehiclecapa"/>" data-ax-path="vehicleCapa" maxlength="100" title="" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr> --%>
                        
                        <ax:tr labelWidth="120px">
                                <%-- <ax:td label="bis.countrycode" width="300px">
                        		    <ax:BisCtDetailCode groupCd="COUNTRY_CODE" dataPath="countryCode" clazz="form-control"/>
                                </ax:td> --%>
                             <ax:td label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="255" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                      <ax:td label="bis.updatedate" width="300px">
                                <input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr labelWidth="120px">
      						 <ax:td label="bis.remark" width="300px">
                                <input type="text" name="remark" data-ax-path="remark" maxlength="255" title="" class="form-control" value=""/>
                             </ax:td>
                       
                              <ax:td label="bis.userid" width="300px">
                                <input type="text" name="userId" data-ax-path="userId" maxlength="100" title="" class="form-control" value="" readonly/>
                             </ax:td>
                               <ax:td label="bis.useyn" width="300px">
                                <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control"/>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>