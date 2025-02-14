# InflosoAI Assignment Completion Doc  
**(Login and Signup App using React.js, Node.js, and JWT)**

---

## **Back End - Node.js & Express.js**

### 1. **Database:**
- MongoDB is used as the database.
- Mongoose library is utilized for seamless interaction with MongoDB.
- The MongoDB connection string is securely stored in the `.env` file to keep sensitive data private.

---

### 2. **Signup:**
- **POST API** for user registration has been successfully implemented.
- The Signup API incorporates **JWT authentication** for secure user registration.
- **jsonwebtoken** library is used to generate the JWT token upon successful signup.
- Password hashing is handled securely using the **bcryptjs** library.
- **Email verification** functionality is implemented using **Nodemailer**.
- **Rate limiting** is in place to prevent abuse during the signup process.
- Robust **error handling** is applied to manage different edge cases and improve user experience.
- **API Endpoint:** `http://localhost:5000/api/auth/register`

#### How to Use:
1. Clone the project from GitHub and navigate to the project directory.
2. Open the terminal and run the command: `node server.js`
3. Open **Postman** and select the `POST` method.
4. Enter the URL: `http://localhost:5000/api/auth/register`.
5. Upon successful registration, you will receive a **JWT token** and an **email verification link** at the registered email address (check your spam folder).
6. Click the verification link to confirm your email address and complete the registration process.

---

### 3. **Login:**
- **POST API** for user login has been successfully created.
- **JWT authentication** is integrated to ensure secure login.
- The **jsonwebtoken** library is used to generate a JWT token upon successful login.
- **Email verification middleware** ensures that only verified users can log in.
- **Rate limiting** is implemented to protect the login endpoint from abuse.
- **Error handling** is in place for failed login attempts.
- **API Endpoint:** `http://localhost:5000/api/auth/login`

#### How to Use:
1. Clone the project from GitHub and navigate to the project directory.
2. Open the terminal and run the command: `node server.js`
3. Open **Postman** and select the `POST` method.
4. Enter the URL: `http://localhost:5000/api/auth/login`.
5. Upon successful login, a **JWT token** will be returned.
6. Use this JWT token to access all JWT-secured API endpoints.

---

### 4. **Password Reset Functionality:**
- **Nodemailer** is used to send a password reset link to the user's registered email address.
- **JWT token** is used to securely reset the password.
- The new password is hashed using **bcrypt.js** before saving it to the database.
- **API Endpoint for requesting a password reset:** `http://localhost:5000/api/auth/request-password-reset`
- **API Endpoint for resetting the password:** `http://localhost:5000/api/auth/reset-password/:token`

#### How to Use:
1. Clone the project and navigate to the project directory.
2. Open the terminal and run the command: `node server.js`
3. Open **Postman** and select the `POST` method.
4. Request the URL: `http://localhost:5000/api/auth/request-password-reset`.
5. You will receive a password reset link at your registered email address.
6. Add the new password in the request body.
7. Then, request the URL: `http://localhost:5000/api/auth/reset-password/:token`.
8. Replace `:token` with the token received in the email.
9. The new password will be hashed and stored securely.

---

### 5. **Additional Points:**
- The backend server is deployed on **Render Cloud Server** for public access.
- The project has been uploaded to **GitHub**, and the repository is connected to **Render** for continuous deployment.

---

## **Front End - React.js with Vite**

### 1. **Signup Page:**
- **Axios** library is used to make API requests for the signup process.
- The **React Icon** library is utilized for icons, and **React Router** is used for routing and navigation.
- Users are prompted to enter **username**, **email**, **password**, and **profile picture**.
- A **Terms and Conditions** checkbox is included to ensure user consent during registration.
- After submitting the form, a **welcome email** with an **email verification link** is sent to the user's email.

### 2. **Login Page:**
- **Axios** is used to send API requests for logging the user in.
- The **useState** hook is employed to manage login credentials (username/email and password).
- A **Forgot Password** functionality is implemented. Clicking on "Forgot Password" navigates the user to the password reset page.
- **Remember Me** functionality is added, which stores the user's credentials in **localStorage** for future use.

---

### **Additional Frontend Improvements:**
- **Responsive Design:** The UI is built to be responsive across different devices (desktop, tablet, mobile) using **Tailwind CSS**.
- **Form Validation:** Validation is implemented on both the frontend and backend to ensure secure and valid data is submitted.
- **Error Handling:** Error messages are displayed clearly for both successful and failed form submissions.

---

### **Pending Improvements / Future Enhancements:**
- **Password Strength Validation:** Implement stronger password policies and feedback on password strength for both the frontend and backend.
- **Token Expiration & Refresh:** Add a token expiration mechanism with a refresh token functionality to ensure secure sessions.
- **Unit Testing:** Write unit tests for both backend API routes (using tools like **Jest** or **Mocha**) and frontend components (using **React Testing Library**).
- **Security Enhancements:**
  - Ensure sensitive data is encrypted and environment variables are managed securely.
  - Use **HTTPS** for encrypted communication in production.
- **UI/UX Enhancements:**
  - Add **microinteractions** and animations using libraries like **Framer Motion** to enhance the user experience.
  - Implement a **Show/Hide Password** toggle to improve usability on password fields.
- **API Documentation:** Provide documentation for the backend API, using tools like **Swagger** or **Postman**, to make it easier for other developers to integrate with the API.

---

## **Conclusion:**
This project successfully demonstrates a secure and responsive login and signup system using **React.js**, **Node.js**, and **JWT authentication**. The implementation includes essential features like email verification, password hashing, rate limiting, and JWT-based authentication, with a focus on security and user experience. There are further improvements planned, such as adding password strength validation, implementing token refresh functionality, and writing unit tests to ensure the robustness of the system.

---

## **How to Run:**

### **Backend:**
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables in a `.env` file (e.g., MongoDB URI, JWT secret).
4. Run the command `node server.js` to start the backend server.
5. Test API endpoints using **Postman**.

### **Frontend:**
1. Clone the repository for the frontend.
2. Run `npm install` to install dependencies.
3. Start the development server using `npm run dev`.
4. The frontend will be accessible at `http://localhost:5173`.

