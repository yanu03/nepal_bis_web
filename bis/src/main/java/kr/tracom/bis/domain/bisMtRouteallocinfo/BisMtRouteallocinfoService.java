package kr.tracom.bis.domain.bisMtRouteallocinfo;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisMtRouteallocinfoService {

	@Inject
	BisMtRouteallocinfoMapper bisMtRouteallocinfoMapper;

	public List<BisMtRouteallocinfo> findAll(Map parameterMap)
	{
		return bisMtRouteallocinfoMapper.findAll(parameterMap);
	}
	public void add(BisMtRouteallocinfo bisMtRouteallocinfo)
	{
		bisMtRouteallocinfoMapper.add(bisMtRouteallocinfo);
	}
}
