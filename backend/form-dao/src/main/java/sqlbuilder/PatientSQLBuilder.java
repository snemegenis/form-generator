package sqlbuilder;

import org.apache.ibatis.jdbc.SQL;

/**
 * Created by liutkvai on 7/14/2017.
 */
public class PatientSQLBuilder {

    public String buildListByFilter(final Integer doctorId) {
        SQL sql = new SQL().SELECT("*").FROM("patient");
        if (doctorId != null) {
            sql = sql.WHERE("doctor_id = #{doctorId}");
        }
        return sql.toString();
    }
}
