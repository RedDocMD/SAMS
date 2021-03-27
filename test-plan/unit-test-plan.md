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



## Expenditure

### Create Expenditure With Valid ShowId

Tests the method `createExpenditure`.

Test Data:
1. Expenditure testobject: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404

2. AccountantId: 30014

Successful creation: 
- Create an Expenditure object.
- Save it using `createExpenditure`.
- The returned Expenditure object **must not** be null.
- The returned object must match the attributes of test object.

### Get All Expenditure

Tests `getAllExpenditures` method.

Test Data:
1. Expenditure testobject1: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404
2. Expenditure testobject2: 
    - amount: 1250
    - reason: "Software Developer Payment"
    - showId: 404
2. AccountantId: 30014

Creation:
- Create two Expenditure objects using test data and `createExpenditure` function and save it.

Successful Retrieval:
- `getAllExpenditures` must return a **non-empty** List of Expenditure of size 2.
- The returned list must contain two Expenditure objects which should match test data.

### Get Expenditure By Id

Tests the method `getExpenditure`.

Test Data:
1. Expenditure testobject: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404
    - id: 10

2. Get with id:
    - 10 (Valid)
    - 11 (Invalid)

Creation: 
- Create an Expenditure object using test data and save it with the help of `createExpenditure` function.

Successful Retrieval with valid id:
- On calling `getExpenditure` with id 10, it should return an Optional of Expenditure.
- The returned Optional **must not** be empty.
- Expenditure object is extracted from returned Optional. The attributes of the extracted object must match the testobject.

Unsuccessful Retrieval with invalid id:
- On calling `getExpenditure` with id 11, it should return an Optional of Expenditure.
- The returned Optional **must** be empty


### Get Expenditure By Show Id

Tests the method `getExpenditureByShow`.

Test Data:
1. Expenditure testobject1: 
    - amount: 212.50
    - reason: "Electricity Bill"
    - showId: 404
2. Expenditure testobject2: 
    - amount: 1250
    - reason: "Software Developer Payment"
    - showId: 404

3. Get with showId:
    - 404 (Valid)
    - 101 (Invalid)

Creation: 
- Create an Expenditure object using test data and save it with the help of `createExpenditure` function.

Successful Retrieval with valid showId:
- On calling `getExpenditureByShow` with showId 404, it should return a List of Expenditure.
- The returned List **must not** be empty and should have size 2.
- The attributes of each of the objects inside the List must match the testobject1 and testobject2.

Unsuccessful Retrieval with invalid showId:
- On calling `getExpenditureByShow` with showId 101, it should return a List of Expenditure.
- The returned List **must** be empty.


