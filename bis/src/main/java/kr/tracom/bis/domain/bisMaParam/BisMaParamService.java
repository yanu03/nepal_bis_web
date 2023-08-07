package kr.tracom.bis.domain.bisMaParam;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;

@Service
public class BisMaParamService {
    
    @Inject
    private BisMaParamMapper bisMaParamMapper;
   

    
    public List<BisMaDTO> searchFind(Map<String,Object> searchData) {
    	return (List<BisMaDTO>) bisMaParamMapper.serchFind(searchData);
    }
    
    public void insert(Map<String,Object> bisMaDTO){
    	bisMaParamMapper.insert(bisMaDTO);
    }
    
  
}