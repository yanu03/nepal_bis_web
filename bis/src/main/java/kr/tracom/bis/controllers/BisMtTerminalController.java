package kr.tracom.bis.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtStation.BisMtStation;
import kr.tracom.bis.domain.bisMtStation.BisMtStationService;
import kr.tracom.bis.domain.bisMtTerminal.BisMtTerminal;
import kr.tracom.bis.domain.bisMtTerminal.BisMtTerminalService;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtTerminals")
public class BisMtTerminalController extends BaseController {
	@Inject
    private BisMtTerminalService bisMtTerminalService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtTerminal>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtTerminal> list = null;
    	list= bisMtTerminalService.findAll(parameterMap);
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtTerminal request) {
    	bisMtTerminalService.add(request);
    	
        return ok();
    }
    
	@RequestMapping(value = "/maxplus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public  Map maxplus() {
		Map parameterMap = new HashMap();
		String max = bisMtTerminalService.maxPlus();
		parameterMap.put("max", max);
		parameterMap.put("remark"," ");
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return parameterMap;
		
	}
}
