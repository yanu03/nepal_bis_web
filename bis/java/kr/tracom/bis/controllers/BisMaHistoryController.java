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

import kr.tracom.bis.domain.bisMaHistory.BisMaHistoryDTO;
import kr.tracom.bis.domain.bisMaHistory.BisMaHistoryService;
 
@Controller
@RequestMapping(value = "/api/v1/bisMaHistory")
public class BisMaHistoryController extends BaseController {
 
    @Inject
    private BisMaHistoryService bisMaHistoryService;
 
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    /*public List<BisMaDTO> list() {
        return bisMaParamService.findAll();
    }*/
    public List<BisMaHistoryDTO> list(@RequestParam Map<String,Object> searchData) {
    	System.out.println("search : "+searchData);
    	String startDate=(String) searchData.get("startDate");
    	String endDate=(String) searchData.get("endDate");
    	String startTime=(String) searchData.get("startTime");
    	String endTime=(String)searchData.get("endTime");
    	String temp="";
    	if(Integer.parseInt(startTime) < 10){
    		startTime="0"+startTime;
    	}
    	if(Integer.parseInt(endTime) <10){
    		endTime="0"+endTime;
    	}
    	
    	startDate = startDate+startTime+"0000";
    	endDate = endDate+endTime+"0000";
    	
    	if(startDate.equals("000000")){
    		startDate="";
    		endDate="";
    	}
    	searchData.put("startDate", startDate);
    	searchData.put("endDate", endDate);
    	
    	System.out.println("startDate : "+startDate);
    	System.out.println("endDate : "+endDate);
    	
    	return bisMaHistoryService.operationHistory(searchData);
    }
    
   /* @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String,Object>> bisMaDTO) {
    	for(Map<String,Object> temp:bisMaDTO){
    		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    		temp.put("updateDate", sdf.format(new Date()));
    		bisMaHistoryService.insert(temp);
    	}
        return ok();
    }*/
  
}