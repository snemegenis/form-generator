package bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * Created by vaidelius on 16.7.3.
 */
@Data
@EqualsAndHashCode(of = {"username"})
@ToString
public class User {
    private Integer id;

    private String username;

    private String password;

    private Doctor doctor;

}
