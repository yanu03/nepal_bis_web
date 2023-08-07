package kr.tracom.bis.domain.bisItForm;
 
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisItScenario.BisItScenario;
 
@Service
public class BisItFormService {
	
	@Inject
	private BisItFormMapper bisItFormMapper;
	
	public List<BisItForm> findAll(Map<String, Object> searchMap){
		return bisItFormMapper.findAll(searchMap);
	}
	public List<BisItForm> findAllUseY(Map<String, Object> searchMap){
		return bisItFormMapper.findAllUseY(searchMap);
	}
	
	public void insert(Map<String,Object> bisCtDetailCode){
		bisItFormMapper.insert(bisCtDetailCode);
	}
	
	public String maxFile(){
		return bisItFormMapper.maxFile();
	}
	public String maxFilePlus(){
		return bisItFormMapper.maxFilePlus();
	}
	
	public BisItForm findOne(String formId){
		return bisItFormMapper.findOne(formId);
	}
	
	public List<Map<String,Object>> formTypeList(){
		return bisItFormMapper.formTypeList();
	}
	
	public String formPath(){
		return bisItFormMapper.formPath();
	}
	
	public String ftpId(){
		return bisItFormMapper.ftpId();
	}
	
	public String ftpIp(){
		return bisItFormMapper.ftpIp();
	}
	
	public String ftpPw(){
		return bisItFormMapper.ftpPw();
	}
	
	public String ftpPort(){
		return bisItFormMapper.ftpPort();
	}
}