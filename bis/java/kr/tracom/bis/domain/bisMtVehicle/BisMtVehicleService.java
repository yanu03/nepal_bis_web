package kr.tracom.bis.domain.bisMtVehicle;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;


@Service
public class BisMtVehicleService {

	@Inject
	BisMtVehicleMapper bisMtVehicleMapper;
    public List<BisMtVehicle> findAll(Map parameterMap) {
        return bisMtVehicleMapper.findAll(parameterMap);
    }
    public void add(BisMtVehicle bisMtVehicle)
    {
    	bisMtVehicleMapper.add(bisMtVehicle);
    }
    public List<BisMtVehicle> count()
    {
    	return bisMtVehicleMapper.count();
    }
    public String maxPlus(){
		return bisMtVehicleMapper.maxPlus();
	}
}
