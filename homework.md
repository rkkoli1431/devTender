
- Create a repository 
- Initialize the repository
- node_modules, package.json , package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hell0
- Install nodemon and update scripts inside package.json
- Whar are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)
- 

- Initialize git
- .gitignore
- Create remote repository 
- Push all code to remote origin 
- Play with routes and route extensions ex.  /hello, / , hello/234, /xyz
- Order of the routes matter a look 
- Install Postman app and make a workspace / collection > test API call
- Write logic to handle GET, POST, PATCH, DELETE , API Calls and test them on Postman
- Exploring routing and use of ?, +, (), * in the routes
- Use of rejex in routes  /a/ , /.*fly$/ 
- Reading the query params in the routes 
- Reading the daynamic routes 



- req.query  => same like this 
- req.params => fetching daynamic data ex- user data name , id , password
- Multiple Route Handlers - Play with the code 
- next()
- next function and errors along with res.send();;
- app.use("/route", rh1 [rh2, rh3], rh4, rh5);
- What is Middlewares? Why do we need it ?
- How to express JS basically handles requested behind the scenes 
- Diffrence app.use and app.all
- Write dummy auth middlewares for admin
- Write a dummy auth middlewares for all user routes , expert /user/login/
- Error Handaling using app.use("/", (err,req,res,next)=>{}); keep it last 

# Database Schema & Models Mongoose - session HW-
- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the database "Connect-url"/devTinder
- Call the connectDB function and connect to database before starting application on 8000
- Create a userSchema & user Model 
- Create POST / signup API to add data to database 
- Push some documents using API calls from postman 
- Error Handaling using try, catch 

# Date - 12/05/2025 
- Js Object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API daynamic to recive data from the end user
- User.findOne with duplicate email ides, which object returned
- API - Get the user by email
- API - feed API - GET / feed - get all the users from the database 

- Explore schematype oprtion from the documentation 
- add required , unique , lowercase ,  min, minLength, trim, 
- Add default 
- Create custome validate function for gender
- Improve the DB Scheama - Put all appropiate validations on each fields in Schema 
- Add timestamps to the useScheama
- Add API level validation on Patch request & Signup post API
- Data Sanitizing - Add API validation for each fields 
- Install validator 
- Explore validator library function and Use validator funcs for password , email , photoURL
- NEVER TRUSt req.body

- Validate data in Signup API
- Install bcrypt password
- Create PasswordHash using bcrypt.hash & save the user is excrupted password 
- Create login API
- Compare passwords and throw errors if email or password is invalid

- Install cookie-parse
- just send a dummy cookie to user 
- create GET / profile API and check if you get the cookie back
- Install jwttoken 
- IN login API after email and password validation , create a JWT token and sent it to user in cookie 
- read the cookie inside the your profile API and find the logged in user  
- userAuth Middlewares
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expire of JWT token and cookies to 7 days 

- Create userSchema method to getJWT()
- Create userSchema method to comparedpassword(passwordInputByUser)

- Explore tinder APIs
- Create list all API you can think of in Dev Tinder 
- Group multiple routes repective routers 






