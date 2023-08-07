package kr.tracom.bis.domain.bisItSendsystemversion;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.bisItSystemversion.BisItSystemversion;

@Service
public class BisItSendsystemversionService {
	@Inject
	private BisItSendsystemversionMapper bisItSystemversionMapper;
	
	public void add(BisItSendsystemversion id){
		 bisItSystemversionMapper.add(id);
	}

	
}
