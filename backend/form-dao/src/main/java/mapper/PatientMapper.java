package mapper;

import bean.Patient;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.transaction.annotation.Transactional;
import sqlbuilder.PatientSQLBuilder;

import java.util.List;

/**
 * Created by liutkvai on 9/2/2016.
 */
@Mapper
public interface PatientMapper {

    @SelectProvider(type = PatientSQLBuilder.class, method = "buildListByFilter")
    @Transactional(readOnly = true)
    List<Patient> getListByFilter(final Integer doctorId);

    @Select("SELECT * FROM patient WHERE id = #{id}")
    @Transactional(readOnly = true)
    Patient getById(final Integer id);

}
