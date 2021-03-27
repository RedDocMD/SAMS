# API Test Plan for SAMS

## Expenditure

### POST an Expenditure

Tests the POST method at API endpoint: `http://localhost:8080/expenditures/`

Test Data:
1. Expenditure testObject: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404

2. AccountantId: 30014

Successful `POST`:
- An object of ExpenditureCreation is created from testObject and AccountantId and a `POST` call is made.
- A new expenditure is created and saved in the database and it returns an Expenditure object. 
- The returned object **must not** be null.
- The returned object must have the same attributes as that of given testObject.

### GET all Expenditures

Tests the GET method at API endpoint: `http://localhost:8080/expenditures/`

Test Data:

1. Expenditure testObject1: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404

2. Expenditure testObject2: 
    - amount: 1500.00
    - reason: "AC Repairing"
    - showId: 404

3. Expenditure testObject3: 
    - amount: 1299.99
    - reason: "Payment to Software Developer"
    - showId: 404

4. Expenditure testObject4: 
    - amount: 1200.00
    - reason: "Payment to Artist"
    - showId: 100

5. AccountantId: 30014

Successful `GET`:
- 4 objects of ExpenditureCreation are created from testObjects and AccountantId and 4 `POST` calls are made.
- On `GET` call, a List of Expenditure is returned. 
- The returned list **must not** be empty and should have size = 4.

### GET Expenditure by Id

Tests the GET method at API endpoint: `http://localhost:8080/expenditures/{id}`

Test Data:
1. Expenditure testObject: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404

2. AccountantId: 30014

Successful `GET`:
- An objects of ExpenditureCreation is created from testObjects and AccountantId and a `POST` call is made.
- On `GET` call with the id of the object returned from the `POST` call, another object of Expenditure is returned.
- The returned object **must not** be null.
- The objects returned from `POST` and `GET` calls must have same attributes as given in test data.

### GET Expenditure by Show Id

Tests the GET method at API endpoint: `http://localhost:8080/expenditures/by_show/{showId}`

Test Data:
1. Expenditure testObject1: 
    - amount: 1212.50
    - reason: "AC Repairing"
    - showId: 404

2. Expenditure testObject2: 
    - amount: 1299.99
    - reason: "Payment to Software Developer"
    - showId: 404

3. Expenditure testObject3: 
    - amount: 1200.00
    - reason: "Payment to Artist"
    - showId: 100


4. AccountantId: 30014

Successful `GET`:
- 3 objects of ExpenditureCreation are created from testObjects and AccountantId and 3 `POST` calls are made.
- On `GET` call with the showId 404, a List of Expenditure is returned.
- The returned object **must not** be empty and should have size 2 as two testObjects have showId = 404.
- On `GET` call with the showId 100, another List of Expenditure is returned.
- The returned object **must not** be empty and should have size 1 as only one testObject has showId = 100.

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
- Check that this is same as the original list of Tickets

## Transaction

### GET - /transactions

Get all transactions

- Pre-populate the repository with transactions
- Perform the request
- Deserialize the response JSON to get the list of Transactions
- Check that this is same as the original list of Transactions 

### GET - /transactions/{id}

Get one particular transactions

- Take the id of a transaction that has been pre-populated
- Perform the request with the id parameter
- Deserialize the JSON to get the Transaction
- Check that this is same as the original Transaction

### GET - /transactions/by_show/{id}

Get all transactions regarding a show

- Pre-populate the repository with some transactions
- Perform the request with the id of a show whose transaction is present
- Deserialize the JSON to get the list of Transactions
- Check that this is the same as the original transactions, filtered over show id

### GET - /transactions/by_salesperson/{id}

Get all transactions initiated by a salesperson

- Pre-populate the repository with some transactions
- Perform the request with the id of a salesperson who has initiated some transactions
- Deserialize the JSON to get the list of Transactions
- Check that this is the same as the original transactions, filtered over initiator id and type as Salesperson

### GET - /transactions/by_year/{year}

Get all transactions of a year

- Pre-populate the repository with some transactions
- Perform the request with a year whose transaction is present
- Deserialize the JSON to get the list of Transactions
- Check that this is the same as the original transactions, filtered over year
