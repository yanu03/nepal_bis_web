package kr.tracom.bis.domain.comMtArea;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;


public interface ComMtAreaMapper extends MyBatisMapper {

	List<ComMtArea> findAll(Map parameterMap);
}
