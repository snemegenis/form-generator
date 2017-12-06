package bean;

import lombok.*;

/**
 * Created by vaidelius on 16.7.3.
 */
@Data
@ToString
@NoArgsConstructor
public class User {
    private Integer id;

    private Credentials credentials;

    private Doctor doctor;

    private String token;

    @Builder
    public User(Integer id, Credentials credentials, Doctor doctor, String token) {
        this.id = id;
        this.credentials = credentials;
        this.doctor = doctor;
        this.token = token;
    }
}
