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

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.domain.bisMtCompany.BisMtCompany;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtBits")
public class BisMtBitController extends BaseController {
	@Inject
    private BisMtBitService bisMtBitService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtBit>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtBit> list = null;
    	list= bisMtBitService.findAll(parameterMap);
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtBit request) {
    	bisMtBitService.add(request);
    	
        return ok();
    }
    @RequestMapping(value = "/maxPlus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public Map maxPlus() {
    	Map parameterMap = new HashMap();
		String max = bisMtBitService.maxPlus();
		parameterMap.put("max", max);
		parameterMap.put("remark"," ");
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return parameterMap;
	}
    @RequestMapping(value = "/terminal",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public List<Map<String,Object>> terminal_bit(RequestParams requestParams,HttpServletRequest request) {
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<Map<String,Object>> list = null;
    	list= bisMtBitService.terminalBitFind(parameterMap);
    	
		return list;
	}
}
