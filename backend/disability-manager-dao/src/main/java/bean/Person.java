package bean;

import lombok.*;

import java.io.Serializable;

/**
 * Created by vaidelius on 16.6.19.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public abstract class Person implements Serializable {

    private Integer id;
    private String firstName;
    private String lastName;
    private String occupation;

}
