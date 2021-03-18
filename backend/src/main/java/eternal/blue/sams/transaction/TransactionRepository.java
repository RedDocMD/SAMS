package eternal.blue.sams.transaction;

import eternal.blue.sams.user.UserType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.List;

/**
 * Repository to represent the collection of Transactions in MongoDB
 */
public interface TransactionRepository extends MongoRepository<Transaction, BigInteger> {
    List<Transaction> findByShowId(BigInteger showId);

    List<Transaction> findByInitiatorIdAndInitiatorType(BigInteger initiatorId, UserType initiatorType);
}
