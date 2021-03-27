package eternal.blue.sams.ticket;

import com.google.gson.Gson;
import eternal.blue.sams.BaseIntegrationTest;
import eternal.blue.sams.show.Show;
import eternal.blue.sams.show.ShowRepository;
import eternal.blue.sams.transaction.TransactionRepository;
import eternal.blue.sams.user.User;
import eternal.blue.sams.user.UserRepository;
import eternal.blue.sams.user.UserType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class TicketIntegrationTest extends BaseIntegrationTest {
    private final Gson gson = new Gson();
    private final List<Ticket> tickets = new ArrayList<>();
    @Autowired
    private TicketService ticketService;
    @Autowired
    private ShowRepository showRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    private Show show;
    private User customer;
    private User salesperson;

    @BeforeEach
    public void setup() {
        ticketService.deleteAll();
        showRepository.deleteAll();
        userRepository.deleteAll();
        transactionRepository.deleteAll();

        // Create a show
        var currDate = LocalDate.now();
        show = showRepository.save(new Show(
                currDate.plus(Period.ofDays(10)),
                LocalTime.of(17, 0),
                Duration.ofHours(2),
                100,
                500,
                1000,
                450));

        // Create customer and salesperson
        customer = userRepository.save(
                new User("linus", "gnu", UserType.Customer));
        salesperson = userRepository.save(
                new User("bill", "gates", UserType.Salesperson));

        // Create some tickets to begin with
        tickets.clear();
        tickets.add(
                ticketService.createTicket(
                        new Ticket(
                                show.getId(),
                                TicketType.Regular,
                                show.getRegularTicketPrice(),
                                customer.getId()),
                        salesperson.getId()
                ).get());
        tickets.add(
                ticketService.createTicket(
                        new Ticket(
                                show.getId(),
                                TicketType.Regular,
                                show.getRegularTicketPrice(),
                                customer.getId()),
                        salesperson.getId()
                ).get());
        tickets.add(
                ticketService.createTicket(
                        new Ticket(
                                show.getId(),
                                TicketType.Balcony,
                                show.getBalconyTicketPrice(),
                                customer.getId()),
                        salesperson.getId()
                ).get());
    }

    @AfterEach
    public void tearDown() {
        ticketService.deleteAll();
        showRepository.deleteAll();
        userRepository.deleteAll();
        transactionRepository.deleteAll();
    }
}
