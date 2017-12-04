package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by liutkvai on 6/27/2016.
 */
@EnableAutoConfiguration
@ComponentScan(basePackages = { "controller", "app", "config", "handler", "service", "security" })
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

}
