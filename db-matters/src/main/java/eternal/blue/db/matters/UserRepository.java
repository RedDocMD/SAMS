package eternal.blue.db.matters;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, BigInteger> {
}
