package kr.tracom.bis.domain.bisMtCompany;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisMtCompanyService {

	@Inject
	BisMtCompanyMapper bisMtCompanyMapper;
	
	 public List<BisMtCompany> findAll(Map parameterMap) {
	        return bisMtCompanyMapper.findAll(parameterMap);
	    }
	    public void add(BisMtCompany bisMtVehicle)
	    {
	    	bisMtCompanyMapper.add(bisMtVehicle);
	    }
	  public List<BisMtCompany> count()
	  {
		  return bisMtCompanyMapper.count();
	  }
	  public String maxPlus(){
		  return bisMtCompanyMapper.maxPlus(); 
	  }
}
