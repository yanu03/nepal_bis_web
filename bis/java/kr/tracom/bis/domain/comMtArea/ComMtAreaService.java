package kr.tracom.bis.domain.comMtArea;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisMtVehicle.BisMtVehicle;

@Service
public class ComMtAreaService {

	@Inject
	ComMtAreaMapper comMtAreaMapper;
	
	
	public List<ComMtArea> findAll(Map parameterMap)
	{
		return comMtAreaMapper.findAll(parameterMap);
	}
}
