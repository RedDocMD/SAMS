# API Test Plan for SAMS

## Ticket

### GET - /tickets

Get all the tickets.

- The database is pre-populated with some ticket instances.
- The request is performed
- The response status must be 200
- The tickets are deserialized from the response JSON.
- The obtained list and the original list is compared to be same.

### POST - /tickets

Create a new ticket.

- A new Ticket object is created
- Combined with salesperson ID, a TicketCreation object is created
- Using the above object, the request is performed
- The response status must be 200
- The created ticket is deserialized from the response JSON
- The obtained ticket is compared to be same as the original ticket

### GET - /tickets/{id}

Gets a particular ticket

- Take the id of a ticket that has been pre-populated
- Pass the id as param and perform the request
- Deserialize the Ticket from the response JSON
- Compare the ticket obtained to be same as the original ticket