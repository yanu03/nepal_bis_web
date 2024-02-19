<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<ax:set key="axbody_class" value="frame-set"/>

<ax:layout name="frame">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
       	<c:choose>
		  	<c:when test="${loginLocale == 'nep'}">
		  		<ax:script-lang key="axnep" var="COL" />
		  	</c:when>
		  	<c:when test="${loginLocale == 'en'}">
		  		<ax:script-lang key="axen" var="COL" />
		  	</c:when>
		  	<c:when test="${loginLocale == 'ko'}">
		  		<ax:script-lang key="axko" var="COL" />
		  	</c:when>
	 	 </c:choose>
		<script type="text/javascript" src="<c:url value='/assets/js/view/frame.js' />"></script>
	</jsp:attribute>
    <jsp:body>
        <div id="content-frame-container" class="ax-frame-contents"></div>
    </jsp:body>
</ax:layout>
