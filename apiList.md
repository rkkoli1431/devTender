# DevTinder APIs
## authRouter
- POST /signup
- POST /login
- POST /logout


## profileRouter
- GET /profile/view
- GET /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/status/:userId         Daynamic API
- POST /request/review/status/:requestId    Daynamic API



- POST /request/review/accepted/:requestId
- POST /request/revies/rejected/:requestId


## userRouter
- GET /user/requests/received
- GET /user/connection
- GET /user/feed - Gets you the profiles of others users on platform


Status :    , interested, accepeted, rejected