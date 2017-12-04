package config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import security.JWTAuthenticationFilter;
import security.JWTAuthorizationFilter;

/**
 * Created by liutkvai on 12/1/2017.
 */

@Configuration
public class GlobalSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("/${rest.base.path}/**")
    private String basePathPattern;

    @Value("/${security.jwt.login.url}")
    private String signUpURL;

    @Autowired
    @Qualifier("jwtAuthorizationFilter")
    private BasicAuthenticationFilter authorizationFilter;

    @Autowired
    @Qualifier("jwtAuthenticationFilter")
    private UsernamePasswordAuthenticationFilter authenticationFilter;

    @Autowired
    @Qualifier("jwtExceptionTranslationFilter")
    private ExceptionTranslationFilter exceptionTranslationFilter;

    @Bean
    @Profile("dev")
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(basePathPattern).allowedOrigins("http://localhost:8081");
            }
        };
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, signUpURL).permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .addFilter(authenticationFilter)
                .addFilter(authorizationFilter)
                .addFilterBefore(exceptionTranslationFilter, JWTAuthorizationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

}
