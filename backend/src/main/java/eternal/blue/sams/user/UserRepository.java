package eternal.blue.sams.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.Optional;

/**
 * This interface is defined to create a User collection in MongoDB.
 * The keys are their id's, which are required to be String by MongoDB.
 */
public interface UserRepository extends MongoRepository<User, BigInteger> {
    Optional<User> findByUsername(String username);
}
