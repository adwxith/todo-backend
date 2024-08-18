

```markdown
# Basic Todo Backend

This is a simple Todo backend built using Express.js and MySQL. It provides basic functionality for user authentication, task management, and status updates.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [APIs](#apis)
- [Database Setup](#database-setup)
- [Extra Notes](#extra-notes)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. **Install Dependencies:**

   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

## Running the Project

1. **Start the MySQL Server:**

   Make sure your MySQL server is running and accessible with the credentials provided in `index.js`.

2. **Run the Server:**

   ```bash
   npm start
   ```

   The server will start and listen on port 3000.

## APIs

### Authentication

- **POST /login**
  - **Description:** Authenticate a user.
  - **Request Body:**
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
  - **Responses:**
    - 200 OK: Successful login
    - 401 Unauthorized: Failed to login

- **POST /signup**
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "your_name",
      "username": "your_username",
      "password": "your_password"
    }
    ```
  - **Responses:**
    - 200 OK: Registered successfully
    - 401 Unauthorized: Failed to register

### Task Management

- **POST /createtask**
  - **Description:** Create a new task.
  - **Request Body:**
    ```json
    {
      "taskname": "Task Name",
      "task_id": 1,
      "description": "Task Description"
    }
    ```
  - **Responses:**
    - 200 OK: Created task successfully
    - 401 Unauthorized: Failed to create task

- **POST /deletetask**
  - **Description:** Delete a task by ID.
  - **Request Body:**
    ```json
    {
      "task_id": 1
    }
    ```
  - **Responses:**
    - 200 OK: Deleted task successfully
    - 401 Unauthorized: Failed to delete task

- **POST /changestatus**
  - **Description:** Change the status of a task.
  - **Request Body:**
    ```json
    {
      "task_id": 1,
      "done": "true" // or "false"
    }
    ```
  - **Responses:**
    - 200 OK: Changed status successfully
    - 400 Bad Request: Invalid status value
    - 401 Unauthorized: Failed to change status

- **POST /getdata**
  - **Description:** Retrieve a task by ID.
  - **Request Body:**
    ```json
    {
      "task_id": 1
    }
    ```
  - **Responses:**
    - 200 OK: Returns task details
    - 404 Not Found: Task not found

## Database Setup

1. **Create Database:**

   Create a database named `todo` in your MySQL server.

2. **Create Tables:**

   Execute the following SQL commands to create the required tables:

   ```sql
   CREATE TABLE login (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE task (
     task_id INT PRIMARY KEY,
     taskname VARCHAR(255) NOT NULL,
     description TEXT,
     done BOOLEAN NOT NULL DEFAULT false
   );
   ```

## Extra Notes

- Ensure that the MySQL credentials (`host`, `user`, `password`, `database`) in `index.js` match your local MySQL setup.
- Modify the CORS settings and error handling as per your project's requirements.


```

Replace the placeholder values with your actual repository details and adjust as needed.
