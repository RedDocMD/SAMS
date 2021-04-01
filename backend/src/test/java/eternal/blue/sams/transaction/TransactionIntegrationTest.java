package eternal.blue.sams.transaction;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import eternal.blue.sams.BaseIntegrationTest;
import eternal.blue.sams.user.UserType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.lang.reflect.Type;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.google.common.collect.Lists.cartesianProduct;
import static com.google.common.collect.Lists.newArrayList;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;

public class TransactionIntegrationTest extends BaseIntegrationTest {
    private static final String BASE = "/transactions";
    private static final List<Transaction> transactions = new ArrayList<>();
    private final Gson gson;
    @Autowired
    private TransactionRepository transactionRepository;

    TransactionIntegrationTest() {
        var builder = new GsonBuilder();
        builder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeDeserializer());
        this.gson = builder.create();
    }

    @BeforeAll
    public static void allSetup() {
        var randGen = new Random();
        var amounts = newArrayList(500.0, 1000.0, 5000.0);
        var types = newArrayList(TransactionType.Credit, TransactionType.Debit);
        var initiatorIds = newArrayList(BigInteger.valueOf(randGen.nextLong()),
                BigInteger.valueOf(randGen.nextLong()), BigInteger.valueOf(randGen.nextLong()));
        var showIds = newArrayList(BigInteger.valueOf(randGen.nextLong()),
                BigInteger.valueOf(randGen.nextLong()), BigInteger.valueOf(randGen.nextLong()));
        var initiatorTypes = newArrayList(UserType.Customer, UserType.Salesperson, UserType.Accountant);
        var times = newArrayList(
                LocalDateTime.now(), LocalDateTime.now().plus(Period.ofYears(1)));

        var combinations = cartesianProduct(amounts, types, initiatorIds, showIds, initiatorTypes, times);
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
    }

    @BeforeEach
    public void setup() {
        transactionRepository.deleteAll();
        transactionRepository.saveAll(transactions);
    }

    @AfterEach
    public void teardown() {
        transactionRepository.deleteAll();
    }

    @Test
    public void all() throws Exception {
        var responseJSON = mvc.perform(
                get(BASE).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        var allTransactions = gson.fromJson(responseJSON, new TypeToken<List<Transaction>>() {
        }.getType());
        assertThat(allTransactions).isEqualTo(transactions);
    }

    private static class LocalDateTimeDeserializer implements JsonDeserializer<LocalDateTime> {

        @Override
        public LocalDateTime deserialize(JsonElement jsonElement,
                                         Type type,
                                         JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            return LocalDateTime.parse(jsonElement.getAsString());
        }
    }
}
