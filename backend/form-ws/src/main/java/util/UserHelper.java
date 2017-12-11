package util;

import bean.Doctor;
import bean.User;

import javax.servlet.http.HttpSession;

/**
 * Created by liutkvai on 12/11/2017.
 */
public final class UserHelper {
    private UserHelper() {
    }

    public static final Doctor getAuthenticatedDoctor(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user != null? user.getDoctor() : null;
    }
}
