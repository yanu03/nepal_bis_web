package kr.tracom.bis.domain.bisItSystemschedule;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisItSystemscheduleMapper extends MyBatisMapper{
	  public List<BisItSystemschedule> findAll(Map parameterMap);
	  public void add(BisItSystemschedule schedule);
	  public String maxPlus();
}
