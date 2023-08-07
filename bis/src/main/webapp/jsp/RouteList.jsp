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
            .station_button {cursor:pointer; }
            .station_button2 {cursor:pointer; }
            .station_button3 {cursor:pointer; }
            .areacode_button {cursor:pointer; }
               #datepickerbutton1,#datepickerbutton2 {cursor:pointer; }
        </style>
  </jsp:attribute>

    <jsp:attribute name="script">
   
      <ax:script-lang key="ax.script" />
      <ax:script-lang key="bis" var="COL" />
       <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/view/RouteList.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/validate.js' />"></script>
            <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
        $(function() {
        	  $( "#datepicker1" ).datepicker({
        	    dateFormat: 'yymmdd'
        	  });
        	  $("#datepickerbutton1").on("click", function(e){
                  $('#datepicker1').datepicker('show');
              });
        	  
        	  $( "#datepicker2" ).datepicker({
          	    dateFormat: 'yymmdd'
          	  });
          	  $("#datepickerbutton2").on("click", function(e){
                    $('#datepicker2').datepicker('show');
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
                         		   <ax:lang id="bis.routelist" /> </h2>
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
                            <ax:td label="bis.route.routeid" width="300px">
                                <input type="text" name="routeId"  title="<ax:lang id="bis.route.routeid"/>" data-ax-path="routeId" maxlength="15" title="이름" class="form-control" value="" readonly/>
                            </ax:td>
                            <ax:td label="bis.route.routetype" width="300px">
                        <ax:BisCtDetailCode groupCd="ROUTE_TYPE" dataPath="routeType" clazz="form-control"/>  
                         
                                <!--   <input type="text" name="routeType" data-ax-path="routeType" maxlength="100" title="아이디" class="form-control" value=""/> -->
                            </ax:td>
                             <ax:td label="bis.route.routename" width="300px">
                                <input type="text" name="routeName" data-ax-validate="required"  title="<ax:lang id="bis.route.routename"/>" data-ax-path="routeName" maxlength="50" title="아이디" class="form-control" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td label="bis.route.routeename" width="300px">
                                <input type="text" name="routeEname" data-ax-path="routeEname" maxlength="50" title="" class="form-control"/>
                            </ax:td>
                            
                             <ax:td label="bis.route.fromstationid" width="300px">
                                   <input type="hidden" name="fromStationId" data-ax-validate="required"  title="<ax:lang id="bis.route.fromstationid"/>" data-ax-path="fromStationId" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="fromStationName" data-ax-path="fromStationName" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon station_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                                <ax:td label="bis.route.tostationid" width="300px">
                            	    <input type="hidden" name="toStationId" data-ax-validate="required"  title="<ax:lang id="bis.route.tostationid"/>" data-ax-path="toStationId" maxlength="100" title="" class="form-control" value=""/>
                                <div class="input-group">
                            	    <input type="text" name="toStationName" data-ax-path="toStationName" maxlength="100" title="" class="form-control" value="" readonly/>
                            	    <span class="input-group-addon station_button2"><i class="cqc-magnifier"></i></span>
                        	    </div>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                                <ax:td label="bis.route.turnstationid" width="300px" style="height:62px;">
                                 <div class="input-group">
                                  <input type="hidden" name="turnStationId"  title="<ax:lang id="bis.route.turnstationid"/>" data-ax-path="turnStationId" maxlength="100" title="" class="form-control" value=""/>
                            	   <input type="text" name="turnStationName" data-ax-path="turnStationName" maxlength="100" title="" class="form-control" value="" readonly/>
                            		<span class="input-group-addon station_button3"><i class="cqc-magnifier"></i></span>
                        	    </div>
                                </ax:td>
                                 <ax:td label="bis.route.permissioncount" width="300px">
                                <input type="text" name="permissionCount" data-ax-validate="required" onkeydown="onlyNumber(this)" title="<ax:lang id="bis.route.permissioncount"/>" data-ax-path="permissionCount" maxlength="100" title="" class="form-control" value=""/>
                            </ax:td>
                                 <ax:td label="bis.route.begindate" width="300px" style="height:62px;">
                               <div class="input-group" >
                                <input type="text" class="form-control" id="datepicker1" placeholder="yyyymmdd" data-ax-path="beginDate" readonly/>
                                <span class="input-group-addon" id="datepickerbutton1"><i class="cqc-calendar"></i></span>
                            </div>
                         <!--        <input type="text" name="beginDate" data-ax-path="beginDate" maxlength="100" title="" class="form-control" value=""/>
                     -->        </ax:td>
             
                        </ax:tr>
  						<ax:tr labelWidth="120px">
                          <ax:td label="bis.route.closedate" width="300px">
                          <div class="input-group" >
                                <input type="text" class="form-control"  id="datepicker2" placeholder="yyyymmdd" data-ax-path="closeDate" readonly/>
                                <span class="input-group-addon " id="datepickerbutton2"><i class="cqc-calendar"></i></span>
                            </div>
                           <!--   
                           
                              <input type="text" name="closeDate" data-ax-path="closeDate" maxlength="100" title="" class="form-control" value=""/>
                       -->      </ax:td>
                                  <ax:td label="bis.route.routeex" width="300px" style="height:62px;">
                                <input type="text" name="routeEx" data-ax-path="routeEx" maxlength="20" title="" class="form-control" value=""/>
                            </ax:td>
                                  <ax:td label="bis.route.routedistance" width="300px" style="height:62px;">
                                <input type="text" name="routeDistance" data-ax-validate="required" onkeydown="onlyNumber(this)" title="<ax:lang id="bis.route.routedistance"/>" data-ax-path="routeDistance" maxlength="100" title="" class="form-control" value=""/>
                            </ax:td>
                            
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td label="bis.countrycode" width="300px">
                                	<ax:BisCtDetailCode groupCd="COUNTRY_CODE" dataPath="countryCode" clazz="form-control"/>  
                           </ax:td>
                                  <ax:td label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                                  <ax:td label="bis.route.requesttime" width="300px">
                                <input type="text" name="requestTime" onkeydown="onlyNumber(this)" data-ax-path="requestTime" maxlength="100" title="" class="form-control" value=""/>
                            </ax:td>
                            
                        </ax:tr>
          			   <ax:tr labelWidth="120px">
                          <ax:td label="bis.route.charge" width="300px">
                                <input type="text" name="charge" data-ax-path="charge" onkeydown="onlyNumber(this)" maxlength="100" title="" class="form-control" value=""/>
                            </ax:td>
                                  <ax:td label="bis.route.runtype" width="300px">
                  		              	<ax:BisCtDetailCode groupCd="RUN_TYPE" dataPath="runType" clazz="form-control"/>  
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