package mapper;

import bean.*;
import org.apache.ibatis.annotations.*;

import java.util.Collection;

/**
 * Created by liutkvai on 10/27/2017.
 */
@Mapper
public interface DisabilityMapper {
    @Insert({"INSERT INTO disability_report (patient_id, history, other_treatment, treatment_history, barthel_index, " +
            "latest_disability_desc, active, created, modified) VALUES (#{patientId}, #{history}, #{otherTreatment}," +
            "#{treatmentHistory}, #{barthelIndex}, #{latestDisabilityDesc}, #{active}, #{created}, #{modified})"})
    @Options(useGeneratedKeys = true, keyColumn = "id")
    void add(DisabilityReport disabilityReport);

    @Update({"UPDATE disability_report set history=#{history}, other_treatment=#{otherTreatment}, " +
            "treatment_history=#{treatmentHistory}, barthel_index=#{barthelIndex}, latest_disability_desc=#{latestDisabilityDesc}, " +
            "active=#{active}, modified=#{modified} WHERE id=#{id}"})
    int update(DisabilityReport disabilityReport);

    @Insert({"<script>" +
            "   INSERT INTO treatment (disability_report_id, name) VALUES " +
            "   <foreach collection='treatments' item='treatment' index='index' open='(' separator = '),(' close=')'>" +
            "       #{disabilityReportId}, #{treatment}" +
            "   </foreach>" +
            "</script>"})
    void assignTreatments(@Param("disabilityReportId") int disabilityReportId, @Param("treatments")
            Collection<Treatment> treatments);

    @Delete("DELETE FROM treatment WHERE disability_report_id=#{disabilityReportId}")
    void removeTreatments(@Param("disabilityReportId") int disabilityReportId);

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

    @Delete("DELETE FROM appointment WHERE disability_report_id=#{disabilityReportId}")
    void removeAppointments(@Param("disabilityReportId") int disabilityReportId);

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

    @Delete("DELETE FROM diagnosis WHERE disability_report_id=#{disabilityReportId}")
    void removeDiagnosis(@Param("disabilityReportId") int disabilityReportId);

    @Insert({"<script>" +
            "   INSERT INTO disability_type (disability_report_id, name) VALUES " +
            "   <foreach collection='disabilityTypes' item='disabilityType' index='index' open='(' separator = '),(' close=')'>" +
            "       #{disabilityReportId}, #{disabilityType.name}, " +
            "   </foreach>" +
            "</script>"})
    void assignDisabilities(@Param("disabilityReportId") int disabilityReportId, @Param("disabilityTypes")
            Collection<DisabilityType> disabilityTypes);

    @Delete("DELETE FROM disability_type WHERE disability_report_id=#{disabilityReportId}")
    void removeDisabilities(@Param("disabilityReportId") int disabilityReportId);

    @Update("UPDATE disability_report dr SET active=#{active} WHERE dr.patient_id=#{patientId}")
    void resetPatientStatus(@Param("patientId") int patientId, @Param("active") boolean active);

    @Update("UPDATE disability_report dr SET active=#{active} WHERE dr.id=#{id}")
    void resetStatus(@Param("id") int id, @Param("active") boolean active);

    @Select("SELECT dr.id, dr.created, dr.modified FROM disability_report dr WHERE dr.patient_id=#{patientId} AND dr.active = #{active}")
    DisabilityReport getByStatusFlag(@Param("patientId") int patientId, @Param("active") boolean active);

}
