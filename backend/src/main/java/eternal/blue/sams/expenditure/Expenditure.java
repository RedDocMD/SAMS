package eternal.blue.sams.expenditure;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;

public class Expenditure {
    @Id
    private BigInteger id;
    private double amount;
    private String reason;
    private BigInteger showId;

    public Expenditure(double amount, String reason, BigInteger showId) {
        this.amount = amount;
        this.reason = reason;
        this.showId = showId;
    }

    public Expenditure() {
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

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public BigInteger getShowId() {
        return showId;
    }

    public void setShowId(BigInteger showId) {
        this.showId = showId;
    }
}
