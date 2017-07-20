package bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonProperty;

import java.time.LocalDate;

/**
 * Created by vaidelius on 16.9.3.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisabilityReportParams {
    private Integer patientId;
    private boolean fillDate;
    private boolean fillNumber;
    private LocalDate date;
    private Integer number;
}
