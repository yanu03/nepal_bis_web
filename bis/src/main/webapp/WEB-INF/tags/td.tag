<%@ tag import="com.chequer.axboot.core.utils.TagUtils" %>
<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="com.chequer.axboot.core.utils.MessageUtils" %>
<%@ tag import="javax.servlet.http.HttpServletRequest" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>

<%@ attribute name="id" %>
<%@ attribute name="label" %>
<%@ attribute name="labelLocale" %>
<%@ attribute name="labelClazz" %>
<%@ attribute name="clazz" %>
<%@ attribute name="labelStyle" %>
<%@ attribute name="style" %>
<%@ attribute name="labelWidth" %>
<%@ attribute name="width" %>
<%

 	String currentLang = (String)session.getAttribute("loginLocale");
    if(StringUtils.isEmpty(currentLang)) {
        currentLang = "nep"; // 기본값 설정
    } 
    
	
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
	
	String[] parts = label.split("\\.", 2);
	String baseLabel = parts[0];
	String labelLocaleSuffix = baseLabel + suffix;
	labelLocale = label.replaceFirst("^"+ baseLabel, labelLocaleSuffix);
	
    if(StringUtils.isNotEmpty(label)) {
        String localizedMessage = MessageUtils.getMessage(request, labelLocale);

        if(StringUtils.isNotEmpty(localizedMessage)) {
            label = localizedMessage;
        }
    }

    TagUtils tagUtils = new TagUtils(getParent());
    String trLabelWidth = tagUtils.getParentAttribute("labelWidth");
    String trWidth = tagUtils.getParentAttribute("width");

    if (StringUtils.isEmpty(labelStyle)) {
        labelStyle = "";
    }

    if (StringUtils.isEmpty(style)) {
        style = "";
    }

    if (StringUtils.isEmpty(labelWidth)) {
        if(!StringUtils.isEmpty(trLabelWidth)) {
            labelStyle += ";width:" + trLabelWidth;
        }
    }else{
        labelStyle += ";width:" + labelWidth;
    }

    if (StringUtils.isEmpty(width)) {
        if(!StringUtils.isEmpty(trWidth)) {
            style += ";width:" + trWidth;
        }
    }else{
        style += ";width:" + width;
    }

    if (StringUtils.isEmpty(label)) {
%>
<div data-ax-td="${id}" id="${id}" class="${clazz}" style="<%=label%>">
    <jsp:doBody/>
</div>
<%
} else {
%>

<div data-ax-td="${id}" id="${id}" class="${clazz}" style="<%=style%>">
    <div data-ax-td-label="${id}" class="${labelClazz}" style="<%=labelStyle%>"><%=label%></div>
    <div data-ax-td-wrap="">
        <jsp:doBody/>
    </div>
</div>
<%
    }
%>
