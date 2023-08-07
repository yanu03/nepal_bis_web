package kr.tracom.bis.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.tracom.bis.domain.bisItForm.BisItForm;
import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtRoute.BisMtRouteService;
import kr.tracom.bis.domain.sample.parent.ParentSampleVO;
import kr.tracom.bis.utils.BisFileUtil;
import kr.tracom.bis.utils.RequestUtil;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/api/v1/bisMtRoutes")
public class BisMtRouteController extends BaseController {

		@Inject
		private BisMtRouteService bisMtRouteService;
	
		@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
		public List<BisMtRoute> list(RequestParams requestParams, HttpServletRequest request) {
			// List list = bisMtRouteService.gets(requestParams);
			// return Responses.ListResponse.of(list);
	
			Map parameterMap = RequestUtil.getParameterMap(request);
			List<BisMtRoute> list = null;
			list = bisMtRouteService.findAll(parameterMap);
	
			return list;
		}
	
		@RequestMapping(method = { RequestMethod.PUT }, produces = APPLICATION_JSON)
		public ApiResponse save( @RequestBody BisMtRoute bismtroute) {
			//Map parameterMap = RequestUtil.getParameterMap(request);
	
			bisMtRouteService.add(bismtroute);
			return ok();
		}
	
		@RequestMapping(value = "/maxplus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
		public  Map count() {
			Map parameterMap = new HashMap();
			String max = bisMtRouteService.maxPlus();
			parameterMap.put("max", max);
			parameterMap.put("remark"," ");
			//Map parameterMap = RequestUtil.getParameterMap(request);
			return parameterMap;
			
		}
}