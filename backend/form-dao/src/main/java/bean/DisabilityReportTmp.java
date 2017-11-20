package bean;

import lombok.*;

/**
 * Created by liutkvai on 11/19/2017.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class DisabilityReportTmp {
    private int patientId;
    byte[] data;
}
