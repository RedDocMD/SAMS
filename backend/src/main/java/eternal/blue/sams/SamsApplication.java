package eternal.blue.sams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SamsApplication {

    public static final String apiConsumerAddress = "http://localhost:3000";

    public static void main(String[] args) {
        SpringApplication.run(SamsApplication.class, args);
    }
}
