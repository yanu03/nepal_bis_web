


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
            #busTotal,#busEtc,#busRun,#bitTotal,#bitEtc,#bitRun{
            font-size:15px;
            display:table-cell;
            vertical-align:middle;
            text-align:center;
            height:26px;
            width:140px
            }
            
            .counttit{ background-color: #e3e3e3;border-top:1px solid #aaaaaa; border-bottom:1px solid #aaaaaa; }
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
                opacity: 1;
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
            /*  
            .businfoLayer div {
                position: absolute;
                top: 5px;
                right: 5px
            } */


            .businfor{width:282px}
           ul.businfor{ list-style:none; padding-left:0px;}

         
            ul.businfor > li{margin:12px 12px 0 12px;;padding:5px 12px 12px 12px;border:1px solid #adadad;}
            ul.businfor > li:hover,#mapContainer .aside ul.businfor > li.active{background-color:#f6f6f6}
            ul.businfor > li .bustit{position:relative;height:40px;margin-bottom:15px;line-height:40px;font-size:17px;font-weight:bold;border-bottom:2px solid #a6a9b3;}
            ul.businfor > li .bustit img{vertical-align:middle;}
            ul.businfor > li .bustit .minBtn{position:absolute;right:0;top:8px;min-width:initial;min-width:auto;height:22px;line-height:22px;border-radius:3px;}
            ul.businfor .i_bus{vertical-align:middle;margin-right:3px;}
            ul.businfor .t_box{/*margin:0 -12px;border-top:1px solid #c1c1c1;*/}
            ul.businfor .time > span{display:inline-block;margin-right:4px;padding-right:8px;background:url('../img/map/m_line.png') right center no-repeat; }
            ul.businfor .time > span.last{margin:0;padding:0;background:none;}
            ul.businfor .time p{ position:relative; height:20px; line-height:20px; border-top:1px solid #e6e6e6; margin-top:15px; }
            ul.businfor .time em{display:block; font-weight:bold; position:absolute; left:0; top:5px; color:#666; font-size:12px; }
            ul.businfor .time i{ position:absolute; right:0; top:5px; color:#888; font-size:13px; padding-left:15px; background:url(../img/map/ico_call.png) 0 6px no-repeat;}

            ul.busstop{list-style:none;}
            ul.busstop > li{padding:8px 15px 8px 33px;border-bottom:1px solid #e3e3e3;line-height:1.5em;}
      /*      ul.busstop > li.busico1{background:url(../img/map/ico_bus1.png) 10px 50% no-repeat;}
            ul.busstop > li.busico2{background:url(../img/map/ico_bus2.png) 10px 50% no-repeat;}
*/

		/*留듭슂�냼*/
		
		#dmap .optBox{position:absolute;right:25px;top:25px;padding-right:22px;z-index:100;}
		#dmap .optBox.close{padding-right:0px;}
		#dmap .optBox > .btn {position:absolute;left:102px;top:0;width:22px;height:22px;background:#474e61 url('http://topis.seoul.go.kr/common/img/map/opt_close.png') center center no-repeat;}
		#dmap ul.optList{width:102px;background-color:#fff;list-style:none;padding-left:0px;}
		#dmap ul.optList:after{display:block;content:'';clear:both;}
		#dmap ul.optList > li{float:left;width:51px;margin-bottom:-1px;}
		#dmap ul.optList > li.last{float:none;width:auto;overflow:hidden;}
		#dmap ul.optList > li > a{display:block;overflow:hidden;text-indent:-999em;height:50px;background-position:center center;background-repeat:no-repeat;border:1px solid #a4a4a4;border-right:none;}
		#dmap ul.optList > li.active > a{border-color:#969ca3;}
		#dmap ul.optList > li.last > a{border-right:1px solid #a4a4a4;}
		#dmap ul.optList > li > a.opt1{background-image:url('/assets/images/map/opt1_off.png');}
		#dmap ul.optList > li > a.opt2{background-image:url('/assets/images/map/opt2_off.png');}
		#dmap ul.optList > li.active > a.opt1{background:#626262 url('/assets/images/map/opt1_on.png');}
		#dmap ul.optList > li.active > a.opt2{background:#626262 url('/assets/images/map/opt2_on.png');}
		#dmap .optBox.close > .btn{position:static;background:#474e61 url('http://topis.seoul.go.kr/common/img/map/opt_open.png') center center no-repeat;}
		#dmap .optBox.close > ul.optList{display:none;}
		
		
		#dmap .bitstat{position:absolute;left:25px;bottom:25px;z-index:110; }
		#dmap .bitstat > .btn {position:absolute; left:-0px;top:180px;width:22px;height:22px;background:#474e61 url('/assets/images/map/opt_close.png') center center no-repeat;}
		#dmap .bitstat .lgd{ width:450px; padding:10px; margin-left:22px; border:1px solid #aaa; background:#fff; box-sizing:border-box;}
		/* #dmap .bitstat .lgd table{width:100%; border:1px solid #e0e0e0; color:#333;}
		#dmap .bitstat .lgd table th{ background:#f5f5f5;}
		#dmap .bitstat .lgd table th, #dmap .bitstat .lgd table td{border:1px solid #e0e0e0; padding:10px 0px; text-align:center;  }
		#dmap .bitstat .lgd table td{height:100px;  } */
		/*#dmap .bitstat .lgd span{display:block; margin-bottom:-10px; margin-top:7px; border-bottom:4px solid #28c613;}
		 #dmap .lgd span.opt2{border-bottom:4px solid #ffc600;}
		#dmap .bitstat .lgd span.opt3{border-bottom:4px solid #f11406;}
		#dmap .bitstat .lgd span.opt4{border-bottom:4px solid #797978;} */
		#dmap .bitstat .tit{display:none;}
		#dmap .bitstat.close{bottom:26px;}
		#dmap .bitstat.close > .btn{position:static;background:#474e61 url('/assets/images/map/opt_open.png') center center no-repeat;}
		#dmap .bitstat.close > .lgd{display:none;}
		#dmap .bitstat.close .tit{position:absolute; display:block;left:22px; width:75px; height:30px; line-height:28px; border:1px solid #aaa; text-align:center; font-weight:bold; font-size:13px; background:#fff; }

        </style>
  </jsp:attribute>

    <jsp:attribute name="script">
        <ax:script-lang key="bis" var="COL" />
        <%--      <script src="<c:url value='/assets/js/map/jquery-1.11.2.js' />" type="text/javascript"></script>
              <script src="<c:url value='/assets/js/map/jquery-ui.js' />" type="text/javascript"></script>


      <script src="<c:url value='/assets/js/map/bootstrap.js' />" type="text/javascript"></script>
        --%><script src="<c:url value='/assets/js/map/proj4.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/map/proj4js.js' />" type="text/javascript"></script>
        <script src="<c:url value='/assets/js/openlayers/v3.4.0/build/ol.js' />" type="text/javascript"></script>
<script src="<c:url value='/assets/js/map/bootstrap.js'/>" type="text/javascript"></script>
 <script type="text/javascript" src="<c:url value='/assets/js/map/layer.js' />"></script>
         <script type="text/javascript" src="<c:url value='/assets/js/view/bismap.js' />"></script>

   <script>
       $(document).ready(function() {
         var projection = ol.proj.get('EPSG:3857');

         var center = [9979527.768464608, 3182936.4077257095];
         //View t
           var view = new ol.View({
               center: center,
               zoom: 12,
               maxZoom: 21,
               minZoom: 12
           });
		
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
    
        //
/* 
           var vector = new ol.layer.Vector({
               source: new ol.source.KML({
                   url: '/jsp/kml/Waypoints__20160908_2131.kml',
                   projection:projection
               })
           });
           map.addLayer(vector);
 */
           var pos = ol.proj.transform([16.3725, 48.208889], 'EPSG:4326', 'EPSG:3857');

         /*   // Vienna label
           var vienna = new ol.Overlay({
             position: pos,
             element: document.getElementById('vienna')
           });
           map.addOverlay(vienna);

           // Popup showing the position the user clicked
           var popup = new ol.Overlay({
             element: document.getElementById('popup')
           });
           map.addOverlay(popup); */
	
           /*    var MapLayer_BusInfo = new ol.layer.Vector({
            source: new ol.source.KML({
            projection:projection,
            url: './kml/kmlBusInfo.kml'
            })
            });
            map.addLayer(MapLayer_BusInfo); */
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
        	   
				console.log(map.getView().getZoom()); 
        	
               var feature = this.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                  // businfowin(event.pixel, feature);
                  
                  content = document.getElementById('popup-content');
                  
               var element = popup.getElement();
        	   var coordinate = event.coordinate;
        	   var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        	       coordinate, 'EPSG:3857', 'EPSG:4326'));

        	   
        	   $(element).popover('destroy');
        	   var popovertemplate =[  '<div class="businfoLayer">'+
                   '<div style="list-style:none; height:25px;">'+
                   '<ul class="businfomenu">'+
    	           
    	 	       '	<li style="float:left; font-size:13px; font-weight:bold; padding-left:5px; padding-top:5px; line-height:10px;">철산역(1)(39041)'+
    	           '	</li>'+
    	           '</ul>'+

                   '</div>'+
    		       ' <div style="border:1px; border-color:#868686;">'+
    			   '<table width="320" border="0" cellpadding="0" cellspacing="1" class="scheme-table">'+
      			   '	<thead><tr>'+
    		       '	   <th class="bus_num">버스명</th>'+
    			   ' 	   <th class="bus_arrive">첫번째 도착예정</th>'+
     			   ' 	   <th class="bus_arrive">두번째 도착예정</th></tr>'+
      			   '	</thead></table>'+
    			   ' </div>'+
    			   '<img width="14" height="13" src="/assets/images/map/close.gif" style="position: absolute; right: 5px; top: 5px; cursor: pointer;" onclick="closepopup();">'+
    			   ' </div>'].join('');
        	   content.innerHTML = popovertemplate;
        	   popup.setPosition(coordinate);
        	   
        	   // the keys are quoted to prevent renaming in ADVANCED mode.
        	   $(element).popover({
        	     'placement': 'top',
        	     'animation': false,
        	     'html': true
        	   });
        	   $(element).popover('show');
        	   
                   return feature;

               });

           });
           
     /*       var businfowin = function(pixel, feature) {

               var oWidth = $('.businfoLayer').width();
               var oHeight = $('.businfoLayer').height();

               // 레이어가 나타날 위치를 셋팅한다.
               var divLeft = (pixel[0])-oWidth/2;

               var divTop =(pixel[1])-oHeight-10;


               if (feature) {
                   $('.businfoLayer').css({
                       "top": divTop,
                       "left": divLeft,
                       "position": "absolute"
                   }).show();
               }
           }; */
           /*
            var vectorIconLayer = new ol.layer.Vector({
            name: 'Icon',
            source: new ol.source.Vector({
            features: [new ol.Feature({
            geometry: new ol.geom.Point([185806.2576464433,469961.7108279688]),
            name: 'Icon', // desc가 없으면 마우스오버할떄 위로뜸
            code: 'linkId',    // 아이콘 클릭할떄 오류안나게함
            desc: '이겁니다',
            draggable: false,
            layerGubn : "BUSSTN"
            })]
            }),
            style: new ol.style.Style({
            image: new ol.style.Icon(({
            anchor: ['41', '41'], //아이콘 크기에 따라 유동적으로 변경 필요
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
            src: "/jsp/kml/kmlBusInfo.kml"
            }))
            })
            });

            map.addLayer(vectorIconLayer); */

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

       });
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
       function mapOpt(){
    		if($(".optBox").hasClass("close")){
    			$(".optBox").removeClass("close");
    		}else{
    			$(".optBox").addClass("close");
    		};
    	};
    	
    	
    	function mapBitStat(){
    		if($(".bitstat").hasClass("close")){
    			$(".bitstat").removeClass("close");
    		}else{
    			$(".bitstat").addClass("close");
    		};
    	};
    	//변경
    	function setLayerVisible(layer,zoomlevel)
    	{
    		
    		if($("#" + layer)) {
				if($("#" + layer).parent().hasClass("active")) {
					$("#" + layer).parent().removeClass("active");
					if(layer == "MapLayer_busInfo") 		removeBusMaker();
					if(layer == "MapLayer_stationInfo") 		removeStationMaker();
					if(layer == "MapLayer_bitInfo") 		removeBitMaker();
				}else
					{
					$("#" + layer).parent().addClass("active");
					if(layer == "MapLayer_busInfo") 	 ACTIONS.dispatch(ACTIONS.BUSINFO_MAKER);
					if(layer == "MapLayer_stationInfo") 	ACTIONS.dispatch(ACTIONS.STATIONINFO_MAKER);
					if(layer == "MapLayer_bitInfo") 		allBitMaker();
					}
			}
    	
    	}
    	
    	function allStationMaker(){
    		removeRouteStationLayer();
    		if(!$("#MapLayer_busInfo").parent().hasClass("active"))
  			{
    			removeBusMaker();
  			}
    		axboot.ajax({
                type: "GET",
                url: '/api/v1/bisMtStations',
                data: {"Select":"stationName","useYn":"Y" },
                callback: function (res) {
                    //ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                   var length= res.length;
                   removeStationMaker();
              	    var minX = 999999999, minY = 999999999, maxX = 0, maxY = 0;
                   for(var i = 0;i < length;i++)
                	   {
                		var gps = ol.proj.transform([res[i].gpsX, res[i].gpsY], 'EPSG:4326', 'EPSG:3857');
                		//map.getView().setCenter(gps); 
                	   	var stationLayer = makerLayer(gps,'/assets/images/map/busstopicon.png',res[i].stationName);
                	    stationLayers.push(stationLayer);
                	    
                	    
                	    
                	    var y = res[i].gpsY;
	         	   		var x = res[i].gpsX;
	         	   		if (minX > x && x > 0) minX = x;
	     		        if (minY > y && y > 0) minY = y;
	     		        if (maxX < x && x > 0) maxX = x;
	     		        if (maxY < y && y > 0) maxY = y;
                	    
                	  
                	   }
                   if (minX != null && minY != null && maxX != null && maxY != null) {
       				var bottomLeft = new ol.proj.transform([minX, minY], 'EPSG:4326', 'EPSG:3857');
       		        var topRight = new ol.proj.transform([maxX, maxY], 'EPSG:4326', 'EPSG:3857');
       		        var extent = new ol.extent.boundingExtent([bottomLeft, topRight]);
       		        
       		        map.getView().fitExtent(extent, map.getSize());
       		    } 
                   addStationMaker();
                }
            });
    	}
    	
   </script>

 </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>
        
     
        <ax:split-layout name="ax1"  orientation="vertical">

        <ax:split-panel  width="300" >
                <ax:split-layout name="ax2"  orientation="horizontal">
                    <ax:split-panel  height="90" >

                <ax:form name="searchView0">
                 <div data-ax-tbl="" id="" class="ax-search-tbl" style="">
		<div data-ax-tr="" id="" class="" style="">
			<div data-ax-td="" id="" class="" style=";width:300px">
			    <div data-ax-td-label="" class="" style=";width:300px">   <ax:lang id="bis.routemap.businfomationinquiry" /></div>
			    <div data-ax-td-wrap="">
			    </div>
			</div>
			<div data-ax-td="" id="" class="" style=";width:300px">
			<div data-ax-td-wrap="">
                  <div class="form-inline">
                      <div class="form-group">

                          <input type="text" id="Keyword" data-ax-path="Keyword" class="form-control W200" value="">
                          <button type="button" class="btn btn-primary" data-searchview-btn="search">
                              <i class="cqc-magnifier"></i>
                               <ax:lang id="ax.admin.search" />
                      </button>
                  </div>
              </div>
    </div>
</div>
</div>
</div>
                </ax:form>
                    </ax:split-panel>


                    <ax:split-panel  height="*" >
                      <ax:tab-layout name="ax3" data_fit_height_content="layout-view-01"  >

                            <ax:tab-panel label="bis.bismap.bus" scroll="scroll" active="true"><%-- // active="true"인 패널이 활성화--%>
                             <!--    <div class="counttit" ><strong>버스 <span class="id_totCnt">0</span>건</strong></div>
 -->  
    							 <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                            </ax:tab-panel>
                            <ax:tab-panel label="bis.bismap.station" scroll="scroll">
                       <!--          <div class="counttit" ><strong>정류장 <span class="id_totCnt">0</span>건</strong></div>
                                <ul id="" class="busstop"><li class="">
                                    <p><strong>
                                        <a href="#" >     수색역앞 (12005)    </a>
                                    </strong>
                                    </p>
                                </li></ul> -->
                                 <div data-ax5grid="grid-view-02" data-fit-height-content="grid-view-02" style="height: 300px;"></div>
                            </ax:tab-panel>

                        </ax:tab-layout>
                      </ax:split-panel>

                </ax:split-layout>


            </ax:split-panel>


            <ax:split-panel width="*" >
               <div id="dmap" style="width:100%; height:100%">
           
           
               <div class="optBox">
					<button class="btn" onclick="mapOpt()"></button>
					
						<ul class="optList">		
							<li class=""><a href="javascript:setLayerVisible('MapLayer_busInfo', '', 10);" id="MapLayer_busInfo" class="opt1">버스</a></li>
							<li class="levelCheck last"><a href="javascript:setLayerVisible('MapLayer_stationInfo', '', 9);" id="MapLayer_stationInfo" class="opt2">정류장</a></li>
						<!-- 	<li class="last active"><a href="javascript:setLayerVisible('traffic', '', 4);" id="traffic" class="opt3">소통정보</a></li> -->
					
						</ul>
				</div>
		
					
				<div class="bitstat" style="opacity: 1;">
				
						<button class="btn" onclick="mapBitStat()"></button>
						<div class="lgd">
												<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
										<div data-ax-tr="" id="" class="" style="">
											<div  style="width:213px;" data-ax-td="">
												<div style="width:213px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.busrun.title"/></div>
												

					
											</div>
											<div  style="width:213px;" data-ax-td="">
												<div style="width:213px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.bitstatus"/></div>
											
											</div>
										</div>
										<div data-ax-tr="" id="" class="" style="">
											<div  style="width:213px;" data-ax-td="" >
												<div data-ax-td-wrap="" style="border-right: 1px solid #D8D8D8;">
													<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
											        	<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.busrrun.total"/></div>
																<div data-ax-td-wrap="">
																<div id="busTotal" ></div>
														 		</div>
															</div>
												 		</div>
												 		<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.busrun.run"/></div>
																<div data-ax-td-wrap="">
																<div id="busRun" ></div>
														 		</div>
															</div>
												 		</div>
												 		<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.busrun.etc"/></div>
																<div data-ax-td-wrap="">
																<div id="busEtc" ></div>
														 		</div>
															</div>
												 		</div>
												 	</div>	
												</div>
											</div>
											<div  style="width:213px;" data-ax-td="">
												<div data-ax-td-wrap="">
									        		<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
											        	<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.bitstatus.total"/>	</div>
																<div data-ax-td-wrap="">
																<div id="bitTotal" ></div>
														 		</div>
															</div>
												 		</div>
												 		
												 		<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.bitstatus.run"/>	</div>
																<div data-ax-td-wrap="">
																	<div id="bitRun" ></div>
														 		</div>
															</div>
												 		</div>
												 		
												 		<div data-ax-tr="" id="" class="" style="">
															<div  style="width:213px;" data-ax-td="">
																<div style="width:50px; " data-ax-td-label="" ><ax:lang id="bis.dashboard.bitstatus.etc"/>	</div>
																<div data-ax-td-wrap="">
																	<div id="bitEtc" ></div>
														 		</div>
															</div>
												 		</div>
												 		
												 	</div>	
										 		</div>
											</div>
										</div>
									</div>
						</div>
					</div>
				          <div id="info"></div>
          	  </div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>







