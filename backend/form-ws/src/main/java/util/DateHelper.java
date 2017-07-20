package util;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * Created by vaidelius on 16.6.19.
 */
public class DateHelper {

    public static final int getYearsOnDate(LocalDate birthDate, LocalDate date) {
        return (int) ChronoUnit.YEARS.between(birthDate, date);
    }

    public static final int getMonthsOnDate(LocalDate birthDate, LocalDate date) {
        int years = getYearsOnDate(birthDate, date);
        int months = (int) ChronoUnit.MONTHS.between(birthDate, date);
        return months - years * 12;
    }
}
