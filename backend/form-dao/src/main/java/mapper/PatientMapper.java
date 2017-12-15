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

    @Select({ "SELECT p.*, dr.id as drId FROM patient p LEFT JOIN disability_report dr ON p.id = dr.patient_id" +
            " AND dr.active = true ORDER BY p.first_name, p.last_name" })
    @Results({ @Result(property = "disabilityReportId", column = "drId"),
            @Result(property = "id", column = "id"),
            @Result(property = "tempSaved", column = "id", javaType = boolean.class,
                    one = @One(select = "mapper.DisabilityTmpMapper.exists")) })
    @Transactional(readOnly = true)
    List<Patient> getList();

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
