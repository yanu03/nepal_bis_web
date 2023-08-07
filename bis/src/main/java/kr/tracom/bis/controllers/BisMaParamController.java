package kr.tracom.bis.controllers;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisMaParam.BisMaDTO;
import kr.tracom.bis.domain.bisMaParam.BisMaParamService;
 
@Controller
@RequestMapping(value = "/api/v1/bisMaParams")
public class BisMaParamController extends BaseController {
 
    @Inject
    private BisMaParamService bisMaParamService;
 
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    /*public List<BisMaDTO> list() {
        return bisMaParamService.findAll();
    }*/
    public List<BisMaDTO> list(@RequestParam Map<String,Object> searchData) {
    	return bisMaParamService.searchFind(searchData);
    }
    
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String,Object>> bisMaDTO) {
    	for(Map<String,Object> temp:bisMaDTO){
    		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    		temp.put("updateDate", sdf.format(new Date()));
    		bisMaParamService.insert(temp);
    	}
        return ok();
    }
  
}