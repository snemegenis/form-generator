package mapper;

import bean.*;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;

/**
 * Created by liutkvai on 10/27/2017.
 */
@Mapper
public interface DisabilityMapper {
    @Insert({"INSERT INTO disability_report (patient_id, history, other_treatment, treatment_history, barthel_index, " +
            "latest_disability_desc, active, created, modified) VALUES (#{patient.id}, #{history}, #{otherTreatment}," +
            "#{treatmentHistory}, #{barthelIndex}, #{latestDisabilityDesc}, #{active}, #{created}, #{modified})"})
    @Options(useGeneratedKeys = true, keyColumn = "id")
    void add(DisabilityReport disabilityReport);

    @Insert({"<script>" +
            "   INSERT INTO treatment (disability_report_id, name) VALUES " +
            "   <foreach collection='treatments' item='treatment' index='index' open='(' separator = '),(' close=')'>" +
            "       #{disabilityReportId}, #{treatment}" +
            "   </foreach>" +
            "</script>"})
    void assignTreatments(@Param("disabilityReportId") int disabilityReportId, @Param("treatments")
            Collection<Treatment> treatments);

    @Insert({"<script>" +
            "   INSERT INTO appointment (disability_report_id, date, doctor_type, observation, attachment) VALUES " +
            "   <foreach collection='appointments' item='appointment' index='index' open='(' separator = '),(' " +
            "close=')'>" +
            "       #{disabilityReportId}, #{appointment.date}, #{appointment.doctorType}, #{appointment" +
            ".observation}, " +
            "       #{appointment.attachment}" +
            "   </foreach>" +
            "</script>"})
    void assignAppointments(@Param("disabilityReportId") int disabilityReportId, @Param("appointments")
            Collection<Appointment> appointments);

    @Insert({"<script>" +
            "   INSERT INTO diagnosis (disability_report_id, code, text, functional_class, degree, stage, history, " +
            "details, is_primary) " +
            "       VALUES " +
            "   <foreach collection='diagnoses' item='diagnosis' index='index' open='(' separator = '),(' close=')'>" +
            "       #{disabilityReportId}, #{diagnosis.code}, #{diagnosis.text}, #{diagnosis.functionalClass}, " +
            "       #{diagnosis.degree}, #{diagnosis.stage}, #{diagnosis.history}, #{diagnosis.details}, #{diagnosis" +
            ".primary}" +
            "   </foreach>" +
            "</script>"})
    void assignDiagnosis(@Param("disabilityReportId") int disabilityReportId, @Param("diagnoses")
            Collection<Diagnosis> diagnoses);

    @Insert({"<script>" +
            "   INSERT INTO disability_type (disability_report_id, name) VALUES " +
            "   <foreach collection='disabilityTypes' item='disabilityType' index='index' open='(' separator = '),(' close=')'>" +
            "       #{disabilityReportId}, #{disabilityType.name}, " +
            "   </foreach>" +
            "</script>"})
    void assignDisabilities(@Param("disabilityReportId") int disabilityReportId, @Param("disabilityTypes")
            Collection<DisabilityType> disabilityTypes);

}
