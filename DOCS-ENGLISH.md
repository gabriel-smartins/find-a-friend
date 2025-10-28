# Requirements Documentation: FindAFriend API

This document describes the functional, business rules, and non-functional requirements for the back-end of the FindAFriend API.

---

## 1. Functional Requirements (FR)

_Functional Requirements describe **what** the system must do (the functionalities)._

### Organization (ORG) Module

- **[FR 01]** The ORG must be able to register in the application (Name, Email, Password, Address, City, Zip Code, Phone/WhatsApp).
- **[FR 02]** The ORG must be able to authenticate in the application (Email, Password).
- **[FR 03]** The ORG must be able to refresh its access token (via Refresh Token).
- **[FR 04]** An authenticated ORG must be able to access its profile with its data (Name, Email, Address, City, Zip Code, Phone/WhatsApp).
- **[FR 05]** An authenticated ORG must be able to update its profile data (Name, Address, City, Zip Code, Phone/WhatsApp).
- **[FR 06]** An authenticated ORG must be able to update its password.
- **[FR 07]** An authenticated ORG must be able to delete its profile.

### Pet Module

- **[FR 08]** An authenticated ORG must be able to register a new PET (Name, Description, Age, Size, Energy Level, City where it is located).
- **[FR 09]** An authenticated ORG must be able to list the PETs it has registered.
- **[FR 10]** An authenticated ORG must be able to update the data of a PET it registered.
- **[FR 11]** An authenticated ORG must be able to delete a PET it registered.
- **[FR 12]** A (public) user must be able to search for PETs by city.
- **[FR 13]** A (public) user must be able to filter PETs (listed by city) by optional characteristics (Age, Size, Energy Level).
- **[FR 14]** A (public) user must be able to view the details of a specific PET.

---

## 2. Business Rules (BR)

_Business Rules describe the **constraints and logic** the system must follow._

### ORG Module (Ref. FR 01, 05, 06, 07)

- **[BR 01]** The ORG's email must be unique in the system.
- **[BR 02]** The ORG's password must be stored encrypted (hash).
- **[BR 03]** An ORG can only authenticate if the email is registered and the password is correct.
- **[BR 04]** An ORG can only update or delete its own profile. (e.g., ORG "A" cannot modify ORG "B"'s data).

### PET Module (Ref. FR 08 - FR 14)

- **[BR 05]** Only an authenticated ORG can register a PET.
- **[BR 06]** The PET must be mandatorily associated with the ORG that registered it.
- **[BR 07]** An ORG can only update or delete a PET that it registered itself.
- **[BR 08]** The search for PETs by city is mandatory (the user _must_ provide the city).
- **[BR 09]** The characteristic filters (age, size, energy) are optional. If not provided, they should not be applied to the search.
- **[BR 10]** When viewing a PET's details, the system must also return the contact information of the ORG responsible for it (especially the Phone/WhatsApp).
- **[BR 11]** The system must return an error if a PET with a non-existent ID is requested.

---

## 3. Non-Functional Requirements (NFR)

_Non-Functional Requirements describe **how** the system must operate and its quality standards._

- **[NFR 01]** The application must be developed in Node.js with TypeScript.
- **[NFR 02]** Data persistence must be handled with PostgreSQL, managed by Prisma ORM.
- **[NFR 03]** The system architecture must follow SOLID principles (especially Dependency Injection and Separation of Concerns with Use Cases and Repositories - _Clean Architecture_).
- **[NFR 04]** Authentication must be JWT-based (JSON Web Tokens), using a short-lived Access Token and a long-lived Refresh Token.
- **[NFR 05]** The Refresh Token must be stored in an `HttpOnly`, `Secure`, and `SameSite` cookie to mitigate XSS attacks.
- **[NFR 06]** Passwords and sensitive data must never be returned in API responses (except for the token) or stored in logs.
- **[NFR 07]** All Use Cases (business logic) must have unit tests (Vitest) with high coverage.
- **[NFR 08]** All API endpoints (controllers) must have End-to-End (E2E) tests with Vitest/Supertest.
- **[NFR 09]** E2E tests must run against a real, isolated PostgreSQL test database that is automatically created and destroyed.
- **[NFR 10]** The application must run in a containerized environment (Docker) in both development and production.
- **[NFR 11]** The application must have a Continuous Integration (CI) pipeline in GitHub Actions that runs linting, unit tests, and E2E tests on every pull request.
- **[NFR 12]** The API must use the Fastify web framework.
- **[NFR 13]** The source code must be standardized using ESLint and Prettier.
- **[NFR 14]** All environment variables must be managed via `.env` files and validated at application startup using Zod.
