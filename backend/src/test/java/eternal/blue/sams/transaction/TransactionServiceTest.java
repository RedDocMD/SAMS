package eternal.blue.sams.transaction;

import eternal.blue.sams.user.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;
import static com.google.common.collect.Lists.cartesianProduct;
import static com.google.common.collect.Lists.newArrayList;

public class TransactionServiceTest {
    private TransactionService transactionService;
    @Mock
    private TransactionRepository transactionRepository;

    @BeforeEach
    public void setup() {
        openMocks(this);
        transactionService = new TransactionService(transactionRepository);
    }

    @Test
    public void createTransaction() {
       var randGen = new Random();
       var amount = randGen.nextDouble() * 5000;
       var type = TransactionType.Credit;
       var initiatorId = BigInteger.valueOf(Math.abs(randGen.nextLong()));
       var showId = BigInteger.valueOf(Math.abs(randGen.nextLong()));
       var initiatorType = UserType.Salesperson;
       var time = LocalDateTime.now();

       var transaction = new Transaction(amount, type, initiatorId, showId, initiatorType, time);
       when(transactionRepository.save(any())).thenReturn(transaction);

       var actualTransaction = transactionService.
               createTransaction(amount, type, initiatorId, initiatorType, showId);
       assertThat(actualTransaction).isEqualTo(transaction);
    }

    @Test
    public void allTransactions() {
        var transactions = getSomeTransactions();
        when(transactionRepository.findAll()).thenReturn(transactions);

        var actualTransactions = transactionService.allTransactions();
        assertThat(actualTransactions).isEqualTo(transactions);
    }

    @Test
    public void getTransactionById() {
        var transaction = getSomeTransactions().get(0);
        var id = BigInteger.valueOf(100);
        when(transactionRepository.findById(id)).thenReturn(Optional.of(transaction));
        var actualTransaction = transactionService.getTransactionById(id);
        assertThat(actualTransaction).isPresent();
        assertThat(actualTransaction.get()).isEqualTo(transaction);
    }

    @Test
    public void getTransactionByShow() {
        var transactions = getSomeTransactions();
        var showId = getSomeTransactions().get(0).getShowId();
        var showTransactions = transactions.stream()
                .filter(transaction -> transaction.getShowId().equals(showId))
                .collect(Collectors.toList());
        when(transactionRepository.findByShowId(showId)).thenReturn(showTransactions);
        var actualTransactions = transactionService.getTransactionsByShow(showId);
        assertThat(actualTransactions).isEqualTo(showTransactions);
    }

    @Test
    public void getTransactionsBySalesperson() {
        var transactions = getSomeTransactions();
        var id = transactions.get(0).getInitiatorId();
        var salespersonTransactions = transactions.stream()
                .filter(transaction -> transaction.getInitiatorId().equals(id)
                && transaction.getInitiatorType() == UserType.Salesperson)
                .collect(Collectors.toList());
        when(transactionRepository.findByInitiatorIdAndInitiatorType(id, UserType.Salesperson))
                .thenReturn(salespersonTransactions);
        var actualTransactions = transactionService.getTransactionsBySalesperson(id);
        assertThat(actualTransactions).isEqualTo(salespersonTransactions);
    }

    @Test
    public void getTransactionByYear() {
        var transactions = getSomeTransactions();
        var year = LocalDateTime.now().getYear();
        var yearTransactions = transactions.stream()
                .filter(transaction -> transaction.getTime().getYear() == year)
                .collect(Collectors.toList());
        when(transactionRepository.findAll()).thenReturn(transactions);
        var actualTransactions = transactionService.getTransactionsByYear(year);
        assertThat(actualTransactions).isEqualTo(yearTransactions);
    }

    private List<Transaction> getSomeTransactions() {
        var randGen = new Random();
        var amounts = newArrayList(500.0, 1000.0, 5000.0);
        var types = newArrayList(TransactionType.Credit, TransactionType.Debit);
        var initiatorIds =  newArrayList(BigInteger.valueOf(Math.abs(randGen.nextLong())),
                BigInteger.valueOf(Math.abs(randGen.nextLong())), BigInteger.valueOf(Math.abs(randGen.nextLong())));
        var showIds =  newArrayList(BigInteger.valueOf(Math.abs(randGen.nextLong())),
                BigInteger.valueOf(Math.abs(randGen.nextLong())), BigInteger.valueOf(Math.abs(randGen.nextLong())));
        var initiatorTypes = newArrayList(UserType.Customer, UserType.Salesperson, UserType.Accountant);
        var times = newArrayList(
                LocalDateTime.now(), LocalDateTime.now().plus(Period.ofYears(1)));

        var combinations = cartesianProduct(amounts, types, initiatorIds, showIds, initiatorTypes, times);
        var transactions = new ArrayList<Transaction>();
        for (var combo : combinations) {
            var transaction = new Transaction(
                    (Double) combo.get(0),
                    (TransactionType) combo.get(1),
                    (BigInteger) combo.get(2),
                    (BigInteger) combo.get(3),
                    (UserType) combo.get(4),
                    (LocalDateTime) combo.get(5)
            );
            transactions.add(transaction);
        }
        return transactions;
    }
}
