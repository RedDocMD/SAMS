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
import java.util.Random;

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
       var initiatorId = BigInteger.valueOf(randGen.nextLong());
       var showId = BigInteger.valueOf(randGen.nextLong());
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

    private List<Transaction> getSomeTransactions() {
        var randGen = new Random();
        var amounts = newArrayList(500.0, 1000.0, 5000.0);
        var types = newArrayList(TransactionType.Credit, TransactionType.Debit);
        var initiatorIds =  newArrayList(BigInteger.valueOf(randGen.nextLong()),
                BigInteger.valueOf(randGen.nextLong()), BigInteger.valueOf(randGen.nextLong()));
        var showIds =  newArrayList(BigInteger.valueOf(randGen.nextLong()),
                BigInteger.valueOf(randGen.nextLong()), BigInteger.valueOf(randGen.nextLong()));
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
