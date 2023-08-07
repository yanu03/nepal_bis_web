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
            .route_button {cursor:pointer; }
        </style>
  </jsp:attribute>

    <jsp:attribute name="script">
     <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
    </script>
         <ax:script-lang key="bis" var="COL" />
      <script type="text/javascript" src="<c:url value='/assets/js/view/routeplan.js' />"></script>
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
								 <option value="routeName"><ax:lang id="bis.route.routename"/></option>
								 <option value="routeId"><ax:lang id="bis.route.routeid"/></option>
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
                         		ROUTE PLAN LIST </h2>
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
                            <ax:td label="bis.route.routeid" width="300px" style="height:46px;">
                                	<div class="input-group">
                            	   <input type="text" name="routeId"  title="<ax:lang id="bis.route.routeid"/>"  data-ax-validate="required" data-ax-path="routeId" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon route_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                            
                            <ax:td label="bis.routeplan.daytype" width="300px" style="height:46px;">
                        	<ax:BisCtDetailCode groupCd="DAY_TYPE" dataPath="dayType" clazz="form-control"/>
                        
                                 <!--   <input type="text" name="dayType" title="DAY TYPE" data-ax-validate="required" data-ax-path="dayType" maxlength="15" class="form-control" value=""/>
                           -->      </ax:td>
                             <ax:td label="bis.routeplan.servicecount" width="300px">
                                <input type="text" name="serviceCount" title="<ax:lang id="bis.routeplan.servicecount"/>" onkeydown="onlyNumber(this)" data-ax-validate="required" data-ax-path="serviceCount" maxlength="100" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td label="bis.routeplan.stfirsttime" width="300px">
                                <input type="text" name="stFirstTime" title="<ax:lang id="bis.routeplan.stfirsttime"/>" data-ax-validate="required" data-ax-path="stFirstTime" maxlength="4" title="" class="form-control" value=""/>
                            </ax:td>
                                <ax:td label="bis.routeplan.stlasttime" width="300px">
                            	    <input type="text" name="stLastTime" title="<ax:lang id="bis.routeplan.stlasttime"/>" data-ax-validate="required" data-ax-path="stLastTime" maxlength="4" title="" class="form-control" value=""/>
                            </ax:td>
                                   <ax:td label="bis.routeplan.edfirsttime" width="300px">
                                 <input type="text" name="edFirstTime" data-ax-path="edFirstTime" title="<ax:lang id="bis.routeplan.edfirsttime"/>" data-ax-validate="required" maxlength="4" title="" class="form-control" value=""/>
                                </ax:td>
                        </ax:tr>
               <ax:tr labelWidth="120px">
                          <ax:td label="bis.routeplan.edlasttime" width="300px" style="height:62px;">
                                <input type="text" name="edLastTime" title="<ax:lang id="bis.routeplan.edlasttime"/>" data-ax-validate="required"  data-ax-path="edLastTime" maxlength="4" title="" class="form-control" value=""/>
                            </ax:td>
                                   <ax:td label="bis.routeplan.mininterval" width="300px">
                                 <input type="text" name="minInterval" title="<ax:lang id="bis.routeplan.mininterval"/>" data-ax-validate="required" onkeydown="onlyNumber(this)" data-ax-path="minInterval" maxlength="100" title="" class="form-control" value=""/>
                                </ax:td>
                                     <ax:td label="bis.routeplan.maxinterval" width="300px">
                                 <input type="text" name="maxInterval" data-ax-path="maxInterval" maxlength="100" title="" class="form-control" onkeydown="onlyNumber(this)" value=""/>
                                </ax:td>
                        </ax:tr>
                     
                        <ax:tr labelWidth="120px">
                         
	                         <ax:td label="bis.updatedate" width="300px">
			                        <input type="text" name="updateDate" data-ax-path="updateDate" maxlength="100" title="" class="form-control" value="" readonly/>
		                     </ax:td>
	                        <ax:td label="bis.remark" width="300px">
                             <input type="text" name="remark" data-ax-path="remark" maxlength="255" title="" class="form-control" value=""/>
                            </ax:td>
			                       <ax:td label="bis.userid" width="300px">
                              		  <input type="text" name="userId" data-ax-path="userId" maxlength="100" title="" class="form-control" value="" readonly/>
                           	  </ax:td>
                        </ax:tr>
                            <ax:tr labelWidth="120px">
                            
		                      <ax:td label="bis.useyn" width="300px">
		                              <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control"/>
                              </ax:td>
			                  <ax:td label="" width="300px">
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
