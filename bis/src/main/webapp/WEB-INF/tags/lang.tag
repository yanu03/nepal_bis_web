<%@ tag import="com.chequer.axboot.core.utils.MessageUtils" %>
<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="id" required="true" %>
<%@ attribute name="args" %>
<%
    String message = "";

	String currentLang = (String)session.getAttribute("loginLocale");
	if(StringUtils.isEmpty(currentLang)){
		currentLang = "nep"; // 기본값 설정
	}
	//String currentLang = "test";
	String suffix = "nep";
	if(currentLang.equals("nep")){
		suffix = "nep";
	}
	else if(currentLang.equals("en")){
		suffix = "en";
	}
	else if(currentLang.equals("ko")){
		suffix = "ko";
	}
	
	String[] parts = id.split("\\.", 2);
	String baseLabel = parts[0];
	String labelLocaleSuffix = baseLabel + suffix;
	id = id.replaceFirst("^"+ baseLabel, labelLocaleSuffix);

    try {
        message = MessageUtils.getMessage(request, id, args);
    } catch (Exception e) {
        e.printStackTrace();
    }

%><%=message%>