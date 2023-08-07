package kr.tracom.bis.controllers;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import kr.tracom.bis.domain.bisItSchedulegroup.BisItSchedulegroup;
import kr.tracom.bis.domain.bisItSchedulegroup.BisItSchedulegroupService;
import kr.tracom.bis.domain.bisItSystemschedule.BisItSystemschedule;
import kr.tracom.bis.domain.bisItSystemschedule.BisItSystemscheduleService;
import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestation;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisItSchedulegroups")
public class BisItschedulegroupController extends BaseController  {
	@Inject
    private BisItSchedulegroupService bisItSystemscheduleService;
	
	@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItSchedulegroup> list(RequestParams requestParams, HttpServletRequest request) {
		// List list = bisMtRouteService.gets(requestParams);
		// return Responses.ListResponse.of(list);

		Map parameterMap = RequestUtil.getParameterMap(request);
		List<BisItSchedulegroup> list = null;
		list = bisItSystemscheduleService.findAll(parameterMap);

		return list;
	}
    @Transactional
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<BisItSchedulegroup> list) {
       // bisMtRouteService.save(request);
    	if(list.size() > 0)
    	{
    		
    		bisItSystemscheduleService.delete(list.get(0));
    	}
    	for(int i = 0; i < list.size();i++)
    	{
    		if(list.get(i).getUseYn().equals("Y"))
    		{
    			bisItSystemscheduleService.add(list.get(i));
    		}
    		
    	}
        return ok();
    }
	/*@RequestMapping(method =RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse save( @RequestBody BisItSchedulegroup bismtroute) {
		//Map parameterMap = RequestUtil.getParameterMap(request);

		bisItSystemscheduleService.add(bismtroute);
		return ok();
	}*/

}
