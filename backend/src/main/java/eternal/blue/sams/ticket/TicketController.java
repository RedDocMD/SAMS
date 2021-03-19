package eternal.blue.sams.ticket;

import eternal.blue.sams.SamsApplication;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

/**
 * The controller for Tickets.
 */
@CrossOrigin(SamsApplication.apiConsumerAddress)
@RestController
@RequestMapping("/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("")
    public List<Ticket> all() {
        return ticketService.getAllTickets();
    }

    @PostMapping("")
    public Ticket create(@RequestBody TicketCreation ticketCreation) {
        return ticketService.createTicket(ticketCreation.getTicket(), ticketCreation.getSalespersonId()).orElse(null);
    }

    @GetMapping("/{id:\\d+}")
    public Ticket one(@PathVariable BigInteger id) {
        return ticketService.getTicket(id).orElse(null);
    }

    @DeleteMapping("/{id:\\d+}")
    public TicketService.DeleteResult deleteTicket(@PathVariable BigInteger id) {
        return ticketService.deleteTicket(id);
    }

    @GetMapping("/by_show/{id:\\d+}")
    public List<Ticket> byShow(@PathVariable("id") BigInteger showId) {
        return ticketService.getAllTicketsOfShow(showId);
    }

    @GetMapping("/by_user/{id:\\d+}")
    public List<Ticket> byUser(@PathVariable("id") BigInteger userId) {
        return ticketService.getAllTicketsOfUser(userId);
    }

    public static class TicketCreation {
        private Ticket ticket;
        private BigInteger salespersonId;

        public TicketCreation() {
        }

        public Ticket getTicket() {
            return ticket;
        }

        public void setTicket(Ticket ticket) {
            this.ticket = ticket;
        }

        public BigInteger getSalespersonId() {
            return salespersonId;
        }

        public void setSalespersonId(BigInteger salespersonId) {
            this.salespersonId = salespersonId;
        }
    }
}
