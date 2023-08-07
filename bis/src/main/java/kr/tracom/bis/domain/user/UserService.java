package kr.tracom.bis.domain.user;

import java.time.Clock;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import kr.tracom.bis.domain.BaseService;
import kr.tracom.bis.domain.user.auth.UserAuth;
import kr.tracom.bis.domain.user.auth.UserAuthService;
import kr.tracom.bis.domain.user.role.UserRole;
import kr.tracom.bis.domain.user.role.UserRoleService;
import kr.tracom.bis.utils.SessionUtils;


@Service
public class UserService extends BaseService<User, String> {
	
	private UserRepository userRepository;
	
	@Inject
	private UserMapper userMapper;

    @Inject
    private UserAuthService userAuthService;

    @Inject
    private UserRoleService userRoleService;

    @Inject
    private StandardPasswordEncoder standardPasswordEncoder;
    
    @Inject
    public UserService(UserRepository userRepository) {
    	super(userRepository);
    	this.userRepository = userRepository;
    }

    public List<Map<String, Object>> get(RequestParams<User> requestParams) {
        return userMapper.selectUserList(requestParams.getString("filter"));
    }
    
    public Boolean checkDuplicate(User user) {
    	if(userRepository.findOne(user.getUserCd()) == null) {
    		return true;
    	} else {
    		return false;
    	}
    }

    @Transactional
    public void saveUser(User user) throws Exception {
		user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
        user.setUserPs(standardPasswordEncoder.encode(user.getUserPs()));
		
		if(isNotEmpty(user.getScdPs())) {
			user.setScdPsUpdateDate(Instant.now(Clock.systemUTC()));
	    	user.setScdPs(standardPasswordEncoder.encode(user.getScdPs()));
		}
		
		user.setMenuGrpCd("SYSTEM_MANAGER");
		
		save(user);
		
		List<UserRole> roleList = new ArrayList<UserRole>();
		
		roleList.add(new UserRole(null, user.getUserCd(), "SYSTEM_MANAGER"));
		roleList.add(new UserRole(null, user.getUserCd(), "ASP_ACCESS"));
		roleList.add(new UserRole(null, user.getUserCd(), "ASP_MANAGER"));
		roleList.add(new UserRole(null, user.getUserCd(), "API"));
		
		
		// 沅뚰븳
		List<UserAuth> authList = user.getAuthList();
		for(UserAuth auth : authList) {
			auth.setUserCd(user.getUserCd());
		}
		
		userAuthService.save(authList);
		userRoleService.save(roleList);
    }

    @Transactional
    public void updateUser(User user) {
    	delete(qUserAuth).where(qUserAuth.userCd.eq(user.getUserCd())).execute();
    	
    	User originalUser = userRepository.findOne(user.getUserCd());
    	
    	if(originalUser != null) {
	    	if(isNotEmpty(user.getUserPs())) { 
	    		user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
	            user.setUserPs(standardPasswordEncoder.encode(user.getUserPs()));
	    	} else {
	    		user.setUserPs(originalUser.getUserPs());
	    	}
			
			if(isNotEmpty(user.getScdPs())) {
				user.setScdPsUpdateDate(Instant.now(Clock.systemUTC()));
		    	user.setScdPs(standardPasswordEncoder.encode(user.getScdPs()));
			} else {
				user.setScdPs(originalUser.getScdPs());
			}
    	}
		
		user.setMenuGrpCd(originalUser.getMenuGrpCd());
		save(user);
		
		// 沅뚰븳
		List<UserAuth> authList = user.getAuthList();
		for(UserAuth auth : authList) {
			auth.setUserCd(user.getUserCd());
		}
		userAuthService.save(authList);
    }
    
    public void deleteUser(User user) {
    	delete(user);
    }
    
    public String checkScdPs(User user) {
    	User originalUser = userRepository.findOne(SessionUtils.getCurrentLoginUserCd());
    	
    	// 1: 2李⑤퉬諛�踰덊샇 �궗�슜�븞�븿
    	// 2: 2李� 鍮꾨�踰덊샇 �뾾�쓬
    	// 3: 2李� 鍮꾨�踰덊샇 ��由�
    	
    	if(originalUser.getScdPsUseYn().equals("N")) {
    		return "1";
    	}
    	
    	if(isEmpty(originalUser.getScdPs())) {
    		return "2";
    	}
    	
    	if(isNotEmpty(user.getScdPs()) && isNotEmpty(originalUser.getScdPs())) {
    		if(standardPasswordEncoder.matches(user.getScdPs(), originalUser.getScdPs())) {
    			return "0";
    		} else {
    			return "3";
    		}
		} 
    	return "3";
    }
    
    public Boolean changePs(Map<String, Object> password) {
    	User originalUser = userRepository.findOne(SessionUtils.getCurrentLoginUserCd());
    	
    	String oldPassword = password.get("oldPassword").toString();
    	
    	if(standardPasswordEncoder.matches(oldPassword, originalUser.getUserPs())) {
    		originalUser.setUserPs(standardPasswordEncoder.encode(password.get("newPassword").toString()));
    		save(originalUser);
    		return true;
    	} else {
    		return false;
    	}
    }
}
