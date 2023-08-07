package kr.tracom.bis.domain.bisMtRouteallocinfo;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;


public interface BisMtRouteallocinfoMapper extends MyBatisMapper{

	
	List<BisMtRouteallocinfo> findAll(Map parameterMap);
	void add(BisMtRouteallocinfo bisMtRouteallocinfo);
	
}
