package kr.tracom.bis.domain.bisMtRoutestation;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import kr.tracom.bis.domain.bisMtRoute.BisMtRouteMapper;

@Service
public class BisMtRoutestationService {
  
    @Inject
    private BisMtRoutestationMapper bisMtRoutestationMapper;
	 
    public List<BisMtRoutestation> findAll(Map parameterMap) {
        return bisMtRoutestationMapper.findAll(parameterMap);
    }
    public void add(BisMtRoutestation vo)
    {
    	bisMtRoutestationMapper.add(vo);
    }
    public void delete(String key)
    {
    	bisMtRoutestationMapper.delete(key);
    }
    public void update(BisMtRoutestation vo)
    {
    	bisMtRoutestationMapper.update(vo);
    }
    public List<BisMtRoutestation> routemonitor(Map parameterMap)
    {
    	return bisMtRoutestationMapper.routemonitor(parameterMap);
    }
}