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

import kr.tracom.bis.domain.bisMtCompany.BisMtCompany;
import kr.tracom.bis.domain.bisMtCompany.BisMtCompanyService;
import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtRoute.BisMtRouteService;
import kr.tracom.bis.domain.bisMtRouteallocinfo.BisMtRouteallocinfo;
import kr.tracom.bis.domain.bisMtRouteallocinfo.BisMtRouteallocinfoService;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtRouteallocinfos")
public class BisMtRouteallocinfoController extends BaseController {

	@Inject
	private BisMtRouteallocinfoService bisMtRouteallocinfoService;

	@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisMtRouteallocinfo> list(RequestParams requestParams, HttpServletRequest request) {
		// List list = bisMtRouteService.gets(requestParams);
		// return Responses.ListResponse.of(list);

		Map parameterMap = RequestUtil.getParameterMap(request);
		List<BisMtRouteallocinfo> list = null;
		list = bisMtRouteallocinfoService.findAll(parameterMap);

		return list;
	}

	@RequestMapping(method = { RequestMethod.PUT }, produces = APPLICATION_JSON)
	public ApiResponse save( @RequestBody BisMtRouteallocinfo bisMtCompany) {
		//Map parameterMap = RequestUtil.getParameterMap(request);
		bisMtRouteallocinfoService.add(bisMtCompany);
		return ok();
	}
}