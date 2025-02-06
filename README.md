# **Will Guardian - Backend API**
**Will Guardian** is a **Node.js** backend system that periodically checks for user inactivity and triggers **email notifications** and **will execution** if the user is considered inactive for a specified period.

## **Features**
✅ **User Authentication** (Register, Login, JWT-based auth)  
✅ **User-Defined Inactivity Period** (Set how long before considered inactive)  
✅ **Automated Email Reminders** (Notify users before they are marked inactive)  
✅ **Will Management** (Upload and retrieve last will)  
✅ **Executor Management** (Assign executors for will execution)  
✅ **Email Tracking** (Detect if executors opened the will email)  
✅ **System Logging Middleware** (Monitor API activity)  

---

## **1. Installation**
### **Prerequisites**
- Node.js (`v16+`)
- SQLite (`v3+`)

### **1.1 Clone the Repository**
```sh
git clone https://github.com/your-username/will-guardian.git
cd will-guardian
```

### **1.2 Install Dependencies**
```sh
npm install
```

### **1.3 Create `.env` File**
Create a `.env` file in the project root with the following variables:

```
PORT=5000
SECRET_KEY=myverysecuresecret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### **1.4 Start the Server**
```sh
npm start
```

For development with auto-restart, use:
```sh
npm run dev
```

---

## **2. API Endpoints**
### **2.1 Authentication**
#### **Register a New User**
```http
POST /api/auth/register
```
**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**
```json
{
  "token": "your-jwt-token",
  "message": "User registered successfully"
}
```

#### **Login**
```http
POST /api/auth/login
```
**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**
```json
{
  "token": "your-jwt-token",
  "message": "Logged in successfully"
}
```

### **2.2 Will Management**
#### **Upload Will**
```http
POST /api/will
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```
**Request Body**
```json
{
  "document": "This is my last will."
}
```
**Response**
```json
{
  "message": "Will saved successfully"
}
```

#### **Retrieve Will**
```http
GET /api/will
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
```
**Response**
```json
{
  "document": "This is my last will."
}
```

### **2.3 Executor Management**
#### **Add Executor**
```http
POST /api/executor
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```
**Request Body**
```json
{
  "executor_email": "executor@example.com"
}
```
**Response**
```json
{
  "message": "Executor added successfully"
}
```

#### **Retrieve Executors**
```http
GET /api/executors
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
```
**Response**
```json
[
  {
    "executor_email": "executor1@example.com"
  },
  {
    "executor_email": "executor2@example.com"
  }
]
```

### **2.4 Inactivity Tracking**
#### **Mark User as Alive (Extend Inactivity Deadline)**
```http
POST /api/alive
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
```
**Response**
```json
{
  "message": "Status updated, inactivity deadline extended."
}
```

#### **Update Inactivity Period**
```http
PUT /api/inactivity-period
```
**Request Headers**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```
**Request Body**
```json
{
  "inactivity_period_days": 60
}
```
**Response**
```json
{
  "message": "Inactivity period updated successfully."
}
```

### **2.5 Email Tracking**
#### **Track Email Open (No Auth Required)**
```http
GET /api/track-email/:id
```
**Response**
```json
{
  "message": "Email open status recorded."
}
```

---

## **3. Logging & Monitoring**
All API requests and responses are logged in `logs/api.log`.  
Example log entry:
```json
{
  "timestamp": "2024-02-05T12:30:00.123Z",
  "method": "POST",
  "url": "/api/auth/register",
  "body": { "email": "newuser@example.com", "password": "*****" },
  "headers": { "user-agent": "curl/7.64.1" },
  "status": 400,
  "response": { "message": "User already exists" },
  "responseTime": "5ms"
}
```

---

## **4. Next Steps**
- **Automate Will Execution for Deceased Users**
- **Handle Alternative Executors If Emails Are Unopened**
- **Enhance Admin Monitoring Tools**
