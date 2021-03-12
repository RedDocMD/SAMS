package eternal.blue.sams.user;

import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

/**
 * This class is used to defined routes related to User.
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<User> all() {
        return userService.getAllUsers();
    }

    @GetMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return userService.getUser(username, password).orElse(null);
    }

    @GetMapping("/{id:\\d+}")
    public User getOne(@PathVariable BigInteger id) {
        return userService.getUser(id).orElse(null);
    }

    @PostMapping("")
    public User create(@RequestBody User user) {
        return userService.createUser(user).orElse(null);
    }

    @DeleteMapping("/{id:\\d+}")
    public boolean delete(@PathVariable BigInteger id) {
        return userService.deleteUser(id);
    }
}
