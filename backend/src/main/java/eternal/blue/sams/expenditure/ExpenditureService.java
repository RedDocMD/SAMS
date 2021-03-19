package eternal.blue.sams.expenditure;

import eternal.blue.sams.transaction.TransactionService;
import eternal.blue.sams.transaction.TransactionType;
import eternal.blue.sams.user.UserType;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

/**
 * The service layer for Expenditure.
 */
@Service
public class ExpenditureService {
    private final ExpenditureRepository expenditureRepository;
    private final TransactionService transactionService;

    public ExpenditureService(ExpenditureRepository expenditureRepository, TransactionService transactionService) {
        this.expenditureRepository = expenditureRepository;
        this.transactionService = transactionService;
    }

    public List<Expenditure> getAllExpenditures() {
        return expenditureRepository.findAll();
    }

    public Expenditure createExpenditure(Expenditure expenditure, BigInteger accountantId) {
        transactionService.createTransaction(
                expenditure.getAmount(), TransactionType.Debit,
                accountantId, UserType.Accountant,
                expenditure.getShowId());
        return expenditureRepository.save(expenditure);
    }

    public Optional<Expenditure> getExpenditure(BigInteger id) {
        return expenditureRepository.findById(id);
    }

    public List<Expenditure> getExpendituresByShow(BigInteger showId) {
        return expenditureRepository.findExpenditureByShowId(showId);
    }
}
