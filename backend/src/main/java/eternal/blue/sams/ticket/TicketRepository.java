package eternal.blue.sams.ticket;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.List;

/**
 * Represents the collection of Tickets in MongoDB.
 */
public interface TicketRepository extends MongoRepository<Ticket, BigInteger> {
    List<Ticket> findByShowId(BigInteger showId);

    List<Ticket> findByUserId(BigInteger userId);
}
