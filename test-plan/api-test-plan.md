
# API Test Plan for SAMS

## User

Before every test is run, the database is cleared.
### POST an User
Tests the POST method at endpoint `http://localhost:8080/users/`

This accepts an user and stores it in the database.
- An instance of user is created and a `POST` call is made.
- The controller layer returns the instance back if user was successfully saved in the DataBase.
- The returned user is extracted. Their corresponding fields must match.

### GET an User by Id
Tests the GET method at endpoint `http://localhost:8080/users/{userId}`

This accepts an user id and returns the instance of user if it exists.
- An instance of user is created and a `POST` call is made.
- The repository is queried, by doing a `GET` call, for an user instance having the same id as that of the instance which was POSTed. 
- The returned user is extracted. The corresponding fields must match.

### GET an User by login detail - /users/login
Tests the GET method at endpoint `http://localhost:8080/users/login`

This takes username and password of an user, and returns the instance of user if it exists.
- An instance of user is created and a `POST` call is made.
- The repository is queried, by doing a `GET` call, for an user instance having the same username and password as that of the instance which was POSTed. 
- The returned user is extracted. The corresponding fields must match.

### GET all Users
Tests the GET method at endpoint `http://localhost:8080/users`

This returns list of all the users from the databases.
- A few users are added to the database by doing `POST` calls.
- A `GET` call is made to retrieve list of all users and then size of list of users is verified.

### DELETE user By Id
Tests the DELETE method at endpoint `http://localhost:8080/users/{userId}`

This accepts an user id and deletes the user from the database.
- An user is added to the database by doing a `POST` call.
- A `DELETE` call is made to the database with the id of the user just created.
- A `GET` call is made to make sure that user doesn't exist anymore.

## Shows

Before every test is run, the database is cleared.
### POST a Show
Tests the POST method at endpoint `http://localhost:8080/shows`

This accepts an show and stores it in the database.
- An instance of show is created and a `POST` call is made.
- The controller layer returns the instance back if show was successfully saved in the DataBase.
- The returned show is extracted. Their corresponding fields must match.

### GET a show by Id
Tests the GET method at endpoint `http://localhost:8080/shows/{showId}`

This accepts a show id and returns the instance of show if it exists.
- An instance of show is created and a `POST` call is made.
- The repository is queried, by doing a `GET` call, for a show instance having the same id as that of the instance which was POSTed. 
- The returned show is extracted. The corresponding fields must match.

### GET all Shows
Tests the GET method at endpoint `http://localhost:8080/shows`

This returns list of all the shows from the databases.
- A few shows are added to the database by doing `POST` calls.
- A `GET` call is made to retrieve list of all shows and then size of list of shows is verified.



