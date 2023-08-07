package kr.tracom.bis.domain.sample.parent;

import kr.tracom.bis.domain.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

@Service
public class ParentSampleService extends BaseService<ParentSample, String> {

	private ParentSampleRepository parentRepository;

	@Inject
	public ParentSampleService(ParentSampleRepository parentRepository) {
		super(parentRepository);
		this.parentRepository = parentRepository;
	}

	@Transactional
	public void deleteByKeys(List<String> keys) {
		keys.forEach(this::delete);
	}
}
