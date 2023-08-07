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
            .ol-zoom { display: none; }
            .ol-zoomslider { display: none; }
            .ol-scale-line { display: none; }
            .ol-attribution { display: none; }
            .ol-mouse-position { display: none; }
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
            ul.businfomenu > li{padding-left:5px; float:left; list-style:none; margin1px;}





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
        <ax:script-lang key="bis" var="COL" />
    	<script src="<c:url value='/assets/js/map/proj4.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/map/proj4js.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/openlayers/v3.4.0/build/ol.js' />" type="text/javascript"></script>
	<%-- 	<script src="<c:url value='/assets/js/map/bootstrap.js'/>" type="text/javascript"></script> --%>
        <script type="text/javascript" src="<c:url value='/assets/js/view/RouteStationList.js' />"></script>
              <script type="text/javascript" src="<c:url value='/assets/js/map/layer.js' />"></script>
             <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
         <script>
        
        
         var loginid ="${loginUser.userCd}";
   
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
           setTimeout(function(){
               map.updateSize();
           }, 200);
           avc= new ol.layer.Tile({
               source: new ol.source.OSM()
           });
           map.addLayer(avc);
    	/*  		var x = data.posX;
		var y = data.posY;
		var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
		if (minX > x && x > 0) minX = x;
        if (minY > y && y > 0) minY = y;
        if (maxX < x && x > 0) maxX = x;
        if (maxY < y && y > 0) maxY = y;
		if (minX != null && minY != null && maxX != null && maxY != null) {
			var bottomLeft = new ol.proj.transform([minX, minY], epsg4326, epsgDaum);
	        var topRight = new ol.proj.transform([maxX, maxY], epsg4326, epsgDaum);
	        var extent = new ol.extent.boundingExtent([bottomLeft, topRight]);
	        
	        map.getView().fitExtent(extent, map.getSize());
	    } */
           var vector = new ol.layer.Vector({
               source: new ol.source.KML({
                   url: '/jsp/kml/Waypoints__20160908_2131.kml',
                   projection:projection
               })
           });
       //    map.addLayer(vector);

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

		function closepopup()
    	{
				var element = document.getElementById('popup');
				$(element).popover('hide');
				$(".businfoLayer").hide();
				
    	}
       //businfo 닫기
       function closeLayer( obj ) {
           $(obj).parent().parent().hide();
       }
       
   
   </script>
    </jsp:attribute>
    <jsp:body>
		<ax:page-buttons>
        </ax:page-buttons>
 		<div role="page-header">
              <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
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
            <ax:split-panel width="530" style="">
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
        
                        <ax:split-panel width="40%" style="padding-left: 10px;" scroll="scroll">
<%-- 
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.user.information"/>
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
                            <ax:td label="ROUTE ID" width="300px">
                                <input type="text" name="ROUTE_ID" data-ax-path="ROUTE_ID" maxlength="15" title="이름" class="av-required form-control W120" value=""/>
                            </ax:td>
                            <ax:td label="ROUTE TYPE" width="300px">
                                <input type="text" name="ROUTE_TYPE" data-ax-path="ROUTE_TYPE" maxlength="100" title="아이디" class="av-required form-control W120" value=""/>
                            </ax:td>
                             <ax:td label="ROUTE NAME" width="300px">
                                <input type="text" name="ROUTE_NAME" data-ax-path="ROUTE_NAME" maxlength="100" title="아이디" class="av-required form-control W120" value=""/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr labelWidth="120px">
                          <ax:td label="ROUTE ENAME" width="300px">
                                <input type="text" name="ROUTE_ENAME" data-ax-path="ROUTE_ENAME" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                            
                             <ax:td label="FROM STATION ID" width="300px">
                                <input type="text" name="FROM_STATION_ID" data-ax-path="FROM_STATION_ID" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                            
                                <ax:td label="TO STATION ID" width="300px">
                                <input type="text" name="TO_STATION_ID" data-ax-path="TO_STATION_ID" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                        </ax:tr>
                        

                        <ax:tr labelWidth="120px">
                                <ax:td label="TURN_STATION_ID" width="300px">
                                <input type="text" name="TURN_STATION_ID" data-ax-path="TURN_STATION_ID" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                                 <ax:td label="PERMISSION COUNT" width="300px">
                                <input type="text" name="PERMISSION_COUNT" data-ax-path="PERMISSION_COUNT" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                                 <ax:td label="ROUTE LENGTH" width="300px">
                                <input type="text" name="ROUTE_LENGTH" data-ax-path="ROUTE_LENGTH" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                            
                        </ax:tr>
 
                        <ax:tr labelWidth="120px">
                          <ax:td label="COUNTRY CODE" width="300px">
                                <input type="text" name="COUNTRY_CODE" data-ax-path="COUNTRY_CODE" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                                  <ax:td label="AREA CODE" width="300px">
                                <input type="text" name="AREA_CODE" data-ax-path="AREA_CODE" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                                  <ax:td label="RUN TYPE" width="300px">
                                <input type="text" name="RUN_TYPE" data-ax-path="RUN_TYPE" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                            
                        </ax:tr>

                        <ax:tr labelWidth="120px">
 
                                  <ax:td label="USER ID" width="300px">
                                <input type="text" name="USER_ID" data-ax-path="USER_ID" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                                  <ax:td label="USE YN" width="300px">
                                <input type="text" name="USE_YN" data-ax-path="USE_YN" maxlength="100" title="" class="av-required form-control W120" value=""/>
                            </ax:td>
                            
                        </ax:tr>
                    
                    </ax:tbl>


                 
                </ax:form>
 --%>
 
 
            
     <ax:split-layout name="ax2" orientation="horizontal">
      <ax:split-panel height="40%" >
        <div data-fit-height-aside="left-view-01">
          <div class="ax-button-group" >
  			   <div class="left">
                        <h2><i class="cqc-list"></i>
                     	<ax:lang id="bis.routestationlist" /> </h2>
            
                 </div>
                 <div class="right">
							<button class="btn btn-default" data-grid-view-02-btn="up">
                 	      <i class="cqc-circle-with-plus"></i>UP
                 	      </button>
                 	      <button class="btn btn-default" data-grid-view-02-btn="down">
                 	      <i class="cqc-circle-with-minus"></i>DOWN
                 	      </button>
   
                 	     <button class="btn btn-default" data-grid-view-02-btn="Stationfind">
                 	      <i class="cqc-circle-with-plus"></i>ADD
                 	      </button>
                 	   <button class="btn btn-default" data-grid-view-02-btn="delete">
							                 	      <i class="cqc-circle-with-minus"></i>DELETE
							                 	      </button>
                 </div>
             </div>
         </div>             
    <div data-ax5grid="grid-view-02"  data-fit-height-content="left-view-01" style="height: 400px;" ></div>
 </ax:split-panel>
   
           <ax:splitter></ax:splitter>
  <ax:split-panel height="*">
        <div id="dmap" style="width:100%;height:100%;">
          	      	<div id="info"></div>
          	      	</div>
          	      	   <div>
			      <!-- Clickable label for Vienna -->
			    
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