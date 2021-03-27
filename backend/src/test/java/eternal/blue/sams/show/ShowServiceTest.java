package eternal.blue.sams.show;

import eternal.blue.sams.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

class ShowServiceTest {
    private static final Show SHOW = new Show(LocalDate.parse("2021-01-01"), LocalTime.parse("10:49:00"), Duration.ofMinutes(125) , 5, 5, 100.0, 50.0);
    private static final Show SHOW2 = new Show(LocalDate.parse("2021-01-02"), LocalTime.parse("07:49:00"), Duration.ofMinutes(150) , 5, 5, 100.0, 50.0);
    
    @Mock private ShowRepository showRepository;
    private ShowService showService;

    @BeforeEach
    void setUp() {
        openMocks(this);
        showService = new ShowService(showRepository);
    }

    @Test
    public void createShow() {
        when(showRepository.findByDate(LocalDate.parse("2021-01-01"))).thenReturn(List.of());
        when(showRepository.save(any())).thenReturn(SHOW);
        Optional<Show> show = showService.createShow(SHOW);
        assertThat(show).isPresent();
        assertThat(show.get()).isEqualTo(SHOW);
    }

    @Test
    public void getAll() {
        when(showRepository.findAll()).thenReturn(Arrays.asList(SHOW, SHOW2));
        List<Show> shows = showService.getAllShows();
        assertThat(shows.size()).isEqualTo(2);
    }

    @Test
    public void getShowById() {
        when(showRepository.findById(null)).thenReturn(Optional.of(SHOW));
        when(showRepository.findByDate(LocalDate.parse("2021-01-01"))).thenReturn(List.of());
        when(showRepository.save(any())).thenReturn(SHOW);
        Optional<Show> showResponse = showService.createShow(SHOW);
        Optional<Show> showRequest = showService.getShow(SHOW.getId());
        assertThat(showRequest).isEqualTo(showResponse);
    }
}