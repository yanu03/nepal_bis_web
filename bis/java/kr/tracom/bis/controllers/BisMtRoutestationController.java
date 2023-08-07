package kr.tracom.bis.controllers;
 
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtRoute.BisMtRouteService;
import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestation;
import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestationService;
import kr.tracom.bis.domain.sample.parent.ParentSampleVO;
import kr.tracom.bis.utils.RequestUtil;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
@Controller
@RequestMapping(value = "/api/v1/bisMtRoutestations")
public class BisMtRoutestationController extends BaseController {
 
    @Inject
    private BisMtRoutestationService bisMtRoutestationService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtRoutestation>  list(RequestParams requestParams,HttpServletRequest request) {


    		Map parameterMap = RequestUtil.getParameterMap(request);
    		
    		
    	List<BisMtRoutestation> list = null;

	 list= bisMtRoutestationService.findAll(parameterMap);

   	 return list;
    	 }
    @Transactional
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<BisMtRoutestation> list) {
       // bisMtRouteService.save(request);
    	if(list.size() > 0)
    	{
    		
    		bisMtRoutestationService.delete(list.get(0).getRouteId());
    	}
    	for(int i = 0; i < list.size();i++)
    	{
    		if(list.get(i).getUseYn().equals("Y"))
    		{
    			bisMtRoutestationService.add(list.get(i));
    		}
    		
    	}
        return ok();
    }
    
    @RequestMapping(value="/routeMonitor",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtRoutestation>  routemonitoring(RequestParams requestParams,HttpServletRequest request) {


		Map parameterMap = RequestUtil.getParameterMap(request);
		
		
	List<BisMtRoutestation> list = null;

 list= bisMtRoutestationService.routemonitor(parameterMap);

	 return list;
	 }
}