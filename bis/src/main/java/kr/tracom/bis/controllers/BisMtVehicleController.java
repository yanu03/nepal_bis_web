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
import kr.tracom.bis.domain.bisMtTerminal.BisMtTerminal;
import kr.tracom.bis.domain.bisMtVehicle.BisMtVehicle;
import kr.tracom.bis.domain.bisMtVehicle.BisMtVehicleService;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtVehicles")
public class BisMtVehicleController extends BaseController {

	 @Inject
	    private BisMtVehicleService bisMtVehicleService;
	 @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	    public List<BisMtVehicle>  list(RequestParams requestParams,HttpServletRequest request) {
			Map parameterMap = RequestUtil.getParameterMap(request);
			List<BisMtVehicle> list = null;
			list = bisMtVehicleService.findAll(parameterMap);
		 return list;
	 }
	 @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
	    public ApiResponse save(@RequestBody List<Map<String,Object>> BisMtVehicle) {
		 
		 for(Map<String,Object> temp:BisMtVehicle){
			 if(Boolean.TRUE.equals(temp.get("__deleted__"))) {
				 bisMtVehicleService.delete(temp);
			 } else {
				 bisMtVehicleService.add(temp);
			 }
		 }
		 
	        return ok();
	    }

		@RequestMapping(value = "/maxplus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
		public  Map maxplus() {
			Map parameterMap = new HashMap();
			String max = bisMtVehicleService.maxPlus();
			parameterMap.put("max", max);
			parameterMap.put("remark"," ");
			//Map parameterMap = RequestUtil.getParameterMap(request);
			return parameterMap;
			
		}
}

    


  