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

    public List<BisMaBusEvent> operationHistory(Map<String,Object> map){
    	return bisMaParamMapper.operationHistory(map);
    }
    
    public List<BisHtSystemState> systemStateHistory(Map<String,Object> map){
    	return bisMaParamMapper.systemStateHistory(map);
    }
    
    public List<BisHtSystemControl> systemControlHistory(Map<String,Object> map){
    	return bisMaParamMapper.systemControlHistory(map);
    }
    
    public List<BisHtFileTransfer> fileSendHistory(Map<String,Object> map){
    	return bisMaParamMapper.fileSendHistory(map);
    }
    
    public List<BisHtBitProvision> serviceBitHistory(Map<String,Object> map){
    	return bisMaParamMapper.serviceBitHistory(map);
    }
    
    public List<BisHtBitProvision> serviceVehicleHistory(Map<String,Object> map){
    	return bisMaParamMapper.serviceVehicleHistory(map);
    }
  
}