package kr.tracom.bis.domain.bisItBitscenario;
 
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
 
 
public interface BisItBitscenarioMapper extends MyBatisMapper {
 
    List<BisItBitscenario> findAll(Map<String,Object> parentKey);
    
    void insert(Map<String,Object> bitScenario);
    void delete(String bitId);
    
    List<BisMtBit> bitFindAll(Map<String,Object> searchMap);
}