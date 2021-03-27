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

### DELETE - /tickets/{id}

Deletes a particular ticket

- Take the id of a ticket that has been pre-populated
- Pass the id as param and perform the request
- Deserialize the response JSON to get DeleteResult
- Check isDeleted() to be *true* and refundAmount() to be *price - 5*.
- Call GET /tickets to get all the tickets.
- Check that the deleted ticket is not present in the list

### GET - /tickets/by_user/{id}

Gets all tickets of a user

- Take the id of the User object whose tickets have been pre-populated
- Pass the id as params and perform the request
- Deserialize the response JSON to get the list of Tickets
- Check that this is same as the orignal list of Tickets


### GET - /tickets/by_show/{id}

Gets all tickets of a show

- Take the id of the Show object whose tickets have been pre-populated
- Pass the id as params and perform the request
- Deserialize the response JSON to get the list of Tickets
- Check that this is same as the orignal list of Tickets