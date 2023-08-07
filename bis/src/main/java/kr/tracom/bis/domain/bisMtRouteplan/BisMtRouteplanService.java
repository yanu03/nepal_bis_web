package kr.tracom.bis.domain.bisMtRouteplan;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisMtRouteplanService {
	@Inject
	BisMtRouteplanMapper bisMtRouteplanMapper;
	

 public List<BisMtRouteplan> findAll(Map parameterMap)
{
	return bisMtRouteplanMapper.findAll(parameterMap);
}
	
	public void add(BisMtRouteplan bismtrouteplan)
	{
		bisMtRouteplanMapper.add(bismtrouteplan);
	}

}