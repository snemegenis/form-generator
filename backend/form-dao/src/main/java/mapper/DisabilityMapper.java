package mapper;

import bean.Patient;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

/**
 * Created by liutkvai on 10/27/2017.
 */
@Mapper
public interface DisabilityMapper {
    @Insert({ "INSERT INTO disability (first_name, last_name, occupation, birth_date, personal_id, email, phone, " +
            "mobile_phone, address, employer) VALUES (#{firstName}, #{lastName}, #{occupation}, " +
            "#{birthDate}, #{personalId}, #{email}, #{phone}, #{mobilePhone}, #{address}, #{employer})" })
    @Options(useGeneratedKeys = true, keyColumn = "id")
    void add(Patient patient);

}
