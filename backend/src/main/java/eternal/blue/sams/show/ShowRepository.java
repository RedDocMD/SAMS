package eternal.blue.sams.show;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

/**
 * Show repository to represent a Show collection in MongoDB
 */
public interface ShowRepository extends MongoRepository<Show, BigInteger> {
    List<Show> findByDate(LocalDate date);
}
