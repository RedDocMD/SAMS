package eternal.blue.db.matters;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.util.Objects;

public class User {
    @Id
    private BigInteger id;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", type=" + type +
                '}';
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

    public BigInteger getId() {
        return id;
    }
}
