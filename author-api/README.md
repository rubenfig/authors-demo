# Serverless Authors Demo API

Demo REST API made with NodeJS, Serverless and DynamoDB.


## Prerequisites

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* Serverless - [Download & Install Serverless](https://serverless.com/).
* For deployment, you will need a configured AWS account ([Check this link for configuration](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md)).


## Running locally

1. Clone this repo
2. Go to author-api folder
3. Install npm packages `npm install`
4. Start the server with `npm start`. API would run on http://localhost:3000/api 
5. Run the tests
6. You can stop the server with npm run stop


## Interacting with the services

Use [Postman](https://www.getpostman.com) or [cURL](https://curl.haxx.se/) to directly interact with the API. 

### Some examples

The API supports standard CRUD operations on two endpoints: /api/authors and /api/publications

List authors:

```
curl -X GET \
  http://localhost:3000/api/authors 
```

Get one Author:

```
curl -X GET \
  http://localhost:3000/api/authors/{AUTHOR_ID} 
```

Create Author:

```
curl -X POST \
  http://localhost:3000/api/authors \
  -H 'Content-Type: application/json' \
  -d '{"fullname":"Test name","birthdate": {DATE_IN_TIMESTAMP},"email":"test@test.com"}'

```


Update Author:

```
curl -X PUT \
  http://localhost:3000/api/authors/{AUTHOR_ID} \
  -H 'Content-Type: application/json' \
  -d '{"fullname":"Test name","birthdate": {DATE_IN_TIMESTAMP},"email":"test@test.com"}'

```


Delete Author:

```
curl -X DELETE \
  http://localhost:3000/api/authors/{AUTHOR_ID} 
```


List publications:

```
curl -X GET \
  http://localhost:3000/api/publications
```

List publications (with parameters):

```
curl -X GET \
  http://localhost:3000/api/publications\?limit=20&order=ASC&author={AUTHOR_ID}&lastEvaluated={LAST_EVALUATED_KEY} 
```

Get one Publication:

```
curl -X GET \
  http://localhost:3000/api/publications/{PUBLICATION_ID} 
```

Create Publication:

```
curl -X POST \
  http://localhost:3000/api/publications \
  -H 'Content-Type: application/json' \
  -d '{"title":"Test title","date": {DATE_IN_TIMESTAMP},"body":"Test body", "author":{AUTHOR_ID}}'

```


Update Publication:

```
curl -X PUT \
  http://localhost:3000/api/publications/{PUBLICATION_ID} \
  -H 'Content-Type: application/json' \
  -d '{"title":"Test title","date": {DATE_IN_TIMESTAMP},"body":"Test body", "author":{AUTHOR_ID}}'

```


Delete Publication:

```
curl -X DELETE \
  http://localhost:3000/api/publications/{PUBLICATION_ID} 
```


## Command line scripts
  - `npm start`: Starts Serverless offline on port 3000 and local DynamoDB on port 8000.
  - `npm test`: Run unit tests.
  - `npm run deploy`: Deploy the code to the configured AWS account with production stage.
  - `npm run deploy-dev`: Deploy the code to the configured AWS account with development stage.
  - `npm run stop`: Stop running offline and DynamoDB servers.

