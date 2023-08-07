package kr.tracom.bis.domain.bisMtBitstation;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisMtBit.BisMtBitMapper;

@Service
public class BisMtBitstationService {
	@Inject
	BisMtBitstationMapper bisMtBitstationMapper;
public List<BisMtBitstation> findAll(Map parameterMap)
{
	return bisMtBitstationMapper.findAll(parameterMap);
}
	
public void delete(String bitId)
{
	bisMtBitstationMapper.delete(bitId);
}
public void add(BisMtBitstation bismtbitstation)
	{
		bisMtBitstationMapper.add(bismtbitstation);
	}
	//List<BisMtBit> count();
}
