package kr.tracom.bis.controllers;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.domain.bisMtBitstation.BisMtBitstation;
import kr.tracom.bis.domain.bisMtBitstation.BisMtBitstationService;
import kr.tracom.bis.domain.bisMtCompany.BisMtCompany;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtBitstations")
public class BisMtBitstationController extends BaseController {
	@Inject
    private BisMtBitstationService bisMtBitstationService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtBitstation>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtBitstation> list = null;
    	list= bisMtBitstationService.findAll(parameterMap);
    	
    	 return list;
    	 }

    @Transactional
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<BisMtBitstation> list) {
       // bisMtRouteService.save(request);
	bisMtBitstationService.delete(list.get(0).getBitId());
    	
    	for(int i = 0; i < list.size();i++)
    	{
    		if(list.get(i).getUseYn() !=null)
    		{
    			if(list.get(i).getUseYn().equals("Y"))
        		{
        			bisMtBitstationService.add(list.get(i));
        		}
        		
    		}
    
    	}
        return ok();
        }
    /*
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtBitstation request) {
    	bisMtBitstationService.add(request);
    	
        return ok();
    }*/
}
