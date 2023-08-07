package kr.tracom.bis.domain.bisMaParam;
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import java.util.List;
import java.util.Map;
 
 
public interface BisMaParamMapper extends MyBatisMapper {

	List<BisMaDTO> findAll();
	List<BisMaDTO> serchFind(Map<String,Object> searchData);
    int update(BisMaDTO bisMaDTO);
    int delete(BisMaDTO bisMaDTO);
    int insert(Map<String,Object> bisMaDTO);
}