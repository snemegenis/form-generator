package mapper;

import bean.Doctor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by liutkvai on 8/31/2016.
 */
@Mapper
public interface DoctorMapper {

    @Select("SELECT * FROM doctor")
    @Transactional(readOnly = true)
    List<Doctor> getDoctorList();

    @Select("SELECT * FROM doctor WHERE code = #{code}")
    @Transactional(readOnly = true)
    Doctor getByCode(String code);

}
