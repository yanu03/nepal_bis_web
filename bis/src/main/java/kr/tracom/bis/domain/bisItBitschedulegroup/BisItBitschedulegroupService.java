package kr.tracom.bis.domain.bisItBitschedulegroup;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
@Service
public class BisItBitschedulegroupService {

	@Inject
	private BisItBitschedulegroupMapper bisItBitschedulegroupMapper;
	public List<BisItBitschedulegroup> findAll(Map parameterMap){
		
		return bisItBitschedulegroupMapper.findAll(parameterMap);
	}
	  public void add(BisItBitschedulegroup schedule){
		  bisItBitschedulegroupMapper.add(schedule);
	  }
	  public void delete(String schedule){
		  bisItBitschedulegroupMapper.delete(schedule);
	  }
}
