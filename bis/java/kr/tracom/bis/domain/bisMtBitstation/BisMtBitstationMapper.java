package kr.tracom.bis.domain.bisMtBitstation;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

import kr.tracom.bis.domain.bisMtBit.BisMtBit;

public interface BisMtBitstationMapper extends MyBatisMapper{
List<BisMtBitstation> findAll(Map parameterMap);
	void delete(String bitId);
	void add(BisMtBitstation bismtvehicle);
	List<BisMtBit> count();
}