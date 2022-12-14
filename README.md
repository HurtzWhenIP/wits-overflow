## CircleCI Badge

[![HurtzWhenIP](https://circleci.com/gh/HurtzWhenIP/wits-overflow.svg?style=svg)](https://app.circleci.com/pipelines/github/HurtzWhenIP?branch=master)

## Code-Cov Badge

[![codecov](https://codecov.io/gh/HurtzWhenIP/wits-overflow/branch/devbackend/graph/badge.svg?token=NYK8S2FSQ4)](https://codecov.io/gh/HurtzWhenIP/wits-overflow)

<h1>Wits-Overflow</h1>
<hr><p>In this project you will be able to interact with an online forum for the Wits school
of CSAM, in the vein of other such forums like Stack Overflow</p><h2>General Information</h2>
<hr><ul>
<li>Providing a general forum for use across Wits CSAM allows for a platform for students to connect and discuss Computer Science and Mathematics related topics</li>
</ul><ul>
<li>Imagine needing help/guidance for an assignment and you've been completely stuck for weeks? Imagine being able to help students/classmates and wits alumni alike who are in need of assistance?</li>
</ul><h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>CSS</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>php</li>
</ul><ul>
<li>MySQL</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Ask and answer questions</li>
</ul><ul>
<li>Comment on questions and answers</li>
</ul><ul>
<li>Vote on questions and answers</li>
</ul><ul>
<li>Mark answers as correct (question asker)</li>
</ul><ul>
<li>Moderate questions and answers (moderator)</li>
</ul><ul>
<li>Earn achievements for participating in the forum</li>
</ul><ul>
<li>etc..</li>
</ul>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
### Code Splitting
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
### Analyzing the Bundle Size
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
### Making a Progressive Web App
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
### Advanced Configuration
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
### Deployment
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
### `npm run build` fails to minify
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# HTTP Requests
## Base URL
http://34.175.29.208
## login.php
### Sample Request
```json
{
    "data": {
        "Email": "verushan69@gmail.com",
        "HashedPassword": "69420"
    },
    "signal": {}
}
```
If the user does not exist in the database, an empty JSON will be returned
### Sample Response
```json
[
    {
        "UserID": 20,
        "FirstName": "Verunathan",
        "LastName": "Muthusamy",
        "Email": "verushan69@gmail.com",
        "HashedPassword": "69420"
    }
]
```
## register.php
### Sample Post Request
```json
{
    "data": {
        "FirstName": "Mike",
        "LastName": "Oxmall",
        "Email": "mikeoxmall@gmail.com",
        "HashedPassword": "sdkajs"
    },
    "signal": {}
}
```
### Sample Response
```json
{
    "data": {
        "UserID": 4,
        "FirstName": "Mike",
        "LastName": "Oxmall",
        "Email": "mikeoxmall@gmail.com",
        "HashedPassword": "sdkajs"
    },
    "signal": {}
}
```
## addQuestion.php
### Sample Post request
```json
{
    "data": {
        "UserID": 4,
        "PostTitle": "How to fix a segmentation fault",
        "PostContent": "Can someone explain why values[n] raises  segmentation fault"
    },
    "signal": {}
}
```
## getAllQuestions.php
### Sample response
```json
[
    {
        "PostID": 1,
        "UserID": 1,
        "PostTitle": "How to fix a segmentation fault",
        "PostContent": "Can someone explain why values[n] raises segmentation fault",
        "Solved": 0
    }
]
```
## addAnswer.php
### Sample Post request
```json
{
    "data": {
        "UserID": 4,
        "ParentPostID": 6,
        "AnswerContent": "The array only goes up to index n - 1"
    },
    "signal": {}
}
```
## validateUser.php
### Sample Post request
```json
{
    "data": {
        "Email": "verushannaidoo@gmail.com"
    },
    "signal": {}
}
```
### Sample response
```json
[
    {
        "UserID": 22
    }
]
```
If the user does not exist in the table, an empty JSON string will be returned
## deleteUser.php
### Sample Post request
```json
{
    "data": {
        "UserID": 4
    },
    "signal": {}
}
```
