package kr.tracom.bis.domain.bisMtTerminal;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtTerminalMapper extends MyBatisMapper {
	
	List<BisMtTerminal> findAll(Map parameterMap);
	
	List<BisMtTerminal> findId();
	void add(Map<String, Object> bismtterminal);
	void delete(Map<String, Object> bismtterminal);
	
	List<BisMtTerminal> count();
	  String maxPlus();
}
