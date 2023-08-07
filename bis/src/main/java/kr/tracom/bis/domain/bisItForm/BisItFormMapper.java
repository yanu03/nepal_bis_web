package kr.tracom.bis.domain.bisItForm;
 
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import java.util.List;
import java.util.Map;
 
 
public interface BisItFormMapper extends MyBatisMapper {
 
    List<BisItForm> findAll(Map<String, Object> searchMap);
    List<BisItForm> findAllUseY(Map<String, Object> searchMap);
    int insert(Map<String,Object> bisItForm);
    String maxFile();
    String maxFilePlus();
    
    List<Map<String,Object>> getBitId();
    BisItForm findOne(String formId);
    List<Map<String,Object>> formTypeList();
    
    String formPath();
    String ftpId();
    String ftpPw();
    String ftpIp();
    String ftpPort();

}