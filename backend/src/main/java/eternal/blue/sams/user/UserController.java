package eternal.blue.sams.user;

import eternal.blue.sams.SamsApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

/**
 * This class is used to defined routes related to User.
 */
@CrossOrigin(SamsApplication.apiConsumerAddress)
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<User> all() {
        return userService.getAllUsers();
    }

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public User login(@RequestParam String username, @RequestParam String password) {
        return userService.getUser(username, password).orElse(null);
    }

    @GetMapping("/{id:\\d+}")
    @ResponseStatus(HttpStatus.OK)
    public User getOne(@PathVariable BigInteger id) {
        return userService.getUser(id).orElse(null);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return userService.createUser(user).orElse(null);
    }

    @DeleteMapping("/{id:\\d+}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public boolean delete(@PathVariable BigInteger id) {
        return userService.deleteUser(id);
    }
}
