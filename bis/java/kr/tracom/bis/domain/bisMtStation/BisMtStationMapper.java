package kr.tracom.bis.domain.bisMtStation;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtStationMapper extends MyBatisMapper{
	
	List<BisMtStation> findAll();
	
	List<BisMtStation> findSearch(Map<String, String> paramMap);
	
	void add(BisMtStation vo);

	void update(BisMtStation vo);

	List<BisMtStation> count();
	
	String maxPlus();
}
