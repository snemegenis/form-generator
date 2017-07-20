package mapper;

import bean.Appointment;
import bean.DisabilityReport;
import bean.DisabilityType;
import bean.Treatment;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Set;

/**
 * Created by liutkvai on 9/2/2016.
 * Described using xml mapping due to annotation mapping restriction on all join sql mappings.
 */
@Mapper
public interface ReportMapper {

    @Select("SELECT dr.id AS dr_id, dr.history AS dr_history, dr.other_treatment AS dr_other_treatment, " +
            "dr.treatment_history AS dr_treatment_history, dr.barthel_index AS dr_barthel_index, " +
            "dr.active as dr_active, " +
            "p.id as p_id, p.personal_id as p_personal_id, p.address as p_address, " +
            "p.email as p_email, p.birth_date as p_birth_date, p.phone as p_phone, " +
            "p.mobile_phone as p_mobile_phone, p.employer as p_employer, p.occupation as p_occupation, " +
            "p.first_name as p_first_name, p.last_name as p_last_name, " +
            "dg.code as dg_code, dg.text as dg_text, dg.degree as dg_degree, " +
            "dg.functional_class as dg_functional_class, dg.stage as dg_stage, " +
            "dg.history as dg_history, dg.details as dg_details " +
            "FROM disability_report dr INNER JOIN patient p ON p.id = dr.patient_id " +
            "INNER JOIN diagnosis dg ON p.id = dg.disability_report_id " +
            "WHERE patient_id = #{patientId}")
    @Results({
            @Result(property = "id", column = "dr_id"),
            @Result(property = "history", column = "dr_history"),
            @Result(property = "otherTreatment", column = "dr_other_treatment"),
            @Result(property = "treatmentHistory", column = "dr_treatment_history"),
            @Result(property = "barthelIndex", column = "dr_barthel_index"),
            @Result(property = "active", column = "dr_active"),
            @Result(property = "patient.id", column = "p_id"),
            @Result(property = "patient.personalId", column = "p_personal_id"),
            @Result(property = "patient.birthDate", column = "p_birth_date"),
            @Result(property = "patient.email", column = "p_email"),
            @Result(property = "patient.phone", column = "p_phone"),
            @Result(property = "patient.mobilePhone", column = "p_mobile_phone"),
            @Result(property = "patient.employer", column = "p_employer"),
            @Result(property = "patient.occupation", column = "p_occupation"),
            @Result(property = "patient.firstName", column = "p_first_name"),
            @Result(property = "patient.lastName", column = "p_last_name"),
            @Result(property = "patient.address", column = "p_address"),
            @Result(property = "mainDiagnosis.code", column = "dg_code"),
            @Result(property = "mainDiagnosis.text", column = "dg_text"),
            @Result(property = "mainDiagnosis.functionalClass", column = "dg_functional_class"),
            @Result(property = "mainDiagnosis.degree", column = "dg_degree"),
            @Result(property = "mainDiagnosis.stage", column = "dg_stage"),
            @Result(property = "mainDiagnosis.history", column = "dg_history"),
            @Result(property = "mainDiagnosis.details", column = "dg_details"),
            @Result(property = "treatments", javaType = Set.class, column = "dr_id",
                    many = @Many(select = "getTreatmentsForReport")),
            @Result(property = "appointments", javaType = List.class, column = "dr_id",
                    many = @Many(select = "getAppointmentsForReport")),
            @Result(property = "disabilityTypes", javaType = Set.class, column = "dr_id",
            many = @Many(select = "getDisabilityTypesForReport"))
    })
    DisabilityReport getDisabilityReport(int patientId);

    @Select("SELECT t.name FROM treatment t WHERE disability_report_id = #{disabilityReportId}")
    Set<Treatment> getTreatmentsForReport(int disabilityReportId);

    @Select("SELECT * FROM appointment a WHERE a.disability_report_id = #{disabilityReportId}")
    List<Appointment> getAppointmentsForReport(int disabilityReportId);

    @Select("SELECT dt.name FROM disability_type dt WHERE dt.disability_report_id = #{disabilityReportId}")
    List<DisabilityType> getDisabilityTypesForReport(int disabilityReportId);

}
