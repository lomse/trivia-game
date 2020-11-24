# Trivia Game
### Get a score between 70% and 100%, to see a surprise ;).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
 
## Environment file
Rename the `.env.sample` file to `.env` and update it accordingly.

## Available Scripts

In the project directory, you can run:

### `Run it outside docker`

Runs the app in the development mode.<br />
1. Install dependencies
```
yarn 
```
2. Start the app
```
yarn start
```
Open [http://localhost:3000](http://localhost:4000) to view it in the browser.


### `With docker-compose`
#### Using docker-compose
1. From the root directory, run 
```
docker-compose up --abort-on-container-exit --build
```
2. Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

#### Without docker-compose
1. Build docker image: 
```
docker build . -t DOCKER_IMAGE_NAME
```
2. Run it
```
docker run -p 8080:80 DOCKER_IMAGE_NAME
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `Run tests`
```
yarn test
```

### `yarn build`

Builds the app for production to the `build` folder.

#
