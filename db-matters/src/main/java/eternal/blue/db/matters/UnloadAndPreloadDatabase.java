package eternal.blue.db.matters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UnloadAndPreloadDatabase {
    private static final Logger log = LoggerFactory.getLogger(UnloadAndPreloadDatabase.class);

    @Bean
    CommandLineRunner preloadUserDatabase(UserRepository userRepository, ShowRepository showRepository) {
        return arg -> {

        };
    }
}