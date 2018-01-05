package config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import report.ITextReportGeneratorImpl;
import report.ReportGenerator;

/**
 * Created by liutkvai on 12/1/2017.
 */
@Configuration
public class ApplicationConfig {

    @Bean
    public MessageSource disabilityReportMessages() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("report/disability-report");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

}
