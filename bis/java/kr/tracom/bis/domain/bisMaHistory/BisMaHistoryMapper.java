package kr.tracom.bis.domain.bisMaHistory;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BisMaHistoryMapper extends MyBatisMapper {

	List<BisMaHistoryDTO> operationHistory(Map<String, Object> map);		
}