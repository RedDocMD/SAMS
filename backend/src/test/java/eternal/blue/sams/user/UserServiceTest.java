package eternal.blue.sams.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class UserServiceTest {
    private static final User USER = new User("John", "Password", UserType.Customer);
    private static final User USER2 = new User("aaditya", "pass", UserType.Manager);

    UserService userService;
    @Mock UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    public void createUserWhenUserNotPresent() {
        when(userRepository.findByUsername("John")).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(USER);
        Optional<User> user = userService.createUser(USER);
        assertThat(user).isPresent();
        assertThat(user.get()).isEqualTo(USER);
    }

    @Test
    public void createUserWhenUserPresent() {
        when(userRepository.findByUsername("John")).thenReturn(Optional.of(USER));
        Optional<User> user = userService.createUser(USER);
        assertThat(user).isEmpty();
    }

    @Test
    public void getUserAll() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(USER, USER2));
        List<User> users = userService.getAllUsers();
        assertThat(users.size()).isEqualTo(2);
    }

    @Test
    public void getUserById() {
        when(userRepository.findById(null)).thenReturn(Optional.of(USER));
        when(userRepository.findByUsername("John")).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(USER);
        Optional<User> userResponse = userService.createUser(USER);
        Optional<User> userRequest = userService.getUser(USER.getId());
        assertThat(userRequest).isEqualTo(userResponse);
    }

    @Test
    public void deleteUser() {
        when(userRepository.findById(null)).thenReturn(Optional.of(USER));
        when(userRepository.findByUsername("John")).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(USER);
        Optional<User> userResponse = userService.createUser(USER);
        userService.deleteUser(USER.getId());
        verify(userRepository).deleteById(any());
    }
}
