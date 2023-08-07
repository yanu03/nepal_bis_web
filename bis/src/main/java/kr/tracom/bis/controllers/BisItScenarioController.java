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

import kr.tracom.bis.domain.bisItScenario.BisItScenario;
import kr.tracom.bis.domain.bisItScenario.BisItScenarioService;

@Controller
@RequestMapping(value = "/api/v1/bisItScenarios")
public class BisItScenarioController extends BaseController {

	@Inject
	private BisItScenarioService bisItScenarioService;

	@RequestMapping(value = "/scenarioTypeList", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<Map<String,Object>> scenarioTypeList(){
		return bisItScenarioService.scenarioTypeList();
	}
	
	@RequestMapping(value = "/parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItScenario> list(@RequestParam Map<String,Object> searchMap) {
		return bisItScenarioService.findAll(searchMap);
	}

	@RequestMapping(value = "/parent", method = { RequestMethod.PUT }, produces = APPLICATION_JSON)
	public ApiResponse save(@RequestBody List<Map<String,Object>> bisCtCommon) {
		String scenarioId=(String) bisCtCommon.get(0).get("scenarioId");
		String scenarioNumber=bisItScenarioService.maxScenarioPlus();
		
		bisCtCommon.get(0).put("scenarioType",0);
		
		if(scenarioId==null){
			if(scenarioNumber==null){
				scenarioNumber="000000000";
			}
			scenarioId="S"+scenarioNumber;
				
		}
/*		String scenarioType=bisCtCommon.get(0).get("scenarioType").toString();
		if(scenarioId==null){
			if(scenarioNumber==null){
				scenarioNumber="000000000";
			}
			if(scenarioType.equals("1")){
				scenarioId="S"+scenarioNumber;
				
			}else{
				scenarioId="S"+scenarioNumber;
			}
		}
*/		
		int i=0;
		for (Map<String,Object> temp : bisCtCommon) {
			temp.put("scenarioId", scenarioId);
			bisItScenarioService.insert(temp);
		}
		return ok();
	}
/*
	@RequestMapping(value = "/child", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItScenario> childList(@RequestParam(value = "parentKey", defaultValue = "") String parentKey) {
		return bisItScenarioService.findAll();
	}

	@RequestMapping(value = "/child", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse childSave(@RequestBody List<BisItScenario> bisCtDetailCodeDTO) {
		for (BisItScenario temp : bisCtDetailCodeDTO) {
			bisItScenarioService.insert(temp);
		}
		return ok();
	}*/

}