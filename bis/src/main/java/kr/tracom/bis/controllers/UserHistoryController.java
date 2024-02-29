package kr.tracom.bis.controllers;

import kr.tracom.bis.domain.bisItScenario.BisItScenario;
import kr.tracom.bis.domain.user.User;
import kr.tracom.bis.domain.user.UserHistory;
import kr.tracom.bis.domain.user.UserHistoryService;
import kr.tracom.bis.domain.user.UserService;
import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.inject.Inject;
import javax.validation.Valid;

import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value = "/api/v2/userhistory")
public class UserHistoryController extends BaseController {

    @Inject
    private UserHistoryService userHistoryService;
    
	@RequestMapping(value = "/parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<UserHistory> list(@RequestParam Map<String,Object> searchMap) {
		return userHistoryService.loginHistory(searchMap);
	}    

//    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON, params = "userCd")
//    public User get(RequestParams requestParams) {
//        return userService.getUser(requestParams);
//    }

//    @RequestMapping(value = "/parent", method = RequestMethod.PUT, produces = APPLICATION_JSON)
//    public ApiResponse save(@Valid @RequestBody User user) throws Exception {
//    	userHistoryService.add(user);
//        return ok();
//    }
}
