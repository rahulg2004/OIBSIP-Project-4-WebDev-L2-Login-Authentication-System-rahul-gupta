# 🔐 Login Authentication System

A responsive client-side Login Authentication System developed as part of the **Oasis Infobyte Web Development & Designing Internship (OIBSIP), Level 2 Task 4**.

The project provides a complete authentication flow with user registration, password validation, duplicate account detection, secure password hashing, login verification, protected dashboard access, and logout functionality.

---

## 📌 Project Overview

The **Login Authentication System** is a front-end authentication application built using **HTML5, CSS3 and Vanilla JavaScript**.

The system allows new users to create an account using a username, email address and password. During registration, the password is validated according to the required security rules and converted into a SHA-256 hash before being stored in the browser's `localStorage`.

Registered users can then log in using either their username or email address. After successful authentication, they are redirected to a protected dashboard. Users who attempt to access the dashboard without an active login session are automatically redirected to the login page.

The project demonstrates fundamental concepts of authentication, client-side validation, browser storage, password hashing, session handling and protected page access.

---

## 🎯 Internship Task

**Organisation:** Oasis Infobyte
**Internship:** Web Development & Designing Internship
**Programme:** OIBSIP
**Level:** Level 2
**Task:** Task 4 - Login Authentication System
**Project Type:** Front-End Authentication System

The task requires a simple authentication system featuring:

* User registration
* Login validation
* Password validation
* Duplicate username/email checking
* Protected dashboard access
* Logout functionality
* Password hashing
* Basic form validation

---

## ✨ Key Features

### 👤 User Registration

Users can create a new account by providing:

* Username
* Email address
* Password
* Confirm password

The registration system checks all required fields before creating the account.

### 🔐 Password Validation

The system requires passwords to:

* Contain at least 8 characters
* Contain at least 1 number
* Match the confirmation password

Invalid passwords are rejected with clear validation messages.

### 🚫 Duplicate Account Detection

Before creating an account, the system checks existing users stored in `localStorage`.

It prevents registration when:

* The username already exists
* The email address already exists

The comparison is case-insensitive.

### 🔑 Login Authentication

Users can log in using either:

* Username
* Email address

The entered password is hashed using SHA-256 and compared with the stored password hash.

### ⚠️ Invalid Credential Handling

If incorrect credentials are entered, the system displays a generic error message:

> Invalid username/email or password.

The application does not reveal whether the username/email or password was incorrect.

### 🛡️ Protected Dashboard

The dashboard is protected using a client-side session.

If a user tries to open the dashboard without logging in, they are automatically redirected to the login page.

### 🚪 Logout

The logout button removes the active user session from `localStorage` and redirects the user back to the login page.

### 🔒 Password Hashing

Passwords are never stored directly in plain text.

Before storage, the password is converted into a SHA-256 hash using the browser's Web Crypto API.

### 👁️ Password Visibility Toggle

Password fields include a visibility toggle, allowing users to show or hide their password while entering it.

### 📱 Responsive Design

The interface is responsive and adapts to:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Browser APIs

* Web Crypto API
* Local Storage API

### Development Tools

* Visual Studio Code
* Google Chrome / Microsoft Edge
* Git
* GitHub

---

## 📂 Project Structure

```text
WebDev-L2-Task4-LoginAuthentication/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── auth.js
└── README.md
```

### File Description

| File             | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `index.html`     | Login page                                            |
| `register.html`  | User registration page                                |
| `dashboard.html` | Protected user dashboard                              |
| `style.css`      | Complete styling and responsive design                |
| `auth.js`        | Authentication, validation, hashing and session logic |
| `README.md`      | Project documentation                                 |

---

## 🔄 Application Flow

```text
                    ┌──────────────────┐
                    │    Login Page    │
                    │    index.html    │
                    └────────┬─────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
            New User                Existing User
                 │                       │
                 ▼                       ▼
       ┌─────────────────┐      ┌─────────────────┐
       │ Registration    │      │ Login           │
       │ register.html   │      │ Validation      │
       └────────┬────────┘      └────────┬────────┘
                │                        │
                ▼                        ▼
       Validate Form             Find Registered User
                │                        │
                ▼                        ▼
       Check Duplicate             Hash Password
                │                        │
                ▼                        ▼
       SHA-256 Password            Compare Hashes
             Hashing                     │
                │                ┌───────┴───────┐
                ▼                │               │
        Save User Data        Incorrect       Correct
        to localStorage          │               │
                │                ▼               ▼
                ▼           Show Error     Create Session
        Redirect to Login                       │
                                                ▼
                                      ┌─────────────────┐
                                      │ Protected       │
                                      │ Dashboard       │
                                      └────────┬────────┘
                                               │
                                               ▼
                                           Logout
                                               │
                                               ▼
                                      Remove Session
                                               │
                                               ▼
                                         Login Page
```

---

## 📝 Registration Process

The registration process follows these steps:

1. User opens the registration page.
2. User enters a username.
3. User enters an email address.
4. User enters a password.
5. User confirms the password.
6. The form checks for empty fields.
7. Username length is validated.
8. Email format is validated.
9. Password requirements are checked.
10. Password confirmation is compared.
11. Existing users are checked for duplicate username/email.
12. Password is converted into a SHA-256 hash.
13. User information is stored in `localStorage`.
14. User is redirected to the login page.

Example stored structure:

```json
{
    "username": "rahul",
    "email": "rahul@example.com",
    "passwordHash": "SHA-256_HASH_VALUE"
}
```

The original password is not stored.

---

## 🔑 Login Process

The login process works as follows:

1. User enters their username or email.
2. User enters their password.
3. Empty fields are validated.
4. The system searches for the corresponding registered user.
5. The entered password is converted into a SHA-256 hash.
6. The generated hash is compared with the stored hash.
7. If the credentials are correct, a session is created.
8. The user is redirected to the dashboard.
9. If authentication fails, a generic error message is displayed.

---

## 🛡️ Dashboard Protection

The dashboard checks whether a valid `currentUser` session exists in `localStorage`.

If the session exists:

```text
Login → Dashboard
```

If the session does not exist:

```text
Direct Dashboard Access → Login Page
```

This prevents unauthenticated users from accessing the protected dashboard through normal application navigation.

---

## 🚪 Logout Process

When the user clicks the **Logout** button:

1. The `currentUser` session is removed.
2. The authentication state is cleared.
3. The user is redirected to the login page.
4. Opening the dashboard again requires a new login.

---

## 🔐 Password Security

The project uses the browser's **Web Crypto API** to generate a SHA-256 hash.

The basic process is:

```text
Original Password
       ↓
   SHA-256
       ↓
Password Hash
       ↓
localStorage
```

For example:

```text
Password:
Rahul123

Stored:
SHA-256 hash instead of Rahul123
```

This prevents the original password from being directly stored in the application's local storage.

---

## 💾 Local Storage Data

The application uses two main `localStorage` entries.

### Users

```text
users
```

This stores registered user information.

Example:

```json
[
    {
        "username": "rahul",
        "email": "rahul@example.com",
        "passwordHash": "hashed-password"
    }
]
```

### Current User

```text
currentUser
```

This stores the currently authenticated user's basic information.

Example:

```json
{
    "username": "rahul",
    "email": "rahul@example.com"
}
```

---

## 🧪 Testing Checklist

The application was designed to test the following scenarios.

### Registration Testing

* [x] Empty username validation
* [x] Short username validation
* [x] Empty email validation
* [x] Invalid email validation
* [x] Empty password validation
* [x] Password length validation
* [x] Password number requirement
* [x] Confirm password validation
* [x] Password mismatch validation
* [x] Duplicate username detection
* [x] Duplicate email detection
* [x] Successful registration

### Login Testing

* [x] Empty username/email validation
* [x] Empty password validation
* [x] Invalid credentials handling
* [x] Username login
* [x] Email login
* [x] Correct password verification
* [x] Successful authentication

### Dashboard Testing

* [x] Dashboard accessible after login
* [x] User information displayed
* [x] Direct dashboard access without login blocked
* [x] Automatic redirect to login
* [x] Logout functionality
* [x] Session removal after logout

### Security Testing

* [x] Passwords are not stored as plain text
* [x] SHA-256 hashing implemented
* [x] Generic login error message
* [x] Duplicate accounts prevented

---

## ▶️ How to Run

### Method 1: VS Code + Live Server

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if required.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The login page will open in your browser.

### Method 2: Direct Browser

You can also open:

```text
index.html
```

directly in a modern browser.

For the best development/testing experience, using a local server such as VS Code Live Server is recommended.

---

## 💻 Example Test Account

You can create an account using:

```text
Username: rahul
Email: rahul@example.com
Password: Rahul123
```

The password satisfies the required conditions:

```text
8+ characters: Yes
Contains number: Yes
```

---

## 📸 Screenshots

Add your project screenshots below after completing the project.

### 1. Login Page

```text
Add screenshot here
```

### 2. Registration Page

```text
Add screenshot here
```

### 3. Registration Validation

```text
Add screenshot here
```

### 4. Successful Login

```text
Add screenshot here
```

### 5. Protected Dashboard

```text
Add screenshot here
```

### 6. Logout / Redirect

```text
Add screenshot here
```

### 7. Local Storage Password Hash

```text
Add screenshot here
```

---

## 🎥 Demo Video

The project demo should demonstrate the complete authentication flow:

```text
1. Title Card
      ↓
2. Registration
      ↓
3. Form Validation
      ↓
4. Successful Registration
      ↓
5. Login
      ↓
6. Protected Dashboard
      ↓
7. Direct Dashboard Access Test
      ↓
8. Logout
```

The demonstration should show the application functioning end-to-end rather than only displaying screenshots.

---

## 📚 Concepts Demonstrated

This project helped demonstrate practical understanding of:

* HTML forms
* Form validation
* CSS responsive design
* JavaScript DOM manipulation
* JavaScript event handling
* Local Storage
* Authentication flow
* Session management
* Password hashing
* SHA-256
* Web Crypto API
* Conditional page access
* Error handling
* User feedback
* Responsive UI design

---

## 🎓 Learning Outcomes

Through this project, I gained practical experience in building a complete client-side authentication workflow.

I learned how to design registration and login forms, implement validation rules, handle user data using browser storage, generate password hashes using the Web Crypto API, manage login sessions, protect authenticated pages and implement logout functionality.

The project also strengthened my understanding of JavaScript DOM manipulation, asynchronous functions, browser APIs, responsive CSS and basic authentication concepts.

---

## ⚠️ Security & Project Limitations

This project uses the **front-end-only authentication approach** permitted for the internship task.

Because the application uses `localStorage` and client-side JavaScript, it should **not be considered production-grade authentication**.

A real-world authentication system should use:

* A secure backend server
* Server-side password hashing
* Secure database storage
* HTTPS
* Secure HTTP-only cookies
* Session management on the server
* CSRF protection
* Rate limiting
* Account recovery mechanisms
* Additional security controls

The SHA-256 implementation in this project demonstrates the required password-hashing concept for the client-side internship project, but production password storage should use a password-specific hashing algorithm such as bcrypt, Argon2 or scrypt on the server.

---

## 🚀 Future Improvements

The project can be extended with:

* Backend authentication
* MySQL or SQLite database
* Node.js/Express authentication
* Flask authentication
* bcrypt or Argon2 password hashing
* Email verification
* Forgot password functionality
* Password reset
* Remember-me functionality
* User profile management
* Role-based authentication
* Admin dashboard
* JWT or server-side session authentication
* Two-factor authentication
* Account lockout and rate limiting

---

## 📁 Repository Structure

The project is intended to be submitted as part of the OIBSIP repository.

```text
OIBSIP/
│
├── WebDev-L2-Task1-Calculator/
│
├── WebDev-L2-Task2-TributePage/
│
└── WebDev-L2-Task4-LoginAuthentication/
    │
    ├── index.html
    ├── register.html
    ├── dashboard.html
    ├── style.css
    ├── auth.js
    └── README.md
```

---

## 👨‍💻 Developer

**Rahul Gupta**

B.Sc. (Hons) Computer Science
University of Delhi

**Track:** Web Development & Designing
**Internship:** Oasis Infobyte (OIBSIP)

---

## 🔗 GitHub

🔗 GitHub🚀 : [Add your repository link]

---

## 🏷️ Keywords

HTML5, CSS3, JavaScript, Authentication System, Login System, Registration System, Local Storage, SHA-256, Web Crypto API, Form Validation, Responsive Web Design, Front-End Development, OIBSIP, Oasis Infobyte, Web Development, JavaScript Authentication

---

## ⭐ Acknowledgement

This project was developed as part of the **Oasis Infobyte Web Development & Designing Internship Programme (OIBSIP)**.

The project provided practical exposure to front-end development, authentication concepts, JavaScript programming, browser storage and responsive web design.
