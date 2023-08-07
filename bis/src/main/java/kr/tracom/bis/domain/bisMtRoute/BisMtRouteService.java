package kr.tracom.bis.domain.bisMtRoute;
 
import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;
import java.util.Map;
 
@Service
public class BisMtRouteService {
  
    @Inject
    private BisMtRouteMapper bisMtRouteMapper;
	 
   
    public List<BisMtRoute> findAll(Map parameterMap) {
        return bisMtRouteMapper.findAll(parameterMap);
    }
    public void add(BisMtRoute bismtroute)
    {
        bisMtRouteMapper.add(bismtroute);
    }
    public void delete(String key)
    {
    	bisMtRouteMapper.delete(key);
    }
    public String maxPlus(){
		return bisMtRouteMapper.maxPlus();
	}
    public List<BisMtRoute> count()
    {
    	return bisMtRouteMapper.count();
    }
}