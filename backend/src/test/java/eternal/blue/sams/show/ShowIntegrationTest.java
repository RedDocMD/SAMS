package eternal.blue.sams.show;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import eternal.blue.sams.BaseIntegrationTest;
import eternal.blue.sams.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ShowIntegrationTest extends BaseIntegrationTest {

    private final Gson gson = new Gson();
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();



    @Autowired
    private ShowService showService;

    @BeforeEach
    public void setup(){
        showService.deleteAll();
    }

    @Test
    public void createShowValidSuccess() throws Exception {
        Show showRequest = getShowRequest();
        Show showResponse = makePostCall(showRequest);
        assertThat(showRequest).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(showResponse);
    }

    @Test
    public void getShowByIdValidParamsSuccess() throws Exception {
        Show showPostResponse = makePostCall(getShowRequest());
        Show showGetResponse = makeGetCall(showPostResponse.getId());
        assertThat(showGetResponse).usingRecursiveComparison()
                .isEqualTo(showPostResponse);
    }

    @Test
    public void getAllShowsValidParamsSuccess() throws Exception {
        makePostCall(new Show(LocalDate.parse("2021-01-01"), LocalTime.parse("10:00:00"), Duration.ofMinutes(100), 5, 5, 100.0, 50.0));
        makePostCall(new Show(LocalDate.parse("2021-01-01"), LocalTime.parse("12:00:00"), Duration.ofMinutes(100), 5, 5, 100.0, 50.0));
        makePostCall(new Show(LocalDate.parse("2021-01-01"), LocalTime.parse("14:00:00"), Duration.ofMinutes(150), 5, 5, 100.0, 50.0));
        List<Show> showListResponse = makeGetAllCall();
        assertThat(showListResponse.size()).isEqualTo(3);
    }

    private List<Show> makeGetAllCall() throws Exception {
        String showResponseJson = mvc.perform(
                get("/shows")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return OBJECT_MAPPER.readValue(showResponseJson, new TypeReference<List<Show>>() {});
    }

    private Show makeGetCall(BigInteger showId) throws Exception {
        String showResponseJson = mvc.perform(
                get("/shows/{id}", showId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return OBJECT_MAPPER.readValue(showResponseJson, Show.class);
    }

    private Show makePostCall(Show showRequest) throws Exception {

        String showResponseJson = mvc.perform(
                post("/shows")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OBJECT_MAPPER.writeValueAsString(showRequest)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse().getContentAsString();
        return OBJECT_MAPPER.readValue(showResponseJson, Show.class);
    }

    private Show getShowRequest() {
        return new Show(LocalDate.parse("2021-01-01"), LocalTime.parse("10:49:00"), Duration.ofMinutes(125) , 5, 5, 100.0, 50.0);
    }

}
