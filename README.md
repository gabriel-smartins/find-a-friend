# FIND-A-FRIEND
*Connecting Friends, Creating Joy, Instantly*

<p align="left">
  <img src="https://img.shields.io/github/last-commit/gabriel-smartins/find-a-friend?style=for-the-badge" alt="Last Commit"/>
  <img src="https://img.shields.io/badge/typescript-100.0%25-blue?style=for-the-badge" alt="TypeScript 100%"/>
  <img src="https://img.shields.io/github/languages/count/gabriel-smartins/find-a-friend?style=for-the-badge" alt="Languages"/>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv">
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
</p>

---

## Table of Contents
* [Overview](#overview)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)

---

## Overview
FindAFriend is a developer-friendly backend framework tailored for pet adoption and organization management platforms. Built with modern TypeScript, Node.js, and PostgreSQL, it emphasizes security, scalability, and maintainability.

### Why FindAFriend?
This project simplifies building secure, modular APIs with features including:

* 🔐 **Secure Authentication:** JWT-based user and organization login, password management, and role-based access control.
* 🚀 **Modular Architecture:** Clear separation of concerns with use cases, repositories, and factory functions for easy scalability.
* 🧪 **Robust Testing:** Integrated end-to-end testing with Vitest, ensuring reliable and maintainable code.
* 📖 **Comprehensive Documentation:** Guides for API functionalities, business rules, and best practices.
* 📦 **Flexible Data Handling:** Prisma ORM for persistent storage and in-memory repositories for testing.

---

## Getting Started

### Prerequisites
This project requires the following dependencies:

* Programming Language: TypeScript
* Package Manager: Npm
* Container Runtime: Docker

### Installation
Build find-a-friend from the source and install dependencies:

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/gabriel-smartins/find-a-friend](https://github.com/gabriel-smartins/find-a-friend)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd find-a-friend
    ```
3.  **Install the dependencies:**

    Using **docker**:
    ```sh
    docker build -t gabriel-smartins/find-a-friend .
    ```
    Using **npm**:
    ```sh
    npm install
    ```
---
