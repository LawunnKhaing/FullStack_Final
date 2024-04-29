# FullStack Final Project
Created by: Lawunn Khaing, Jesse Sillman, Huy Tran, Tran Truong (ITMI22SP)

# Introduction
Our final project for the FullStack course was to create an Activity/Task manager with the CRUD operations, utilizing a relational database for storage management. Additionally, the user can manage the status of each task and activity, and see their progress on the statistics page.

# Setting up your server (Backend)

This project uses Node.js as the server environment and Express.js as the web application framework. The database is managed with PostgreSQL, and Sequelize is used as the ORM (Object-Relational Mapping) to interact with the database

## PostgreSQL Database Setup

1. Install PostgreSQL (if not already)
2. Create a new database for the project.
3. In the `Backend` directory, create a `.env` file to store your database:

```bash
DB_HOST=localhost
DB_USER=your_postgres_username
DB_NAME=your_database_name
DB_PORT=5432
DATABASE_URL=postgres://your_postgres_username@localhost:5432/your_database_name
```

## Installing Dependencies

In the `Backend` directory, run the following command to install the necessary dependencies:
```sh
npm install
```

## Running the Server
To start the server, run the following command in the `Backend` directory:
```sh
node server.js
```

# Setting up your React Application (Frontend)

The frontend of this application is a React application built with TypeScript and Vite, which provides user interfaces for managing tasks and activities, and it communicates with the backend via HTTP requests using axios.

1. Navigate tto the `Frontend` directory in your terminal.
2. Install the necessary dependencies by running:
```sh
npm install
```
3. Start the application:
```sh
npm run dev
```






