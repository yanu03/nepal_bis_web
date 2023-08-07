package kr.tracom.bis.domain.bisItScenario;
 
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
 
@Service
public class BisItScenarioService {
	
	@Inject
	private BisItScenarioMapper bisItScenarioMapper;
    
	public List<BisItScenario> findAll(Map<String, Object> searchMap) {
        return bisItScenarioMapper.findAll(searchMap);
    }
	public List<BisItScenario> findAllUseY(Map<String, Object> searchMap) {	//modal
		return bisItScenarioMapper.findAllUseY(searchMap);
	}
	
	public void insert(Map<String,Object> bisCtDetailCodeDTO){
		bisItScenarioMapper.insert(bisCtDetailCodeDTO);
	}
	
	public String maxScenarioPlus(){
		return bisItScenarioMapper.maxScenarioPlus();
	}
	
	public List<Map<String,Object>> scenarioTypeList(){
		return bisItScenarioMapper.scenarioTypeList();
	}
	
/*	public void update(BisItScenario bisCtDetailCodeDTO){
		bisItScenarioMapper.update(bisCtDetailCodeDTO);
	}
	
	public void delete(BisItScenario bisCtDetailCodeDTO){
		bisItScenarioMapper.delete(bisCtDetailCodeDTO);
	}*/
	
	
}