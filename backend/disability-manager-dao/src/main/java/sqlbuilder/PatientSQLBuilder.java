package sqlbuilder;

import org.apache.ibatis.jdbc.SQL;

/**
 * Created by liutkvai on 7/14/2017.
 */
public class PatientSQLBuilder {

    public String buildListByFilter(final Integer doctorId) {
        SQL sql = new SQL().SELECT("p.*, dr.id as disability_report_id").FROM("patient p")
                .LEFT_OUTER_JOIN("disability_report dr ON dr.patient_id = p.id");
        if (doctorId != null) {
            sql = sql.WHERE("doctor_id = #{doctorId}");
        }
        sql.ORDER_BY("p.id");
        return sql.toString();
    }
}
