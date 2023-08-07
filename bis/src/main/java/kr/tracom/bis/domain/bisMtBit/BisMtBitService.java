package kr.tracom.bis.domain.bisMtBit;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;


@Service
public class BisMtBitService {

	@Inject
	BisMtBitMapper bisMtBitMapper;
	
	 public List<BisMtBit> findAll(Map parameterMap) {
	        return bisMtBitMapper.findAll(parameterMap);
	    }
	 public List<BisMtBit> findId() {
	        return bisMtBitMapper.findId();
	    }
	    public void add(BisMtBit bisMtVehicle)
	    {
	    	bisMtBitMapper.add(bisMtVehicle);
	    }
	    public List<BisMtBit> count()
	    {
	    	return bisMtBitMapper.count();
	    }
	    public String maxPlus()
	    {
	    	return bisMtBitMapper.maxPlus();
	    }
	   public List<Map<String,Object>> terminalBitFind(Map parameterMap)
	   {
		return bisMtBitMapper.terminalBitFind(parameterMap);
		   
	   }
	  
}
