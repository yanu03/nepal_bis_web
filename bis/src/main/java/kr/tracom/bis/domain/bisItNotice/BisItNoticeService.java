package kr.tracom.bis.domain.bisItNotice;
 
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
 
@Service
public class BisItNoticeService {
	
	@Inject
	private BisItNoticeMapper bisItNoticeMapper;
    
	public List<BisItNotice> findAll(Map<String, Object> searchMap) {
        return bisItNoticeMapper.findAll(searchMap);
	}
	
	public void insert(Map<String, Object> map){
		bisItNoticeMapper.insert(map);
	}
	
	public String noticeMaxId(){
		return bisItNoticeMapper.noticeMaxId();
	}
	
	public void delete(String noticeId){
		bisItNoticeMapper.delete(noticeId);
	}
	
	
	public void update(Map<String, Object> map){
		bisItNoticeMapper.update(map);
	}
	
}