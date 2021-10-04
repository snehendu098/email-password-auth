# Simple Authentication

This is a simple authentication system based on email and password made using node, express and mongoose.

## API Reference

#### Sign In user

```http
  POST /api/auth/signup
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `email`    | `string` | **Required** at the body of request |
| `password` | `string` | **Required** at the body of request |
| `name`     | `string` | **Required** at the body of request |

**Returns the auth-token**

#### Example

` { name: test01, email: test01@test.com, password: test01 }`

#### Login with email and passwrod

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `email`    | `string` | **Required** at the body of request |
| `password` | `string` | **Required** at the body of request |

**Returns the auth-token**

#### Get the user data

```http
  POST /api/auth/userdata
```

##### A **middleware** is present here which requires a header for validation

| Header       | value   | Description                                                  |
| :----------- | :------ | :----------------------------------------------------------- |
| `auth-token` | `token` | **Required**. After LogIn or SignUp, you will get this token |

## Authors

- [@snehendu098](https://github.com/snehendu098)
