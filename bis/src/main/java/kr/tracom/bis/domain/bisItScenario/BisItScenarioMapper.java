package kr.tracom.bis.domain.bisItScenario;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
public interface BisItScenarioMapper extends MyBatisMapper {
 
	List<BisItScenario> findAll(Map<String, Object> searchMap);
	List<BisItScenario> findAllUseY(Map<String, Object> searchMap);
    String maxScenarioPlus();
    void insert(Map<String, Object> bisItScenario);
    List<Map<String, Object>> scenarioTypeList();
}