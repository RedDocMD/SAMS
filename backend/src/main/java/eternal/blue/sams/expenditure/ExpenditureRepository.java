package eternal.blue.sams.expenditure;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.List;

/**
 * Represents the collection of Expenditure in MongoDB
 */
public interface ExpenditureRepository extends MongoRepository<Expenditure, BigInteger> {
    List<Expenditure> findExpenditureByShowId(BigInteger showId);
}
