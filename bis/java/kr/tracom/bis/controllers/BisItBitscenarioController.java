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

import kr.tracom.bis.domain.bisItBitscenario.BisItBitscenario;
import kr.tracom.bis.domain.bisItBitscenario.BisItBitscenarioService;
import kr.tracom.bis.domain.bisMtBit.BisMtBit;
 
@Controller
@RequestMapping(value = "/api/v1/bisItBitscenarios")
public class BisItBitscenarioController extends BaseController {
 
    @Inject
    private BisItBitscenarioService bisItBitscenarioService;
 
    @RequestMapping(value="parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisMtBit> list(@RequestParam Map<String, Object> searchMap) {
        return bisItBitscenarioService.bitFindAll(searchMap);
    }
    
    @RequestMapping(value="/child", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String,Object>> request) {
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	String bitId=(String)request.get(0).get("parentKey");
    	String allClearCheck=(String)request.get(0).get("allClearCheck");
    	bisItBitscenarioService.delete(bitId);
    	if(!allClearCheck.equals("yes")){
	    	for(Map<String,Object> map : request){
	    		System.out.println("key : "+map.get("parentKey"));
	    		map.put("updateDate", sdf.format(new Date()));
	    		bisItBitscenarioService.insert(map);
	    	}
    	}
        return ok();
    }
    
    @RequestMapping(value = "/child", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItBitscenario> childList(@RequestParam Map<String,Object> parentKey) {
        return bisItBitscenarioService.findAll(parentKey);
    }

}