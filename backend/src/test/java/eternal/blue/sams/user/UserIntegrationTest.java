package eternal.blue.sams.user;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.math.BigInteger;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserIntegrationTest extends BaseTest {

    Gson gson = new Gson();
    @Autowired
    private UserService userService;

    @BeforeEach
    public void setup() {
        userService.deleteAll();
    }

    @Test
    public void createUser_validParams_success() throws Exception {
        User userRequest = getUserRequest();
        User userResponse = makePostCall(userRequest);
        assertThat(userResponse).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(userRequest);
    }

    @Test
    public void getUserById_validParams_success() throws Exception {
        User userRequest = makePostCall(getUserRequest());
        User userResponse = makeGetCall(userRequest.getId());
        assertThat(userResponse).usingRecursiveComparison()
                .isEqualTo(userRequest);

    }

    @Test
    public void getUserByLogin_validParams_success() throws Exception {
        User userRequest = makePostCall(getUserRequest());
        User userResponse = makeGetCall(userRequest.getUsername(), userRequest.getPassword());
        assertThat(userResponse).usingRecursiveComparison()
                .isEqualTo(userRequest);
    }

    @Test
    public void getUserAll_validParams_success() throws Exception {
        User userRequest_1 = makePostCall(new User("aaditya", "pass", UserType.Accountant));
        User userRequest_2 = makePostCall(new User("deep", "pass", UserType.Manager));
        User userRequest_3 = makePostCall(new User("bob", "pass", UserType.Customer));
        List<User> userResponse = makeGetCall();
        assertThat(userResponse.size()).isEqualTo(3);
    }

    private User makePostCall(User user) throws Exception {
        String userResponseJson = mvc.perform(
                post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(user)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, User.class);
    }

    private User makeGetCall(BigInteger userId) throws Exception {
        String userResponseJson = mvc.perform(
                get("/users/{id}", userId)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, User.class);
    }

    private User makeGetCall(String username, String password) throws Exception {
        String userResponseJson = mvc.perform(
                get("/users/login")
                        .param("username", username)
                        .param("password", password)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, User.class);
    }

    private List<User> makeGetCall() throws Exception {
        String userResponseJson = mvc.perform(
                get("/users")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        return gson.fromJson(userResponseJson, new TypeToken<List<User>>(){}.getType());
    }

    private User getUserRequest() {
        return new User("aaditya", "pass", UserType.Accountant);
    }

}
