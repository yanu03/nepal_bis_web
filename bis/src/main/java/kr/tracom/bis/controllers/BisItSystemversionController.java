package kr.tracom.bis.controllers;
 
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversion;
import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversionService;
import kr.tracom.bis.domain.bisItSystemversion.BisItSystemversion;
import kr.tracom.bis.domain.bisItSystemversion.BisItSystemversionService;
import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.utils.RequestUtil;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;
 
@Controller
@RequestMapping(value = "/api/v1/bisItSystemversions")
public class BisItSystemversionController extends BaseController {
 
    @Inject
    private BisItSystemversionService bisItSystemversionService;
    @Inject
    private BisItSendsystemversionService bisItSendsystemversionService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItSystemversion>  list(RequestParams requestParams,HttpServletRequest request) {
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisItSystemversion> list = bisItSystemversionService.findOne(parameterMap);
        return list;
    }
    
    @RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse add(@RequestBody BisItSendsystemversion request) {
    	bisItSendsystemversionService.add(request);
        return ok();
    }
    
}
