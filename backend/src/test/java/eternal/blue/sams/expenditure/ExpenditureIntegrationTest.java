package eternal.blue.sams.expenditure;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import eternal.blue.sams.BaseIntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import eternal.blue.sams.expenditure.ExpenditureController.ExpenditureCreation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigInteger;
import java.util.List;

public class ExpenditureIntegrationTest extends BaseIntegrationTest {

    private final BigInteger testShowId = BigInteger.valueOf(404);
    private final BigInteger testAccountantId = BigInteger.valueOf(30014);
    private final Expenditure testExpenditure = new Expenditure(212.50,"Electricity Bill",testShowId);
    private final Gson gson = new Gson();

    @Autowired
    private ExpenditureService expenditureService;

    @BeforeEach
    public void setup(){
        expenditureService.deleteAll();
    }

    @Test
    public void createExpenditureValidParams() throws Exception {
        ExpenditureCreation expenditureCreationRequest = getExpenditureCreationRequest(testExpenditure,testAccountantId);
        Expenditure expenditureResponse = makePostCall(expenditureCreationRequest);
        assertThat(expenditureResponse).isNotNull();
        assertThat(expenditureResponse).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(expenditureCreationRequest.getExpenditure());
    }

    @Test
    public void getExpenditureByIdValidParams() throws Exception {
        Expenditure expenditureRequest = makePostCall(getExpenditureCreationRequest(testExpenditure,testAccountantId));
        Expenditure expenditureResponse = makeGetOneCall(expenditureRequest.getId());
        assertThat(expenditureResponse).isNotNull();
        assertThat(expenditureResponse).usingRecursiveComparison()
                .isEqualTo(expenditureRequest);
    }

    @Test
    public void getExpenditureByShowIdValidParams() throws Exception {
        makePostCall(getExpenditureCreationRequest(1212.50,"AC Repairing",testShowId,testAccountantId));
        makePostCall(getExpenditureCreationRequest(1299.99,"Payment to Software Developer",testShowId,testAccountantId));
        makePostCall(getExpenditureCreationRequest(1200.00,"Payment to Artist",BigInteger.valueOf(100),testAccountantId));

        List<Expenditure> expenditureResponseList = makeGetByShowCall(testShowId);
        assertThat(expenditureResponseList.size()).isEqualTo(2);

        expenditureResponseList = makeGetByShowCall(BigInteger.valueOf(100));
        assertThat(expenditureResponseList.size()).isEqualTo(1);
    }

    @Test
    public void getAllExpenditure() throws Exception {
        makePostCall(getExpenditureCreationRequest(testExpenditure,testAccountantId));
        makePostCall(getExpenditureCreationRequest(1500.00,"AC Repairing",testShowId,testAccountantId));
        makePostCall(getExpenditureCreationRequest(1299.99,"Payment to Software Developer",testShowId,testAccountantId));
        makePostCall(getExpenditureCreationRequest(1200.00,"Payment to Artist",BigInteger.valueOf(100),testAccountantId));

        List<Expenditure> expenditureResponseList = makeGetAllCall();
        assertThat(expenditureResponseList.size()).isEqualTo(4);
    
    }

    private Expenditure makePostCall(ExpenditureCreation expenditureCreation) throws Exception {
        String userResponseJson = mvc.perform(
                post("/expenditures")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(expenditureCreation)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, Expenditure.class);
    }

    private List<Expenditure> makeGetAllCall() throws Exception {
        String userResponseJson = mvc.perform(
                get("/expenditures")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson,new TypeToken<List<Expenditure>>() {
        }.getType());
    }

    private Expenditure makeGetOneCall(BigInteger id) throws Exception {
        String userResponseJson = mvc.perform(
                get("/expenditures/{id}",id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, Expenditure.class);
    }

    private List<Expenditure> makeGetByShowCall(BigInteger showId) throws Exception {
        String userResponseJson = mvc.perform(
                get("/expenditures/by_show/{id}",showId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, new TypeToken<List<Expenditure>>() {
        }.getType());
    }

    private ExpenditureCreation getExpenditureCreationRequest(double amount,String reason,BigInteger showId,BigInteger accountantId) {
        ExpenditureCreation expenditureCreation = new ExpenditureCreation();
        Expenditure exp = new Expenditure(amount,reason,showId);
        expenditureCreation.setExpenditure(exp);
        expenditureCreation.setAccountantId(accountantId);
        return expenditureCreation;
    }

    private ExpenditureCreation getExpenditureCreationRequest(Expenditure exp,BigInteger accountantId) {
        ExpenditureCreation expenditureCreation = new ExpenditureCreation();
        expenditureCreation.setExpenditure(exp);
        expenditureCreation.setAccountantId(accountantId);
        return expenditureCreation;
    }

}
