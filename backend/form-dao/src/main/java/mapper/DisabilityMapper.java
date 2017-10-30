package mapper;

import bean.DisabilityReport;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

/**
 * Created by liutkvai on 10/27/2017.
 */
@Mapper
public interface DisabilityMapper {
    @Insert({ "INSERT INTO disability_report (patient_id, history, other_treatment, treatment_history, barthel_index, " +
            "latest_disability_desc, active, created, modified) VALUES (#{patient.id}, #{history}, #{otherTreatment}," +
            "#{treatmentHistory}, #{barthelIndex}, #{latestDisabilityDesc}, #{active}, #{created}, #{modified})" })
    @Options(useGeneratedKeys = true, keyColumn = "id")
    void add(DisabilityReport disabilityReport);

    @Insert({ "<script>" +
            "   INSERT INTO treatment (disability_report_id, name) VALUES " +
            "   <foreach collection='dr.treatments' item='treatment' index='index' open='(' separator = '),(' close=')'>" +
            "       #{dr.id}, #{treatment}" +
            "   </foreach>" +
            "</script>" })
    void assignTreatments(@Param("dr") DisabilityReport disabilityReport);

    @Insert({ "<script>" +
            "   INSERT INTO appointment (disability_report_id, date, doctor_type, observation, attachment) VALUES " +
            "   <foreach collection='dr.appointments' item='appointment' index='index' open='(' separator = '),(' close=')'>" +
            "       #{dr.id}, #{appointment.date}, #{appointment.doctorType}, #{appointment.observation}, " +
            "       #{appointment.attachment}" +
            "   </foreach>" +
            "</script>" })
    void assignAppointments(@Param("dr") DisabilityReport disabilityReport);

}
