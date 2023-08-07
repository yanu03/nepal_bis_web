package kr.tracom.bis.domain.bisItSystemversion;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisItSystemversionMapper extends MyBatisMapper{

	List<BisItSystemversion> findOne(Map id);
}
