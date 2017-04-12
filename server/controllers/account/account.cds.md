## Account module
    /account

### Login
- Method: `POST`
- URL: `/login`
- Request: `{username: string, password: string}`
- Response: `{}`

### Register
- Method: `POST`
- URL: `/register`
- Request: `{username: string, email: string, password: string}`
- Response: `{id: id}`

### Get Account
- Method: `GET`
- URL: `/:id`
- Response: `{}`

### Edit Account
- Method: `PUT`
- URL: `/:id`
- Response: `{}`

### Delete Account
- Method: `DELETE`
- URL: `/:id`
- Response: `{}`
