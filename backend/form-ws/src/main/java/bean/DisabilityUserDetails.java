package bean;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import util.ValidationHelper;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

/**
 * Created by liutkvai on 12/1/2017.
 */
public class DisabilityUserDetails implements UserDetails {

    private User user;

    public DisabilityUserDetails(User user) {
        this.user = Optional.of(user).get();
    }

    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ADMIN");
    }

    @Override
    public String getPassword() {
        return Optional.of(user.getCredentials()).get().getPassword();
    }

    @Override
    public String getUsername() {
        return Optional.of(user.getCredentials()).get().getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
