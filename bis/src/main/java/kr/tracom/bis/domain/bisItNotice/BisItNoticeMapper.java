package kr.tracom.bis.domain.bisItNotice;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
public interface BisItNoticeMapper extends MyBatisMapper {
 
	List<BisItNotice> findAll(Map<String, Object> searchMap);
	void insert(Map<String, Object> map);
	String noticeMaxId();
	void delete(String noticeId);
	void update(Map<String, Object> map);
}