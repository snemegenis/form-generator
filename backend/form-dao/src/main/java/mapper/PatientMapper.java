package mapper;

import bean.Patient;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by liutkvai on 9/2/2016.
 */
@Mapper
public interface PatientMapper {

    @Select({"SELECT p.id as p_id, p.* FROM patient p "})
    @Results({
            @Result(property = "disabilityReportIds", javaType = Set.class, column = "p_id", many = @Many(select =
                    "getDisabilityReportIdsForPatient"))})
    @Transactional(readOnly = true)
    List<Patient> getList();

    @Select("SELECT dr.id FROM disability_report dr WHERE dr.patient_id = #{patientId} ")
    List<Integer> getDisabilityReportIdsForPatient(int patientId);

    @Select("SELECT * FROM patient WHERE id = #{id}")
    @Transactional(readOnly = true)
    Patient getById(final Integer id);

    @Insert({ "INSERT INTO patient (first_name, last_name, occupation, birth_date, personal_id, email, phone, " +
            "mobile_phone, address, employer) VALUES (#{firstName}, #{lastName}, #{occupation}, " +
            "#{birthDate}, #{personalId}, #{email}, #{phone}, #{mobilePhone}, #{address}, #{employer})" })
    @Options(useGeneratedKeys = true, keyColumn = "id")
    void add(Patient patient);

    @Insert({ "UPDATE patient set first_name=#{firstName}, last_name=#{lastName}, occupation=#{occupation}, " +
            "birth_date=#{birthDate}, personal_id=#{personalId}, email=#{email}, phone=#{phone}, " +
            "mobile_phone=#{mobilePhone}, address=#{address}, employer=#{employer} WHERE id=#{id}" })
    int update(Patient patient);

}
