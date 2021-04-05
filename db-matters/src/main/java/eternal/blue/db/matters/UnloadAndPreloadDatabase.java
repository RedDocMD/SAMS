package eternal.blue.db.matters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

@Configuration
public class UnloadAndPreloadDatabase {
    private static final Logger log = LoggerFactory.getLogger(UnloadAndPreloadDatabase.class);

    @Bean
    CommandLineRunner preloadUserDatabase(UserRepository userRepository, ShowRepository showRepository) {
        return arg -> {
            userRepository.deleteAll();
            showRepository.deleteAll();
            log.info("Cleared user and show repos");
            LocalDate today = LocalDate.now();
            LocalDate showDay = today.plus(Period.ofDays(10));
            List<Show> shows = newArrayList(
                    new Show(
                            showDay,
                            LocalTime.of(17, 0),
                            Duration.ofMinutes(90),
                            250,
                            500,
                            1000,
                            500,
                            "Your Name"
                    ),
                    new Show(
                            showDay,
                            LocalTime.of(20, 0),
                            Duration.ofMinutes(90),
                            250,
                            500,
                            100,
                            50,
                            "DJ Ajgar"
                    ),
                    new Show(
                            showDay,
                            LocalTime.of(9, 0),
                            Duration.ofMinutes(90),
                            250,
                            500,
                            750,
                            500,
                            "Frozen 2"
                    )
            );
            showRepository.saveAll(shows);
            log.info("Made " + shows.toString());
            List<User> users = newArrayList(
                    new User(
                            "deep",
                            "blue",
                            UserType.Customer
                    ),
                    new User(
                            "aaditya",
                            "godspeed",
                            UserType.Customer
                    ),
                    new User(
                            "bob",
                            "thebuilder",
                            UserType.Customer
                    ),
                    new User(
                            "motu",
                            "samosa",
                            UserType.Salesperson
                    ),
                    new User(
                            "patlu",
                            "idea",
                            UserType.Salesperson
                    ),
                    new User(
                            "borda",
                            "cha-de",
                            UserType.Accountant
                    ),
                    new User(
                            "mejda",
                            "tui-kor",
                            UserType.Accountant
                    ),
                    new User(
                            "choto",
                            "overworked",
                            UserType.Accountant
                    )
            );
            userRepository.saveAll(users);
            log.info("Made " + users.toString());
        };
    }
}