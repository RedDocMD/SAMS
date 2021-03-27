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