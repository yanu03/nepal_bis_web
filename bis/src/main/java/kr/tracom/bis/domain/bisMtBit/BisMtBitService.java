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
	    public void add(Map<String,Object> bisMtbit)
	    {
	    	bisMtBitMapper.add(bisMtbit);
	    }
	    public void delete(Map<String,Object> bisMtbit)
	    {
	    	bisMtBitMapper.delete(bisMtbit);
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
