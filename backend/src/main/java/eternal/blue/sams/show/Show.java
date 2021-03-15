package eternal.blue.sams.show;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

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
    private int balconySeatCount;
    private int ordinarySeatCount;
    private double balconySeatPrice;
    private double ordinarySeatPrice;

    public Show(LocalDate date,
                LocalTime time,
                Duration duration,
                int balconySeatCount,
                int ordinarySeatCount,
                double balconySeatPrice,
                double ordinarySeatPrice) {
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.balconySeatCount = balconySeatCount;
        this.ordinarySeatCount = ordinarySeatCount;
        this.balconySeatPrice = balconySeatPrice;
        this.ordinarySeatPrice = ordinarySeatPrice;
    }

    public Show() {
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

    public int getBalconySeatCount() {
        return balconySeatCount;
    }

    public void setBalconySeatCount(int balconySeatCount) {
        this.balconySeatCount = balconySeatCount;
    }

    public int getOrdinarySeatCount() {
        return ordinarySeatCount;
    }

    public void setOrdinarySeatCount(int ordinarySeatCount) {
        this.ordinarySeatCount = ordinarySeatCount;
    }

    public double getBalconySeatPrice() {
        return balconySeatPrice;
    }

    public void setBalconySeatPrice(double balconySeatPrice) {
        this.balconySeatPrice = balconySeatPrice;
    }

    public double getOrdinarySeatPrice() {
        return ordinarySeatPrice;
    }

    public void setOrdinarySeatPrice(double ordinarySeatPrice) {
        this.ordinarySeatPrice = ordinarySeatPrice;
    }
}
