package kr.tracom.bis.domain.openAPI;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisOpenAPIService {
	
	@Inject
	private BisOpenAPIMapper bisOpenAPIMapper;

	public List<Map<String,Object>> routeInfo(Map<String, Object> map){
		return bisOpenAPIMapper.routeInfo(map);
	}
	
	public String routeInfoCount(Map<String, Object> map){
		return bisOpenAPIMapper.routeInfoCount(map);
	}
	
	public List<Map<String,Object>> stationInfo(Map<String, Object> map){
		return bisOpenAPIMapper.stationInfo(map);
	}
	
	public List<Map<String,Object>> routeStationInfo(Map<String, Object> map){
		return bisOpenAPIMapper.routeStationInfo(map);
	}
	
	public List<Map<String,Object>> routeNodeInfo(Map<String, Object> map){
		return bisOpenAPIMapper.routeNodeInfo(map);
	}
	
	public List<Map<String,Object>> routeVertexInfo(Map<String, Object> map){
		return bisOpenAPIMapper.routeVertexInfo(map);
	}
	
	public List<Map<String,Object>> routeStationCoordinate(Map<String, Object> map){
		return bisOpenAPIMapper.routeStationCoordinate(map);
	}
	
	public List<Map<String,Object>> routeNodeCoordrinate(Map<String, Object> map){
		return bisOpenAPIMapper.routeNodeCoordrinate(map);
	}
	
	public String routeNodeCoordrinateCount(Map<String, Object> map){
		return bisOpenAPIMapper.routeNodeCoordrinateCount(map);
	}
	
	public List<Map<String,Object>> busLocationInfo(Map<String, Object> map){
		return bisOpenAPIMapper.busLocationInfo(map);
	}
	
	public List<Map<String,Object>> busLocationInfoCount(Map<String, Object> map){
		return bisOpenAPIMapper.busLocationInfoCount(map);
	}
	
	public List<Map<String,Object>> routeLine(Map<String, Object> map){
		return bisOpenAPIMapper.routeLine(map);
	}
	
	public List<Map<String,Object>> routeLineCount(Map<String, Object> map){
		return bisOpenAPIMapper.routeLineCount(map);
	}
}
