package kr.tracom.bis.domain.bisItSystemschedulegroup;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;


public interface BisItSystemschedulegroupMapper extends MyBatisMapper{
	public List<BisItSystemschedulegroup> findAll(Map parameterMap);
	  public void add(BisItSystemschedulegroup schedule);
	  public String maxPlus();
}
