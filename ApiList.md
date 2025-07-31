# DevTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //forgot password api

## connectionRequestRouter

- - POST /request/send/:status/:userId
    status=="interested","ignored"

- - POST /request/review/:status/:requestId
    status=="accepted","rejected"

## userRouter

- GET user/request/received
- GET user/connections
- GET user/feed - Gets you the profiles of other users on platform

Status: ignored,interested,accepted,rejected
