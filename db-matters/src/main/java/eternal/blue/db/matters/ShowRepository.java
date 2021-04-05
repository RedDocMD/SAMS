package eternal.blue.db.matters;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface ShowRepository extends MongoRepository<Show, BigInteger> {
}
