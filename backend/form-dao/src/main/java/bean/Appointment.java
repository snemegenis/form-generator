package bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;

	private String doctorType;

	private String observation;

	private String attachment;

	@JsonIgnore
	public boolean isValid() {
		return date != null && doctorType != null && observation != null;
	}

}
