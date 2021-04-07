package eternal.blue.db.matters;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import picocli.CommandLine;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.List;
import java.util.concurrent.Callable;

import static com.google.common.collect.Lists.newArrayList;

@Configuration
public class UnloadAndPreloadDatabase {
    private static final Logger log = LoggerFactory.getLogger(UnloadAndPreloadDatabase.class);

    @Bean
    CommandLineRunner preloadUserDatabase(UserRepository userRepository, ShowRepository showRepository) {
        return arg -> {
            new CommandLine(new DatabaseUndertaker(userRepository, showRepository)).execute(arg);
        };
    }

    @CommandLine.Command(name="DBUndertaker")
    private static class DatabaseUndertaker implements Callable<Integer> {

        private final UserRepository userRepository;
        private final ShowRepository showRepository;

        @CommandLine.Option(names="-c") boolean clear;
        @CommandLine.Option(names="-p") boolean preset;

        public DatabaseUndertaker(UserRepository userRepository, ShowRepository showRepository) {
            this.userRepository = userRepository;
            this.showRepository = showRepository;
        }

        private void clearDatabase() {
            MongoClient client = MongoClients.create();
            MongoDatabase db = client.getDatabase("test");
            for (var collectionName : db.listCollectionNames()) {
                var collection = db.getCollection(collectionName);
                collection.drop();
                log.info("Cleared " + collectionName);
            }
        }

        private void loadDatabase() {
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
            log.info("Made " + users);
        }

        @Override
        public Integer call() {
            if (clear) {
                clearDatabase();
            }
            if (preset) {
                loadDatabase();
            }
            return 0;
        }
    }
}