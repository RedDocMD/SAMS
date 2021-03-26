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
import java.util.ArrayList;
import java.util.Optional;

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
                450);
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
}
