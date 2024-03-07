package kr.tracom.bis.domain.bisItSystemschedule;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;


@Service
public class BisItSystemscheduleService {

	@Inject
	private BisItSystemscheduleMapper bisItSystemscheduleMapper;
	   public List<BisItSystemschedule> findAll(Map parameterMap) {
	        return bisItSystemscheduleMapper.findAll(parameterMap);
	    }
	    public void add(Map<String,Object> bisItSystemschedule)
	    {
	    	bisItSystemscheduleMapper.add(bisItSystemschedule);
	    }
	    public void delete(Map<String,Object> bisItSystemschedule)
	    {
	    	bisItSystemscheduleMapper.delete(bisItSystemschedule);
	    }
	    public String maxPlus(){
			return bisItSystemscheduleMapper.maxPlus();
		}
}
