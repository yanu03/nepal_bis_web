package kr.tracom.bis.domain.bisMtNode;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisMtNodeService {

	@Inject
	BisMtNodeMapper bisMtNodeMapper;
	
	public List<BisMtNode> findAll(Map parameterMap)
	{
		return bisMtNodeMapper.findAll(parameterMap);
	}
}
