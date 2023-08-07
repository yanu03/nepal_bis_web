package kr.tracom.bis.domain.bisItSystemschedulegroup;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisItSystemschedulegroupService {

	@Inject
	private BisItSystemschedulegroupMapper bisSystemschedulegroupMapper;
	public List<BisItSystemschedulegroup> findAll(Map parameterMap)
	{
		return bisSystemschedulegroupMapper.findAll(parameterMap);
	}
	  public void add(BisItSystemschedulegroup schedule){
		  bisSystemschedulegroupMapper.add(schedule);
		  
	  }
	  public String maxPlus(){
			return bisSystemschedulegroupMapper.maxPlus();
		}
}
