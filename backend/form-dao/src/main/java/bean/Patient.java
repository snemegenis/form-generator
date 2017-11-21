package bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by vaidelius on 16.7.3.
 */
@NoArgsConstructor
@ToString(callSuper = true)
@Getter
@Setter
public class Patient extends Person {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private String personalId;
    private String email;
    private String phone;
    private String mobilePhone;
    private String address;
    private String employer;
    private Set<Integer> disabilityReportIds;

    @Builder
    public Patient(Integer id, String firstName, String lastName, String occupation,
                   LocalDate birthDate, String personalId, String email, String phone,
                   String mobilePhone, String address, String employer, Set<Integer> disabilityReportIds) {
        super(id, firstName, lastName, occupation);
        this.birthDate = birthDate;
        this.personalId = personalId;
        this.email = email;
        this.phone = phone;
        this.mobilePhone = mobilePhone;
        this.address = address;
        this.employer = employer;
        this.disabilityReportIds = disabilityReportIds;
    }

}
