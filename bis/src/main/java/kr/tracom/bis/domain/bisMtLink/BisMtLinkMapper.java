package kr.tracom.bis.domain.bisMtLink;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
public interface BisMtLinkMapper  extends MyBatisMapper{
List<BisMtLink> findAll(Map parameterMap);
	
	void add(BisMtLink bismtvehicle);
	List<BisMtLink> count();
}
