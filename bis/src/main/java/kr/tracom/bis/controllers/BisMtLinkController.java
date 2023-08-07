package kr.tracom.bis.controllers;

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

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.domain.bisMtCompany.BisMtCompany;
import kr.tracom.bis.domain.bisMtLink.BisMtLink;
import kr.tracom.bis.domain.bisMtLink.BisMtLinkService;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtLinks")
public class BisMtLinkController extends BaseController {
	@Inject
    private BisMtLinkService bisMtLinkService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtLink>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtLink> list = null;
    	list= bisMtLinkService.findAll(parameterMap);
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtLink request) {
    	bisMtLinkService.add(request);
    	
        return ok();
    }
    @RequestMapping(value = "/count",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public List<BisMtLink> count() {
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return bisMtLinkService.count();
	}
}
