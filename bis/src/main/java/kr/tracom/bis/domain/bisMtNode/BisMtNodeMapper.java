package kr.tracom.bis.domain.bisMtNode;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisMtNodeMapper extends MyBatisMapper {

	public List<BisMtNode> findAll(Map parameterMap);
}
