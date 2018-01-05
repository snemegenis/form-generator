package constants;

import java.time.format.DateTimeFormatter;

/**
 * Created by vaidelius on 16.7.3.
 */
public abstract class ReportConstants {
    public static final String DISABILITY_REPORT_CODE = "disability-report";
    public static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("YYYY-MM-dd");
    public static final String PARAM_DATE = "report.date";
    public static final String PARAM_PRINT_DATE = "report.print.date";
    public static final String PARAM_NBR = "report.nbr";
    public static final String PARAM_PRINT_NBR = "report.print.nbr";
    public static final String PARAM_USER = "report.user";
}
