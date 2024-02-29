package kr.tracom.bis.domain.bisCtCommonCode;
 
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BisCtCommonCodeMapper extends MyBatisMapper {
 
    List<BisCtCommonCode> searchAll(Map<String, Object> searchData);
    void insert(Map<String,Object> bisCtCommonCode);
    void update(Map<String,Object> bisCtCommonCode);
    void delete(Map<String,Object> bisCtCommonCode);
    //void delete(Map<String,Object> bisCtCommonCode);
}