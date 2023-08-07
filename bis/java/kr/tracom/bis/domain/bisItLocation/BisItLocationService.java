package kr.tracom.bis.domain.bisItLocation;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisItLocationService {

	@Inject
	BisItLocationMapper bisItLocationMapper;
	public List<BisItLocation> findAll(Map parameterMap)
	{
		return bisItLocationMapper.findAll(parameterMap);
	}
}

