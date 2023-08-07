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
	    public void add(BisItSystemschedule bisItSystemschedule)
	    {
	    	bisItSystemscheduleMapper.add(bisItSystemschedule);
	    }
	    public String maxPlus(){
			return bisItSystemscheduleMapper.maxPlus();
		}
}
