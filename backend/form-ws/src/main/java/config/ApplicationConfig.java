package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import report.ITextReportGeneratorImpl;
import report.ReportGenerator;

/**
 * Created by liutkvai on 12/1/2017.
 */
@Configuration
public class ApplicationConfig {

    @Bean
    public ReportGenerator reportGenerator() {
        return new ITextReportGeneratorImpl();
    }

}
