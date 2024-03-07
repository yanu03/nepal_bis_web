package kr.tracom.bis.domain.bisItSystemschedule;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisItSystemscheduleMapper extends MyBatisMapper{
	  public List<BisItSystemschedule> findAll(Map parameterMap);
	  void add(Map<String, Object> schedule);
	  void delete(Map<String, Object> schedule);
	  public String maxPlus();
}
