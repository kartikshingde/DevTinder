Backend Development

<!-- CJS vs MJS module -->
<!-- sync or async, non-strict and script -->
<!-- calculator folder to export them in one go -->

<!-- DOminos Example -->

HomeWork:=>

- app.use() vs app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all routes, except /user/login
- error hadling using app.use("/",(err,req,res,next)=>{})

- Create a UserSchema.

- Create /signup API to add data to database
- Push some document using API with Postman
- Error handling using try Catch.

HW\*

- API- Get user by Email'
- API - Get /feed - get all the users from the database
- get Users BY ID;
- create a delete user API
- create api to update user
- explore the mongoose documentation for Model.methods()
- what are options in a Model.findOneAndUpdate, explore more about it
- API - update the user with email id

- explore Schema options from documentation
- add required,unique,min,minLength,trim,
- add default value
- Create a custom validate function for gender
- Improve the DB Schema - Put all appropriate validations on each field in Schema
- Add timestamps

- add API level validations on Patch request and signup post api
- add api validation for each field
  // this is data sanitization

-Install validator
-Explore validator library functions and use for password email photoUrl
//note: NEVER TRUST req.body ...always keep validations

//EP09

- validate data in SignUp API
- Install bcrypt package
- Create a passwordHash using bcrypt.hash() and save the user with encrypted password
- Create Login API
- Compare Passwords and throw error if not valid

//EP10

- install cookie-parser , just send a dummy cookie to user.
- Create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In login API,after email and password validation, create a jwt token and send it back to user inside cookies
- read cookies inside your profile API and find the logged in user.
- userAuth middleware
- Add the userAuth middleware in profile API and send new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Crate userSchema method to getJWT()
- Create userSchema method to comparepassword(passwordInputByUser)

//EP11

- Explore tinder Api
- Create a list of all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile,request routers
- Create authRouter,profileRouter,requestRouter
- Import these routers in app.js
- Create POST/logout api
- Create PATCH /profile/edit
- Create PATCH /profile/password Api =>forgot password api
- Make sure, validate all data in every POST,PATCH API's

//EP12

- Create a connectionRequest Schema
- Send Connection Request API
- Proper validation of Data
- Think about all CORNER Cases
- $or query in mongoDB \*\*\* also there is $and query and ...

- Schema.pre("save",function(){}) => like a middleware before saving the model

- Think about indexes in MongoDB
- Read more about indexes in mongoDB
- Why do we need index in DB
- What is the advantages and disadvantages of creating?
- Read article of Compound Index

- ALWAYS THINK ABOUT CORNER CASES

//EP13

- Write code with proper validations for POST /request/review/:status/:request

- \*Thought Process - POST vs GET
- \*\*Read about ref and populate -> https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received API for request received
