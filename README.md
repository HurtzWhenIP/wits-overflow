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

## removeUser.php

### Sample Post request

```json
{
    "data": {
        "UserID": 4
    },
    "signal": {}
}
```
