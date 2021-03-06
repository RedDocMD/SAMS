package eternal.blue.sams.ticket;

import eternal.blue.sams.show.Show;
import eternal.blue.sams.show.ShowService;
import eternal.blue.sams.transaction.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class TicketServiceTest {
    private TicketService ticketService;
    @Mock
    private TicketRepository ticketRepository;
    @Mock
    private ShowService showService;
    @Mock
    private TransactionService transactionService;

    @BeforeEach
    public void setup() {
        openMocks(this);
        ticketService = new TicketService(ticketRepository, transactionService, showService);
    }

    @Test
    public void createRegularTicketWithValidShowHavingSufficientSeatsInTime() {
        var show = new Show(
                LocalDate.of(2021, 10, 20),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findByShowId(showId)).thenReturn(new ArrayList<>());
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isPresent();
        assertThat(returnedTicket.get()).isEqualTo(ticket);
    }

    @Test
    public void createBalconyTicketWithValidShowHavingSufficientSeatsInTime() {
        var show = new Show(
                LocalDate.of(2021, 10, 20),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Balcony, show.getBalconyTicketPrice(), userId);

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findByShowId(showId)).thenReturn(new ArrayList<>());
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isPresent();
        assertThat(returnedTicket.get()).isEqualTo(ticket);
    }

    @Test
    public void createTicketWithInvalidShow() {
        var show = new Show(
                LocalDate.of(2021, 10, 20),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(11);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Balcony, show.getBalconyTicketPrice(), userId);
        var actualShowId = BigInteger.valueOf(10);

        when(showService.getShow(actualShowId)).thenReturn(Optional.of(show));
        when(ticketRepository.findByShowId(actualShowId)).thenReturn(new ArrayList<>());
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isEmpty();
    }

    @Test
    public void createRegularTicketWithValidShowAndInsufficientTickets() {
        var show = new Show(
                LocalDate.of(2021, 10, 20),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        var oldTickets = new ArrayList<Ticket>();
        var randGen = new Random();
        for (int i = 0; i < show.getRegularTicketCount(); i++) {
            var otherUserId = BigInteger.valueOf(randGen.nextLong());
            var oldTicket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), otherUserId);
            oldTickets.add(oldTicket);
        }
        when(ticketRepository.findByShowId(showId)).thenReturn(oldTickets);
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isEmpty();
    }

    @Test
    public void createBalconyTicketWithValidShowAndInsufficientTickets() {
        var show = new Show(
                LocalDate.of(2021, 10, 20),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Balcony, show.getBalconyTicketPrice(), userId);

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        var oldTickets = new ArrayList<Ticket>();
        var randGen = new Random();
        for (int i = 0; i < show.getBalconyTicketCount(); i++) {
            var otherUserId = BigInteger.valueOf(randGen.nextLong());
            var oldTicket = new Ticket(showId, TicketType.Balcony, show.getBalconyTicketPrice(), otherUserId);
            oldTickets.add(oldTicket);
        }
        when(ticketRepository.findByShowId(showId)).thenReturn(oldTickets);
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isEmpty();
    }

    @Test
    public void createTicketWithValidShowHavingSufficientSeatsAfterTime() {
        var show = new Show(
                LocalDate.now(),
                LocalTime.now(),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var salespersonId = BigInteger.valueOf(1000);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findByShowId(showId)).thenReturn(new ArrayList<>());
        when(ticketRepository.save(any())).thenReturn(ticket);

        var returnedTicket = ticketService.createTicket(ticket, salespersonId);
        assertThat(returnedTicket).isEmpty();
    }

    @Test
    public void deleteValidTicketOfValidShowBeforeThreeDays() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay.plus(Period.ofDays(10)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.getRefundAmount()).isEqualTo(show.getRegularTicketPrice() - 5);
        assertThat(result.isDeleted()).isTrue();
    }

    @Test
    public void deleteValidRegularTicketOfValidShowAfterThreeDaysBeforeOneDay() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay.plus(Period.ofDays(2)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.getRefundAmount()).isEqualTo(show.getRegularTicketPrice() - 10);
        assertThat(result.isDeleted()).isTrue();
    }

    @Test
    public void deleteValidBalconyTicketOfValidShowAfterThreeDaysBeforeOneDay() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay.plus(Period.ofDays(2)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Balcony, show.getBalconyTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.getRefundAmount()).isEqualTo(show.getBalconyTicketPrice() - 15);
        assertThat(result.isDeleted()).isTrue();
    }

    @Test
    public void deleteValidTicketOfValidShowOnDayOfShow() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay,
                LocalTime.of(23, 59),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.getRefundAmount()).isEqualTo(show.getRegularTicketPrice() / 2.0);
        assertThat(result.isDeleted()).isTrue();
    }

    @Test
    public void deleteInvalidTicket() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay.plus(Period.ofDays(10)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var wrongTicketId = ticketId.subtract(BigInteger.ONE);
        var result = ticketService.deleteTicket(wrongTicketId);
        assertThat(result.isDeleted()).isFalse();
    }

    @Test
    public void deleteInvalidTicketWithInvalidShow() {
        var currDay = LocalDate.now();
        var show = new Show(
                currDay.plus(Period.ofDays(10)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var wrongShowId = BigInteger.valueOf(13);
        var ticket = new Ticket(wrongShowId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.isDeleted()).isFalse();
    }

    @Test
    public void deleteValidTicketAfterShowStarts() {
        var show = new Show(
                LocalDate.now(),
                LocalTime.now(),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450,"Kimi no Na wa");
        var showId = BigInteger.valueOf(10);
        var userId = BigInteger.valueOf(100);
        var ticket = new Ticket(showId, TicketType.Regular, show.getRegularTicketPrice(), userId);
        var randGen = new Random();
        var ticketId = BigInteger.valueOf(randGen.nextLong());

        when(showService.getShow(showId)).thenReturn(Optional.of(show));
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket));

        var result = ticketService.deleteTicket(ticketId);
        assertThat(result.isDeleted()).isFalse();
    }

    @Test
    public void getAllTickets() {
        var ticketList = new ArrayList<Ticket>();
        var ticketCount = 100;
        var randGen = new Random();
        for (int i = 0; i < ticketCount; i++) {
            var ticket = new Ticket(BigInteger.valueOf(randGen.nextLong()),
                    TicketType.Regular, 100, BigInteger.valueOf(randGen.nextLong()));
            ticketList.add(ticket);
        }

        when(ticketRepository.findAll()).thenReturn(ticketList);
        var fromService = ticketService.getAllTickets();
        assertThat(fromService).isEqualTo(ticketList);
    }

    @Test
    public void getAllTicketsOfUser() {
        var ticketList = new ArrayList<Ticket>();
        var ticketCount = 100;
        var randGen = new Random();
        var userId = BigInteger.valueOf(randGen.nextLong());
        for (int i = 0; i < ticketCount; i++) {
            var ticket = new Ticket(BigInteger.valueOf(randGen.nextLong()),
                    TicketType.Regular, 100, userId);
            ticketList.add(ticket);
        }

        when(ticketRepository.findByUserId(userId)).thenReturn(ticketList);
        var fromService = ticketService.getAllTicketsOfUser(userId);
        assertThat(fromService).isEqualTo(ticketList);
    }
}