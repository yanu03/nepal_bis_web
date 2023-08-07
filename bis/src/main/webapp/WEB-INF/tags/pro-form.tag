<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="java.util.List" %>
<%@ tag import="java.util.Map" %>
<%@ tag import="kr.tracom.bis.utils.PromotionUtils" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="clazz" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="name" required="false" %>

<%
    StringBuilder builder = new StringBuilder();
	String tempCode="";
    List<Map<String, Object>> formTypes = PromotionUtils.formTypeGet();
    builder.append("<select  onchange='fileTypeSelect()' class=\"form-control "+ clazz +" \"");
    builder.append("id=\"" + id + "\"");
    builder.append("name=\"" + name + "\"");
    builder.append("data-ax-path=\"" + dataPath + "\"");
    System.out.println("@@@@@@@@@@@@@@ : "+dataPath);
    System.out.println("dataPath : "+dataPath);
    //builder.append("style='vertical-align:middle;'");
    builder.append(">");
    
    for(Map<String, Object> temp:formTypes){
    	tempCode=temp.get("detailCode").toString();
    	builder.append(String.format("<option value=\"%s\">%s</option>", temp.get("detailCode").toString(), temp.get("detailCodeName").toString()));
    }
    builder.append("</select>");
      
%>

<%=builder.toString()%>