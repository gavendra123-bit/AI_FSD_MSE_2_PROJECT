# Thunder Client Guide

Use this guide to test the Lost & Found backend directly in VS Code using the Thunder Client extension.

## Base URL

Local backend base URL:

```text
http://localhost:5000/api
```

Render backend base URL example:

```text
https://your-backend-name.onrender.com/api
```

## Recommended Order

1. Register User
2. Login User
3. Copy token from login response
4. Test `GET /api/dashboard`
5. Add item
6. Get all items
7. Get item by ID
8. Update item
9. Search item
10. Delete item
11. Test unauthorized access screenshot

## 1. Register User

- Method: `POST`
- URL: `http://localhost:5000/api/register`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "password": "123456"
}
```

## 2. Login User

- Method: `POST`
- URL: `http://localhost:5000/api/login`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "email": "aman@example.com",
  "password": "123456"
}
```

After login, copy the `token` from the response and use it in the next protected requests as:

```text
Authorization: Bearer YOUR_TOKEN
```

## 3. Protected Dashboard

- Method: `GET`
- URL: `http://localhost:5000/api/dashboard`
- Headers:
  - `Authorization: Bearer YOUR_TOKEN`

## 4. Add Item

- Method: `POST`
- URL: `http://localhost:5000/api/items`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN`
- Body:

```json
{
  "itemName": "Black Wallet",
  "description": "Wallet lost near library block",
  "type": "Lost",
  "category": "Accessories",
  "location": "Central Library",
  "date": "2026-04-23",
  "contactInfo": "+91-9876543210"
}
```

Save the `_id` from the response for the next requests.

## 5. Get All Items

- Method: `GET`
- URL: `http://localhost:5000/api/items`

## 6. Get Item By ID

- Method: `GET`
- URL:

```text
http://localhost:5000/api/items/ITEM_ID_HERE
```

## 7. Update Item

- Method: `PUT`
- URL:

```text
http://localhost:5000/api/items/ITEM_ID_HERE
```

- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN`
- Body:

```json
{
  "itemName": "Black Wallet",
  "description": "Wallet updated after checking classroom area",
  "type": "Lost",
  "category": "Accessories",
  "location": "Classroom B-204",
  "date": "2026-04-23",
  "contactInfo": "+91-9876543210"
}
```

## 8. Delete Item

- Method: `DELETE`
- URL:

```text
http://localhost:5000/api/items/ITEM_ID_HERE
```

- Headers:
  - `Authorization: Bearer YOUR_TOKEN`

## 9. Search Item

- Method: `GET`
- URL:

```text
http://localhost:5000/api/items/search?name=wallet&category=Accessories
```

## 10. Unauthorized Access Screenshot

For your report, also take one error screenshot:

- Method: `GET`
- URL: `http://localhost:5000/api/dashboard`
- Do not send token

Expected response:

```json
{
  "message": "Unauthorized access. Token missing."
}
```

## Thunder Client Setup Tips

- Install the `Thunder Client` extension in VS Code
- Open the Thunder Client sidebar
- Create a new request for each endpoint above
- Use `JSON` body type for `POST` and `PUT`
- Add headers exactly as shown above
- Keep one screenshot for request and one for response when needed

## Report Screenshots Checklist

- Register success
- Login success with token
- Dashboard with token
- Add item success
- Get all items
- Get item by ID
- Update item success
- Delete item success
- Search item result
- Unauthorized access error
