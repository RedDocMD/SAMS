package eternal.blue.sams.ticket;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import eternal.blue.sams.BaseIntegrationTest;
import eternal.blue.sams.show.Show;
import eternal.blue.sams.show.ShowRepository;
import eternal.blue.sams.transaction.TransactionRepository;
import eternal.blue.sams.user.User;
import eternal.blue.sams.user.UserRepository;
import eternal.blue.sams.user.UserType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;

public class TicketIntegrationTest extends BaseIntegrationTest {
    private static final String BASE = "/tickets";
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

    @Test
    public void getAllTickets() throws Exception {
        var responseJSON = mvc.perform(
                get(BASE).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        var ticketsList = gson.fromJson(responseJSON,
                new TypeToken<List<Ticket>>() {
                }.getType());
        assertThat(ticketsList).isEqualTo(tickets);
    }

    @Test
    public void createATicket() throws Exception {
        var ticket = new Ticket(show.getId(),
                TicketType.Balcony,
                show.getBalconyTicketPrice(),
                customer.getId());
        var ticketRequest = new TicketController.TicketCreation();
        ticketRequest.setTicket(ticket);
        ticketRequest.setSalespersonId(salesperson.getId());
        var responseJSON = mvc.perform(
                post(BASE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(ticketRequest)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        var returnedTicket = gson.fromJson(responseJSON, Ticket.class);
        assertThat(returnedTicket).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(ticket);
    }

    @Test
    public void getATicket() throws Exception {
        var ticket = tickets.get(0);
        var id = ticket.getId();
        var responseJSON = mvc.perform(
                get(BASE + "/{id}", id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        var returnedTicket = gson.fromJson(responseJSON, Ticket.class);
        assertThat(returnedTicket).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(ticket);
    }
}
