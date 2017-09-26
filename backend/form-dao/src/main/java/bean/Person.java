package bean;

import lombok.*;

/**
 * Created by vaidelius on 16.6.19.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public abstract class Person {

    private Integer id;
    private String firstName;
    private String lastName;
    private String occupation;

}
