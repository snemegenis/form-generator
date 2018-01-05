package bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
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
public class DisabilityReport implements Serializable {
    private Integer id;

    private Patient patient;

    private Integer patientId;

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

    @JsonIgnore
    public boolean isValid() {
        return isPatientIdValid() && isHistoryValid() && isTreatmentsValid() && isOtherTreatmentValid() &&
                isAppointmentsValid() && isMainDiagnosisValid() && isOtherDiagnosisValid() && isBarthelIndexValid() &&
                isDisabityTypesValid();
    }

    private boolean isPatientIdValid() {
        return patientId != null;
    }

    private boolean isHistoryValid() {
        return history != null;
    }

    private boolean isBarthelIndexValid() {
        return barthelIndex != null;
    }

    private boolean isDisabityTypesValid() {
        return disabilityTypes != null && disabilityTypes.size() > 0;
    }

    private boolean isMainDiagnosisValid() {
        return mainDiagnosis != null && mainDiagnosis.isValid();
    }

    private boolean isOtherDiagnosisValid() {
        boolean result = true;
        if (otherDiagnosis != null) {
            for (Diagnosis currentOtherDiagnosis : otherDiagnosis) {
                result = currentOtherDiagnosis.isValid();
                if (!result) {
                    break;
                }
            }
        }
        return result;
    }

    private boolean isTreatmentsValid() {
        return treatments != null && treatments.size() > 0;
    }

    private boolean isOtherTreatmentValid() {
        return treatments != null && treatments.contains(Treatment.OTHER) ?
                otherTreatment != null :
                otherTreatment == null;

    }

    private boolean isAppointmentsValid() {
        boolean result = appointments != null && appointments.size() > 0;
        if (result) {
            for (Appointment appointment : appointments) {
                result = appointment.isValid();
                if (!result) {
                    break;
                }
            }
        }
        return result;
    }

}
