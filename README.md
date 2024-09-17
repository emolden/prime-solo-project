![MIT LICENSE](https://img.shields.io/github/license/emolden/prime-solo-project?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/emolden/prime-solo-project?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/emolden/prime-solo-project?style=flat-square)
![FORKS](https://img.shields.io/github/forks/emolden/prime-solo-project?style=social)

# West Metro Softball Registration

## Description
_Duration: 2 week sprint_

I play softball in the West Metro Softball League. This adult softball league is different from others because players can sign up as individuals, part of a small group, or as a team. Being able to join a team-based sport as an individual or small group promotes community building. This application assists with player registration, data organization, and team creation for West Metro Softball.

With this app, users can log in, create an account, learn about the league, register to play, and view their specific profiles. The registration process is smooth and keeps users informed of their progress throughout.

Admins can view league data and update existing teams. This functionality streamlines the team creation process by allowing admins to interact with the data while viewing it.

## Make a Plan


## Prerequisites
- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)
- [Postico](https://eggerapps.at/postico/v1.php) - recommended

## Installation
1. Fork and clone this repository for your own access.
2. Run an `npm install` within this repository's root directory.
3. Create a database named `prime_app`.
    * This application is configured to connect to a PostgreSQL database. You'll need to create this database within a locally installed PostgreSQL instance.
4. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly.
   * I recommend using Postico to run those queries as that was used to create the queries
5. Run `npm run server` in your terminal to start the Express server.
6. Run `npm run client` in your terminal to start the Vite dev server (which servers the React app).
7. Navigate to http://localhost:5173/.
8. You can login with the admin sandbox account:
    username: awalker92
    password: pass123

## Usage

## Built With
- Node.js
- Express
- Axios
- React.js
- Redux
- Redux-Saga
- PostgreSQL
- MUI X Data Grid

## Acknowledgement
Thanks to [Prime Digital Academy](https://github.com/PrimeAcademy/) who equipped and helped me to make this application a reality. 


## Support
If you have suggestions or issues, please email me at emma.molden007@gmail.com