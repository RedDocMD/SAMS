package eternal.blue.sams.transaction;

import eternal.blue.sams.SamsApplication;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

/**
 * Controller for accessing Transactions (it has no mutating endpoints).
 */
@CrossOrigin(SamsApplication.apiConsumerAddress)
@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("")
    public List<Transaction> all() {
        return transactionService.allTransactions();
    }

    @GetMapping("/{id:\\d+}")
    public Transaction one(@PathVariable BigInteger id) {
        return transactionService.getTransactionById(id).orElse(null);
    }

    @GetMapping("/by_show/{id:\\d+}")
    public List<Transaction> byShow(@PathVariable("id") BigInteger showId) {
        return transactionService.getTransactionsByShow(showId);
    }

    @GetMapping("/by_salesperson/{id:\\d+}")
    public List<Transaction> bySalesperson(@PathVariable("id") BigInteger salespersonId) {
        return transactionService.getTransactionsBySalesperson(salespersonId);
    }

    @GetMapping("/by_year/{year:\\d{4}}")
    public List<Transaction> byYear(@PathVariable int year) {
        return transactionService.getTransactionsByYear(year);
    }
}
