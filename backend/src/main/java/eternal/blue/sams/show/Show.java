package eternal.blue.sams.show;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

/**
 * This class represents a single Show instance.
 * It is "immutable" in the sense that it only holds information about the show.
 * It does not contain sales information.
 */
public class Show {
    @Id
    private BigInteger id;
    private LocalDate date;
    private LocalTime time;
    private Duration duration;
    private int balconyTicketCount;
    private int regularTicketCount;
    private double balconyTicketPrice;
    private double regularTicketPrice;

    public Show(LocalDate date,
                LocalTime time,
                Duration duration,
                int balconyTicketCount,
                int regularTicketCount,
                double balconyTicketPrice,
                double regularTicketPrice) {
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.balconyTicketCount = balconyTicketCount;
        this.regularTicketCount = regularTicketCount;
        this.balconyTicketPrice = balconyTicketPrice;
        this.regularTicketPrice = regularTicketPrice;
    }

    public Show() {
    }

    @Override
    public String toString() {
        return "Show{" +
                "id=" + id +
                ", date=" + date +
                ", time=" + time +
                ", duration=" + duration +
                ", balconyTicketCount=" + balconyTicketCount +
                ", regularTicketCount=" + regularTicketCount +
                ", balconyTicketPrice=" + balconyTicketPrice +
                ", regularTicketPrice=" + regularTicketPrice +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Show show = (Show) o;
        return Objects.equals(date, show.date) && Objects.equals(time, show.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, time);
    }

    public BigInteger getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public int getBalconyTicketCount() {
        return balconyTicketCount;
    }

    public void setBalconyTicketCount(int balconyTicketCount) {
        this.balconyTicketCount = balconyTicketCount;
    }

    public int getRegularTicketCount() {
        return regularTicketCount;
    }

    public void setRegularTicketCount(int regularTicketCount) {
        this.regularTicketCount = regularTicketCount;
    }

    public double getBalconyTicketPrice() {
        return balconyTicketPrice;
    }

    public void setBalconyTicketPrice(double balconyTicketPrice) {
        this.balconyTicketPrice = balconyTicketPrice;
    }

    public double getRegularTicketPrice() {
        return regularTicketPrice;
    }

    public void setRegularTicketPrice(double regularTicketPrice) {
        this.regularTicketPrice = regularTicketPrice;
    }
}
