package eternal.blue.sams.show;

import eternal.blue.sams.SamsApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

/**
 * This class is used to defined routes related to Shows.
 */
@CrossOrigin(SamsApplication.apiConsumerAddress)
@RestController
@RequestMapping("/shows")
public class ShowController {
    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<Show> all() {
        return showService.getAllShows();
    }

    @GetMapping("/{id:\\d+}")
    @ResponseStatus(HttpStatus.OK)
    public Show one(@PathVariable BigInteger id) {
        return showService.getShow(id).orElse(null);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Show create(@RequestBody Show show) {
        return showService.createShow(show).orElse(null);
    }
}
