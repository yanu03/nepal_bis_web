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
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
		String scenarioType=bisCtCommon.get(0).get("scenarioType").toString();
		String scenarioNumber=bisItScenarioService.maxScenarioPlus();
		if(scenarioId==null){
			if(scenarioNumber==null){
				scenarioNumber="00000000";
			}
			if(scenarioType.equals("1")){
				scenarioId="SC"+scenarioNumber;
				
			}else{
				scenarioId="SB"+scenarioNumber;
			}
		}
		int i=0;
		for (Map<String,Object> temp : bisCtCommon) {
			temp.put("scenarioId", scenarioId);
			String tempDate=(String)temp.get("startDate");
			System.out.println("tempDate : "+tempDate);
			/*if(tempDate !=null){
				temp.put("startDate",temp.get("startDate").toString().replaceAll("-", ""));
				temp.put("endDate",temp.get("endDate").toString().replaceAll("-", ""));
				temp.put("updateDate", sdf.format(new Date()));
			}*/
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