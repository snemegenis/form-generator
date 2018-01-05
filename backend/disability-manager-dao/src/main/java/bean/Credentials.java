package bean;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Created by liutkvai on 12/6/2017.
 */
@Data
@ToString
@NoArgsConstructor
public class Credentials {
    private String username;
    private String password;

    @Builder
    public Credentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
