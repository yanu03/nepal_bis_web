package kr.tracom.bis.domain.bisMtVehicle;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtVehicleMapper extends MyBatisMapper {
	
List<BisMtVehicle> findAll(Map parameterMap);
	
	void add(BisMtVehicle bismtvehicle);
	List<BisMtVehicle> count();
	  String maxPlus();
	
}
