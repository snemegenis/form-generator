package bean;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * Created by vaidelius on 16.6.19.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class DisabilityReport {
    private Integer id;

    private Patient patient;

    private String history;

    private Set<Treatment> treatments;

    private String otherTreatment;

    private String treatmentHistory;

    private List<Appointment> appointments;

    private Integer barthelIndex;

    private String latestDisabilityDesc;

    private Diagnosis mainDiagnosis;

    private List<Diagnosis> otherDiagnosis;

    private Set<DisabilityType> disabilityTypes;

    private boolean active;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime modified;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime created;

}
