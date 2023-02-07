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

```json
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
    }
```

**Registration validation error**

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validation error>
```

**Registration conflict error**

```json
    Status: 409 Conflict
    Content-Type: application/json
    ResponseBody: {
    "message": "Email in use"
    }
```

**Registration success response**

```json
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

```json
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
    }
```

**Login validation error**

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validatoin error>
```

**Login verification error**

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
        "message":"Email not verified"
    }
```

**Login success response**

```json
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

```json
    Status: 401 Unauthorized
    ResponseBody: {
    "message": "Email or password is wrong"
    }
```

### Logout

---

**Logout request**

**_@ POST /api/users/logout_**

```json
    Authorization: "Bearer {{token}}"
```

**Logout unauthorized error**

```json
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Logout success response**

```json
    Status: 204 No Content
```

### Current user

---

**Current user request**
**_@ GET /api/users/current_**

```json
    Authorization: "Bearer {{token}}"
```

**Current user unauthorized error**

```json
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Current user success response**

```json
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

```json
    Authorization: "Bearer {{token}}"
    Content-Type: application/json
    RequestBody: {
    "subscription": "example" // ["starter", "pro", "business"]
    }
```

**Update subscription unauthorized error**

```json
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Update subscription validation error**

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: <Joi validatoin error>
```

**Update subscription success response**

```json
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

```json
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: uploaded file
```

**Update avatar unauthorized error**

```json
    Status: 401 Unauthorized
    Content-Type: application/json
    ResponseBody: {
    "message": "Not authorized"
    }
```

**Update avatar success response**

```json
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

```json
    Request parameter: {
    "verificationToken": "string",
    }
```

**Verification user Not Found**

```json
    Status: 404 Not Found
    ResponseBody: {
    "message": "User not found"
    }
```

**Verification success response**

```json
    Status: 200 OK
    ResponseBody: {
    "message": "Verification successful"
    }
```

### Resending verification email

---

**_POST /api/users/verify_**

**Resending a email request**

```json
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

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": "Verification has already been passed"
    }
```

**Resending a email success response**

```json
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: {
    "message": "Verification email sent"
    }
```

## Contacts operations

=======

**All CRUD operations require that the user be authorized. If the user is not authorized, we will receive an error in the response**

```json
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

```json
Request body: No content
```

**Get contacts success response**

```json
    Status: 200 Ok
    Content-Type: application/json
    ResponseBody: [ "array of contacts of current user"]
```

### Get contact by ID

---

**_@ GET /api/contacts/:id_**

**Get contact by ID request**

```json
    Request parameter: {
    "id": "string",
    }
```

**Get contact by ID error response**

```json
    Status: 400 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "message": "Not found"
    }
```

**Get contact by ID success response**

```json
    Status: 200 Bad Request
    Content-Type: application/json
    ResponseBody: {
    "contact"
    }
```

### Create new contact

---

**_@ POST /api/contacts_**

- Отримує body в форматі {name, email, phone} (усі поля обов'язкові)
- Якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
- За результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201

**_@ DELETE /api/contacts/:id_**

- Не отримує body
- Отримує параметр id
- Повертає json формату {"message": "contact deleted"} і статусом 200
  якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404

**_@ PUT /api/contacts/:id_**

- Отримує параметр id
- Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
- Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404

**_@ PATCH /api/contacts/:contactId/favorite_**

- Отримує параметр contactId
- Отримує body в json-форматі c оновленням поля favorite
- Якщо body немає, повертає json з ключем {"message": "missing field favorite"}і статусом 400
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404

### Зроблено пагінацію для колекції контактів (**_GET /contacts?page=1&limit=20_**).

### Зроблено фільтрацію контактів по полю обраного (**_GET /contacts?favorite=true_**)
