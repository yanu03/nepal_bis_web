package kr.tracom.bis.domain.bisCtCommonCode;
 
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;
 
@Service
public class BisCtCommonCodeService {
   
	@Inject
	private BisCtCommonCodeMapper bisCtCommonCodeMapper;
	
	public List<BisCtCommonCode> searchAll(Map<String, Object> searchData){
		return bisCtCommonCodeMapper.searchAll(searchData);
	}
    public void  insert(Map<String,Object> bisCtCommonCode){
    	bisCtCommonCodeMapper.insert(bisCtCommonCode);
    }
    public void  update(Map<String,Object> bisCtCommonCode){
    	bisCtCommonCodeMapper.update(bisCtCommonCode);
    }
    
	public void delete(Map<String,Object> bisCtCommonCode){
		bisCtCommonCodeMapper.delete(bisCtCommonCode);
	}


}