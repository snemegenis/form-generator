package mapper;

import bean.DisabilityReportTmp;
import org.apache.ibatis.annotations.*;

/**
 * Created by liutkvai on 10/27/2017.
 */
@Mapper
public interface DisabilityTmpMapper {

    @Insert({"INSERT INTO disability_report_tmp (patient_id, data) VALUES (#{disabilityReportTmp.patientId}, #{disabilityReportTmp.data})"})
    void add(@Param("disabilityReportTmp") DisabilityReportTmp disabilityReportTmp);

    @Select({"SELECT * FROM disability_report_tmp WHERE patient_id=#{patientId}"})
    DisabilityReportTmp get(@Param("patientId") int patientId);

    @Update({"UPDATE disability_report_tmp set data=#{data} WHERE patient_id=#{patientId}"})
    int update(@Param("patientId") int patientId, @Param("data") byte[] data);

    @Delete({"DELETE FROM disability_report_tmp WHERE patient_id=#{patientId}"})
    void delete(@Param("patientId") int patientId);

}
