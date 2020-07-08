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
3. create survey - can take multiple surveys at a time


<!-- Ex rest requests -->
1. Authentication

curl --location --request POST '13.233.29.11:3000/Authentication' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQyMTk3MzF9.WDk2qotpkbEVgZuD_1mYoi55QgDJTrZjtQeJ9jPKcHI' \
--data-raw '{"username":"username1", "password": "password1"}'

2. Thumbnail

13.233.29.11:3000/Thumbnail?url=https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg


<!-- Ex queries & mutations (GraphQL)-->


1. create survey

mutation {
  create_survey(questions_list: [{survey_id: "test_survey", question: "Is the current year 2020?"}]) 
}


2. take survey

mutation {
  take_survey(answers_list: [{survey_id: "test_survey", question: "Is the current year 2020", option_chosen: false}]) 
}


3. show survey

{
  survey_result(survey_id: "survey_5") {
    survey_id
    question
    true_count
    false_count
  }
}

<!-- Hilights -->
1. Thumbnail Api is developed in such a way that each request to process an image is forked. Hence heavy parallel requests it can handle
2. Transactions are used to make sure if a survey is added or taken all the entries are updated accordingly