package bean;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * Created by liutkvai on 6/20/2016.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class Appointment implements Serializable{
	private Integer id;

	private LocalDate date;

	private String doctorType;

	private String observation;

	private String attachment;
}
