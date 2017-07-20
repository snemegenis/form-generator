package bean;

import lombok.*;

/**
 * Created by vaidelius on 16.6.23.
 */

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(of = {"code"})
public class Diagnosis {
    private String code;
    private String text;
    private String functionalClass;
    private String degree;
    private String stage;
    private String history;
    private String details;

}
