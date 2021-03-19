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

    public Optional<Ticket> getTicket(BigInteger id) {
        return ticketRepository.findById(id);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getAllTicketsOfShow(BigInteger showId) {
        return ticketRepository.findByShowId(showId);
    }

    public List<Ticket> getAllTicketsOfUser(BigInteger userId) {
        return ticketRepository.findByUserId(userId);
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

    public DeleteResult deleteTicket(BigInteger id) {
        var ticketOpt = getTicket(id);
        if (ticketOpt.isEmpty())
            return new DeleteResult(0, false);
        var ticket = ticketOpt.get();
        var showOpt = showService.getShow(ticket.getShowId());
        if (showOpt.isEmpty())
            return new DeleteResult(0, false);
        var show = showOpt.get();

        // Check if show is over or not
        var currDateTime = LocalDateTime.now();
        var showDateTime = LocalDateTime.of(show.getDate(), show.getTime());
        if (!currDateTime.isBefore(showDateTime))
            return new DeleteResult(0, false);

        // Calculate days left
        var dayDiff = showDateTime.getDayOfYear() - currDateTime.getDayOfYear();
        var type = ticket.getType();
        var price = ticket.getPrice();
        double deductionAmount;
        if (dayDiff >= 3) deductionAmount = 5;
        else if (dayDiff >= 1) {
            if (type == TicketType.Regular) deductionAmount = 10;
            else deductionAmount = 15;
        } else deductionAmount = 0.5 * price;
        deductionAmount = Math.min(deductionAmount, price); // For absurdly cheap tickets

        // Do refund
        var refundAmount = price - deductionAmount;
        transactionService.createTransaction(refundAmount, ticket.getUserId(), UserType.Customer, ticket.getShowId());

        // Delete ticket
        ticketRepository.deleteById(id);
        return new DeleteResult(refundAmount, true);
    }

    public static class DeleteResult {
        private double refundAmount;
        private boolean isDeleted;

        public DeleteResult(double refundAmount, boolean isDeleted) {
            this.refundAmount = refundAmount;
            this.isDeleted = isDeleted;
        }

        public double getRefundAmount() {
            return refundAmount;
        }

        public void setRefundAmount(double refundAmount) {
            this.refundAmount = refundAmount;
        }

        public boolean isDeleted() {
            return isDeleted;
        }

        public void setDeleted(boolean deleted) {
            isDeleted = deleted;
        }
    }
}
