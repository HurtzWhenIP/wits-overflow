# HTTP Requests

## Base URL

http://34.175.29.208

## login.php

### Sample Requst

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

### Sample Request

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

### Response

None
