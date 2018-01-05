package bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serializable;

/**
 * Created by vaidelius on 16.6.23.
 */

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(of = {"code"})
public class Diagnosis implements Serializable{
    private String code;
    private boolean primary;
    private String text;
    private String functionalClass;
    private String degree;
    private String stage;
    private String history;
    private String details;

    @JsonIgnore
    public boolean isValid() {
        return code != null && text != null && functionalClass != null &&
                degree != null && stage != null && history != null;
    }

}
