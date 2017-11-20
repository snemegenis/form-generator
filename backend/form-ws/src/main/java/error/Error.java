package error;

import lombok.*;

/**
 * Created by liutkvai on 11/20/2017.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Error {
    private int code;
    private String message;
}
