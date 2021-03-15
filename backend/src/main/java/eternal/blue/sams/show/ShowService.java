package eternal.blue.sams.show;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

/**
 * ShowService to provide indirect access to the ShowRepository
 */
@Service
public class ShowService {
    private final ShowRepository showRepository;

    public ShowService(ShowRepository showRepository) {
        this.showRepository = showRepository;
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public Optional<Show> getShow(BigInteger id) {
        return showRepository.findById(id);
    }

    // Creates a show if there doesn't exist a show clashing with it
    public Optional<Show> createShow(Show show) {
        if (!hasClashingShows(show))
            return Optional.of(showRepository.save(show));
        return Optional.empty();
    }

    private boolean hasClashingShows(Show currShow) {
        var showsOnSameDay = showRepository.findByDate(currShow.getDate());
        var currShowStart = currShow.getTime();
        var currShowEnd = currShowStart.plus(currShow.getDuration());
        for (var otherShow : showsOnSameDay) {
            var otherShowStart = otherShow.getTime();
            var otherShowEnd = otherShowStart.plus(otherShow.getDuration());
            if (otherShowStart.compareTo(currShowStart) < 0 && otherShowEnd.compareTo(currShowStart) > 0)
                return true;
            if (otherShowStart.compareTo(currShowEnd) < 0 && otherShowEnd.compareTo(currShowEnd) > 0)
                return true;
        }
        return false;
    }
}
