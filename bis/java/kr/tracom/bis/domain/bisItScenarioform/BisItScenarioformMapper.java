package kr.tracom.bis.domain.bisItScenarioform;
 
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import java.util.List;
import java.util.Map;
 
 
public interface BisItScenarioformMapper extends MyBatisMapper {
 
    List findAll();
    BisItScenarioform findOne(BisItScenarioform bisItScenarioform);
    void insert(Map<String,Object> bisItScenarioform);
    List<Map<String,Object>> keyFormFind(String parentKey);
    void delete(String bisItScenarioform);
//    void delete(Map<String,Object> bisItScenarioform);
    void update(Map<String, Object> bisItScenarioform);
}