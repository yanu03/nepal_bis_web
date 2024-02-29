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
        <script type="text/javascript" src="<c:url value='/assets/js/view/stationrouteview.js' />"></script>
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

        <ax:page-buttons></ax:page-buttons>

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
                        	  <input type="text" name="Keyword"id="Keyword"  data-ax-path="Keyword" class="form-control W100"/>      
                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
            </ax:form>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="417" style="">
		       <div data-fit-height-aside="grid-view-01">
			       <div class="ax-button-group">
		               <div class="left">
		                   <h2><i class="cqc-list"></i>
		                   <ax:lang id="bis.stationlist"/> </h2>
		               </div>
		           </div>
				</div>
   
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
              
            </ax:split-panel>
            
           <ax:splitter></ax:splitter>
        
                        <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">

     <ax:split-layout name="ax2" orientation="horizontal">
      <ax:split-panel height="40%" scroll="scroll" >
        <div data-fit-height-aside="grid-view-02">
			 <div class="ax-button-group" >
                   <div class="left">
                       <h2><i class="cqc-list"></i>
                        <ax:lang id="bis.stationroutelist"/>  </h2>
                   </div>
               </div>
		</div>
    <div data-ax5grid="grid-view-02"  data-fit-height-content="grid-view-02" style="height: 400px;" ></div>
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