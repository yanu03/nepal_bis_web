<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery.datetimepicker.css' />"/ >
    </jsp:attribute>
    <jsp:attribute name="script">
    	<ax:script-lang key="ax.script" var="LANG" />
        <%-- <ax:script-lang key="ax.history" var="COL" /> --%>
        <%-- <ax:script-lang key="bis" var="BIS" /> --%>
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
        <ax:script-lang key="ax.promotion" var="PRO" />
        
        <script type="text/javascript" src="<c:url value='/assets/js/common/common.js' />"></script>
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/history/history-busevent.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/jquery.datetimepicker.full.min.js' />"></script>
        <script src="<c:url value='/assets/js/map/proj4.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/map/proj4js.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/openlayers/v3.4.0/build/ol.js' />" type="text/javascript"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/map/layer.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script>
	        var projection = ol.proj.get('EPSG:3857');
	
	        var center = [9981537.517655358, 3183208.900300782];
	        //View
	        var view = new ol.View({
	            center: center,
	            zoom: 15,
	            minZoom: 1
	        });
	        var vectorSource = new ol.source.Vector();
	        var vectorLayer = new ol.layer.Vector({ source: vectorSource });
	        //Map
	        map = new ol.Map({
	            target: 'dmap',
	            projection:projection,
	            view: view
	        });
	      
	        avc= new ol.layer.Tile({
	            source: new ol.source.OSM()
	        });
	        map.addLayer(avc);        
        
        
        
        </script>
        
    </jsp:attribute>
   
    <jsp:body>
        <ax:page-buttons>
        	<button type="button" class="btn btn-info" data-page-btn="excel" id="excelExport">
        		<i class="cqc-file-excel-o"></i>
        		 Excel
        	</button>
        </ax:page-buttons>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="560" style="padding-right:10px;" scroll="scroll">
				        <div   data-fit-height-aside="grid-view-01">
				            <ax:form name="searchView0">
				                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
									<ax:tr>
				                        <ax:td label='bis.division' width="250px" labelWidth="80px">
				                        	<select class="form-control W150" data-ax-path="Select" id="Select">
				                        		<option value="routeName">ROUTE NAME</option>
				                        		<option value="plateNumber">PLATE NUMBER</option>
				                        	</select>
				                        </ax:td>
				                        <ax:td label='bis.search' width="300px" labelWidth="80px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="Keyword"  data-ax-path="Keyword" id="Keyword"/>
				                        		<span class="input-group-btn">
				                        			<button type="button" id="rightSearchButton" class="btn btn-primary" data-grid-view-01-btn="item-search">
					                                	<ax:lang id="ax.admin.search"/>
					                            	</button>
					                            </span>
				                        	</div>
				                        </ax:td>
				                    </ax:tr>
				                </ax:tbl>
				            </ax:form>
				            <div class="H10"></div>
				        </div> 
                <!-- 목록 -->
               
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left:10px;" >
            
            <ax:split-layout name="ax2" orientation="horizontal">
				<ax:split-panel height="40%" scroll="scroll" >
            	 <div data-fit-height-aside="grid-view-02">
				            <ax:form name="searchView1">
				                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
									<ax:tr>
				                        <ax:td label='ax.promotion.startDate' width="300px" labelWidth="100px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="startDate" placeholder="yyyymmddHHmm" data-ax-path="startDate" onchange="dateValidate()" />
				                        		<span class="input-group-addon"><i id="startCalendar" class="cqc-calendar"></i></span>
				                        	</div>
				                        </ax:td>
				                        <ax:td label='ax.promotion.endDate' width="300px" labelWidth="80px">
				                        	<div class="input-group">
				                        		<input type="text" class="form-control" id="endDate" placeholder="yyyymmddHHmm" data-ax-path="endDate" onchange="dateValidate()" />
				                        		<span class="input-group-addon"><i id="endCalendar" class="cqc-calendar"></i></span>
				                        	</div>
				                        </ax:td>
				              <%--           <ax:td label='bis.division' width="250px" labelWidth="80px">
				  						 	<select class="form-control" id="" name="" data-ax-path="Select" >
												<option value="plateNumber"><ax:lang id="bis.vehicle.platenumber"/></option>			
											</select>
				                        </ax:td>
				                        <ax:td label='bis.search' width="180px" labelWidth="80px">
				                        	  <input type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
				                        </ax:td> --%>
				                    </ax:tr>
				                </ax:tbl>
				            </ax:form>
				        </div> 
				        <div class="H10"></div>
                <div data-ax5grid="grid-view-02"  data-fit-height-content="grid-view-02" style="height: 300px;" ></div>
            </ax:split-panel>
            
            
			  <ax:split-panel height="*">
			        <div id="dmap" style="width:100%;height:100%;">
	          	      	<div id="info"></div>
	          	    </div>
	          	    <div>
				      <div id="popup">
						 <div id="popup-content"></div>
				      </div>
			   	 	</div>    
			 </ax:split-panel>            
        	</ax:split-layout>
        	</ax:split-panel>
		</ax:split-layout>
    </jsp:body>
</ax:layout>