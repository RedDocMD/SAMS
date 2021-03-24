package eternal.blue.sams.user;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

/**
 * This is the User service layer, to allow access to database indirectly.
 * This way any controller can get access to specific User collection methods.
 */
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Returns user given password and username.
    public Optional<User> getUser(String username, String password) {
        var userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            var user = userOpt.get();
            if (user.getPassword().equals(password))
                return userOpt;
            else
                return Optional.empty();
        }
        return Optional.empty();
    }

    // Returns all users in the database.
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Returns user by id.
    public Optional<User> getUser(BigInteger id) {
        return userRepository.findById(id);
    }

    // Creates a user if one by the same name doesn't exist and returns it.
    // Returns an empty if username already exists.
    public Optional<User> createUser(User user) {
        var userOpt = userRepository.findByUsername(user.getUsername());
        if (userOpt.isPresent())
            return Optional.empty();
        return Optional.of(userRepository.save(user));
    }

    // Deletes user by id, if it exists.
    public boolean deleteUser(BigInteger id) {
        var exists = getUser(id).isPresent();
        userRepository.deleteById(id);
        return exists;
    }

    // For testing purposes
    void deleteAll() {
        userRepository.deleteAll();
    }
}
