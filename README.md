<div align="center">
  <h1>Julius2grow Challenge</h1>
</div>

## Install

```bash
# Clone
git clone https://github.com/jefer94/julius2grow-challenge
cd julius2grow-challenge

# Install
yarn

cd api && yarn && cd ..
cd web && yarn && cd ..

# Run
yarn dev:api
yarn dev:web

# Test api
yarn test:api

# Test web
yarn test:p2p


# Run in docker
./docker-build.sh
docker-compose up -d api
docker-compose up -d web # web not compile
```

# Mockups

[Violet Blog](https://www.figma.com/file/ng2d3GiRV5OOKPYlxmmbwO/Untitled?node-id=0%3A1)

# Specifications

[JSON:API](https://jsonapi.org/examples/)

# Routes

| Route | Method | Description |
| :--- | :--- | :--- |
| /token | POST | Get token. |
| /users | POST | Add one user. |
| /users/me | GET | Get current user. |
| /posts/:offset? | GET | List posts. |
| /posts | POST | Add one post. |
| /posts/:id | DELETE | Delete post. |
| /posts/filter | POST | Filter posts. |

# Objects

```typescript
type Post = {
  image: string
  title: string
  content: string
  user: string
}

type User = {
  username: string
  email: string
  password: string
}
```

# Pagination

```typescript
type Offset = {
  offset: number
}
```

# Requeriments

- [X] Express.js Restful
- [X] MVC
- [X] React
- [X] Bootstrap
- [X] Docker
- [X] Docker compose
- [ ] Heroku
- [ ] Mongo Atlas https://www.mongodb.com/cloud/atlas
- [X] Redux or context
- [X] JWT

# API requeriments

- [X] Token provider
  - [X] JWT
    - [X] Id
    - [X] Email
    - [X] Exp in one hour
  - [X] Check that user exist
- [X] DB
  - [X] News
    - [ ] Image in S3
    - [X] Title
    - [X] Content
    - [X] Created at
  - [X] Users
    - [X] Unique username
    - [X] Unique email
    - [X] Password with hash
- [X] With auth
  - [X] Add new
  - [X] List news by a user
  - [X] Delete new
  - [X] Filter by a user
    - [X] Title
    - [X] Content
- [X] Implement 10 elements by result

# Frontend requeriments

- [X] Pages
  - [X] Without auth
    - [X] Login
    - [X] Register
  - [X] With auth
    - [X] Post
      - [X] List
      - [X] Add
      - [X] Filter
      - [X] Delete

# Where are upload the challenge

- [X] Github

# Repository requeriments

- [X] Add one README.md with how to run example

# Requirements that cannot be developed

- S3 (I not have credit card)
- Microservices with a message broker (is complicated with Heroku free)
- Monorepo (is complicated deploy all in five hours in Heroku)