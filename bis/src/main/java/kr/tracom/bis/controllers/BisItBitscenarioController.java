package kr.tracom.bis.controllers;
 
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

import kr.tracom.bis.domain.bisItBitscenario.BisBitscenarioFormInfo;
import kr.tracom.bis.domain.bisItBitscenario.BisItBitscenario;
import kr.tracom.bis.domain.bisItBitscenario.BisItBitscenarioService;
import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversion;
import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversionService;
import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.utils.BisFileUtil;
 
@Controller
@RequestMapping(value = "/api/v1/bisItBitscenarios")
public class BisItBitscenarioController extends BaseController {
 
    @Inject
    private BisItBitscenarioService bisItBitscenarioService;
    
    @Inject
    private BisMtBitService bisMtBitService;

	@Inject
	private BisItSendsystemversionService bisItSendsystemversionService;
	
 
    @RequestMapping(value="/insert", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public void insert(@RequestBody List<Map<String, Object>> map) {
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	map.get(0).put("updateDate", sdf.format(new Date()));
    	bisItBitscenarioService.insert(map.get(0));
    }
    
    @RequestMapping(value="/parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItBitscenario> list(@RequestParam Map<String, Object> searchMap) {
        return bisItBitscenarioService.findAll(searchMap);
    }
    
    @RequestMapping(value="/bitModalList", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtBit> bitModalList(@RequestParam Map<String, Object> searchMap) {
    	return bisItBitscenarioService.bitFindAll(searchMap);
    }
    
    @RequestMapping(value="/update", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public void save(@RequestBody List<Map<String, Object>> map) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		map.get(0).put("updateDate", sdf.format(new Date()));
		bisItBitscenarioService.update(map.get(0));
    }
    
    @RequestMapping(value = "/child", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItBitscenario> childList(@RequestParam Map<String,Object> parentKey) {
        return bisItBitscenarioService.findAll(parentKey);
    }
    
    
	@RequestMapping(value = "/sendCenter", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public Map<String,Object> sendCenter(@RequestBody List<Map<String,Object>> request) {
		int size = request.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int s = 0 ;s < size;s++)
		{
		Map<String,Object> senddata = request.get(s);
    	BisFileUtil bfu=new BisFileUtil();
    	List<BisBitscenarioFormInfo> formInfo=bisItBitscenarioService.getFormInfo();	//form이 없으면 
    	Map<String,Object> returnMessage=new HashMap<String,Object>();
    	Map<String,Object> sendData=new HashMap<String,Object>();
    	int count=0;
    	List<BisMtBit> bitList=bisMtBitService.findAll(senddata);	//BIT 목록 (Select가 없으면 전체)
  		List<BisItBitscenario> bit_list = null;

  		bit_list = bisItBitscenarioService.findAll(senddata);
		BisItSendsystemversion version = new BisItSendsystemversion();
		for (int i = 0; i < bit_list.size(); i++) {
			version.setSystemId(bit_list.get(i).getBitId());
			version.setVersionCode("153");
			version.setSystemType("3");
			version.setVersionValue((String) bit_list.get(i).getApplyDate());
			bisItSendsystemversionService.add(version);
		}
    	
    	Map<String,Object> imageItems1=new HashMap<String,Object>();
    	Map<String,Object> videoItems1=new HashMap<String,Object>();
    	
    	ArrayList<Map<String,Object>> arr1=new ArrayList<Map<String,Object>>();
		ArrayList<Map<String,Object>> imageArr=new ArrayList<Map<String,Object>>();
		ArrayList<Map<String,Object>> videoArr=new ArrayList<Map<String,Object>>();
			
	    	for(int i=0;i<bitList.size();i++){
	    		Map<String, Object> temp=(Map<String, Object>) bitList.get(i);
	    		//bisMtBit=bitList.get(i);
	    		BisItBitscenario bitScenarioInfo=(BisItBitscenario) bisItBitscenarioService.find(temp);
	    		int imageCount=0;
	        	int videoCount=0;
	    		int imageOrder=1;
	        	int videoOrder=1;
	    		
	    		sendData.put("deviceId",temp.get("bitId"));
	    		//sendData.put("applyDate", temp.get("applyDate"));
	    		
	    		sendData.put("applyDate", bitScenarioInfo.getApplyDate());
	    		
	    		for(BisBitscenarioFormInfo bitScenarioFormInfo:formInfo){
	    			//if(temp.get("scenarioId").equals(count.getScenarioId())){		//시나리오에 있는 비디오, 이미지 카운트를 센다.
	    			if(bitScenarioInfo.getScenarioId().equals(bitScenarioFormInfo.getScenarioId())){		//시나리오에 있는 비디오, 이미지 카운트를 센다.
	    				if(bitScenarioFormInfo.getFormType()==1){
	            			imageCount+=1;
	            		}else{
	            			videoCount+=1;
	            		}
	    			}
	    		}
	    		
		    		if(imageCount > 0){
		    			count++;
		    			imageItems1.put("formType",1);
		    			imageItems1.put("formCount",imageCount);
		        		//arr1.add(items1);
		        		for(BisBitscenarioFormInfo tempFormInfo:formInfo){
		        			Map<String,Object> imageItems2=new HashMap<String,Object>();
		        			//if(temp.get("scenarioId").equals(tempFormInfo.getScenarioId())){
		        			if(bitScenarioInfo.getScenarioId().equals(tempFormInfo.getScenarioId())){
		    	    			if(tempFormInfo.getFormType()==1){
		    	    				if(imageOrder<=imageCount){
		    	    					imageItems2.put("order",imageOrder);
		    	    					imageOrder++;
		    	    				}
		    	    				imageItems2.put("fileName",tempFormInfo.getFileName());
		    	    				imageItems2.put("displaySeconds", tempFormInfo.getDisplayTime());
		    	    				imageArr.add(imageItems2);
		    	    			}
		        			}
		        		}
		        		imageItems1.put("items", imageArr);
						arr1.add(imageItems1);
		        		sendData.put("items", arr1);
		    		}
	    		
		    		if(videoCount > 0){
		    			count++;
		    			videoItems1.put("formType", 2);
		    			videoItems1.put("formCount", videoCount);
		        		//arr1.add(items1);
		        		for(BisBitscenarioFormInfo tempFormInfo:formInfo){
		        			Map<String,Object> videoItems2=new HashMap<String,Object>();
		        			//if(temp.get("scenarioId").equals(tempFormInfo.getScenarioId())){
		        			if(bitScenarioInfo.getScenarioId().equals(tempFormInfo.getScenarioId())){
		    	    			if(tempFormInfo.getFormType()==2){
		    	    				if(videoOrder<=videoCount){
		    	    					videoItems2.put("order",videoOrder);
		    	    					videoOrder++;
		    	    				}
		    	    				videoItems2.put("fileName",tempFormInfo.getFileName());
		    	    				videoItems2.put("displaySeconds", tempFormInfo.getDisplayTime());
		        					videoArr.add(videoItems2);
		        					
		            				
		    	    			}
		        			}
		        		}
		        		videoItems1.put("items", videoArr);
						arr1.add(videoItems1);
		        		sendData.put("items", arr1);
		    		}
		    		
		    		sendData.put("count", count);
		    		if(count>0){
		    			System.out.println("success");
		    			System.out.println(sendData);
		    			returnMessage=bfu.CommunicationUtil(sendData, "bit/scenario");
		    			int ret_code = (int) returnMessage.get("ret_code");
						if (ret_code != 1) {

						check++;
						returnMessage.put("id", bitList.get(i).getBitId());
						receiveList.add(returnMessage);	
						//return sendMap;
						}
		    		}
		    		sendData.clear();
		    		arr1.clear();
		    		videoArr.clear();
		    		imageArr.clear();
		    		imageItems1.clear();
		    		videoItems1.clear();
		    		count=0;
	    		}
	    	
	    	//return returnMessage;
		}
		if(0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;
	    	}
    
	/*@RequestMapping(value = "/sendCenter", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public Map<String,Object> sendCenter(@RequestBody List<Map<String,Object>> request) {
		BisFileUtil bfu=new BisFileUtil();
		List<BisBitscenarioFormInfo> formInfo=bisItBitscenarioService.getFormInfo();	//form이 없으면 
		Map<String,Object> returnMessage=new HashMap<String,Object>();
		Map<String,Object> sendData=new HashMap<String,Object>();
		int count=0;
		List<BisMtBit> bitList=bisMtBitService.findAll(sendData);	//BIT 전체 목록
		List<BisItBitscenario> bit_list = null;
		
		for( Map<String,Object> tempMap:request){
			bit_list = bisItBitscenarioService.findAll(tempMap);
			BisItSendsystemversion version = new BisItSendsystemversion();
			for (int i = 0; i < bit_list.size(); i++) {
				version.setSystemId(bit_list.get(i).getBitId());
				version.setVersionCode("153");
				version.setSystemType("3");
				version.setVersionValue((String) bit_list.get(i).getApplyDate());
				bisItSendsystemversionService.add(version);
			}
		}
  		
		Map<String,Object> imageItems1=new HashMap<String,Object>();
		Map<String,Object> videoItems1=new HashMap<String,Object>();
		
		ArrayList<Map<String,Object>> arr1=new ArrayList<Map<String,Object>>();
		ArrayList<Map<String,Object>> imageArr=new ArrayList<Map<String,Object>>();
		ArrayList<Map<String,Object>> videoArr=new ArrayList<Map<String,Object>>();
		
		for(Map<String,Object> temp:request){
			BisItBitscenario bitScenarioInfo=(BisItBitscenario) bisItBitscenarioService.find(temp);
			int imageCount=0;
			int videoCount=0;
			int imageOrder=1;
			int videoOrder=1;
			
			sendData.put("deviceId",temp.get("bitId"));
			//sendData.put("applyDate", temp.get("applyDate"));
			sendData.put("count", 2);
			sendData.put("applyDate", bitScenarioInfo.getApplyDate());
			
			for(BisBitscenarioFormInfo bitScenarioFormInfo:formInfo){
				//if(temp.get("scenarioId").equals(count.getScenarioId())){		//시나리오에 있는 비디오, 이미지 카운트를 센다.
				if(bitScenarioInfo.getScenarioId().equals(bitScenarioFormInfo.getScenarioId())){		//시나리오에 있는 비디오, 이미지 카운트를 센다.
					if(bitScenarioFormInfo.getFormType()==1){
						imageCount+=1;
					}else{
						videoCount+=1;
					}
				}
			}
			
			if(imageCount > 0){
				count++;
				imageItems1.put("formType",1);
				imageItems1.put("formCount",imageCount);
				//arr1.add(items1);
				for(BisBitscenarioFormInfo tempFormInfo:formInfo){
					Map<String,Object> imageItems2=new HashMap<String,Object>();
					if(temp.get("scenarioId").equals(tempFormInfo.getScenarioId())){
						if(tempFormInfo.getFormType()==1){
							if(imageOrder<=imageCount){
								imageItems2.put("order",imageOrder);
								imageOrder++;
							}
							imageItems2.put("fileName",tempFormInfo.getFileName());
							imageItems2.put("displaySeconds", tempFormInfo.getDisplayTime());
							imageArr.add(imageItems2);
						}
					}
				}
				imageItems1.put("items", imageArr);
				arr1.add(imageItems1);
				sendData.put("items", arr1);
			}
			
			else if(videoCount > 0){
				count++;
				videoItems1.put("formType", 2);
				videoItems1.put("formCount", videoCount);
				//arr1.add(items1);
				for(BisBitscenarioFormInfo tempFormInfo:formInfo){
					Map<String,Object> videoItems2=new HashMap<String,Object>();
					//if(temp.get("scenarioId").equals(tempFormInfo.getScenarioId())){
					if(bitScenarioInfo.getScenarioId().equals(tempFormInfo.getScenarioId())){
						if(tempFormInfo.getFormType()==2){
							if(videoOrder<=videoCount){
								videoItems2.put("order",videoOrder);
								videoOrder++;
							}
							videoItems2.put("fileName",tempFormInfo.getFileName());
							videoItems2.put("displaySeconds", tempFormInfo.getDisplayTime());
							videoArr.add(videoItems2);
							
							
						}
					}
				}
				videoItems1.put("items", videoArr);
				arr1.add(videoItems1);
				sendData.put("items", arr1);
			}
			
		}
		sendData.put("count", count);
		if(count>0){
			System.out.println("success");
			System.out.println(sendData);
			returnMessage=bfu.CommunicationUtil(sendData, "bit/scenario");
		}
		sendData.clear();
		arr1.clear();
		videoArr.clear();
		imageArr.clear();
		imageItems1.clear();
		videoItems1.clear();
		count=0;
	
	return returnMessage;
		if(sendData.size()>3){
			returnMessage=bfu.CommunicationUtil(sendData, "bit/scenario");
		}else{
			returnMessage.put("res_code", "0");
			returnMessage.put("res_msg", "There are no forms applied to the scenario.");
		}
		
		sendData.clear();
		arr1.clear();
		videoArr.clear();
		imageArr.clear();
		imageItems1.clear();
		videoItems1.clear();
		return returnMessage;
		
	}*/
}