package eternal.blue.sams.expenditure;

import com.google.gson.Gson;
import eternal.blue.sams.transaction.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class ExpenditureServiceTest {
    private final BigInteger testShowId = BigInteger.valueOf(404);
    private final BigInteger testAccountantId = BigInteger.valueOf(30014);
    private final Expenditure testExpenditure = new Expenditure(212.50,"Electricity Bill",testShowId);
    private final Expenditure testExpenditure2 = new Expenditure(1250,"Software Developer Payment",testShowId);

    ExpenditureService expenditureService;
    @Mock ExpenditureRepository expenditureRepository;
    @Mock TransactionService transactionService;

    @BeforeEach
    public void setup(){
        openMocks(this);
        expenditureService = new ExpenditureService(expenditureRepository,transactionService);
    }

    @Test
    public void createNewExpenditure(){
        when(expenditureRepository.save(any())).thenReturn(testExpenditure);

        Expenditure createdExpenditure = expenditureService.createExpenditure(testExpenditure,testAccountantId);
        assertThat(createdExpenditure).isNotNull();
        assertThat(createdExpenditure).usingRecursiveComparison()
                .ignoringFields("id").isEqualTo(testExpenditure);
    }

    @Test
    public void getAllExpenditures(){
        when(expenditureService.getAllExpenditures()).thenReturn(List.of(testExpenditure,testExpenditure2));

        List<Expenditure> allExpenditures = expenditureService.getAllExpenditures();
        assertThat(allExpenditures.size()).isEqualTo(2);
        assertThat(allExpenditures).isEqualTo(List.of(testExpenditure,testExpenditure2));
    }

    @Test
    public void getExpenditureById(){
        BigInteger testId = BigInteger.valueOf(10);
        when(expenditureService.getExpenditure(testId)).thenReturn(Optional.of(testExpenditure));

        Optional<Expenditure> retrievedExpenditure = expenditureService.getExpenditure(testId);
        assertThat(retrievedExpenditure).isPresent();
        assertThat(retrievedExpenditure.get()).usingRecursiveComparison()
                .isEqualTo(testExpenditure);
    }

    @Test
    public void getExpenditureByShow(){
        when(expenditureService.getExpendituresByShow(testShowId)).thenReturn(List.of(testExpenditure,testExpenditure2));
        when(expenditureRepository.save(any())).thenReturn(testExpenditure);

        List<Expenditure> retrievedExpenditureList = expenditureService.getExpendituresByShow(testShowId);
        assertThat(retrievedExpenditureList.size()).isEqualTo(2);
        assertThat(retrievedExpenditureList).usingRecursiveComparison().isEqualTo(List.of(testExpenditure,testExpenditure2));
    }


}
