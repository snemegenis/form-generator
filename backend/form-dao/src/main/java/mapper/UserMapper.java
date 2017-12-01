package mapper;

import bean.User;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by liutkvai on 8/31/2016.
 */
@Mapper
public interface UserMapper {

    @Select("SELECT u.*, d.id as did, d.* FROM user u INNER JOIN doctor d ON d.id = u.doctor_id " +
            "WHERE u.username = #{username}")
    @Transactional(readOnly = true)
    @Results({
            @Result(column = "did", property = "doctor.id"),
            @Result(column = "first_name", property = "doctor.firstName"),
            @Result(column = "last_name", property = "doctor.lastName"),
            @Result(column = "code", property = "doctor.code"),
            @Result(column = "occupation", property = "doctor.occupation")
    })
    User getByUsername(@Param("username") String username);

}
