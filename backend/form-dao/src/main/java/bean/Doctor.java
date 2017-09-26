package bean;

import lombok.*;

/**
 * Created by vaidelius on 16.7.3.
 */
@ToString(callSuper = true)
@NoArgsConstructor
@Getter
@Setter
public class Doctor extends Person{

    private String code;

    @Builder
    public Doctor(Integer id, String firstName, String lastName, String occupation, String code) {
        super(id, firstName, lastName, occupation);
        this.code = code;
    }
}
