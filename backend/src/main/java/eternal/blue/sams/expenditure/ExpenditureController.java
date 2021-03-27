package eternal.blue.sams.expenditure;

import eternal.blue.sams.SamsApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@CrossOrigin(SamsApplication.apiConsumerAddress)
@RestController
@RequestMapping("/expenditures")
public class ExpenditureController {
    private final ExpenditureService expenditureService;

    public ExpenditureController(ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }

    @GetMapping("")
    public List<Expenditure> all() {
        return expenditureService.getAllExpenditures();
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Expenditure create(@RequestBody ExpenditureCreation expenditureCreation) {
        return expenditureService.createExpenditure(expenditureCreation.getExpenditure(), expenditureCreation.getAccountantId());
    }

    @GetMapping("/{id:\\d+}")
    public Expenditure getOne(@PathVariable BigInteger id) {
        return expenditureService.getExpenditure(id).orElse(null);
    }

    @GetMapping("/by_show/{id:\\d+}")
    public List<Expenditure> byShow(@PathVariable("id") BigInteger showId) {
        return expenditureService.getExpendituresByShow(showId);
    }

    public static class ExpenditureCreation {
        private Expenditure expenditure;
        private BigInteger accountantId;

        public ExpenditureCreation() {
        }

        public Expenditure getExpenditure() {
            return expenditure;
        }

        public void setExpenditure(Expenditure expenditure) {
            this.expenditure = expenditure;
        }

        public BigInteger getAccountantId() {
            return accountantId;
        }

        public void setAccountantId(BigInteger accountantId) {
            this.accountantId = accountantId;
        }
    }
}
