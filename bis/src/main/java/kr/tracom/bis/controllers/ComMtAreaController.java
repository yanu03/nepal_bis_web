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
import kr.tracom.bis.domain.comMtArea.ComMtArea;
import kr.tracom.bis.domain.comMtArea.ComMtAreaService;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/comMtAreas")
public class ComMtAreaController extends BaseController {
	@Inject
    private ComMtAreaService comMtAreaService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<ComMtArea>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<ComMtArea> list = null;
    	list= comMtAreaService.findAll(parameterMap);
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtBit request) {
    //	bisMtBitService.add(request);
    	
        return ok();
    }
}
