# Unit Test Plan for SAMS

This document contains the test plan for unit testing the backend of SAMS (which runs on Spring Boot). We would be using JUnit5 and Spring Boot Test Runner for writing the unit tests. The unit tests are organized by the data models and test all the public functions of the Service Layer.

## User

### Create user

Tests the `createUser` function.

Successful creation:

- Create a User object.
- Save it using `createUser`.
- The returned `Optional` must **not** be empty.
- The returned User is extracted. It must match with original user on `getUsername`, `getPassword` and `getType`.

## Ticket

### Create ticket

Tests the `createTicket` method.

#### Successful creation of regular ticket

- Use the following Show:
  - Date: 2021-10-20
  - Time: 1700
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Using UserID = 100, create regular `Ticket` object
- Using SalespersonID = 1000, call create ticket with above ticket object
- Check that the returned `Optional` is **not** empty.
- Check the `Ticket` extracted from `Optional` is same as created ticket.

#### Successful creation of balcony ticket

- Use the following Show:
  - Date: 2021-10-20
  - Time: 1700
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Using UserID = 100, and showId 10, create balcony `Ticket` object
- Using SalespersonID = 1000, call create ticket with above ticket object
- Check that the returned `Optional` is **not** empty.
- Check the `Ticket` extracted from `Optional` is same as created ticket.

#### Unsuccessful creation of ticket with invalid show id

- Use the following Show:
  - Date: 2021-10-20
  - Time: 1700
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Using UserID = 100, and showId 11, create balcony `Ticket` object
- Using SalespersonID = 1000, call create ticket with above ticket object
- Check that the returned `Optional` **is** empty.

#### Unsuccessful creation of regular ticket when all tickets are sold out

- Use the following Show:
  - Date: 2021-10-20
  - Time: 1700
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Save 500 regular tickets for this show.
- Using UserID = 100, and showId 10, create regular Ticket` object.
- Using SalespersonID = 1000, call create ticket with above ticket object.
- Check that the returned `Optional` **is** empty.

#### Unsuccessful creation of balcony ticket when all tickets are sold out

- Use the following Show:
  - Date: 2021-10-20
  - Time: 1700
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Save 100 balcony tickets for this show.
- Using UserID = 100, and showId 10, create regular Ticket` object.
- Using SalespersonID = 1000, call create ticket with above ticket object.
- Check that the returned `Optional` **is** empty

#### Unsuccessful creation of ticket after show has started

- Use the following Show:
  - Date: Current day
  - Time: Current time
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Save 100 balcony tickets for this show.
- Using UserID = 100, and showId 10, create regular Ticket` object.
- Using SalespersonID = 1000, call create ticket with above ticket object.
- Check that the returned `Optional` **is** empty

### Delete Ticket

Tests the `deleteTicket` method of `TicketService`.

#### Successful delete existing ticket more than 3 days before

- Use the following Show:
  - Date: Curr Date + 10 days
  - Time: 1700hrs
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Use the following Ticket:
  - Regular
  - Show ID: 10
  - Price 450
  - User ID: 100
- Call `DeleteTicket` by ticket ID.
- The returned result must have deleted field as *true* and refund amount as 450 - 5 = 445

#### Successful delete existing regular ticket less than 3 days and before 1 days

- Use the following Show:
  - Date: Curr Date + 2 days
  - Time: 1700hrs
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Use the following Ticket:
  - Regular
  - Show ID: 10
  - Price 450
  - User ID: 100
- Call `DeleteTicket` by ticket ID.
- The returned result must have deleted field as *true* and refund amount as 450 - 10 = 440

#### Successful delete existing balcony ticket less than 3 days and before 1 days

- Use the following Show:
  - Date: Curr Date + 2 days
  - Time: 1700hrs
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Use the following Ticket:
  - Balcony
  - Show ID: 10
  - Price: 1000
  - User ID: 100
- Call `DeleteTicket` by ticket ID.
- The returned result must have deleted field as *true* and refund amount as 1000 - 15 = 985

#### Successful delete existing balcony ticket on day of show

- Use the following Show:
  - Date: Curr Date
  - Time: 2359 hrs
  - Duration: 2 hr
  - Balcony Seats = 100 and price = 1000
  - Regular Seats = 500 and price = 450
  - ID: 10
- Use the following Ticket:
  - Balcony
  - Show ID: 10
  - Price: 450
  - User ID: 100
- Call `DeleteTicket` by ticket ID.
- The returned result must have deleted field as *true* and refund amount as 450 * 0.5 = 225.0
