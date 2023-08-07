package kr.tracom.bis.domain.bisItSchedulegroup;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;


public interface BisItSchedulegroupMapper extends MyBatisMapper{

	public List<BisItSchedulegroup> findAll(Map parameterMap);
	  public void add(BisItSchedulegroup schedule);
	  public void delete(BisItSchedulegroup schedule);
}
