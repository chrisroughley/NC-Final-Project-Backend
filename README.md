# ACHIEVE MOBILE APP API


## Achieve

This is the back end of Achieve, a social goal making app that allows users to create goals and add friends to track each other’s progress built with Typescript, Express, Firestore and Firebase. This app was created as part of our final project for the <a href="https://northcoders.com/">Northcoder</a> coding bootcamp. Team members: <a href="https://github.com/harryyork97">Harry York</a>, <a href="https://github.com/JohnA-NC">John Andre</a>, <a href="https://github.com/Lee-250">Lee Broadhurst</a>.

## Endpoints

See table for available endpoints. Use base URI https://us-central1-final-project-backend-16738.cloudfunctions.net/app followed by one of the endpoints shown in the table.

```
EXAMPLE: https://us-central1-final-project-backend-16738.cloudfunctions.net/app/goals/tJgU7tw7OYIlQ88spYlt
```

| METHODS | ENDPOINT |
|---------|-----|
| GET, PUT |/goals/:goalId/feed/:postId|
|GET, PUT |/goals/:goalId/feed|
|GET, POST|/users|
|GET|/goals/:goalId|
|POST|/goals|

## Setup

1. Fork this repository to your own GitHub account

2. Clone your fork of this repository to your local machine and `cd` into it:

```
$ git clone <your fork's URL>
$ cd NC-Final-Project-Backend
```

## Dependencies

install dependencies using the CLI. While in the root directory `cd` into the functions directory and then run `npm install`

```
$ cd functions
$ npm i
```

## Deploy functions

To deploy this API you will need to deploy the functions to Firebase.

```
$firebase deploy --only functions 
```

## Requires

```
TypeScript 3.8.0
```
