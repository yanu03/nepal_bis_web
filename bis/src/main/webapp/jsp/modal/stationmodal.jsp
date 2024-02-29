<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="bis" var="COL" />
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/modal/stationmodal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title">
            <i class="cqc-browser"></i>
        </h1>
    </jsp:attribute>
    <jsp:body> 
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
           <button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
           <button type="button" class="btn btn-primary" data-page-btn="modal"><i class="cqc-magnifier"></i><ax:lang id="ax.admin.search"/></button>
                       		 
        </ax:page-buttons>

        <div role="page-header">
          <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
  							<div data-ax5select="select1"></div> 
                        </ax:td>
                        <ax:td label='bis.search' width="300px" labelWidth="80px">
                        	  <input type="text" name="Keyword"id="Keyword" onkeypress="if( event.keyCode==13 ){ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);}" class="form-control W120"/>      
                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
            </ax:form>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>