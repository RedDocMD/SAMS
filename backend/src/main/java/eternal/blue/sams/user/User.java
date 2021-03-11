package eternal.blue.sams.user;

import org.springframework.data.annotation.Id;

import java.util.Objects;

/**
 * This class represents a user of SAMS.
 * A user can be of four types - Manager, Customer, Salesperson or Accountant.
 */
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private UserType type;

    public User(String username, String password, UserType type) {
        this.username = username;
        this.password = password;
        this.type = type;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

    public String getId() {
        return id;
    }
}
