package eternal.blue.sams;

import eternal.blue.sams.user.User;
import eternal.blue.sams.user.UserRepository;
import eternal.blue.sams.user.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The manager account needs to be already present for SAMS to at all function.
 */
@Configuration
public class PreloadDatabase {
    private static final Logger log = LoggerFactory.getLogger(PreloadDatabase.class);

    @Bean
    CommandLineRunner preloadUserDatabase(UserRepository userRepository) {
        return arg -> {
            var allUsers = userRepository.findAll();
            if (allUsers.isEmpty()) {
                var rootUser = new User("root", "toor", UserType.Manager);
                log.info("Preloading " + userRepository.save(rootUser));
            }
        };
    }
}
