# Hospital Management System

A full-stack web application built to streamline hospital operations — managing doctors, patients, and appointments through role-based portals for admins, doctors, and patients.

> Built with Spring Boot, React, and PostgreSQL. Secured with JWT authentication.

---

## Tech Stack

**Backend**
- Java 21 + Spring Boot 3.5
- Spring Security with JWT (stateless auth)
- Spring Data JPA + Hibernate
- PostgreSQL 17

**Frontend**
- React 18 + Vite 8
- Tailwind CSS v4
- React Router v7
- Axios

---

## Features

**Admin**
- Dashboard with live stats (doctors, patients, appointments, inquiries)
- Register and manage doctors (with specialization, license, department)
- Manage patients with soft delete to preserve medical history
- Update appointment statuses and view all bookings

**Doctor**
- View today's appointment schedule on login
- Browse appointments by any date using a date picker
- See patient details, visit reasons, and appointment status

**Patient**
- Self-registration and login
- Browse available doctors filtered by specialization
- Book appointments via a 3-step flow — doctor → date/time slot → reason
- View full appointment history with status tracking

**Public**
- Landing page with services, about, and contact sections
- Fully responsive on mobile and desktop

---

## Project Structure

```
hospital-management-system/
├── hms-backend/
│   └── src/main/java/com/codeinloop/hms/
│       ├── config/          # SecurityConfig,
│       ├── security/        # JWT filter, UserDetails
│       ├── entity/          # User, Doctor, Patient, Appointment
│       ├── enums/           # Role, AppointmentStatus, Specialization
│       ├── repository/      # Spring Data JPA interfaces
│       ├── dto/             # Request & response DTOs
│       ├── mapper/          # Entity ↔ DTO conversion
│       ├── service/         # Business logic
│       ├── controller/      # REST endpoints
│       └── exceptionconfig/       # Global error handling
│
└── hms-frontend/
    └── src/
        ├── api/             # Axios instance + API calls
        ├── context/         # Auth state (JWT)
        ├── components/      # Navbar, Layout, Footer, shared UI
        └── pages/
            ├── landing/     # Public website sections
            ├── admin/       # Admin dashboard pages
            ├── doctor/      # Doctor portal pages
            └── patient/     # Patient portal pages
```

---

## Getting Started

### Prerequisites

- Java 21
- Maven 3.9+
- PostgreSQL 15+
- Node.js 20+ and npm 10+

### 1. Clone the repository

```bash
git clone https://github.com/manishchaudhary/hospital-management-system.git
cd hospital-management-system
```

### 2. Set up the database

```bash
psql -U postgres
```

```sql
CREATE DATABASE hospital_db;
CREATE USER hospital_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital_user;
\q
```

### 3. Configure the backend

Copy the example config and fill in your values:

```bash
cd hms
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
spring.datasource.username=hospital_user
spring.datasource.password=yourpassword

jwt.secret=your_256_bit_secret_here
jwt.expiration-ms=86400000

# Use 'create' on first run, then switch to 'validate'
spring.jpa.hibernate.ddl-auto=create
```

### 4. Run the backend

```bash
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

A default admin account has been created manually in the database.

```
Email:    admin@hospital.com
Password: Admin@1234
```

### 5. Run the frontend

```bash
cd ../hospitalManagementApp
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

The Vite proxy forwards all `/api/*` requests to `http://localhost:8080` automatically — no CORS setup needed in development.

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Login — all roles |
| POST | `/api/auth/register` | Public | Patient self-registration |
| POST | `/api/inquiries` | Public | Contact form submission |
| GET | `/api/admin/stats` | Admin | Dashboard statistics |
| POST | `/api/admin/doctors` | Admin | Register a new doctor |
| DELETE | `/api/admin/doctors/{id}` | Admin | Soft-delete a doctor |
| GET | `/api/admin/patients` | Admin | List all patients |
| GET | `/api/inquiries` | Admin | View all inquiries |
| POST | `/api/appointments/book` | Patient | Book an appointment |
| GET | `/api/appointments/patient/{id}` | Patient | View own appointments |
| GET | `/api/doctors/{id}/schedule?date=` | Doctor | View schedule by date |
| PATCH | `/api/appointments/{id}/status` | Admin | Update appointment status |

---

## Environment Variables

### Backend — `application.properties`

| Key | Description |
|-----|-------------|
| `spring.datasource.url` | PostgreSQL JDBC connection string |
| `spring.datasource.username` | Database username |
| `spring.datasource.password` | Database password |
| `jwt.secret` | 256-bit signing secret for JWT tokens |
| `jwt.expiration-ms` | Token validity period in milliseconds |
| `spring.jpa.hibernate.ddl-auto` | `create` on first run, `validate` after |


## User Roles

| Role | Registration | Default Login |
|------|-------------|---------------|
| Admin | Auto-created on first run | `admin@hospital.com` / `Admin@1234` |
| Doctor | Registered by admin via dashboard | Credentials set by admin |
| Patient | Self-register at `/register` | Chosen during signup |

---

## Design Decisions

**Why SINGLE_TABLE inheritance?**
All user types (Admin, Doctor, Patient) share one `users` table differentiated by a `dtype` column. This simplifies queries and avoids unnecessary JOINs for a system where shared fields (email, password, role) far outnumber type-specific ones.

**Why soft delete?**
Patient and doctor records are never hard-deleted. Setting `active = false` preserves all historical appointment data, which is important for medical audits and compliance.

**Slot conflict prevention**
Booking is transactional — the availability check and insert happen atomically. A DB-level `UNIQUE` constraint on `(doctor_id, appointment_date, time_slot)` acts as a final guard against race conditions.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'add: your feature description'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Author

**Manish Chaudhary**
- GitHub: [manishInLoop](https://github.com/manishInLoop)
- LinkedIn: [linkedin.com/in/manishchaudhary](https://www.linkedin.com/in/manish-chaudhary1911/)

---