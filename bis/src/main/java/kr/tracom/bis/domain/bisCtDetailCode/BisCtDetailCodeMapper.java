package kr.tracom.bis.domain.bisCtDetailCode;
 
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import java.util.List;
import java.util.Map;
 
 
public interface BisCtDetailCodeMapper extends MyBatisMapper {
 
    List<BisCtDetailCode> findAll(Map<String,Object> parentKey);
    List<BisCtDetailCode> findAllUseY(Map<String,Object> parentKey);
    void update(BisCtDetailCode bisCtDetailCode);
    void insert(Map<String,Object> bisCtDetailCode);
    void delete(String bisCtDetailCode);
    
}

