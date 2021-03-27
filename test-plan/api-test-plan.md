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
    - reason: "AC Repairing"
    - showId: 404

2. Expenditure testObject2: 
    - amount: 1500
    - reason: "AC Repairing"
    - showId: 404

3. Expenditure testObject3: 
    - amount: 1299.99
    - reason: "Payment to Software Developer"
    - showId: 404

4. Expenditure testObject4: 
    - amount: 1200
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

Tests the GET method at API endpoint: `http://localhost:8080/expenditures/{id}`

Test Data:
1. Expenditure testObject1: 
    - amount: 1212.50
    - reason: "AC Repairing"
    - showId: 404

2. Expenditure testObject2: 
    - amount: 1200
    - reason: "Payment to Artist"
    - showId: 100

3. Expenditure testObject3: 
    - amount: 1299.99
    - reason: "Payment to Software Developer"
    - showId: 404

4. AccountantId: 30014

Successful `GET`:
- 3 objects of ExpenditureCreation are created from testObjects and AccountantId and 3 `POST` calls are made.
- On `GET` call with the showId 404, a List of Expenditure is returned.
- The returned object **must not** be empty and should have size 2 as two testObjects have showId = 404.
- On `GET` call with the showId 100, another List of Expenditure is returned.
- The returned object **must not** be empty and should have size 1 as only one testObject has showId = 100.
