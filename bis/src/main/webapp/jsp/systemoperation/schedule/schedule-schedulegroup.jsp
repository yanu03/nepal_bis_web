<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
<jsp:attribute name="css">
      <link rel="stylesheet" href="<c:url value='/assets/js/openlayers/v3.4.0/css/ol.css' />" type="text/css"/>


  </jsp:attribute>

    <jsp:attribute name="script">
        <ax:script-lang key="bis" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/schedule/schedule-schedulegroup.js' />"></script>
              <script type="text/javascript" src="<c:url value='/assets/js/map/layer.js' />"></script>
             <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
         <script>
         var loginid ="${loginUser.userCd}";
        
   </script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>
 		<div role="page-header">
              <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
				 		 	<select class="form-control" id="" name="" data-ax-path="Select" >
								<option value="scheduleGroupId"><ax:lang id="bis.systemschedulegroup.schedulegroupid"/></option>
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
            <ax:split-panel width="50%" style="">
                <!-- 목록 -->
 
               <div data-fit-height-aside="grid-view-01">
                              <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                         		  SCHEDULE GROUP LIST</h2>
                    </div>
                  
                </div>
               </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
              
            </ax:split-panel>
            
           <ax:splitter></ax:splitter>
        
                        <ax:split-panel width="50%" style="padding-left: 10px;" scroll="scroll">

            
        <div data-fit-height-aside="left-view-01">
          <div class="ax-button-group" >
  			   <div class="left">
                        <h2><i class="cqc-list"></i>
                     	SCHEDULE LIST</h2>
            
                 </div>
                 <div class="right">
                 	     <button class="btn btn-default" data-grid-view-02-btn="Stationfind">
                 		      <i class="cqc-circle-with-plus"></i>ADD
                 	      </button>
               	       	 <button class="btn btn-default" data-grid-view-02-btn="delete">
	                 	      <i class="cqc-circle-with-minus"></i>Delete
                 	      </button>
                 	   
                 </div>
             </div>
         </div>             
    <div data-ax5grid="grid-view-02"  data-fit-height-content="left-view-01" style="height: 400px;" ></div>
   
  
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>