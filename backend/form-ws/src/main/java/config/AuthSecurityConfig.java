package config;

import bean.DisabilityUserDetails;
import bean.User;
import mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import security.AuthenticationExceptionHandler;

/**
 * Created by liutkvai on 12/1/2017.
 */
@Configuration
@EnableGlobalAuthentication
public class AuthSecurityConfig extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    private UserMapper userMapper;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User userFromDB = userMapper.getByUsername(username);
            if (userFromDB == null) {
                throw new UsernameNotFoundException("User not found");
            }
            return new DisabilityUserDetails(userFromDB);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService).passwordEncoder(this.passwordEncoder);
    }

    @Autowired
    @Qualifier("jwtAuthenticationEntryPoint")
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Bean("jwtExceptionTranslationFilter")
    public ExceptionTranslationFilter exceptionTranslationFilter() {
        return new ExceptionTranslationFilter(authenticationEntryPoint);
    }
}
