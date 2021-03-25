package eternal.blue.sams.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class UserServiceTest {
    private static final User USER = new User("John", "Password", UserType.Customer);

    UserService userService;
    @Mock UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    public void createUser_userNotPresent_success() {
        when(userRepository.findByUsername("John")).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(USER);
        Optional<User> user = userService.createUser(USER);
        assertThat(user).isPresent();
        assertThat(user.get()).isEqualTo(USER);
    }

    @Test
    public void createUser_userPresent_returnsEmpty() {
        when(userRepository.findByUsername("John")).thenReturn(Optional.of(USER));
        Optional<User> user = userService.createUser(USER);
        assertThat(user).isEmpty();
    }
}
