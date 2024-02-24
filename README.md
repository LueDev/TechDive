# Hack.Diversity Tech Dive Template

## Getting Started

This skeleton contains two different applications -- a front end, or "client," created with "Create React App," and a back end, or "API," created with Express.

In order to make both of them work together, you'll need to run both, but you can run just one or the other to start. As you begin working on this project, you'll first focus on the client, so you can more or less ignore the API portion of the code for now.

## Client

In order to run the client, you'll run the following commands:

```bash
cd client/
npm i
npm start
```

You should then be able to visit `localhost:3000` in your browser and see the client running. If you make changes in the `App.js` file, you should see them reflected.

## API

In order to run the server, you'll run the following commands:

```bash
cd api/
npm i
npm start
```

You should then be able to visit `localhost:9000` in your browser and see the server running.

## RabbitMQ

This project includes a RabbitMQ service, which is an open-source message broker that facilitates communication between different parts of your application through message passing. To streamline the setup and running of RabbitMQ, we use Docker Compose.

### Prerequisites

- Ensure Docker and Docker Compose are installed on your machine. Installation guides can be found on the [official Docker website](https://docs.docker.com/get-docker/) and [Docker Compose documentation](https://docs.docker.com/compose/install/).

### Directory Structure

- `rabbitmq-service/` - Contains the Docker Compose file and README.
  - `docker-compose.yaml` - Defines the RabbitMQ service setup.

### Running RabbitMQ

1. **Navigate to the Service Directory:**
   Open a terminal and change to the `rabbitmq-service` directory where the `docker-compose.yaml` file is located.

   ```bash
   cd rabbitmq-service
   ```

2. **Start RabbitMQ Service:**
   Execute the following command to start RabbitMQ using Docker Compose. This command pulls the necessary Docker images, creates containers, and starts the RabbitMQ service as defined in `docker-compose.yaml`.

   ```bash
   docker-compose up -d
   ```

   The `-d` flag runs the containers in the background.

3. **Access RabbitMQ Management Interface:**
   Once the service is up, you can access the RabbitMQ management interface via your web browser at `http://localhost:15672/`. The default login credentials are usually `guest` for both username and password, unless specified differently in your `docker-compose.yaml`.

### Stopping the Service

To stop the RabbitMQ service and remove the containers, run:

```bash
docker-compose down
```

### Additional Configuration

Refer to the `docker-compose.yaml` for RabbitMQ service configurations. You can customize the environment variables, ports, and other settings as needed for your project.

For comprehensive RabbitMQ configurations and Docker Compose options, visit the [RabbitMQ documentation](https://www.rabbitmq.com/documentation.html) and [Docker Compose documentation](https://docs.docker.com/compose/).

# Mongoose Models README

## Exam Model

The `exam` model represents a medical examination record in the database.

### Schema:

- `patientId`: String (required) - The unique identifier of the patient associated with the exam.
- `examId`: String (required, unique) - The unique identifier of the exam.
- `age`: Number (required) - The age of the patient at the time of the exam.
- `sex`: String (required) - The sex of the patient.
- `bmi`: Number (required) - The Body Mass Index (BMI) of the patient.
- `zipCode`: Number (required) - The ZIP code of the patient's location.
- `imageURL`: String (required) - The URL of the image associated with the exam.
- `keyFindings`: String (required) - The key findings of the exam.
- `brixiaScores`: String (required) - The Brixia scores of the exam.
- `createdAt`: Date - The date and time when the exam was created. (Default: current date and time)
- `updatedAt`: Date - The date and time when the exam was last updated. (Default: current date and time)
- `status`: String - The status of the exam. (Default: "active")

## User Model

The `user` model represents a user account in the system.

### Schema:

- `internalid`: String - The internal unique identifier of the user. (Default: Generated UUID)
- `firstname`: String (required) - The first name of the user.
- `lastname`: String (required) - The last name of the user.
- `email`: String (required) - The email address of the user. (Unique)
- `password`: String (required) - The password of the user. (Min length: 8 characters, must contain at least one uppercase letter, one lowercase letter, and one digit)
- `admin`: String - Indicates if the user is an administrator. (Default: false)
- `createdAt`: Date - The date and time when the user account was created. (Immutable, Default: current date and time)
- `updatedAt`: Date - The date and time when the user account was last updated. (Default: current date and time)
- `permissions`: [String] - An array of permissions granted to the user.
- `role`: String - The role of the user in the system.

# Controllers README

## Notifications Controller

The `NotificationsController` handles the communication with RabbitMQ and Slack for sending and receiving messages.

### Dependencies:

- `amqplib`: Library for RabbitMQ communication.
- `node-fetch`: Library for making HTTP requests.
- `dotenv`: Library for loading environment variables.

### Functions:

1. `connectToRabbitMQ`: Establishes a connection to RabbitMQ and returns a channel.
2. `closeRabbitMQConnection`: Closes the RabbitMQ connection and channel.
3. `sendMessageToSlack`: Sends a message to Slack using a webhook URL.
4. `consumeMessages`: Consumes messages from a specified queue in RabbitMQ and sends them to Slack.

5. `pushLoginEvent`: Pushes a login event to the login queue in RabbitMQ.
6. `pushRegistrationEvent`: Pushes a registration event to the registration queue in RabbitMQ.
7. `pushOperationsEvent`: Pushes an operations event to the operations queue in RabbitMQ.
8. `getNotification`: Handles GET requests for notifications from the operations queue.
9. `consumeOperationsQueue`: Consumes messages from the operations queue.
10. `consumeRegistrationQueue`: Consumes messages from the registration queue.
11. `consumeLoginQueue`: Consumes messages from the login queue.

## Exam Controller

The `ExamController` handles CRUD operations related to exams in the system.

### Dependencies:

- `Exam` model: Represents the exam data structure.
- `NotificationController`: Handles notifications for exam-related events.
- `jwt`: Library for handling JSON Web Tokens.
- `dotenv`: Library for loading environment variables.

### Functions:

1. `getExams`: Retrieves all exams from the database and sends a notification to RabbitMQ.
2. `getOnePatientExams`: Retrieves exams for a specific patient and sends a notification to RabbitMQ.
3. `getOneSpecificExam`: Retrieves a specific exam by examId and sends a notification to RabbitMQ.
4. `createExam`: Creates a new exam record in the database and sends a notification to RabbitMQ.
5. `updateExam`: Updates an existing exam record in the database and sends a notification to RabbitMQ.
6. `deleteExam`: Deletes an existing exam record from the database and sends a notification to RabbitMQ.

## User Controller

The `UserController` handles user authentication, registration, and profile management.

### Dependencies:

- `User` model: Represents the user data structure.
- `NotificationController`: Handles notifications for user-related events.
- `jwt`: Library for handling JSON Web Tokens.
- `dotenv`: Library for loading environment variables.

### Functions:

1. `getUser`: Returns a success message indicating that the users API is working.
2. `checkEmail`: Checks if a given email exists in the database.
3. `registerUser`: Registers a new user in the system and generates an access token.
4. `loginUser`: Authenticates a user login and generates an access token.
5. `authenticateToken`: Middleware function to authenticate user requests using JWT tokens.
6. `findUser`: Retrieves user details based on the internalid.

# Backend Endpoints

## Express App

The `app.js` file configures the Express application, sets up middleware, and defines the routes.

### Dependencies:

- `http-errors`: Library for creating HTTP errors.
- `express`: Web framework for Node.js.
- `path`: Module for handling file paths.
- `morgan`: HTTP request logger middleware.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- `cookie-parser`: Middleware for parsing cookies in HTTP requests.

### Middleware Used:

1. `express.json()`: Parses incoming JSON requests.
2. `cookieParser()`: Parses cookies attached to incoming requests.
3. `logger('dev')`: Logs HTTP requests to the console in a developer-friendly format.
4. `cors()`: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different origins.
5. `express.urlencoded({ extended: false })`: Parses URL-encoded data from incoming requests.
6. `express.static()`: Serves static files from the `public` directory.

### Routes:

1. `/`: Index route.
2. `/users`: User routes.
3. `/admin`: Admin routes.
4. `/auth`: Authentication routes.

## Admin Routes

The admin routes handle CRUD operations for exams and message reception.

### Endpoints:

1. `GET /`: Retrieves all exams.
2. `POST /receive-message`: Creates a new exam.
3. `DELETE /exams/:id`: Deletes an exam by ID.
4. `PUT /exams/up/:id`: Updates an exam by ID.

## Exam Routes

The exam routes handle CRUD operations for exams.

### Endpoints:

1. `GET /exams/patient/:patientId`: Retrieves exams for a specific patient.
2. `GET /exam/:examId`: Retrieves a specific exam by exam ID.
3. `GET /`: Retrieves all exams.
4. `PATCH /exam/:id`: Updates an exam by ID.
5. `DELETE /exam/:id`: Deletes an exam by ID.
6. `POST /create`: Creates a new exam.

## User Routes

The user routes handle user authentication and registration.

### Endpoints:

1. `GET /`: Returns a success message indicating that the users API is working.
2. `POST /login`: Logs in a user.
3. `POST /register`: Registers a new user.
4. `GET /checkemail/:email`: Checks if a given email exists in the database.
