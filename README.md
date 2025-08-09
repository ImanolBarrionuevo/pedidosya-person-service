# PedidosYa Person Service

## 📝 Description
Microservice responsible for managing personal user data within the PedidosYa system. Developed using NestJS and TypeScript, following clean architecture principles.

## 🧩 Features
- Full CRUD operations for person entities.
- Hierarchical location management: cities, provinces, countries.
- Robust input validation and centralized error handling.

## 🗃️ Database Schema

The following schema illustrates how personal and geographic data are structured and related:

<p align="center">
  <img src="/pedidosya-repositorios/pedidosya-person-service/der/der.png" width="400" alt="Entity Relationship Diagram">
</p>

This service uses the following relational structure to manage personal and geographic data:

**Entities:**
- Persons: Stores user personal data.
- Cities, Provinces, Countries: Used to normalize location data and support hierarchical geographic relationships.

**Relationships:**
- Each person belongs to a city.
- Each city belongs to a province.
- Each province belongs to a country.

## ⚙️ Tech Stack

- **Backend Framework:** NestJS  
- **Language:** TypeScript  
- **Database:** PostgreSQL

## 🚀 Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run start:dev
   ```

3. (Optional) Set up environment variables in a .env file if required.

## 🧪 Testing

To execute unit tests:

   ```bash
   npm run test
   ```

## 🔗 Related Repositories

🔐 [Auth Service](https://github.com/ImanolBarrionuevo/pedidosya-auth-service): Handles authentication and JWT token issuance.
🖥️ [User UI](https://github.com/ImanolBarrionuevo/pedidosya-user-ui): Frontend interface for user interaction.

## 👨‍💻 Credits

This project was collaboratively developed by Group G as part of the Software Development course at UTN FRVM. All members contributed equally to planning, implementation, and documentation.

**Team Members:**
- [@ImanolBarrionuevo](https://github.com/ImanolBarrionuevo)
- [@tomigambino](https://github.com/tomigambino)
- [@gabrieldiaz8](https://github.com/gabrieldiaz8)
- [@MateoBroilo](https://github.com/MateoBroilo)
- [@LolitoGlezz](https://github.com/LolitoGlezz)