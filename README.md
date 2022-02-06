# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started).
## Running in Docker container

```
docker-compose up --build
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Description
Application operate with the following resources:

User (with attributes):

```
{ id, name, login, password }
```

Board (set of columns):

```
{ id, title, columns }
```

Column (set of tasks):

```
{ id, title, order }
```

Task:

```
{
id,
title,
order,
description,
userId, //assignee
boardId,
columnId
}
```

Details:

For User, Board and Task REST endpoints with separate router paths created:

#### User (`/users` route):

GET `/users` - get all users (remove password from response)

GET `/users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)

POST `/users` - create user

PUT `/users/:userId` - update user

DELETE `/users/:userId` - delete user

#### Board (`/boards` route):

GET `/boards` - get all boards

GET `/boards/:boardId` - get the board by id

POST `/boards` - create board

PUT `/boards/:boardId` - update board

DELETE `/boards/:boardId` - delete board

#### Task (`boards/:boardId/tasks` route):

GET `boards/:boardId/tasks` - get all tasks

GET `boards/:boardId/tasks/:taskId` - get the task by id

POST `boards/:boardId/tasks` - create task

PUT `boards/:boardId/tasks/:taskId` - update task

DELETE `boards/:boardId/tasks/:taskId` - delete task

When somebody DELETEs Board, all its Tasks deleted as well.

When somebody DELETEs User, all Tasks where User is assignee updated to put userId = null.
