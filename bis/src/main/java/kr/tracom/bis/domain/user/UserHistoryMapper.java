package kr.tracom.bis.domain.user;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

@Repository
public interface UserHistoryMapper extends MyBatisMapper {
	List<User> loginHistory(Map<String,Object> map);
	void add(User user);
}
