package kr.tracom.bis.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.utils.ContextUtil;
import com.chequer.axboot.core.utils.CookieUtils;
import com.chequer.axboot.core.utils.JsonUtils;
import com.chequer.axboot.core.utils.ModelMapperUtils;
import com.chequer.axboot.core.utils.PhaseUtils;
import com.chequer.axboot.core.utils.RequestUtils;
import com.chequer.axboot.core.vo.ScriptSessionVO;

import kr.tracom.bis.code.GlobalConstants;
import kr.tracom.bis.domain.program.Program;
import kr.tracom.bis.domain.program.ProgramService;
import kr.tracom.bis.domain.program.menu.Menu;
import kr.tracom.bis.domain.program.menu.MenuService;
import kr.tracom.bis.domain.user.SessionUser;
import kr.tracom.bis.domain.user.UserHistoryService;
import kr.tracom.bis.domain.user.auth.menu.AuthGroupMenu;
import kr.tracom.bis.domain.user.auth.menu.AuthGroupMenuService;
import kr.tracom.bis.utils.JWTSessionHandler;

@Service
public class AXBootTokenAuthenticationService {

    private final JWTSessionHandler jwtSessionHandler;

    @Inject
    private ProgramService programService;

    @Inject
    private AuthGroupMenuService authGroupMenuService;

    @Inject
    private MenuService menuService;
    
    @Inject
    private UserHistoryService userHistoryService;

    public AXBootTokenAuthenticationService() {
        jwtSessionHandler = new JWTSessionHandler(DatatypeConverter.parseBase64Binary("YXhib290"));
    }

    public int tokenExpiry() {
        if (PhaseUtils.isProduction()) {
            return 60 * 50;
        } else {
            return 60 * 10 * 10 * 10 * 10;
        }
    }

    public void addAuthentication(HttpServletResponse response, AXBootUserAuthentication authentication) throws IOException {
        final SessionUser user = authentication.getDetails();
        setUserEnvironments(user, response);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
    	// 로그인 이력 추가
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("userCd", user.getUserCd());
        userMap.put("userNm", user.getUsername());
        userMap.put("locale", user.getLocale().toString());
        userHistoryService.add(userMap);
    }

    public void setUserEnvironments(SessionUser user, HttpServletResponse response) throws IOException {
        String token = jwtSessionHandler.createTokenForUser(user);
        CookieUtils.addCookie(response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY, token, -1);
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws IOException {
        RequestUtils requestUtils = RequestUtils.of(request);
        final String token = CookieUtils.getCookieValue(request, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        final String progCd = FilenameUtils.getBaseName(request.getServletPath());
        final Long menuId = requestUtils.getLong("menuId");
        final String requestUri = request.getRequestURI();
        final String language = requestUtils.getString(GlobalConstants.LANGUAGE_PARAMETER_KEY, "");

        if (StringUtils.isNotEmpty(language)) {
            CookieUtils.addCookie(response, GlobalConstants.LANGUAGE_PARAMETER_KEY, language);
        }

        if (token == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }

        SessionUser user = jwtSessionHandler.parseUserFromToken(token);

        if (user == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }

        if (!requestUri.startsWith(ContextUtil.getBaseApiPath())) {
            if (menuId > 0) {
                Menu menu = menuService.findOne(menuId);

                if (menu != null) {
                    Program program = menu.getProgram();

                    if (program != null) {
                        requestUtils.setAttribute("program", program);
                        requestUtils.setAttribute("pageName", menu.getLocalizedMenuName(request));
                        System.out.println(requestUtils.getAttribute("pageName"));
                        requestUtils.setAttribute("pageRemark", program.getRemark());

                        if (program.getAuthCheck().equals(AXBootTypes.Used.YES.getLabel())) {
                            AuthGroupMenu authGroupMenu = authGroupMenuService.getCurrentAuthGroupMenu(menuId, user);
                            if (authGroupMenu == null) {
                                throw new AccessDeniedException("Access is denied");
                            }
                            requestUtils.setAttribute("authGroupMenu", authGroupMenu);
                        }
                    }
                }
            }

            ScriptSessionVO scriptSessionVO = ModelMapperUtils.map(user, ScriptSessionVO.class);
            scriptSessionVO.setDateFormat(scriptSessionVO.getDateFormat().toUpperCase());
            //scriptSessionVO.getDetails().put("language", requestUtils.getLocale(request).getLanguage()); //기존 작성된 language
            scriptSessionVO.getDetails().put("language", user.getLoginLocale()); //메뉴명 표출위해 loginLocale로 변경함
            requestUtils.setAttribute("loginUser", user);
            requestUtils.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));
            //requestUtils.setAttribute("loginLocale", user.getLoginLocale());
            if (progCd.equals("main")) {
                List<Menu> menuList = menuService.getAuthorizedMenuList(user.getMenuGrpCd(), user.getAuthGroupList());
                requestUtils.setAttribute("menuJson", JsonUtils.toJson(menuList));
            }
        }

        setUserEnvironments(user, response);

        return new AXBootUserAuthentication(user);
    }

    private Authentication deleteCookieAndReturnNullAuthentication(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.deleteCookie(request, response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        ScriptSessionVO scriptSessionVO = ScriptSessionVO.noLoginSession();
        request.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));
        return null;
    }
}
