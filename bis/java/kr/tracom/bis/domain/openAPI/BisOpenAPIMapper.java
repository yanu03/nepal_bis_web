package kr.tracom.bis.domain.openAPI;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisOpenAPIMapper extends MyBatisMapper {

	List<Map<String,Object>> routeInfo(Map<String, Object> map);
	String routeInfoCount(Map<String, Object> map);
	String routeNodeCoordrinateCount(Map<String, Object> map);
	List<Map<String,Object>> stationInfo(Map<String, Object> map);
	List<Map<String,Object>> routeStationInfo(Map<String, Object> map);
	List<Map<String,Object>> routeNodeInfo(Map<String, Object> map);
	List<Map<String,Object>> routeVertexInfo(Map<String, Object> map);
	List<Map<String,Object>> routeStationCoordinate(Map<String,Object> map);
	List<Map<String,Object>> routeNodeCoordrinate(Map<String,Object> map);
	List<Map<String,Object>> busLocationInfo(Map<String,Object> map);
	List<Map<String,Object>> busLocationInfoCount(Map<String,Object> map);
	List<Map<String,Object>> routeLine(Map<String,Object> map);
	List<Map<String,Object>> routeLineCount(Map<String,Object> map);
}
