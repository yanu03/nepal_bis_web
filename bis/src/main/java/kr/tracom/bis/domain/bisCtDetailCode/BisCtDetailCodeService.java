package kr.tracom.bis.domain.bisCtDetailCode;
 
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;
 
@Service
public class BisCtDetailCodeService {
    
	@Inject
	private BisCtDetailCodeMapper bisCtDetailCodeMapper;
	public List<BisCtDetailCode> findAll(Map<String,Object> parentKey) {
        return bisCtDetailCodeMapper.findAll(parentKey);
    }
	
	public List<BisCtDetailCode> findAlluseY(Map<String,Object> parentKey) {
		return bisCtDetailCodeMapper.findAllUseY(parentKey);
	}
	
	public void insert(Map<String,Object> bisCtDetailCode){
		bisCtDetailCodeMapper.insert(bisCtDetailCode);
	}
	
	public void delete(String bisCtDetilCode){
		bisCtDetailCodeMapper.delete(bisCtDetilCode);
	}



}