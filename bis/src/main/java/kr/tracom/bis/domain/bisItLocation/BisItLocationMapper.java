package kr.tracom.bis.domain.bisItLocation;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisItForm.BisItForm;

public interface BisItLocationMapper extends MyBatisMapper {

	List<BisItLocation> findAll(Map parameterMap);
}
