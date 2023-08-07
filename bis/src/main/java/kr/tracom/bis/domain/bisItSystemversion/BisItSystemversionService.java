package kr.tracom.bis.domain.bisItSystemversion;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisItSystemversionService {
	@Inject
	private BisItSystemversionMapper bisItSystemversionMapper;
	
	public List<BisItSystemversion> findOne(Map id){
		return bisItSystemversionMapper.findOne(id);
	}
}
