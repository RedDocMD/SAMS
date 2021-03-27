# Unit Test Plan for SAMS

This document contains the test plan for unit testing the backend of SAMS (which runs on Spring Boot). We would be using JUnit5 and Spring Boot Test Runner for writing the unit tests. The unit tests are organized by the data models and test all the public functions of the Service Layer.

## Show

### Create Show

Tests the `createShow` method.

Test Data:
1. Show Object:
    - date: 2021-01-01 (yyyy-mm-dd)
    - time: 10:49:00 (hh:mm:ss)
    - duration: 125 (minutes)
    - balconyTicketCount: 5
    - regularTicketCount: 5
    - balconyTicketPrice: 100.0
    - regularTicketPrice: 50.0

Successful creation:
- Create a Show object with given test data.
- Save it using `createShow` function.
- An `Optional` is returned.
- The returned `Optional` **must not** be empty.
- The Show object is extracted. Its attributes **must** match with that of testdata.

### Get Show By Id

Tests the `getShow` method.

Test Data:
1. Show Object:
    - date: 2021-01-01 (yyyy-mm-dd)
    - time: 10:49:00 (hh:mm:ss)
    - duration: 125 (minutes)
    - balconyTicketCount: 5
    - regularTicketCount: 5
    - balconyTicketPrice: 100.0
    - regularTicketPrice: 50.0

Successful Retrieval:
- Create a Show object with given test data.
- Save it using `createShow` function.
- The test method is called with the auto-generated id of the created object.
- On calling `getShow` method, an `Optional` is returned.
- The returned `Optional` **must not** be empty.
- The Show object is extracted. Its attributes **must** match with that of testdata.


### Get All Shows

Tests the `getAll` method.

Test Data:
1. Show Object1:
    - date: 2021-01-01 (yyyy-mm-dd)
    - time: 10:49:00 (hh:mm:ss)
    - duration: 125 (minutes)
    - balconyTicketCount: 5
    - regularTicketCount: 5
    - balconyTicketPrice: 100.0
    - regularTicketPrice: 50.0

2. Show Object2:
    - date: 2021-01-02 (yyyy-mm-dd)
    - time: 07:49:00 (hh:mm:ss)
    - duration: 150 (minutes)
    - balconyTicketCount: 5
    - regularTicketCount: 5
    - balconyTicketPrice: 100.0
    - regularTicketPrice: 50.0

Successful Retrieval:
- Create two show objects with given test data.
- Save them using `createShow` function.
- On calling `getAll` method, a List of Show is returned.
- The returned List **must not** be empty and its size must be equal to 2.


## User

### Create User When User is Not Present

Tests the `createUser` method.

Test Data:
1. User Object:
    - username: John
    - password: Password
    - type: Customer

Successful creation:
- Create a User object with given test data when already a user with **same username** is present in database.
- Save it using `createUser` method.
- An `Optional` is returned.
- The returned `Optional` **must not** be empty.
- The extracted User from the `Optional` must have the same attributes as that of test data. 

### Create User When User is Present

Tests the `createUser` method.

Test Data:
1. User Object:
    - username: "John"
    - password: "Password"
    - type: Customer

Unsuccessful creation:
- Create a User object with given test data when already a user with **same username** is present in database.
- Try to save it using `createUser` method.
- An `Optional` is returned.
- The returned `Optional` **must** be empty.

### Get All Users

Tests the `getAllUsers` method.

Test Data:
1. User Object1:
    - username: "John"
    - password: "Password"
    - type: Customer

2. User Object2:
    - username: "aaditya"
    - password: "pass"
    - type: Manager

Successful Retrieval:
- Create two User objects with given test data.
- Save it using `createUser` method.
- On calling `getAllUsers`, a List of User is returned.
- The returned List **must** be of size 2. 


### Get User By Id

Tests the `getUser` method.

Test Data:
1. User Object:
    - username: "John"
    - password: "Password"
    - type: Customer

Successful Retrieval:
- Create a User object with given test data.
- Save it using `createUser` method.
- An `Optional` is returned during creation of object.
- On calling `getUser` with the id of created object, an `Optional` is returned.
- The returned `Optional` **must not** be empty. 
- The extracted User from the `Optional` must have the same attributes as that of test data or it should match with the created object. 

### Delete User

Tests the `deleteUser` method.

Test Data:
1. User Object:
    - username: "John"
    - password: "Password"
    - type: Customer

Successful Deletion:
- Create a User object with given test data.
- Save it using `createUser` method.
- An `Optional` is returned during creation of object.
- On calling `deleteUser` with the id of created object, a boolean value is returned.
- The returned value **must** be `true`. 



