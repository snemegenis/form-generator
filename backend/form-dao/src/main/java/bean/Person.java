package bean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by vaidelius on 16.6.19.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class Person {

    private Integer id;
    private String firstName;
    private String lastName;
    private String occupation;

}
