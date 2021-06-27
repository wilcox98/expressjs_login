# MongoDB Expressjs And Passport
This is a NodeJs reference app that uses PassportJs for authentication with MongoDB to store user credentials. 




## Endpoints

|Route                         |Method  | Description                               |
|:-----------------------------|:-------|:------------------------------------------|
| /                       |  GET   |  Gets the index page          |
| /login                       |  GET   |  Gets the login page          |
| /login                       |  POST   |  Logs in the user using the user input          |
| /signup                       |  GET   |  Gets the signup page          |
| /signup                       |  POST   |  Signs up a new user          |
| /user/:name                       |  GET   |  Gets the home page with the logged in user         |

## Development 
Note: Create `.env` file and update.
```
SESSION_SECRET="YOUR_SECRET"
NODE_ENV=""
```
### Setup

1. Clone this repository `git clone https://github.com/wilcox98/expressjs_login.git`
2. Navigate into the directory `cd expressjs_login/`
3. Install npm dependencies `npm i` 
3. Start the dev server with auto reload `npm run dev` 
4. Your server is now running at `localhost:3000` the default port be free to change to your desired port.

## TODO

- [x] Include flash messages 
- [ ] Update user details   
- [ ] User verification using nodemail
