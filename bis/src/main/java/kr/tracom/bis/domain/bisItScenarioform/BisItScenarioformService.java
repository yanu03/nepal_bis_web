package kr.tracom.bis.domain.bisItScenarioform;
 
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
 
@Service
public class BisItScenarioformService {
	
	@Inject
	private BisItScenarioformMapper bisItScenarioformMapper;
	
	public List<Map<String,Object>> keyFormFind(String parentKey){
		return bisItScenarioformMapper.keyFormFind(parentKey);
	}
	
	public void insert(Map<String,Object> bisItScenarioform){
		bisItScenarioformMapper.insert(bisItScenarioform);
	}
	
	public void update(Map<String,Object> bisItScenarioform){
		bisItScenarioformMapper.update(bisItScenarioform);
	}
	
	public void delete(String bisItScenarioform){
		bisItScenarioformMapper.delete(bisItScenarioform);
	}
/*	public void delete(Map<String,Object> bisItScenarioform){
		bisItScenarioformMapper.delete(bisItScenarioform);
	}
*/	
}