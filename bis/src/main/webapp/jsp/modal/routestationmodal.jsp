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
        <script type="text/javascript" src="<c:url value='/assets/js/view/modal/routestationmodal.js' />"></script>
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
        </ax:page-buttons>

       <%--  <div role="page-header">
            <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='조회' width="500px" labelWidth="80px">
  					 		 <div class="form-inline">
                                <div class="form-group">
                       			  <div style="width:120px;float:left;"><div data-ax5select="select1"></div></div> 
                         		  <input type="text" name="Keyword"id="Keyword" class="form-control W120"/>      
                                  <button type="button" class="btn btn-primary" data-searchview-btn="modal">
                                      <i class="cqc-magnifier"></i>
                           	          <ax:lang id="ax.admin.search"/>
                                  </button>
                       		   </div>
                     	    </div>

                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
                  
            </ax:form>
           
        </div>
 --%>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

       
            

                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>