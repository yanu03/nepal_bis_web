package kr.tracom.bis.domain.user;

import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.code.AXBootTypes.Used;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;

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
    private UserAuthService userAuthService;

    @Inject
    private UserRoleService userRoleService;

    @Inject
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Inject
    public UserService(UserRepository userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }

    public User getUser(RequestParams requestParams) {
        User user = get(requestParams).stream().findAny().orElse(null);

        if (user != null) {
            user.setAuthList(userAuthService.get(requestParams));
            user.setRoleList(userRoleService.get(requestParams));
        }

        return user;
    }

    public List<User> get(RequestParams requestParams) {

        String userCd = requestParams.getString("userCd");
        String userDiv = requestParams.getString("userDiv");
        String useYn = requestParams.getString("useYn");
        String filter = requestParams.getString("filter");
        if(filter==null){
			filter="";
		}
        
        Used use=null;
        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(useYn)) {
        	if(useYn.equals("Y")){
	        	use=AXBootTypes.Used.YES;
	            builder.and(qUser.useYn.eq(use));
        	}
        	if(useYn.equals("N")){
        		use=AXBootTypes.Used.NO;
        		builder.and(qUser.useYn.eq(use));
        	}
        }
        if (isNotEmpty(userCd)) {
        	builder.and(qUser.userCd.eq(userCd));
        }

        if (isNotEmpty(userDiv)) {
        	if(userDiv.equals("USER_NAME")){
        		builder.and(qUser.userNm.like("%"+filter+"%"));
        		
        	}
        	if(userDiv.equals("USER_ID")){
        		builder.and(qUser.userCd.like("%"+filter+"%"));
        	}
        }
        

        List<User> list = select().from(qUser).where(builder).orderBy(qUser.userNm.asc()).fetch();

        return list;
    }
    
    public Boolean checkDuplicate(User user) {
    	if(userRepository.findOne(user.getUserCd()) == null) {
    		return true;
    	} else {
    		return false;
    	}
    }

    @Transactional
    public void saveUser(List<User> users) throws UsernameNotFoundException {
        if (isNotEmpty(users)) {
            for (User user : users) {
                delete(qUserRole).where(qUserRole.userCd.eq(user.getUserCd())).execute();
                delete(qUserAuth).where(qUserAuth.userCd.eq(user.getUserCd())).execute();

                String password = bCryptPasswordEncoder.encode(user.getUserPs());
                User originalUser = userRepository.findOne(user.getUserCd());

                if (originalUser != null) {
                    if (isNotEmpty(user.getUserPs())) {
                        user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
                        user.setUserPs(password);
                    } else {
                        user.setUserPs(originalUser.getUserPs());
                    }
                } else {
                    user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
                    user.setUserPs(password);
                }

                save(user);

                for (UserAuth userAuth : user.getAuthList()) {
                    userAuth.setUserCd(user.getUserCd());
                }

                for (UserRole userRole : user.getRoleList()) {
                    userRole.setUserCd(user.getUserCd());
                }

                userAuthService.save(user.getAuthList());
                userRoleService.save(user.getRoleList());
            }
        }
    }

    @Transactional
    public void updateUser(User user) {
    	delete(qUserAuth).where(qUserAuth.userCd.eq(user.getUserCd())).execute();
    	
    	User originalUser = userRepository.findOne(user.getUserCd());
    	
    	if(originalUser != null) {
	    	if(isNotEmpty(user.getUserPs())) { 
	    		user.setPasswordUpdateDate(Instant.now(Clock.systemUTC()));
	            user.setUserPs(bCryptPasswordEncoder.encode(user.getUserPs()));
	    	} else {
	    		user.setUserPs(originalUser.getUserPs());
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
    
    public Boolean changePs(Map<String, Object> password) {
    	User originalUser = userRepository.findOne(SessionUtils.getCurrentLoginUserCd());
    	
    	String oldPassword = password.get("oldPassword").toString();
    	
    	if(bCryptPasswordEncoder.matches(oldPassword, originalUser.getUserPs())) {
    		originalUser.setUserPs(bCryptPasswordEncoder.encode(password.get("newPassword").toString()));
    		save(originalUser);
    		return true;
    	} else {
    		return false;
    	}
    }
}
