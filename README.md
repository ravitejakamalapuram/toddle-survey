Assumptions & Call-Outs

1. GraphQL is used only for survey apis
2. Authentication API is simple POST with username & password fields un-encrypted
3. Authentication Details stored in DB is not encrypted
4. Any kind of security isn't implemented
5. JWT token doesnt have expiry and is sent both as a cookie(secure cookie) and a response for flexibility to test
6. All requests after authentication will be attached the token either as a cookie or a field in headers with key 'token'
7. Configuration file is commited to git (ideally shoudn't)