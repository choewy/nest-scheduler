# Node Chat App

> 항해99 알고리즘 주차 동안 기분 전환겸 팀원들과 함께한 토이 프로젝트(with. 소소한 일탈)

## Environment

### server

```env
PORT=5000

NODE_ENV=development

MONGO_URI=mongodb://root:password@localhost:5001/admin
MONGO_DB_NAME=service

SALT_ROUNDS=10
JWT_SECRET=JsonWebTokenSecret

COOKIE_TOKEN_KEY=chat_app_auth_token
COOKIE_EXP_KEY=chat_app_auth_token_exp
```

## Docker-MongoDB

```
$ docker-compose up -d
```

## NPM 

### server(root)

```
$ npm install
```

### client
```
$ cd client
$ npm install 
```