package eternal.blue.sams.ticket;

import eternal.blue.sams.show.ShowService;
import eternal.blue.sams.transaction.TransactionService;
import eternal.blue.sams.user.UserType;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * This service class defines all the business logic of ticket creation and ticket deletion.
 * As well as has methods for ticket retrieval.
 */
@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TransactionService transactionService;
    private final ShowService showService;

    public TicketService(TicketRepository ticketRepository, TransactionService transactionService, ShowService showService) {
        this.ticketRepository = ticketRepository;
        this.transactionService = transactionService;
        this.showService = showService;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getAllTicketsOfShow(BigInteger showId) {
        return ticketRepository.findByShowId(showId);
    }

    public Optional<Ticket> createTicket(Ticket ticket, BigInteger salespersonId) {
        var showOpt = showService.getShow(ticket.getShowId());
        if (showOpt.isEmpty())
            return Optional.empty();
        var show = showOpt.get();

        // Check if show is over or not
        var currDateTime = LocalDateTime.now();
        var showDateTime = LocalDateTime.of(show.getDate(), show.getTime());
        if (!currDateTime.isBefore(showDateTime))
            return Optional.empty();

        // Check if there are sufficient tickets
        var ticketsOfShow = getAllTicketsOfShow(ticket.getShowId());
        if (ticket.getType() == TicketType.Regular) {
            var ticketsBooked = ticketsOfShow.stream().filter(it -> it.getType() == TicketType.Regular).count();
            if (ticketsBooked >= show.getRegularTicketCount())
                return Optional.empty();
        } else {
            var ticketsBooked = ticketsOfShow.stream().filter(it -> it.getType() == TicketType.Balcony).count();
            if (ticketsBooked >= show.getBalconyTicketCount())
                return Optional.empty();
        }

        // Do transaction
        transactionService.createTransaction(ticket.getPrice(), salespersonId, UserType.Salesperson, ticket.getShowId());

        // Save ticket
        return Optional.of(ticketRepository.save(ticket));
    }
}
