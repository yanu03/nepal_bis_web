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
		ul.checkList{width:450px;background-color:#fff;list-style:none;padding-left:0px;}
		ul.checkList:after{display:block;content:'';clear:both;}
		ul.checkList > li{float:left;width:150px;height:17px;font-size:15px;margin-bottom:-1px;}
	</style>
  </jsp:attribute>

    <jsp:attribute name="script">
      <ax:script-lang key="bis" var="COL" />
      <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/vehicle/controlmanagement.js' />"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons>
        
        </ax:page-buttons>
        <ax:split-layout name="ax1" orientation="vertical">
                        <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                         <ax:form name="alram">
					<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:100%;" data-ax-td="">
				    <div style="width:100%; " data-ax-td-label="" >Firmware</div>
				</div>
			</div>
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:500px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >Type</div>
					 <div data-ax-td-wrap="">
					 <div class="form-inline">
							<div class="form-group">
								<select id="filecode" data-ax-path="filecode" style="vertical-align: middle;" class="form-control" >
	                       			<option value="100">Terminal frimware1</option>
	                       			<option value="101">Terminal frimware2</option>
	                       			<option value="150">BIT frimware1</option>
	                       			<option value="151">BIT frimware2</option>
                      			</select>
							</div>
						</div>	
			   		 </div>
				</div>
				<div  style="width:500px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >File</div>
					 <div data-ax-td-wrap="">
							 	<div class="input-group">
							 	<div style="float:left">
							 		<input type="text" id="filename" name="filename" title="" class="form-control" size="30" value="" readonly/>
							 	  	</div>
							 	  	  	<button id="fileButton" class="btn btn-primary">Search</button>
                                </div>
			                        <input style="display:none;" type="file" accept="image/*" data-ax-path="upFile" id="upFile" name="upFile" onchange="javascript:getCmaFileView(this,'stype');"/>
				   		 </div>
					</div>
				</div>
			</div>
			</ax:form>

            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
</ax:layout>
            