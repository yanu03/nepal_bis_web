package kr.tracom.bis.security;

//import com.chequer.axboot.core.domain.user.SessionUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import kr.tracom.bis.domain.user.SessionUser;

import java.util.Collection;

public class AXBootUserAuthentication implements Authentication {

    private final SessionUser user;

    private boolean authenticated = true;

    public AXBootUserAuthentication(SessionUser user) {
        this.user = user;
    }

    @Override
    public String getName() {
        return user.getUsername();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return user.getPassword();
    }

    @Override
    public SessionUser getDetails() {
        return user;
    }

    @Override
    public Object getPrincipal() {
        return user.getUsername();
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
