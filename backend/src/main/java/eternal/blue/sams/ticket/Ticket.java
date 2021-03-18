package eternal.blue.sams.ticket;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.util.Objects;

/**
 * The model for a Ticket which has been sold.
 */
public class Ticket {
    @Id
    private BigInteger id;
    private BigInteger showId;
    private TicketType type;
    private double price;
    private BigInteger userId;

    public Ticket(BigInteger showId, TicketType type, double price, BigInteger userId) {
        this.showId = showId;
        this.type = type;
        this.price = price;
        this.userId = userId;
    }

    public Ticket() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return Objects.equals(id, ticket.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", showId=" + showId +
                ", type=" + type +
                ", price=" + price +
                ", userId=" + userId +
                '}';
    }

    public BigInteger getId() {
        return id;
    }

    public BigInteger getShowId() {
        return showId;
    }

    public void setShowId(BigInteger showId) {
        this.showId = showId;
    }

    public TicketType getType() {
        return type;
    }

    public void setType(TicketType type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }
}
