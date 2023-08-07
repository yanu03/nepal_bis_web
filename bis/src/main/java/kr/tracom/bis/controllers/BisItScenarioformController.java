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
import org.springframework.web.bind.annotation.ResponseBody;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisItForm.BisItForm;
import kr.tracom.bis.domain.bisItForm.BisItFormService;
import kr.tracom.bis.domain.bisItScenario.BisItScenario;
import kr.tracom.bis.domain.bisItScenario.BisItScenarioService;
import kr.tracom.bis.domain.bisItScenarioform.BisItScenarioform;
import kr.tracom.bis.domain.bisItScenarioform.BisItScenarioformService;
 
@Controller
@RequestMapping(value = "/api/v1/bisItScenarioforms")
public class BisItScenarioformController extends BaseController {
    
	@Inject
    private BisItScenarioService bisItScenarioService;
    @Inject
    private BisItFormService bisItFormService;
    @Inject
    private BisItScenarioformService bisItScenarioFormService;
 
    @RequestMapping(value="/modal", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItForm> searchFormlist(@RequestParam Map<String,Object> searchMap) {
    	System.out.println(searchMap);
    	return bisItFormService.findAllUseY(searchMap);
    }
    
   /* @RequestMapping(value="/modal", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse searchFormSave(@RequestBody List<Map<String, Object>> bisItScenario) {
    	for(Map<String, Object> temp:bisItScenario){
    		
    	}
    	return ok();
    }*/
    
    @RequestMapping(value="/parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItScenario> list(@RequestParam Map<String, Object> searchMap) {
        return bisItScenarioService.findAll(searchMap);
    }
    
    @RequestMapping(value="/scenarioModal", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItScenario> findAllUseY(@RequestParam Map<String, Object> searchMap) {
    	return bisItScenarioService.findAllUseY(searchMap);
    }
    
    @RequestMapping(value="/parent", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String, Object>> bisItScenario) {
    	/*for(Map<String, Object> temp:bisItScenario){
    		
    	}*/
    	return ok();
	}
    
    @RequestMapping(value = "/child", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public @ResponseBody List<Map<String,Object>> childList(@RequestParam(value="parentKey", defaultValue="")String parentKey) {
    	System.out.println("parentKey : "+parentKey);
        return bisItScenarioFormService.keyFormFind(parentKey);
    }
/*    public List<Map<String,Object>> childList(@RequestParam(value="parentKey", defaultValue="")String parentKey) {
    	System.out.println("parentKey : "+parentKey);
    	return bisItScenarioFormService.keyFormFind(parentKey);
    }
*/
    @RequestMapping(value = "/child", method = RequestMethod.PUT, produces = APPLICATION_JSON)
 /*   public  List<Map<String,Object>> childSave(@RequestBody List<Map<String,Object>> bisItScenarioform) {
    	
    	for(Map<String,Object> temp:bisItScenarioform){
    		System.out.println(temp);
    		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    		temp.put("updateDate", sdf.format(new Date()));
    		bisItScenarioFormService.insert(temp);
    	}
    	
        return bisItScenarioFormService.keyFormFind(bisItScenarioform.get(0).get("parentKey").toString());
    }*/
    public ApiResponse childSave(@RequestBody List<Map<String,Object>> bisItScenarioform) {
    	System.out.println("size : "+bisItScenarioform);
    	String parentKey=(String)bisItScenarioform.get(0).get("parentKey");
    	String allClearCheck=(String)bisItScenarioform.get(0).get("allClearCheck");
    	
    	bisItScenarioFormService.delete(parentKey);
    	
    	if(!allClearCheck.equals("yes")){
    		for(Map<String,Object> temp:bisItScenarioform){
        		System.out.println(temp);
        		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
        		temp.put("updateDate", sdf.format(new Date()));
        		bisItScenarioFormService.insert(temp);
        	}
    	}
    	return ok();
    }
}