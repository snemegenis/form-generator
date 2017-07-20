package bean;

import lombok.*;

import java.time.LocalDate;

/**
 * Created by vaidelius on 16.7.3.
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Patient extends Person {
    private LocalDate birthDate;
    private String personalId;
    private String email;
    private String phone;
    private String mobilePhone;
    private String address;
    private String employer;

    @Builder
    public Patient(Integer id, String firstName, String lastName, String occupation,
                   LocalDate birthDate, String personalId, String email, String phone,
                   String mobilePhone, String address, String employer) {
        super(id, firstName, lastName, occupation);
        this.birthDate = birthDate;
        this.personalId = personalId;
        this.email = email;
        this.phone = phone;
        this.mobilePhone = mobilePhone;
        this.address = address;
        this.employer = employer;
    }
}
