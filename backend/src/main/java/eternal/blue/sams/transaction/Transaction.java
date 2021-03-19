package eternal.blue.sams.transaction;

import eternal.blue.sams.user.UserType;
import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Transaction represents a single monetary transaction in SAMS.
 * All forms of payments/refunds are expressed in terms of Transactions.
 */
public class Transaction {
    @Id
    private BigInteger id;
    private double amount;
    private BigInteger initiatorId;
    private BigInteger showId;
    private UserType initiatorType;
    private LocalDateTime time;
    private TransactionType type;

    public Transaction(double amount, TransactionType type, BigInteger initiatorId,
                       BigInteger showId, UserType initiatorType, LocalDateTime time) {
        this.amount = amount;
        this.initiatorId = initiatorId;
        this.showId = showId;
        this.initiatorType = initiatorType;
        this.time = time;
        this.type = type;
    }

    public Transaction() {
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", amount=" + amount +
                ", initiatorId=" + initiatorId +
                ", showId=" + showId +
                ", initiatorType=" + initiatorType +
                ", time=" + time +
                ", type=" + type +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public BigInteger getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public BigInteger getInitiatorId() {
        return initiatorId;
    }

    public void setInitiatorId(BigInteger initiatorId) {
        this.initiatorId = initiatorId;
    }

    public BigInteger getShowId() {
        return showId;
    }

    public void setShowId(BigInteger showId) {
        this.showId = showId;
    }

    public UserType getInitiatorType() {
        return initiatorType;
    }

    public void setInitiatorType(UserType initiatorType) {
        this.initiatorType = initiatorType;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
