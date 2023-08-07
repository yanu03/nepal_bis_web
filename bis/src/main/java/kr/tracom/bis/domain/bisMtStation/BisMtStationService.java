package kr.tracom.bis.domain.bisMtStation;

import java.util.List;
import java.util.Map;
import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisMtStationService {

	@Inject
	BisMtStationMapper bisMtStationMapper;
	
	public List<BisMtStation> findAll() {
        return bisMtStationMapper.findAll();
    }
	public List<BisMtStation> findSearch(Map<String, String> paramMap)
	{
		 return bisMtStationMapper.findSearch(paramMap);
	}
    public void add(BisMtStation vo)
    {
    	bisMtStationMapper.add(vo);
    }
 
    public void update(BisMtStation vo)
    {
    	bisMtStationMapper.update(vo);
    }
    public List<BisMtStation> count()
    {
    	return bisMtStationMapper.count();
    }
    public String maxPlus()
    {
    	return bisMtStationMapper.maxPlus();
    }
}
