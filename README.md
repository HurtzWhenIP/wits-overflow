# HTTP Requests

## Base URL

http://34.175.29.208

## login.php

### Sample Request

```json
{
    "data": {
        "Email": "sample@gmail.com"
    },
    "signal": {}
}
```

### Sample Response

```json
[
    {
        "UserID": 12,
        "FirstName": "Simple",
        "LastName": "Sample",
        "Email": "sample@gmail.com",
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
