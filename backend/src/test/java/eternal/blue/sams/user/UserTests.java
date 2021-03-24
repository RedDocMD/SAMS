package eternal.blue.sams.user;

import eternal.blue.sams.TestMongoConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {TestMongoConfiguration.class})
public class UserTests {
    @Autowired
    private UserService userService;

    @BeforeEach
    public void setup() {
        userService.deleteAll();
    }

    @Test
    public void createNewUser() {
        var user = new User("bob", "the_builder", UserType.Customer);
        var newUserOpt = userService.createUser(user);
        assertTrue(newUserOpt.isPresent());
        var newUser = newUserOpt.get();
        assertEquals(newUser.getUsername(), user.getUsername());
        assertEquals(newUser.getPassword(), user.getPassword());
        assertEquals(newUser.getType(), user.getType());
    }
}
