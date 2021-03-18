package eternal.blue.sams.transaction;

import eternal.blue.sams.user.UserType;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * This is an important service since all Transactions are created by other services, using this service.
 * Also the TransactionController requires the getter methods.
 */
@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Note that we don't take the time, it is auto-generated.
    public Transaction createTransaction(double amount, BigInteger initiatorId, UserType initiatorType, BigInteger showId) {
        var transaction = new Transaction(amount, initiatorId, showId, initiatorType, LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> getTransactionById(BigInteger id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> getTransactionsByShow(BigInteger showId) {
        return transactionRepository.findByShowId(showId);
    }

    // We don't actually check if this id corresponds to a salesperson.
    // We assume the TicketService does its work correctly.
    public List<Transaction> getTransactionsBySalesperson(BigInteger salespersonId) {
        return transactionRepository.findByInitiatorIdAndInitiatorType(salespersonId, UserType.Salesperson);
    }

    public List<Transaction> getTransactionsByYear(int year) {
        var allTransactions = transactionRepository.findAll();
        return allTransactions.stream()
                .filter(transaction -> transaction.getTime().getYear() == year)
                .collect(Collectors.toList());
    }
}
