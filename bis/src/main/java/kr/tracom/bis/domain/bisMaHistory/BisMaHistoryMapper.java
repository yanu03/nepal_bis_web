package kr.tracom.bis.domain.bisMaHistory;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BisMaHistoryMapper extends MyBatisMapper {

	List<BisMaBusEvent> operationHistory(Map<String,Object> map);		
	List<BisHtSystemState> systemStateHistory(Map<String,Object> map);		
	List<BisHtSystemControl> systemControlHistory(Map<String,Object> map);		
	List<BisHtFileTransfer> fileSendHistory(Map<String,Object> map);		
	List<BisHtBitProvision> serviceBitHistory(Map<String,Object> map);		
	List<BisHtBitProvision> serviceVehicleHistory(Map<String,Object> map);		
}