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

import kr.tracom.bis.domain.bisItSystemschedule.BisItSystemschedule;
import kr.tracom.bis.domain.bisItSystemschedule.BisItSystemscheduleService;
import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisItSystemschedules")
	

public class BisItSystemscheduleController extends BaseController  {
	@Inject
    private BisItSystemscheduleService bisItSystemscheduleService;
	
	@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItSystemschedule> list(RequestParams requestParams, HttpServletRequest request) {
		// List list = bisMtRouteService.gets(requestParams);
		// return Responses.ListResponse.of(list);

		Map parameterMap = RequestUtil.getParameterMap(request);
		List<BisItSystemschedule> list = null;
		list = bisItSystemscheduleService.findAll(parameterMap);

		return list;
	}

	@RequestMapping(method =RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse save( @RequestBody List<Map<String,Object>> bisItSystemschedule) {
		//Map parameterMap = RequestUtil.getParameterMap(request);
		
		for(Map<String,Object> temp:bisItSystemschedule) {
			if(Boolean.TRUE.equals(temp.get("__deleted__"))) {
				bisItSystemscheduleService.delete(temp);
			}else{
				bisItSystemscheduleService.add(temp);
			}
		}
		
		return ok();
	}

	@RequestMapping(value = "/maxplus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public  Map count() {
		Map parameterMap = new HashMap();
		String max = bisItSystemscheduleService.maxPlus();
		parameterMap.put("max", max);
		parameterMap.put("remark"," ");
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return parameterMap;
		
	}
}
