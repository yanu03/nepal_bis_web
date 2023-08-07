package kr.tracom.bis.domain.bisMtRoute;

import java.util.List;
import java.util.Map;
import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtRouteMapper extends MyBatisMapper{

	
	List<BisMtRoute> findAll(Map parameterMap);
	
	void add(BisMtRoute bismtroute);
	void delete(String key);
	List<BisMtRoute> count();
	  String maxPlus();
}
