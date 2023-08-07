package kr.tracom.bis.domain.bisMaHistory;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;

@Service
public class BisMaHistoryService {
    
    @Inject
    private BisMaHistoryMapper bisMaParamMapper;

    public List<BisMaHistoryDTO> operationHistory(Map<String,Object> map){
    	return bisMaParamMapper.operationHistory(map);
    }
  
}