package kr.tracom.bis.domain.bisItBitschedulegroup;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;


public interface BisItBitschedulegroupMapper extends MyBatisMapper {

	public List<BisItBitschedulegroup> findAll(Map parameterMap);
	  public void add(BisItBitschedulegroup schedule);
	  public void delete(String schedule);
}