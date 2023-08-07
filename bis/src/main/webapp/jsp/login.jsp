<%@ page import="kr.tracom.bis.domain.init.DatabaseInitService" %>
<%@ page import="com.chequer.axboot.core.context.AppContextManager" %>
<%@ page import="com.chequer.axboot.core.utils.SessionUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%boolean initialized = AppContextManager.getBean(DatabaseInitService.class).initialized();

    String lastNavigatedPage = null;
    
    if (SessionUtils.isLoggedIn()) {
        lastNavigatedPage = "/jsp/main.jsp";
    }

    if (initialized) {
       request.setAttribute("redirect", lastNavigatedPage);
    }  else {
        request.setAttribute("redirect", "/setup");
    } %>
    
<script type="text/javascript">
	var uAgent=navigator.userAgent.toLowerCase();
	var mobilePhones=new Array('iphone', 'ipod', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile', 'windows phone');
	var result=false;
	for(var i in mobilePhones){
		console.log("result : "+uAgent.indexOf(mobilePhones[i]));
		if(uAgent.indexOf(mobilePhones[i])!=-1){
			result=true;
			break;
		}
	}
	if(result==true){
		document.location.href=document.location.origin+"/bisMobile";
	}
</script>

<c:if test="${redirect!=null}">
    <c:redirect url="${redirect}"/>
</c:if>

<ax:set key="axbody_class" value="login"/>

<ax:layout name="empty">
    <jsp:attribute name="css">
        <style>
            .ax-body.login {
                background: url(${config.background.login}) center center;
                background-size: cover;
                color: #ccc;
            }

        </style>
    </jsp:attribute>
    <jsp:attribute name="js">
        <script>
            axboot.requireSession('${config.sessionCookie}');
        </script>
        <script type="text/javascript" src="<c:url value='/assets/js/axboot/dist/good-words.js' />"></script>
    </jsp:attribute>

    <jsp:attribute name="script">
        <script type="text/javascript">
            var fnObj = {
                pageStart: function () {

                    $("#good_words").html(goodWords.get());
                },
                login: function () {
                    axboot.ajax({
                        method: "POST",
                        url: "/api/login",
                        data: JSON.stringify({
                            "userCd": $("#userCd").val(),
                            "userPs": $("#userPs").val()
                        }),
                        callback: function (res) {
                            if (res && res.error) {
                                if (res.error.message == "Unauthorized") {
                                    alert("Login failed. Check your account information.");
                                }
                                else {
                                    alert(res.error.message);
                                }
                                return;
                            }
                            else {
                                location.reload();
                               // document.location.href="/jsp/main.jsp";
                            }
                        },
                        options: {
                            nomask: false, apiType: "login"
                        }
                    });
                    return false;
                }
            };
        </script>
    </jsp:attribute>


    <jsp:body>

        <ax:flex-layout valign="middle" align="center" style="width:100%;height:100%;">
            <%-- <div>
                <img src="${pageContext.request.contextPath}${config.logo.login}" class="img-logo" />
            </div> --%>

            <div class="panel">
                <div class="panel-heading"><ax:lang id="ax.admin.login.guide.message"/></div>
                <div class="panel-body">
                    <form name="login-form" class="" method="post" action="/api/login" onsubmit="return fnObj.login();" autocomplete="off">


                        <div class="form-group">
                            <label for="userCd"><i class="cqc-new-message"></i> <ax:lang id="ax.admin.id"/></label>
                            <ax:input id="userCd" clazz="ime-false" />
                        </div>

                        <div class="form-group">
                            <label for="userPs"><i class="cqc-key"></i> <ax:lang id="ax.admin.password"/></label>
                            <ax:input type="password" id="userPs" clazz="ime-false" />
                        </div>

                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

                        <div class="ax-padding-box" style="text-align: right;">
                            <button type="submit" class="btn">&nbsp;&nbsp;<ax:lang id="ax.admin.login"/>&nbsp;&nbsp;</button>
                        </div>

                    </form>
                </div>
                <%-- <ul class="list-group">
                    <li class="list-group-item">
                        <a href="#"><ax:lang id="ax.admin.find.id"/></a>
                        &nbsp;
                        &nbsp;
                        <a href="#"><ax:lang id="ax.admin.find.password"/></a>
                    </li>
                </ul> --%>
            </div>

            <%-- <div class="txt-copyrights">
                ${config.copyrights}
            </div> --%>

            <!-- <div class="txt-good-words" id="good_words">

            </div> -->
        </ax:flex-layout>
    </jsp:body>

</ax:layout>