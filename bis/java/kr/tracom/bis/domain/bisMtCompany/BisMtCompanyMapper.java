package kr.tracom.bis.domain.bisMtCompany;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;


public interface BisMtCompanyMapper  extends MyBatisMapper{
List<BisMtCompany> findAll(Map parameterMap);
	
	void add(BisMtCompany bismtvehicle);
	
	 List<BisMtCompany> count();
	 String maxPlus();
}
