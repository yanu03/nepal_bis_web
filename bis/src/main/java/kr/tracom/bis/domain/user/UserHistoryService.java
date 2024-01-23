package kr.tracom.bis.domain.user;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.tracom.bis.domain.BaseService;


@Service
public class UserHistoryService {
	
	@Inject
	UserHistoryMapper userHistoryMapper;

	public List<User> loginHistory(Map<String,Object> map) {
		return userHistoryMapper.loginHistory(map);
	}
	
	//public void add(SessionUser user){
	public void add(Map<String, Object> user){
		userHistoryMapper.add(user);
	}
    
}
