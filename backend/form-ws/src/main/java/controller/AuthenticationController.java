package controller;

import bean.Credentials;
import bean.DisabilityUserDetails;
import bean.User;
import exception.DisabilityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import util.ValidationHelper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Optional;

/**
 * Created by liutkvai on 12/6/2017.
 */
@RestController
@RequestMapping("auth")
@Slf4j
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(method = RequestMethod.POST, value = "login", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User login(@RequestBody Credentials credentials, HttpSession session) {
        ValidationHelper.validateRequired("credentials", credentials);
        ValidationHelper.validateRequired("credentials.username", credentials.getUsername());
        ValidationHelper.validateRequired("credentials.password", credentials.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User authenticatedUser = Optional.of(((DisabilityUserDetails) authentication.getPrincipal()).getUser())
                .orElseThrow(() -> new DisabilityException("Authenticated user is empty"));
        User result = User.builder()
                .doctor(authenticatedUser.getDoctor())
                .id(authenticatedUser.getId())
                .token(session.getId())
                .build();
        session.setAttribute("user", result);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

}
