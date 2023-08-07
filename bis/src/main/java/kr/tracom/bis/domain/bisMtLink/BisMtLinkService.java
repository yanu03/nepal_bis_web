package kr.tracom.bis.domain.bisMtLink;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
@Service
public class BisMtLinkService {

	@Inject
	BisMtLinkMapper bisMtLinkMapper;
public List<BisMtLink> findAll(Map parameterMap)
{
	return bisMtLinkMapper.findAll(parameterMap);
}
	
	public void add(BisMtLink bismtvehicle)
	{
		bisMtLinkMapper.add(bismtvehicle);
	}
	public List<BisMtLink> count()
	{
		return bisMtLinkMapper.count();
	}
	
}
