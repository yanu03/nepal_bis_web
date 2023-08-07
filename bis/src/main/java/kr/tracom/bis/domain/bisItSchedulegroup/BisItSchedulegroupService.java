package kr.tracom.bis.domain.bisItSchedulegroup;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisItSchedulegroupService {

	@Inject
	private BisItSchedulegroupMapper bisItSchedulegroupMapper;
	
	public List<BisItSchedulegroup> findAll(Map parameterMap)
	{
		return bisItSchedulegroupMapper.findAll(parameterMap);
	}
	  public void add(BisItSchedulegroup schedule)
	  {
		  bisItSchedulegroupMapper.add(schedule);
	  }
	  
	  public void delete(BisItSchedulegroup schedule)
	  {
		  bisItSchedulegroupMapper.delete(schedule);
	  }
}
