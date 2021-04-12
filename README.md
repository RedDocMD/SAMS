# Student Auditorium Management Sytem (SAMS)

![Build](https://github.com/RedDocMD/SAMS/actions/workflows/maven.yml/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/RedDocMD/SAMS/branch/master/graph/badge.svg?token=VSKEG58TUG)](https://codecov.io/gh/RedDocMD/SAMS)

## Authors

- Group Name: Eternal Blue
- Group Number: 13 (CS29006-Spring-2021)
- Members:
  - Aaditya Agrawal (19CS10003)
  - Debanjan Saha (19CS30014)
  - Deep Majumder (19CS30015)

## Building and Running

There are two components to this project - a backend server which runs on port 8080 and a frontend server which runs on 3000. Both ports must thus be free.

### Backend

The backend is in Java and needs:

- JDK 11 or higher
- Mongo DB >= 4.4

After the DB server is started with `sudo systemctl start mongod`, start the backend from the as `cd backend && ./mvnw spring-boot:run`.

### Frontend

The frontend is written in JavaScript and needs:

- node >= 14.16
- npm >= 7.7.5

To run the frontend,

```shell
cd frontend
npm install
npm run build 
npm run deploy
```

Then open `http://localhost:3000` in your browser.

### Generating Test reports

The following operations are to be performed in the `backend` directory.

- Just run the test: `mvn test`
- Run the tests with coverage: First follow the instructions [here](https://openclover.org/doc/manual/latest/maven--quick-start-guide.html). Then run `mvn clean clover:setup test clover:aggregate clover:clover`. You can find the report in `backend/target/site/clover/index.html`
- Run the tests and generate test report: `mvn surefire-report:report`. You can find the report in `backend/target/site/surefire-report.html`