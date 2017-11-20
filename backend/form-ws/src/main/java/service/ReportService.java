package service;

import bean.DisabilityReportParams;

/**
 * Created by liutkvai on 11/20/2017.
 */
public interface ReportService {
    byte[] get(DisabilityReportParams disabilityReportParams);
}
