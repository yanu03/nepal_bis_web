package kr.tracom.bis.controllers;
 
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import kr.tracom.bis.domain.bisMtStation.BisMtStation;
import kr.tracom.bis.domain.bisMtStation.BisMtStationService;
import kr.tracom.bis.utils.RequestUtil;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
@Controller
@RequestMapping(value = "/api/v1/bisMtStations")
public class BisMtStationController extends BaseController {
 
    @Inject
    private BisMtStationService bisMtStationService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtStation>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtStation> list = null;
    	list= bisMtStationService.findSearch(parameterMap);
   
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtStation request) {
    	bisMtStationService.add(request);
    	
        return ok();
    }
    @RequestMapping(value="/count",method={RequestMethod.GET},produces =APPLICATION_JSON)
    public List<BisMtStation> count()
    {
    	return bisMtStationService.count();
    }
	@RequestMapping(value = "/maxplus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public  Map maxplus() {
		Map parameterMap = new HashMap();
		String max = bisMtStationService.maxPlus();
		parameterMap.put("max", max);
		parameterMap.put("remark"," ");
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return parameterMap;
		
	}
}