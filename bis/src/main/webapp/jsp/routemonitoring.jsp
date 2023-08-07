<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
 <jsp:attribute name="css">
	 <style type="text/css">
	#legend img{
	width:25px;
	heigth:25px;
	}
ol.rt-line {
	width:859px;
	padding-left:18px;
	padding-right:41px;
	overflow:hidden;
}
	ol.rt-line img {
		vertical-align:top;
		
	}
	ol.rt-line li {
		position:relative;
		top:0px;
		float:left;
		width:90px;
		height:220px;
		overflow:visible;
	}
	ol.rt-line li.last {
		width:19px;
	}
	ol.rt-line li.linebreak {
		width:19px;
	}
	ol.rt-line li.newline {
		clear:none;
	}
	ol.rt-line li.dir-rtl {
		float:right;
	}
		ol.rt-line li .line-up,
		ol.rt-line li .line-down {
			position:absolute;
			top:36px;
			left:0;
			width:60px;
			height:19px;
			z-index:-1;
			text-indent:-999em;
		}
		ol.rt-line li.linebreak .line-up,
		ol.rt-line li.linebreak .line-down {
			width:19px;
			height:100%;
		}
		ol.rt-line li.last .line-up,
		ol.rt-line li.last .line-down {
			width:19px;
		}
		ol.rt-line li .busstop {
			position:absolute;
			top:41px;
			left:2px;
			z-index:1;
			cursor:hand;
		}

		ol.rt-line li .busstopTurn {
			position:absolute;
			top:41px;
			left:0px;
			z-index:1;
			cursor:hand;
		}

		ol.rt-line li.dir-rtl .busstopTurn {
			position:absolute;
			top:41px;
			left:35px;
			z-index:1;
			cursor:hand;
		}

		ol.rt-line li .busstopStart {
			position:absolute;
			top:63px;
			left:2px;
			z-index:1;
			cursor:hand;
		}
		ol.rt-line li .busstopStart img{
			width:30px;
			heigth:30px;
		}
		ol.rt-line li .busicon {
			position:absolute;
			top:25px;
			left:-1px;
			z-index:1;
			cursor:hand;
		}
		ol.rt-line li .busicon img{
		width:35px;
		heigth:35px;
		}
		ol.rt-line li .busstopEnd {
			position:absolute;
			top:41px;
			left:2px;
			z-index:1;
			cursor:hand;
		}
		
		ol.rt-line li.newline .busstopEnd {
			position:absolute;
			top:41px;
			left:40px;
			z-index:1;
			cursor:hand;
		}
		
		ol.rt-line li.dir-rtl .busstop {
			right:2px;
			left:auto;
		}
		ol.rt-line li .bus {
			position:absolute;
			top:18px;
			left:-1px;
		}
		ol.rt-line li .busstop-name {
			position:absolute;
			top:92px;
			left:10px;
			font-size:11px;
			letter-spacing:0px;
			white-space:nowrap;
			z-index:3;
			font-weight:bold;
		
	-ms-transform: rotate(45deg); /* IE 9 */
    -ms-transform-origin:0 100% 0; /* IE 9 */
    -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
    -webkit-transform-origin:0 100% 0; /* Chrome, Safari, Opera */
    transform: rotate(45deg);
    transform-origin: 0 100% 0;
		}
		ol.rt-line li .busstop-stno {
			position:absolute;
			top:105px;
			left:5px;
			font-size:10px;
			letter-spacing:-1px;
			white-space:nowrap;
			z-index:3;
			font-weight:bold;
			
			-ms-transform: rotate(45deg); /* IE 9 */
			-ms-transform-origin:0 100% 0; /* IE 9 */
			-webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
			-webkit-transform-origin:0 100% 0; /* Chrome, Safari, Opera */
			transform: rotate(45deg);
			transform-origin: 0 100% 0;
		}
		ol.rt-line li .busstop-stno2 {
			position:absolute;
			top:65px;
			left:0px;
			font-size:10px;
			letter-spacing:-1px;
			white-space:nowrap;
			z-index:3;
			font-weight:bold;
		}
		ol.rt-line li .busstop-name2 {
			position:absolute;
			top:55px;
			left:0px;
			font-size:11px;
			letter-spacing:-1px;
			white-space:nowrap;
			z-index:3;
			font-weight:bold;
		}
		
		ol.rt-line li .line-start,
		ol.rt-line li .line-end {
			position:absolute;
			top:20px;
			left:2px;
			z-index:2;
		}
		ol.rt-line li .line-end2 {
			position:absolute;
			top:20px;
			left:42px;
			z-index:2;
		}
		ol.rt-line li .turningpoint {
			position:absolute;
			top:35px;
			left:-3px;
			z-index:2;
		}
		ol.rt-line li .turningpoint2 {
			position:absolute;
			top:35px;
			left: 38px;
			z-index:2;
		}
		ol.rt-line li .traffic-ok,
		ol.rt-line li .traffic-slow,
		ol.rt-line li .traffic-no,
		ol.rt-line li .traffic-jam {
			display:block;
			position:absolute;
			top:75px;
			left:2px;
			width:90px;
			height:7px;
			font-size:0;  /*IE6¿¡¼­ heightºÎºÐ ÃÖ¼Ò °ª ÆÄ±â*/
			z-index:0;
			background-color:#45b500;
			text-indent:-999em;
		}
		ol.rt-line li .traffic-slow {
			background-color:#e98400;
		}
		ol.rt-line li .traffic-jam {
			background-color:#b50002;
		}
		ol.rt-line li .traffic-no {
			background-color:#999999;
		}
		ol.rt-line li.linebreak .traffic-ok,
		ol.rt-line li.linebreak .traffic-slow,
		ol.rt-line li.linebreak .traffic-no,
		ol.rt-line li.linebreak .traffic-jam {
			left:7px;
			width:4px;
			height:100%;
		}
		ol.rt-line li.dir-rtl .traffic-ok,
		ol.rt-line li.dir-rtl .traffic-slow,
		ol.rt-line li.dir-rtl .traffic-no,
		ol.rt-line li.dir-rtl .traffic-jam {
			left:-2px;
		}
		ol.rt-line li.dir-rtl.linebreak .traffic-ok,
		ol.rt-line li.dir-rtl.linebreak .traffic-slow,
		ol.rt-line li.dir-rtl.linebreak .traffic-no,
		ol.rt-line li.dir-rtl.linebreak .traffic-jam {
			left:7px;
		}
		ol.rt-line li .speed {
			position:absolute;
			top:58px;
			left:10px;
			display:block;
			float:left;
			height:22px;
			padding-left:6px;
			background:white url('/resources/images/search_popup/bg_speed_l.gif') no-repeat 0 4px;
			z-index: 15;
		}
			ol.rt-line li .speed span {
				display:block;
				padding-right:6px;
				background:transparent url('/resources/images/search_popup/bg_speed_r.gif') no-repeat 100% 4px;
			}
				ol.rt-line li .speed span span {
					height:14px;
					padding:6px 0 2px;
					background:transparent url('/resources/images/search_popup/bg_speed_tip.gif') no-repeat 50% 0;
					font-size:11px;
					line-height:14px;
					white-space:nowrap;
				}
				
		ul, ol
		{
			list-style: none;
		}
	 </style>
 </jsp:attribute>
 
    <jsp:attribute name="script">
         <ax:script-lang key="bis" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/routemonitoring.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

<%-- 
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='검색조건' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='검색조건 1' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='검색조건 2' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div> --%>

      
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
						 <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
                      </ax:split-panel>

                </ax:split-layout>


            </ax:split-panel>


            <ax:split-panel width="*"  scroll="scroll">
            <div id="legend" >
            	<img src="/assets/images/map/icon_bus_vehicle_42_blue.png"><ax:lang id="bis.routemap.upbus" />
            	<img src="/assets/images/map/icon_bus_vehicle_42_red.png"><ax:lang id="bis.routemap.downbus" />
            	 <img src="/assets/images/map/icon_bus_up.png"><ax:lang id="bis.routemap.uplinestation" />
            	 <img src="/assets/images/map/icon_bus_down.png"><ax:lang id="bis.routemap.downlinestation" />
            	 <img src="/assets/images/map/icon_bus_start.png"><ax:lang id="bis.routemap.base" />
            	<img src="/assets/images/map/icon_bus_end.png"><ax:lang id="bis.routemap.laststop" />
            	<img src="/assets/images/map/icon_bus_turn.png"><ax:lang id="bis.routemap.turnplace" />
            	
            </div>
             <div id="route"></div>
    
		    </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>