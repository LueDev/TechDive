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

