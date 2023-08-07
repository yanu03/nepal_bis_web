<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="java.util.List" %>
<%@ tag import="kr.tracom.bis.utils.BisCtDetailCodeUtils" %>
<%@ tag import="kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCode" %>
<%@ tag import="java.util.Map"%>
<%@ tag import="java.util.HashMap"%>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="groupCd" required="true" %>
<%@ attribute name="name" required="false" %>
<%@ attribute name="clazz" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="defaultValue" required="false" %>
<%@ attribute name="emptyValue" required="false" %>
<%@ attribute name="emptyText" required="false" %>

<%
    StringBuilder builder = new StringBuilder();
	Map parameterMap = new HashMap();
	parameterMap.put("Keyword", groupCd);
	System.out.println("defaultValue : ");
    List<BisCtDetailCode> commonCodes = BisCtDetailCodeUtils.getUseY(parameterMap);
            builder.append("<select style='margin-top:3px;' class=\"form-control "+ clazz +" \"");

            if (StringUtils.isEmpty(emptyValue)) {
                emptyValue = "";
            }

            if (StringUtils.isNotEmpty(id)) {
                builder.append("id=\"" + id + "\"");
            }

            if (StringUtils.isNotEmpty(name)) {
                builder.append("name=\"" + name + "\"");
            }

            if (StringUtils.isNotEmpty(dataPath)) {
                builder.append("data-ax-path=\"" + dataPath + "\"");
            }

            builder.append(">");


            if (StringUtils.isEmpty(defaultValue) && StringUtils.isNotEmpty(emptyText)) {
                builder.append(String.format("<option value=\"%s\">%s</option>", emptyValue, emptyText));
            }

            for (BisCtDetailCode commonCode : commonCodes) {
            	
            	System.out.println("defaultValue2 : "+commonCode.getDetailCode());
            	System.out.println("defaultValue2 : "+commonCode.getDetailCodeName());
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getDetailCode())) {
                	System.out.println("defaultValue : "+defaultValue);
                    builder.append(String.format("<option value=\"%s\" selected>%s</option>",commonCode.getDetailCode(), commonCode.getDetailCodeName()));
                }
                else
                {
                    builder.append(String.format("<option value=\"%s\">%s</option>", commonCode.getDetailCode(), commonCode.getDetailCodeName()));
                    
                }
              
            }
          
            builder.append("</select>");
 
%>

<%=builder.toString()%>