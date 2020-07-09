# Toddle - Survey Application

# Assumptions & Call-Outs

  -  GraphQL is used only for survey apis
  -  Authentication API is simple POST with username & password fields un-encrypted
  -  Authentication Details stored in DB is not encrypted
  -  Any kind of security isn't implemented
  -  JWT token doesnt have expiry and is sent both as a cookie(secure cookie) and a response for flexibility to test
  -  All requests after authentication will be attached the token either as a cookie or a field in headers with key 'token'
  -  Configuration file is commited to git (ideally shoudn't)
  -  Image Thumbnail Generation endpoint - Api isn't secured with JWT

## Survey End-point Assumptions
  -  Each Survey will have a Unique ID -  Not handled in the code
  -  Any Two Questions in a same survey/different survey can be same
  -  create survey - can take multiple surveys at a time

##  Hilights
  - Thumbnail Api is developed in such a way that each request to process an image is forke - Hence heavy parallel requests it can handle
  - Transactions are used to make sure if a survey is added or taken all the entries are updated accordingly


### Installation

Requires [Node.js](https://nodejs.org/) to be installed.

Clone the Repo, Install the dependencies and start the server.

```sh
$ git clone https://github.com/ravitejakamalapuram/toddle-survey.git
$ cd toddle-survey
$ npm install
$ node server.js
```

Verify the application by navigating to your server address in your preferred browser.
```sh
localhost:3000/survey
```

If required EDIT the application configuration
```sh
vi toddle-survey/config/app.config.js
```

## Testing Api End-points, Queries & Mutations (GraphQL)
when the application is started you have 10 users added to use for Authentication ("usernamex", "passwordx") "x" being numbers from 1 to 10

1. Authentication - POST request
```sh
curl --location --request POST '13.233.29.11:3000/Authentication' \
--header 'Content-Type: application/json' \
--data-raw '{"username":"username1", "password": "password1"}'
```

2. Thumbnail - GET request
```sh
http://13.233.29.11:3000/Thumbnail?url=https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg
```

3. Survey Api End-point (Authentication is required & token to be sent via cookie or in hraders with key name 'token')
```sh
http://13.233.29.11:3000/survey
```
### GraphQL Queries/Mutations

1. create survey
```sh
mutation {
  create_survey(questions_list: [{survey_id: "test_survey", question: "Is the current year 2020?"}]) 
}
```

2. take survey
```sh
mutation {
  take_survey(answers_list: [{survey_id: "test_survey", question: "Is the current year 2020", option_chosen: false}]) 
}
```

3. show survey
```sh
{
  survey_result(survey_id: "survey_5") {
    survey_id
    question
    true_count
    false_count
  }
}
```

### Todos
 - Improve GraphQL Api end point

License
----
MIT
**Free Software, Hell Yeah!**