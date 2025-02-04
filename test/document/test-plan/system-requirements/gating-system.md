# **Gating System Requirements**

## **1. Backend Requirements**

### **1.1 Invite Code Generation (REQ-01)**
- The system must allow an admin to generate invite codes with configurable usage limits (single-use or multiple-use).
- Each invite code must be unique and trackable.
- Invite codes should be stored securely in the database.

### **1.2 Invite Code Validation (REQ-02)**
- The system must provide an API endpoint to validate an invite code.
- The system should return an error if the invite code is expired or already used.
- Each invite code should be linked to an email to prevent multiple registrations with the same code.

### **1.3 Invite Code Security (REQ-03)**
- Invite codes should be hard to guess but easy to type.
- Codes must be generated with sufficient randomness to prevent brute-force attacks.

### **1.4 Email and Wallet Verification (REQ-04)**
- Each email can only be used with a single invite code.
- Each wallet address can only be used for a single registration.
- The system must provide API endpoints to check whether an email or wallet has already been used.

### **1.5 Tracking & Analytics (REQ-05)**
- The system must track which user (referrer) issued the invite code.
- The admin panel should provide insights into invite code usage and referrer activity.

### **1.6 High Traffic Handling (REQ-06)**
- The system must support multiple concurrent users validating invite codes and registering simultaneously.
- API endpoints should be optimized for low response time and high concurrency.

### **1.7 Security & Protection (REQ-07)**
- Implement rate limiting on API requests to prevent spam and brute-force attempts.
- Protect against SQL injection, XSS, and unauthorized access.

---

## **2. Web3 Gating Mechanism Requirements**

### **2.1 NFT Staking Condition (REQ-08)**
- Users must stake an NFT for at least one week before they can pass the gating requirement.

### **2.2 Delegated Wallet Support (REQ-09)**
- The system must support delegated wallets as proof of ownership.
- Users must be able to sign transactions to verify wallet delegation.

### **2.3 Prevent Multiple Email Registrations (REQ-10)**
- Users should not be able to register multiple emails by simply delegating to different wallets.
- Implement strict tracking to prevent duplicate registrations.

---

## **3. Frontend Requirements**

### **3.1 User Registration Flow (REQ-11)**
- The frontend must provide an interface where users can enter an invite code.
- After entering the invite code, users should be able to connect their wallet and enter their email address.

### **3.2 Form Validation (REQ-12)**
- Validate all user inputs before submitting a reservation.
- Ensure the invite code, email, and wallet address are valid before sending the request.

### **3.3 Error Handling (REQ-13)**
- Handle errors from API responses gracefully.
- Display user-friendly error messages when an invite code, email, or wallet is invalid.

### **3.4 Prevent Multiple Submissions (REQ-14)**
- Prevent users from clicking the submit button multiple times during registration.
- Disable the button while processing the request.

---

## **4. API Requirements**

| API Endpoint | Method | Description | Requirements |
|-------------|--------|-------------|--------------|
| `/api/verifyCode?code={code}` | GET | Verifies if an invite code is valid and not used. | REQ-02 |
| `/api/isEmailUsed?email={email}` | GET | Checks if the email has already been registered. | REQ-04 |
| `/api/isWalletUsed?wallet={wallet}` | GET | Checks if the wallet address has already been used. | REQ-04 |
| `/api/reserve` | POST | Registers a user using an invite code, email, wallet, and signature. | REQ-11, REQ-12, REQ-13 |

---

## **5. Error Handling Requirements**

### **5.1 API Error Handling (REQ-15)**
- The system must return meaningful error messages for all failed API requests.
- Error codes should be standardized (e.g., `400` for bad request, `404` for not found, `429` for rate limit exceeded).

### **5.2 User-Friendly Messages (REQ-16)**
- Errors must be displayed in a user-friendly manner to guide users on corrective actions.
- Example error messages:
    - "Invalid invite code. Please check and try again."
    - "This email has already been used for registration."
    - "You have exceeded the maximum number of attempts. Please try again later."

---

## **6. Security & Performance**

### **6.1 High Traffic Handling (REQ-17)**
- Ensure that the system can handle large-scale concurrent users without performance degradation.
- Implement caching mechanisms where applicable.

### **6.2 Rate Limiting & Security (REQ-18)**
- Implement API rate limiting to prevent abuse.
- Secure all user inputs to prevent SQL injection, XSS, and other attacks.

### **6.3 Logging & Monitoring (REQ-19)**
- All API transactions should be logged for debugging and security auditing.
- The system should provide monitoring for suspicious activities (e.g., excessive failed attempts).
