Assumptions & Call-Outs

1. GraphQL is used only for survey apis
2. Authentication API is simple POST with username & password fields un-encrypted
3. Authentication Details stored in DB is not encrypted
4. Any kind of security isn't implemented
5. JWT token doesnt have expiry and is sent both as a cookie(secure cookie) and a response for flexibility to test
6. All requests after authentication will be attached the token either as a cookie or a field in headers with key 'token'
7. Configuration file is commited to git (ideally shoudn't)
8. Image Thumbnail Generation endpoint - Api isn't secured with JWT


Survey Assumptions

1. Each Survey will have a Unique ID -  Not handled in the code
2. Any Two Questions in a same survey/different survey can be same
3. Transactions aren't taken care - Meaning if one question insertion fails others will be inserted without an error



<!-- Ex queries & mutations -->
mutation {
  create_survey(questions_list: [{survey_id: "test_survey", question: "what is the name"}]) 
}


{
  survey_result(survey_id: "survey_5") {
    survey_id
    question
    true
    false
  }
}