# Simple Todo List

This an example of Todo List API, using [NodeJS](https://nodejs.org/).

## Instalation
This App requires [NodeJS](https://nodejs.org/) v14+ and [MySQL](https://www.mysql.com/) Database to run.

### Running on local machine

Make sure you create .env file that contain theese environment variables:
```
MYSQL_USER: root
MYSQL_PASSWORD:
MYSQL_DBNAME: todo4
MYSQL_HOST: localhost
MYSQL_PORT: 3306
```

After setting up all the environment variables, on command prompt, you can execute theese code to run the app
```
npm i
npm run start
```

You also could access the example request using Postman. You can access the file in directory named "Postman Request" and import the files to your local Postman. I encourage you to use Postman to get better understanding.

### Running on docker container
If you wish to run this application via docker container, I already create a docker compose file so you could immediately start the app. The docker compose file are set to connect with your local MySQL Database, feel free if you wish to connect it to another MySQL container instead, just change the environment variables as you want.

These are some environment variables that I already set to connect with your local MySQL Database :
```
NODE_ENV: production
MYSQL_USER: root
MYSQL_PASSWORD:
MYSQL_DBNAME: todo4
MYSQL_HOST: host.docker.internal
MYSQL_PORT: 3306
```

After setting up all the environment variables, on command prompt, you can execute theese code to run the app
```
docker-compose -f docker-compose.prod.yml up -d --build
```

You also could access the example request using Postman. You can access the file in directory named "Postman Request" and import the files to your local Postman. I encourage you to use Postman to get better understanding.

Run this command if you want to terminate and delete the containers
```
docker-compose -f docker-compose.prod.yml down -v
```

## Error/Bug Discoveries
Find some errors or bugs while running the app? You can contribute by telling me what the errors and bugs are, or you could straight up make a pull request on this repository.
