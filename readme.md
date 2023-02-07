# Contacts Node.js Rest API

This is a public REST API for controlling your phone book. To implement this project was used Data Base MongoDB

### Variables

---

PORT= Port for server run  
JWT_SECRET= Any string to encode the token  
DATABASE_URL= A link to connect to a mongoDB database  
EMAIL= Mail for sending letters using Nodemailer  
PASSWORD= Email password

# Pathes

## Auth operations

================

### Registration

---

**Registration request**

**_@ POST /api/users/register_**

To register a user, you need to submit the email and password fields in the request. Email and password is required!

```sh
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
    }
```

**Registration validation error**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validation error>
```

**Registration conflict error**

```sh
    Status: 409 Conflict
    Content-Type: application/json
    ResponseBody: {
    "message": "Email in use"
    }
```

**Registration success response**

```sh
    Status: 201 Created
    Content-Type: application/json
    ResponseBody: {
    "user": {
    "email": "example@example.com",
    "subscription": "starter"
    }
    }
```

### Login

---

**Login request**

**_@ GET /api/users/login_**

To login a user, you need to submit the email and password fields in the request. Email and password is required!

```sh
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
    }
```

**Login validation error**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validatoin error>
```

**Login verification error**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
        "message":"Email not verified"
    }
```

**Login success response**

```sh
    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "token": "exampletoken",
    "user": {
    "email": "example@example.com",
    "subscription": "starter"
    }
    }
```

**Login auth error**

```sh
    Status: 401 Unauthorized
    ResponseBody: {
    "message": "Email or password is wrong"
    }
```

### Logout

---

**_@ POST /api/users/logout_**

**Logout request**

To log a user out, you only need to pass the token in the authorization header

```sh
    Authorization: "Bearer {{token}}"
```

**Logout unauthorized error**

```sh
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Logout success response**

```sh
    Status: 204 No Content
```

### Current user

---

**Current user request**
**_@ GET /api/users/current_**

```sh
    Authorization: "Bearer {{token}}"
```

**Current user unauthorized error**

```sh
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Current user success response**

```sh
    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "email": "example@example.com",
    "subscription": "starter"
    }
```

### Update subscription

---

**_@ PATCH /api/users_**
**Update subscription request**

```sh
    Authorization: "Bearer {{token}}"
    Content-Type: application/json
    RequestBody: {
    "subscription": "example" // ["starter", "pro", "business"]
    }
```

**Update subscription unauthorized error**

```sh
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Update subscription validation error**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validatoin error>
```

**Update subscription success response**

```sh
    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "_id": "id",
    "password": "hashed password",
    "email": "example@example.com",
    "subscription": "example",
    "avatarURL": "URL",
    "verify": true,
    "verificationToken": null,
    "__v": 0,
    "token": "exampletoken"
}
```

### Update avatar

---

**_@ PATCH /api/users/avatars_**
**Update avatar request**

```sh
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: uploaded file
```

**Update avatar unauthorized error**

```sh
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Update avatar success response**

```sh
    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "avatarURL": "image url"
    }
```

### Verification user email

---

**_GET /api/users/verify/:verificationToken_**

**Verification request**

```sh
    Request parameter: {
    "verificationToken": "string",
    }
```

**Verification user Not Found**

```sh
    Status: 404 Not Found
    ResponseBody: {
    "message": "User not found"
    }
```

**Verification success response**

```sh
    Status: 200 OK
    ResponseBody: {
    "message": "Verification successful"
    }
```

### Resending verification email

---

**_POST /api/users/verify_**

**Resending a email request**

```sh
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com"
    }
```

**Resending a email validation error**

```shell
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validation error>
```

**Resend email for verified user**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": "Verification has already been passed"
    }
```

**Resending a email success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    "message": "Verification email sent"
    }
```

## Contacts operations

=======

**All CRUD operations require that the user be authorized. If the user is not authorized, we will receive an error in the response**

```sh
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

### Get contacts

---

**_@ GET /api/contacts_**
**Get contacts request**

```sh
Request body: No content
```

**Get contacts success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: [ "array of contacts of current user"]
```

### Get contact by ID

---

**_@ GET /api/contacts/:id_**

**Get contact by ID request**

```sh
    Request parameter: {
    "id": "string",
    }
```

**Get contact by ID error response**

```sh
    Status: 404 Not Found
    Content-Type: application/json
    ResponseBody: {
    "message": "Not found"
    }
```

**Get contact by ID success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    "contact"
    }
```

### Create new contact

---

**_@ POST /api/contacts_**

**Create contact request**

```sh
    Content-Type: application/json
    Authorization: "Bearer {{token}}"
    RequestBody: {
    "name":"example",
    "email": "example@example.com",
    "phone":"(099) 777-77-77"
    }
```

**Create contact error response**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": <Validation error message>
    }
```

**Create contact success response**

```sh
    Status: 201 Created
    Content-Type: application/json
    ResponseBody: {
    "_id":"contactID",
    "name":"example",
    "email": "example@example.com",
    "phone":"(099) 777-77-77",
    "favorite":false
    }
```

### Delete contact

---

**_@ DELETE /api/contacts/:id_**

**Delete contact request**

```sh
    Authorization: "Bearer {{token}}"
    Request parameter: {
    "id": "string",
    }
```

**Delete contact error response**

```sh
    Status: 404 Not Found
    Content-Type: application/json
    ResponseBody: {
    "message": "Not found"
    }
```

**Delete contact success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    “message”: “contact deleted”
    }
```

### Update contact

---

**_@ PUT /api/contacts/:id_**
**Update contact request**
(One of name, email, phone in request body is required)

```sh
    Authorization: "Bearer {{token}}"
    Request parameter: {
    "id": "string",
    }
    Request body: {
        "phone":"(099) 888-99-00"
    }
```

**Update contact validation error response**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": <Validation error message>
    }
```

**Update contact error response**

```sh
    Status: 404 Not Found
    Content-Type: application/json
    ResponseBody: {
    "message": "Not found"
    }
```

**Update contact success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    "_id":"contactID",
    "name":"example",
    "email": "example@example.com",
    "phone":"(099) 888-99-00",
    "favorite":false
    }
```

### Update favorite status

**_@ PATCH /api/contacts/:contactId/favorite_**

**Update favorite status request**
(Favorite in request body is required)

```sh
    Authorization: "Bearer {{token}}"
    Request parameter: {
    "id": "string",
    }
    Request body: {
        "favorite":true
    }
```

**Update favorite status validation error response**

```sh
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": <Validation error message>
    }
```

**Update favorite status error response**

```sh
    Status: 404 Not Found
    Content-Type: application/json
    ResponseBody: {
    "message": "Not found"
    }
```

**Update favorite status success response**

```sh
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    "_id":"contactID",
    "name":"example",
    "email": "example@example.com",
    "phone":"(099) 888-99-00",
    "favorite":true
    }
```

### Added pagination for contact collection (**_GET /contacts?page=1&limit=20_**).

_**page** : page number_
_**limit** : the number of contacts on the page_

### Added filtering of contacts by the favorite field (**_GET /contacts?favorite=true_**)
