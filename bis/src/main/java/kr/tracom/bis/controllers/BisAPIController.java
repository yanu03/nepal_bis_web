package kr.tracom.bis.controllers;
 
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.openAPI.BisOpenAPIService;
 
@Controller
@RequestMapping(value = "/openAPI")
public class BisAPIController extends BaseController {
 
    @Inject
    private BisOpenAPIService bisOpenAPIService;
 
	@RequestMapping(value="/route",method = RequestMethod.GET, produces = APPLICATION_JSON)
    public @ResponseBody Map<String,Object> routeInfo(@RequestParam Map<String, Object> searchMap) {
		Map<String,Object> returnMap=new HashMap<String,Object>();
		Map<String,Object> resStatus=new HashMap<String,Object>();
		
		if(searchMap.size()==0){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		if(searchMap.get("key").equals("") || !searchMap.get("key").equals("bisKey")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
    	}
		
		else{
			resStatus.put("res_code", "1");
			resStatus.put("res_msg", "");
			returnMap.put("res_status", resStatus);
    		returnMap.put("routeInfo", bisOpenAPIService.routeInfo(searchMap));
    		returnMap.put("total",bisOpenAPIService.routeInfoCount(searchMap));
    	}
		return returnMap;
    }
	
	@RequestMapping(value="/station",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody List<Map<String,Object>> stationInfo(@RequestParam Map<String, Object> searchMap) {
		if(searchMap.get("key")==null && !searchMap.get("key").equals("bisKey")){
			return null;
		}else{
			return bisOpenAPIService.stationInfo(searchMap);
		}
	}
	
	@RequestMapping(value="/routeStation",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody List<Map<String,Object>> routeStationInfo(@RequestParam Map<String, Object> searchMap) {
		if(searchMap.get("key")==null && !searchMap.get("key").equals("bisKey")){
			return null;
		}else{
			return bisOpenAPIService.routeStationInfo(searchMap);
		}
	}
	
	@RequestMapping(value="/routeNode",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody List<Map<String,Object>> routeNodeInfo(@RequestParam Map<String, Object> searchMap) {
		if(searchMap.get("key")==null && !searchMap.get("key").equals("bisKey")){
			return null;
		}else{
			return bisOpenAPIService.routeNodeInfo(searchMap);
		}
	}
	
	@RequestMapping(value="/routeVertex",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody List<Map<String,Object>> routeVertexInfo(@RequestParam Map<String, Object> searchMap) {
		if(searchMap.get("key")==null && !searchMap.get("key").equals("bisKey")){
			return null;
		}else{
			return bisOpenAPIService.routeVertexInfo(searchMap);
		}
	}
	
	@RequestMapping(value="/routeStationCoordinate",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody List<Map<String,Object>> routeStationCoordinate(@RequestParam Map<String, Object> searchMap) {
		if(searchMap.get("key")==null && !searchMap.get("key").equals("bisKey")){
			return null;
		}else{
			return bisOpenAPIService.routeStationCoordinate(searchMap);
		}
	}
	
	@RequestMapping(value="/routeNodeCoordinate",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody Map<String,Object> routeNodeCoordrinate(@RequestParam Map<String, Object> searchMap, HttpServletRequest request) {
		String url=getURL(request);
		Map<String,Object> returnMap=new HashMap<String,Object>();
		Map<String,Object> resStatus=new HashMap<String,Object>();
		
		if(!url.matches(".*key.*") || !url.matches(".*routeId.*")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		if(searchMap.get("key").equals("") || !searchMap.get("key").equals("bisKey")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
    	}
		
		if(searchMap.get("routeId").equals("") || searchMap.get("routeId").equals(null)){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		else{
			resStatus.put("res_code", "1");
			resStatus.put("res_msg", "");
			returnMap.put("res_status", resStatus);
    		returnMap.put("routeNodeCoordinateInfo", bisOpenAPIService.routeNodeCoordrinate(searchMap));
    		returnMap.put("total",bisOpenAPIService.routeNodeCoordrinateCount(searchMap));
    	}
		
		return returnMap;
	}
	
	@RequestMapping(value="/busLocation",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody Map<String,Object> busLocation(@RequestParam Map<String, Object> searchMap, HttpServletRequest request) {
		String url=getURL(request);
		Map<String,Object> returnMap=new HashMap<String,Object>();
		Map<String,Object> resStatus=new HashMap<String,Object>();
		
		if(!url.matches(".*key.*") ){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		if(searchMap.get("key").equals("") || !searchMap.get("key").equals("bisKey")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
	
		
		else{
			resStatus.put("res_code", "1");
			resStatus.put("res_msg", "");
			returnMap.put("res_status", resStatus);
			returnMap.put("busLocation", bisOpenAPIService.busLocationInfo(searchMap));
			returnMap.put("total",bisOpenAPIService.busLocationInfoCount(searchMap));
		}
		
		return returnMap;
	}
	
	@RequestMapping(value="/routeLine",method = RequestMethod.GET, produces = APPLICATION_JSON)
	public @ResponseBody Map<String,Object> routeLine(@RequestParam Map<String, Object> searchMap, HttpServletRequest request) {
		String url=getURL(request);
		Map<String,Object> returnMap=new HashMap<String,Object>();
		Map<String,Object> resStatus=new HashMap<String,Object>();
		
		if(!url.matches(".*key.*") || !url.matches(".*routeId.*")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		if(searchMap.get("key").equals("") || !searchMap.get("key").equals("bisKey")){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		if(searchMap.get("routeId").equals("") || searchMap.get("routeId").equals(null)){
			resStatus.put("res_code", "0");
			resStatus.put("res_msg", "필수 값이 누락되어 있습니다.");
			returnMap.put("res_status", resStatus);
			return returnMap;
		}
		
		else{
			resStatus.put("res_code", "1");
			resStatus.put("res_msg", "");
			returnMap.put("res_status", resStatus);
			returnMap.put("routeLine", bisOpenAPIService.routeLine(searchMap));
			returnMap.put("total",bisOpenAPIService.routeLineCount(searchMap));
		}
		
		return returnMap;
	}
	
	//URL 확인(파라미터포함) 
	public static String getURL(HttpServletRequest request)
	  {
	    Enumeration<?> param = request.getParameterNames();

	    StringBuffer strParam = new StringBuffer();
	    StringBuffer strURL = new StringBuffer();

	    if (param.hasMoreElements())
	    {
	      strParam.append('?');
	    }

	    while (param.hasMoreElements())
	    {
	      String name = (String) param.nextElement();
	      String value = request.getParameter(name);

	      strParam.append(name + '='+ value);

	      if (param.hasMoreElements())
	      {
	        strParam.append('&');
	      }
	  }

	  strURL.append(request.getRequestURI());
	  strURL.append(strParam);

	  return strURL.toString();
	}
}