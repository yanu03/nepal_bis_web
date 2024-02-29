<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags"%>

<ax:set key="title" value="${pageName}" />
<ax:set key="page_desc" value="${PAGE_REMARK}" />
<ax:set key="page_auto_height" value="true" />

<ax:layout name="base">
	<jsp:attribute name="css">
      <link rel="stylesheet"
			href="<c:url value='/assets/js/openlayers/v3.4.0/css/ol.css' />"
			type="text/css" />

        <style type="text/css">
        .node_button {cursor:pointer; }
        .areacode_button {cursor:pointer; }
        .link_button {cursor:pointer; }
.ol-zoom {
	display: none;
}

.ol-zoomslider {
	display: none;
}

.ol-scale-line {
	display: none;
}

.ol-attribution {
	display: none;
}

.ol-mouse-position {
	display: none;
}

#info {
	position: absolute;
	height: 1px;
	width: 1px;
	z-index: 100;
}

.tooltip {
	position: absolute;
	z-index: 1030;
	display: block;
	font-size: 12px;
	line-height: 1.4;
	opacity: 0;
	filter: alpha(opacity = 0);
	visibility: visible
}

.tooltip-inner {
	max-width: 200px;
	padding: 3px 8px;
	color: #fff;
	text-align: center;
	text-decoration: none;
	background-color: #000;
	border-radius: 4px
}

.businfoLayer {
	position: absolute;
	background-color: #ffffff;
	width: 350px;
	height: 150px;
}

ul.businfomenu>li {
	padding-left: 5px;
	float: left;
	list-style: none;
	margin1px;
}

#marker {
	width: 20px;
	height: 20px;
	border: 1px solid #088;
	border-radius: 10px;
	background-color: #0FF;
	opacity: 0.5;
}
</style>
  </jsp:attribute>

	<jsp:attribute name="script">
	
     <script type="text/javascript">
        var loginid ="${loginUser.userCd}";
    </script>
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
    	<script src="<c:url value='/assets/js/map/proj4.js' />"
			type="text/javascript"></script>
        <script src="<c:url value='/assets/js/map/proj4js.js' />"
			type="text/javascript"></script>
        <script
			src="<c:url value='/assets/js/openlayers/v3.4.0/build/ol.js' />"
			type="text/javascript"></script>
	<%-- 	<script src="<c:url value='/assets/js/map/bootstrap.js'/>" type="text/javascript"></script> --%>
        <script type="text/javascript" src="<c:url value='/assets/js/view/stationlist.js' />"></script>
    	<script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/map/layer.js' />"></script>
      	<script type="text/javascript" src="<c:url value='/assets/js/common/validate.js' />"></script>
         <script>
        
        
          
   
         var projection = ol.proj.get('EPSG:3857');

           var center = [9979527.768464608, 3182936.4077257095];
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
         
           setTimeout(function(){
               map.updateSize();
           }, 200);
           
           avc= new ol.layer.Tile({
               source: new ol.source.OSM()
           });
           map.addLayer(avc);

           // Popup showing the position the user clicked
           var popup = new ol.Overlay({
             element: document.getElementById('popup')
           });
           map.addOverlay(popup);
          
           //mouse Over
            map.on("pointermove", function (event) {
               var feature = this.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                   displayFeatureInfo(event.pixel, feature);
                   return feature;
               });
               if (feature) {
                   if(this.getTarget().style!=null) {

                       this.getTarget().style.cursor = 'pointer';
                   }
               } else {
                   if(this.getTarget().style!=null) this.getTarget().style.cursor = '';
                   info.tooltip('hide');	//toolTip Layer hide
               }
           });
 
           map.on('click', function(event) {
				ACTIONS.dispatch(ACTIONS.STATION_MAP,event);
           });

           info = $('#info');
           info.tooltip({
               animation: false,
               trigger: 'manual'
           });


           var displayFeatureInfo = function(pixel, feature) {

               info.css({
                   left: (pixel[0]) + 'px',
                   top: (pixel[1]-1) + 'px'
               });

               if (feature) {
                   info.tooltip('hide')
                       .attr('data-original-title', (feature.get('desc')==undefined?feature.get('name'):feature.get('desc')) )
                       .tooltip('fixTitle')
                       .tooltip('show');
               } else {
                   info.tooltip('hide');
               }
           };
    
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
								 <option value="stationName"><ax:lang id="bis.station.stationname"/></option>
								 <option value="stationId"><ax:lang id="bis.station.stationid"/></option>
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
            <ax:split-panel width="40%" style="">
                       <div data-fit-height-aside="grid-view-01">
                              <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                         		   <ax:lang id="bis.stationlist" /> </h2>
                    </div>
                  
                </div>
               </div>
                <div data-ax5grid="grid-view-01"
					data-fit-height-content="grid-view-01" style="height: 300px;"></div>
              
            </ax:split-panel>
            
           <ax:splitter></ax:splitter>
        
                        <ax:split-panel width="*"
				style="padding-left: 10px;" scroll="scroll">
 
 
     <ax:split-layout name="ax2" orientation="horizontal">
      <ax:split-panel height="37%" scroll="scroll">
                    <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
           <%--          <div class="left">
                        <h2>
									<i class="cqc-news"></i>
                            <ax:lang id="ax.admin.user.information" />
                        </h2>
                    </div> --%>
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.sample.parent.information"/>
                        </h2>
                    </div>
                    <div class="right">
                        <%-- <button type="button" class="btn btn-default"
									data-form-view-01-btn="form-clear">
                            <i class="cqc-erase"></i>
                            <ax:lang id="ax.admin.clear" />
                        </button> --%>
                    </div>
                </div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr labelWidth="120px">
                        
         
                            <ax:td label="bis.station.stationid" width="300px">
                                <input type="text" name="stationId" title="<ax:lang id="bis.station.stationid"/>"
											data-ax-path="stationId" maxlength="15"
											class="form-control" value="" readonly/>
                            </ax:td>
                            <ax:td color="red" label="bis.station.stationtype" width="300px">
							   <ax:BisCtDetailCode groupCd="STATION_TYPE" dataPath="stationType" clazz="form-control"/>  
                            </ax:td>
                            
                              <ax:td color="red" label="bis.link.linkid" width="300px">
								<div class="input-group">
                            	   <input type="text" name="linkId" data-ax-validate="required" data-ax-path="linkId" maxlength="100" title="<ax:lang id="bis.link.linkid"/>" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon link_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                           
                                                    
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td color="red" label="bis.node.nodeid" width="300px">
								<div class="input-group">
                            	   <input type="text" name="nodeId" data-ax-path="nodeId" maxlength="100" title="<ax:lang id="bis.node.nodeid"/>" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon node_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                          <ax:td color="red" label="bis.station.stationname" width="300px">
                                <input type="text" name="stationName" data-ax-validate="required"  title="<ax:lang id="bis.station.stationname"/>"
											data-ax-path="stationName" maxlength="100"
											class="form-control" value="" />
                            </ax:td>
                            <ax:td label="bis.useyn"
										width="300px">
                                <ax:common-code groupCd="USE_YN"
											dataPath="useYn" clazz="form-control" />
                            </ax:td>
                           <%--   <ax:td label="bis.station.stationename" width="300px">
                           	   <input type="text" name="stationEname"
											data-ax-path="stationEname" maxlength="100" title=""
											class="form-control" value="" />
                            </ax:td> --%>
                            <%-- <ax:td label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td> --%>
                            
                             
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                           <%-- <ax:td label="bis.station.displayname"
										width="300px">
                               <input type="text" name="displayName"
											data-ax-path="displayName" maxlength="100" title=""
											class="form-control" value="" />
                        
                            </ax:td>
                                <ax:td label="bis.station.displayename"
										width="300px">
                                 <input type="text" name="displayEname"
											data-ax-path="displayEname" maxlength="100" title=""
											class="form-control" value="" />
                        
                                </ax:td> --%>
                                     <ax:td label="bis.station.gpsx" width="300px">
                              	 	 <input type="text" name="gpsX" data-ax-validate="required"  title="<ax:lang id="bis.station.gpsx"/>"
											data-ax-path="gpsX" maxlength="12" onkeydown="gpsValidate(this)"
											class="form-control" value="" readonly/>
                            	</ax:td>
                              <ax:td label="bis.station.gpsy" width="300px">
                            	   <input type="text" name="gpsY" data-ax-validate="required"  title="<ax:lang id="bis.station.gpsy"/>"
											data-ax-path="gpsY" maxlength="12" onkeydown="gpsValidate(this)" 
											class="form-control" value="" readonly/>
                   		  	   </ax:td>
                   		  	   <ax:td label="bis.updatedate"
										width="300px">
                                <input type="text" name="updateDate"
											data-ax-path="updateDate" maxlength="100" title=""
											class="form-control" value="" readonly />
                            </ax:td>
	                          <%-- <ax:td label="bis.station.tmx" width="300px">
	                        
	                              <input type="text" name="tmX"
												data-ax-path="tmX" maxlength="12" title="" onkeydown="gpsValidate(this)"
												class="form-control" value="" />
	                           </ax:td> --%>
             
                        </ax:tr>
  						<%-- <ax:tr labelWidth="120px">
                            <ax:td label="bis.station.tmy" width="300px">
                                <input type="text" name="tmY"
											data-ax-path="tmY" maxlength="12" title="" onkeydown="gpsValidate(this)"
											class="form-control" value="" />
                            </ax:td>
                            <ax:td label="bis.areacode" width="300px">
                                   <input type="hidden" name="areaCode" data-ax-validate="required"  title="<ax:lang id="bis.areacode"/>" data-ax-path="areaCode" maxlength="100" title="" class="form-control" value=""/>
                           		<div class="input-group">
                            	   <input type="text" name="adminName1" data-ax-path="adminName1" maxlength="100" title="" class="form-control" value="" readonly/>
                              	   <span class="input-group-addon areacode_button"><i class="cqc-magnifier"></i></span>
                                </div>
                            </ax:td>
                                  <ax:td label="bis.updatedate"
										width="300px">
                                <input type="text" name="updateDate"
											data-ax-path="updateDate" maxlength="100" title=""
											class="form-control" value="" readonly />
                            </ax:td>
                            <ax:td label="bis.useyn"
										width="300px">
                                <ax:common-code groupCd="USE_YN"
											dataPath="useYn" clazz="form-control" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                           <ax:td label="bis.station.centeryn" width="300px" style="height:46px;">
									<ax:BisCtDetailCode groupCd="CENTER_YN" dataPath="centerYn" clazz="form-control"/>
                            </ax:td>
                                  <ax:td label="bis.station.mobileno" width="300px" style="height:46px;" >
                                <input type="text" name="mobileNo"
											data-ax-path="mobileNo" onkeydown="onlyNumber(this)" maxlength="7" title=""
											class="form-control" value="" />
                            </ax:td>
                                  <ax:td label="bis.station.representationyn"
										width="300px">
                              <!--   <input type="text" name="representationYn"
											data-ax-path="representationYn" maxlength="100" title=""
											class="form-control" value="" /> -->
											            <ax:common-code groupCd="REPRESENTATION_YN"
											dataPath="representationYn" clazz="form-control" />
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
                                  <ax:td label="bis.updatedate"
										width="300px">
                                <input type="text" name="updateDate"
											data-ax-path="updateDate" maxlength="100" title=""
											class="form-control" value="" readonly />
                            </ax:td>
                           
                           
                        </ax:tr>
                        
                         <ax:tr labelWidth="120px">
                                <ax:td label="bis.userid" width="300px">
                                <input type="text" name="userId"
											data-ax-path="userId" maxlength="100" title=""
											class="form-control" value="" readonly />
                            </ax:td>
                               <ax:td label="bis.useyn"
										width="300px">
                                <ax:common-code groupCd="USE_YN"
											dataPath="useYn" clazz="form-control" />
                            </ax:td>
                             <ax:td label="" width="300px">
                             </ax:td> 
                        
                        </ax:tr>
                         --%>
                        <ax:tr labelWidth="120px">
                          <ax:td label="bis.remark" width="900px">
                                <input type="text" name="remark"  title="<ax:lang id="bis.remark"/>"
											data-ax-path="remark" maxlength="100"
											class="form-control" value="" />
                            </ax:td>                        
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
          </ax:split-panel>
   
           <ax:splitter></ax:splitter>
  <ax:split-panel height="*">
        <div id="dmap" style="width:100%;height:100%;">
          	      	<div id="info"></div>
          	      	</div>
          	      	   <div>
			      <!-- Popup -->
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