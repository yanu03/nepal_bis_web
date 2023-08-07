package kr.tracom.bis.domain.bisMtBit;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtBitMapper extends MyBatisMapper{
List<BisMtBit> findAll(Map parameterMap);
	
	void add(BisMtBit bismtvehicle);
	List<BisMtBit> count();
	String maxPlus();
	
	List<Map<String,Object>> terminalBitFind(Map parameterMap);
}
