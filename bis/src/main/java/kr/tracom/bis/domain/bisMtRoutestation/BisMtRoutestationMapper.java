package kr.tracom.bis.domain.bisMtRoutestation;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestation;

public interface BisMtRoutestationMapper  extends MyBatisMapper {

	List<BisMtRoutestation> findAll(Map parameterMap);

	void add(BisMtRoutestation vo);

	void delete(String key);

	void update(BisMtRoutestation vo);

	List<BisMtRoutestation> routemonitor(Map parameterMap);

}
