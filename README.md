# Airline Ticket/Seat Reservation System
CS3042 - Database Systems Module Group Project

## Install in local
1. Run the following command to install all the dependencies
```
npm install
```
2. Follow the `server/.env.examples` file and create a `.env` file inside `/server` directory with local system credentials for MySQL.

3. Execute following files using MySQL workbench
   `server/db/database.sql` - DDL queries
   `server/db/dummy_data` - seed data for the system

4. Run the following command to start the app
```
npm run start:dev
```