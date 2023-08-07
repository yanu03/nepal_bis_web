package kr.tracom.bis.domain.bisItBitscenario;
 
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
 
@Service
public class BisItBitscenarioService {
	
	@Inject
	private BisItBitscenarioMapper bisItBitScenarioMapper;
  
	public BisItBitscenario find(Map<String,Object> searchMap) {
		return bisItBitScenarioMapper.find(searchMap);
	}
	
    public List<BisItBitscenario> findAll(Map<String,Object> searchMap) {
        return bisItBitScenarioMapper.findAll(searchMap);
    }
    
    public void insert(Map<String,Object> bitScenario) {
    	bisItBitScenarioMapper.insert(bitScenario);
    }
    
    public void delete(String bitId) {
    	bisItBitScenarioMapper.delete(bitId);
    }
    
    public List<BisMtBit> bitFindAll(Map<String,Object> searchMap){
    	return bisItBitScenarioMapper.bitFindAll(searchMap);
    }
    
    public void update(Map<String, Object> map){
    	bisItBitScenarioMapper.update(map);
    }
    
    public List<BisBitscenarioFormInfo> getFormInfo(){
    	return bisItBitScenarioMapper.getFormInfo();
    }
    
 
    
    
}