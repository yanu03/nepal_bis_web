<%@ tag import="com.chequer.axboot.core.utils.MessageUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" uri="http://www.springframework.org/tags/form" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%@ attribute name="function3Label" required="false" %>
<%@ attribute name="function4Label" required="false" %>
<%@ attribute name="function5Label" required="false" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<div data-page-buttons="">
    <div class="button-warp">
        
        <!-- https://chequer-io.github.io/chequer-icon/demo.html -->
    
        <button type="button" class="btn btn-default" data-page-btn="reload" onclick="window.location.reload();"><i class="cqc-cw"></i></button>
        
        <c:if test="${authGroupMenu.schAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="search"><i class="cqc-magnifier"></i> 
			  <c:choose>
			  	<c:when test="${loginLocale == 'nep'}">
			  		<%=MessageUtils.getMessage(request, "axnep.admin.inquery")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'en'}">
			  		<%=MessageUtils.getMessage(request, "axen.admin.inquery")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'ko'}">
			  		<%=MessageUtils.getMessage(request, "axko.admin.inquery")%>
			  	</c:when>
			  </c:choose>            
            </button>
        </c:if>

        <c:if test="${authGroupMenu.savAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="save"><i class="cqc-save"></i>
			  <c:choose>
			  	<c:when test="${loginLocale == 'nep'}">
			  		<%=MessageUtils.getMessage(request, "axnep.admin.save")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'en'}">
			  		<%=MessageUtils.getMessage(request, "axen.admin.save")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'ko'}">
			  		<%=MessageUtils.getMessage(request, "axko.admin.save")%>
			  	</c:when>
			  </c:choose>              
            </button>
        </c:if>

        <c:if test="${authGroupMenu.exlAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="excel"><i class="cqc-file-excel-o"></i> 
			  <c:choose>
			  	<c:when test="${loginLocale == 'nep'}">
			  		<%=MessageUtils.getMessage(request, "axnep.admin.excel")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'en'}">
			  		<%=MessageUtils.getMessage(request, "axen.admin.excel")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'ko'}">
			  		<%=MessageUtils.getMessage(request, "axko.admin.excel")%>
			  	</c:when>
			  </c:choose>            
            </button>
        </c:if>

        <c:if test="${authGroupMenu.delAh eq 'Y'}">
            <button type="button" class="btn btn-fn1" data-page-btn="fn1"><i class="cqc-minus"></i>
			  <c:choose>
			  	<c:when test="${loginLocale == 'nep'}">
			  		<%=MessageUtils.getMessage(request, "axnep.admin.delete")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'en'}">
			  		<%=MessageUtils.getMessage(request, "axen.admin.delete")%>
			  	</c:when>
			  	<c:when test="${loginLocale == 'ko'}">
			  		<%=MessageUtils.getMessage(request, "axko.admin.delete")%>
			  	</c:when>
			  </c:choose>             
            
            </button>
        </c:if>

        <c:if test="${authGroupMenu.fn1Ah eq 'Y'}">
            <button type="button" class="btn btn-fn1" data-page-btn="fn1">${function1Label}</button>
        </c:if>

        <c:if test="${authGroupMenu.fn2Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="fn2">${function2Label}</button>
        </c:if>

        <c:if test="${authGroupMenu.fn3Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="fn3">${function3Label}</button>
        </c:if>

        <c:if test="${authGroupMenu.fn4Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="fn4">${function4Label}</button>
        </c:if>

        <c:if test="${authGroupMenu.fn5Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="fn5">${function5Label}</button>
        </c:if>

        <jsp:doBody/>
    </div>
</div>