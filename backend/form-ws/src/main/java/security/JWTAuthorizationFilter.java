package security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static security.SecurityConst.*;

/**
 * Created by liutkvai on 12/4/2017.
 */
@Component("jwtAuthorizationFilter")
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    @Value("${security.jwt.secret.key}")
    private String secretKey;


    private AuthenticationFailureHandler failureHandler;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String token = extractToken(request);
        if (token != null) {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException {
        SecurityContextHolder.clearContext();
        try {
            failureHandler.onAuthenticationFailure(request, response, failed);
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            String subject = Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            if (subject != null) {
                return new UsernamePasswordAuthenticationToken(subject, "", Collections.emptyList());
            } else {
                return null;
            }
        } catch (JwtException jwtExc) {
            throw new BadCredentialsException("JWT parsing failed", jwtExc);
        }
    }

    private String extractToken(HttpServletRequest request) {
        String result = null;
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null) {
            int prefixIndex = header.indexOf(TOKEN_PREFIX);
            if (prefixIndex > -1) {
                result = header.substring(prefixIndex + TOKEN_PREFIX.length());
            }
        }
        return result;
    }
}
