package kr.tracom.bis.domain.bisMtRouteplan;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;

public interface BisMtRouteplanMapper extends MyBatisMapper {

List<BisMtRouteplan> findAll(Map parameterMap);
	
	void add(BisMtRouteplan bismtrouteplan);

}
