package eternal.blue.db.matters;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.DurationDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.DurationSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

public class Show {
    @Id
    private BigInteger id;
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonFormat(pattern = "HH:mm:ss")
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime time;

    @JsonSerialize(using = DurationSerializer.class)
    @JsonFormat(pattern = "h")
    @JsonDeserialize(using = DurationDeserializer.class)
    private Duration duration;
    private int balconyTicketCount;
    private int regularTicketCount;
    private double balconyTicketPrice;
    private double regularTicketPrice;
    private String name;

    public Show(LocalDate date,
                LocalTime time,
                Duration duration,
                int balconyTicketCount,
                int regularTicketCount,
                double balconyTicketPrice,
                double regularTicketPrice,
                String name) {
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.balconyTicketCount = balconyTicketCount;
        this.regularTicketCount = regularTicketCount;
        this.balconyTicketPrice = balconyTicketPrice;
        this.regularTicketPrice = regularTicketPrice;
        this.name = name;
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
                ", name=" + name +
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

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
