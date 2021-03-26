
# API Test Plan for SAMS

## User

Before every test is run, the database is cleared.
### POST - /users
This accepts an user and stores it in the database.
- An instance of user is created and a `POST` call is made.
- The controller layer returns the instance back if user was successfully saved in the DataBase.
- The returned user is extracted. Their corresponding fields must match.

### GET - /users/{userId}
This accepts an user id and returns the instance of user if it exists.
- An instance of user is created and a `POST` call is made.
- The repository is queried, by doing a `GET` call, for an user instance having the same id as that of the instance which was POSTed. 
- The returned user is extracted. The corresponding fields must match.

### GET - /users/login
This takes username and password of an user, and returns the instance of user if it exists.
- An instance of user is created and a `POST` call is made.
- The repository is queried, by doing a `GET` call, for an user instance having the same username and password as that of the instance which was POSTed. 
- The returned user is extracted. The corresponding fields must match.



