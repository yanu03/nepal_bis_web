package kr.tracom.bis.domain.bisMaAuth;
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import java.util.List;
import java.util.Map;
 
 
public interface BisMaAuthMapper extends MyBatisMapper {

	List<BisMaAuthDTO> findAll();
	List<BisMaAuthDTO> serchFind(Map<String,Object> SearchData);
    int update(BisMaAuthDTO bisMaDTO);
    int delete(BisMaAuthDTO bisMaDTO);
    int insert(Map<String,Object> bisMaDTO);
}