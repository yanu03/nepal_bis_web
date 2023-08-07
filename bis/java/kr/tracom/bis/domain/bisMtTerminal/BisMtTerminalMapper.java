package kr.tracom.bis.domain.bisMtTerminal;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtTerminalMapper extends MyBatisMapper {
	
	List<BisMtTerminal> findAll(Map parameterMap);
	
	void add(BisMtTerminal bismtroute);
	
	List<BisMtTerminal> count();
	  String maxPlus();
}
