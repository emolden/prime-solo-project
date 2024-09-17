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
1. First, I made wireframes to map out the functionality of the app.
   ![image](https://github.com/user-attachments/assets/w_300/68dd7e18-c155-4896-9baa-d4441fb726c3)
   ![image](https://github.com/user-attachments/assets/310cbfe4-6ae9-4684-8326-b6efc625142c)
   ![image](https://github.com/user-attachments/assets/1a29e241-b957-43cd-b72c-d09b3ce0d5fa)
   ![image](https://github.com/user-attachments/assets/4e17cf3b-a748-4901-806f-47616cf680d6)

3. Then, I made a plan for my database.
   ![image](https://github.com/user-attachments/assets/b249d887-aa0a-42f6-a6e0-bb97d2408ae1)

4. The first step in my creation process was to create my database, datatables, and dummy data.

5. With the dummy data, I did a spike on MUI X Data Grid to make sure this would be a good resource for my League Data page. Currently, the admin can change the team each user is assigned to.
   ![image](https://github.com/user-attachments/assets/f43248fc-ca69-4109-a345-001e10439d4e)

6. Then, I created my Register To Play pages. To make the process as clear as possible, I used conditional rendering throughout the registration.
   ![image](https://github.com/user-attachments/assets/4826ec88-3cad-482b-b32a-d11170ef4ec5)

7. After a user registers to play and the admin places them on a team, the user can see their teams on the Home page. Also on theHome page users can go to see and edit their personal information.
   ![image](https://github.com/user-attachments/assets/5cc9f263-c6e8-4aca-b941-a3b540bcb1a8)


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
1. First I created wireframes to plan the functionality of my app.


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
