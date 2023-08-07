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

import kr.tracom.bis.domain.bisItBitschedulegroup.BisItBitschedulegroup;
import kr.tracom.bis.domain.bisItBitschedulegroup.BisItBitschedulegroupService;
import kr.tracom.bis.domain.bisItSystemschedulegroup.BisItSystemschedulegroup;
import kr.tracom.bis.domain.bisItSystemschedulegroup.BisItSystemschedulegroupService;
import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestation;
import kr.tracom.bis.utils.RequestUtil;


@Controller
@RequestMapping(value = "/api/v1/bisItBitschedulegroups")
public class BisItBitschedulegroupController extends BaseController  {
	@Inject
    private BisItBitschedulegroupService bisItBitschedulegroupService;
	
	@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItBitschedulegroup> list(RequestParams requestParams, HttpServletRequest request) {
		// List list = bisMtRouteService.gets(requestParams);
		// return Responses.ListResponse.of(list);

		Map parameterMap = RequestUtil.getParameterMap(request);
		List<BisItBitschedulegroup> list = null;
		list = bisItBitschedulegroupService.findAll(parameterMap);

		return list;
	}

	
    @Transactional
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<BisItBitschedulegroup> list) {
       // bisMtRouteService.save(request);
    		
    		bisItBitschedulegroupService.delete(list.get(0).getBitId());
    	for(int i = 0; i < list.size();i++)
    	{
    		if(list.get(i).getUseYn() != null)
    		{
    			if(list.get(i).getUseYn().equals("Y"))
        		{
        			bisItBitschedulegroupService.add(list.get(i));
        		}
    		}
    	}
        return ok();
    }
}
