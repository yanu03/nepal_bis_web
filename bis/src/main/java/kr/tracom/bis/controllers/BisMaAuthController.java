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

import kr.tracom.bis.domain.bisMaAuth.BisMaAuthDTO;
import kr.tracom.bis.domain.bisMaAuth.BisMaAuthService;

@Controller
@RequestMapping(value = "/api/v1/bisMaAuths")
public class BisMaAuthController extends BaseController {

	 @Inject
	 private BisMaAuthService bisMaAuthService;
	 
	 @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	 public List<BisMaAuthDTO> list(@RequestParam Map<String,Object> searchData) {
	  	return bisMaAuthService.searchFind(searchData);
	 }
	    
    @RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String,Object>> bisMaAuth) {
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	for(Map<String,Object> temp:bisMaAuth){
    			temp.put("update_at",sdf.format(new Date()));
    			bisMaAuthService.insert(temp);
    	}
        return ok();
    }

    
}
