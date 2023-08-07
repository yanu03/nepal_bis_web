package kr.tracom.bis.domain.bisMaAuth;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;

@Service
public class BisMaAuthService {
    
    @Inject
    private BisMaAuthMapper bisMaParamMapper;
   
    public List<BisMaAuthDTO> findAll() {
        return (List<BisMaAuthDTO>) bisMaParamMapper.findAll();
    }
    
    public List<BisMaAuthDTO> searchFind(Map<String,Object> searchData) {
    	return (List<BisMaAuthDTO>) bisMaParamMapper.serchFind(searchData);
    }
    
    public void insert(Map<String,Object> bisMaDTO){
    	bisMaParamMapper.insert(bisMaDTO);
    }
  
    
    public void update(BisMaAuthDTO bisMaDTO){
    	bisMaParamMapper.update(bisMaDTO);
    }
}