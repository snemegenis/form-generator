package bean.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by liutkvai on 7/14/2017.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientFilter {
    private Integer doctorId;
}
