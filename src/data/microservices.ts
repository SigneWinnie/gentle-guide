export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  requestBody?: string;
  response?: string;
}

export interface DatabaseTable {
  name: string;
  columns: { name: string; type: string; constraints: string }[];
}

export interface Microservice {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  port: number;
  logicalArchitecture: string[];
  softwareArchitecture: {
    layers: { name: string; description: string }[];
    techStack: string[];
  };
  database: DatabaseTable[];
  apis: ApiEndpoint[];
}

export const microservices: Microservice[] = [
  {
    id: "student",
    name: "Student Management Service",
    shortName: "Students",
    description: "Handles CRUD operations for student profiles, personal information, and academic records.",
    icon: "GraduationCap",
    color: "primary",
    port: 8081,
    logicalArchitecture: [
      "Presentation Layer: REST API Controllers",
      "Business Logic Layer: Student service, validation, business rules",
      "Data Access Layer: Student repository, ORM mapping",
      "Database Layer: Student database (PostgreSQL)"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "StudentController – exposes REST endpoints" },
        { name: "Service", description: "StudentService – business logic, validation" },
        { name: "Repository", description: "StudentRepository – JPA/Hibernate data access" },
        { name: "Model", description: "Student entity, DTOs, mappers" },
      ],
      techStack: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Lombok", "MapStruct"],
    },
    database: [
      {
        name: "students",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "matricule", type: "VARCHAR(20)", constraints: "UNIQUE, NOT NULL" },
          { name: "first_name", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "last_name", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "email", type: "VARCHAR(150)", constraints: "UNIQUE, NOT NULL" },
          { name: "phone", type: "VARCHAR(20)", constraints: "" },
          { name: "date_of_birth", type: "DATE", constraints: "NOT NULL" },
          { name: "gender", type: "ENUM('M','F')", constraints: "NOT NULL" },
          { name: "address", type: "TEXT", constraints: "" },
          { name: "department", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "level", type: "VARCHAR(10)", constraints: "NOT NULL" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
          { name: "updated_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
      },
    ],
    apis: [
      { method: "GET", path: "/api/students", description: "Get all students (paginated)", response: "Page<StudentDTO>" },
      { method: "GET", path: "/api/students/{id}", description: "Get student by ID", response: "StudentDTO" },
      { method: "GET", path: "/api/students/matricule/{matricule}", description: "Get student by matricule", response: "StudentDTO" },
      { method: "POST", path: "/api/students", description: "Create a new student", requestBody: "CreateStudentRequest", response: "StudentDTO" },
      { method: "PUT", path: "/api/students/{id}", description: "Update student info", requestBody: "UpdateStudentRequest", response: "StudentDTO" },
      { method: "DELETE", path: "/api/students/{id}", description: "Delete a student", response: "void" },
      { method: "GET", path: "/api/students/search?q={query}", description: "Search students by name or matricule", response: "List<StudentDTO>" },
    ],
  },
  {
    id: "registration",
    name: "Registration Management Service",
    shortName: "Registrations",
    description: "Manages student registrations per academic year, program enrollment, and fee tracking.",
    icon: "ClipboardList",
    color: "secondary",
    port: 8082,
    logicalArchitecture: [
      "Presentation Layer: REST API Controllers",
      "Business Logic Layer: Registration service, fee calculation, validation",
      "Data Access Layer: Registration repository",
      "Database Layer: Registration database (PostgreSQL)",
      "Integration Layer: Communicates with Student Service & Email Service"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "RegistrationController – REST endpoints for enrollment" },
        { name: "Service", description: "RegistrationService – enrollment logic, fee management" },
        { name: "Repository", description: "RegistrationRepository – data persistence" },
        { name: "Client", description: "StudentServiceClient – Feign client to Student MS" },
      ],
      techStack: ["Spring Boot", "Spring Data JPA", "OpenFeign", "PostgreSQL"],
    },
    database: [
      {
        name: "registrations",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "student_id", type: "BIGINT", constraints: "NOT NULL (FK → students)" },
          { name: "academic_year", type: "VARCHAR(9)", constraints: "NOT NULL" },
          { name: "program", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "level", type: "VARCHAR(10)", constraints: "NOT NULL" },
          { name: "registration_date", type: "DATE", constraints: "DEFAULT CURRENT_DATE" },
          { name: "status", type: "ENUM('PENDING','CONFIRMED','CANCELLED')", constraints: "DEFAULT 'PENDING'" },
          { name: "total_fee", type: "DECIMAL(10,2)", constraints: "NOT NULL" },
          { name: "amount_paid", type: "DECIMAL(10,2)", constraints: "DEFAULT 0" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
      },
    ],
    apis: [
      { method: "GET", path: "/api/registrations", description: "Get all registrations (paginated)", response: "Page<RegistrationDTO>" },
      { method: "GET", path: "/api/registrations/{id}", description: "Get registration by ID", response: "RegistrationDTO" },
      { method: "GET", path: "/api/registrations/student/{studentId}", description: "Get registrations by student", response: "List<RegistrationDTO>" },
      { method: "POST", path: "/api/registrations", description: "Register a student", requestBody: "CreateRegistrationRequest", response: "RegistrationDTO" },
      { method: "PUT", path: "/api/registrations/{id}/status", description: "Update registration status", requestBody: "StatusUpdateRequest", response: "RegistrationDTO" },
      { method: "PATCH", path: "/api/registrations/{id}/payment", description: "Record a payment", requestBody: "PaymentRequest", response: "RegistrationDTO" },
      { method: "DELETE", path: "/api/registrations/{id}", description: "Cancel a registration", response: "void" },
    ],
  },
  {
    id: "grades",
    name: "Grade Management Service",
    shortName: "Grades",
    description: "Manages courses, exams, and student grades with GPA calculation.",
    icon: "FileText",
    color: "accent",
    port: 8083,
    logicalArchitecture: [
      "Presentation Layer: REST API Controllers",
      "Business Logic Layer: Grade service, GPA calculation, statistics",
      "Data Access Layer: Grade & Course repositories",
      "Database Layer: Grades database (PostgreSQL)",
      "Integration Layer: Communicates with Student Service"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "GradeController, CourseController – REST endpoints" },
        { name: "Service", description: "GradeService – grade CRUD, GPA calc, transcript generation" },
        { name: "Repository", description: "GradeRepository, CourseRepository" },
        { name: "Client", description: "StudentServiceClient – Feign client to Student MS" },
      ],
      techStack: ["Spring Boot", "Spring Data JPA", "OpenFeign", "PostgreSQL"],
    },
    database: [
      {
        name: "courses",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "code", type: "VARCHAR(10)", constraints: "UNIQUE, NOT NULL" },
          { name: "name", type: "VARCHAR(150)", constraints: "NOT NULL" },
          { name: "credits", type: "INT", constraints: "NOT NULL" },
          { name: "department", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "semester", type: "INT", constraints: "NOT NULL" },
        ],
      },
      {
        name: "grades",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "student_id", type: "BIGINT", constraints: "NOT NULL (FK → students)" },
          { name: "course_id", type: "BIGINT", constraints: "NOT NULL (FK → courses)" },
          { name: "academic_year", type: "VARCHAR(9)", constraints: "NOT NULL" },
          { name: "cc_score", type: "DECIMAL(5,2)", constraints: "Continuous assessment" },
          { name: "exam_score", type: "DECIMAL(5,2)", constraints: "Exam score" },
          { name: "final_score", type: "DECIMAL(5,2)", constraints: "Calculated" },
          { name: "grade_letter", type: "VARCHAR(2)", constraints: "A, B+, B, C+, etc." },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
      },
    ],
    apis: [
      { method: "GET", path: "/api/grades/student/{studentId}", description: "Get all grades for a student", response: "List<GradeDTO>" },
      { method: "GET", path: "/api/grades/course/{courseId}", description: "Get all grades for a course", response: "List<GradeDTO>" },
      { method: "POST", path: "/api/grades", description: "Submit a grade", requestBody: "CreateGradeRequest", response: "GradeDTO" },
      { method: "PUT", path: "/api/grades/{id}", description: "Update a grade", requestBody: "UpdateGradeRequest", response: "GradeDTO" },
      { method: "GET", path: "/api/grades/student/{studentId}/gpa", description: "Calculate student GPA", response: "GpaDTO" },
      { method: "GET", path: "/api/grades/student/{studentId}/transcript", description: "Get student transcript", response: "TranscriptDTO" },
      { method: "GET", path: "/api/courses", description: "Get all courses", response: "List<CourseDTO>" },
      { method: "POST", path: "/api/courses", description: "Create a course", requestBody: "CreateCourseRequest", response: "CourseDTO" },
    ],
  },
  {
    id: "email",
    name: "Email Notification Service",
    shortName: "Emails",
    description: "Sends email notifications for registration confirmations, grade publications, and general announcements.",
    icon: "Mail",
    color: "warning",
    port: 8084,
    logicalArchitecture: [
      "Presentation Layer: REST API + Message Queue Consumer",
      "Business Logic Layer: Email template engine, notification routing",
      "Integration Layer: SMTP client (JavaMailSender)",
      "Message Queue: RabbitMQ/Kafka consumer for async notifications"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "NotificationController – REST endpoint for direct emails" },
        { name: "Service", description: "EmailService – template rendering, sending logic" },
        { name: "Consumer", description: "NotificationConsumer – listens to message queue events" },
        { name: "Template", description: "Thymeleaf email templates" },
      ],
      techStack: ["Spring Boot", "Spring Mail", "Thymeleaf", "RabbitMQ/Kafka"],
    },
    database: [
      {
        name: "email_logs",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "recipient", type: "VARCHAR(150)", constraints: "NOT NULL" },
          { name: "subject", type: "VARCHAR(255)", constraints: "NOT NULL" },
          { name: "template", type: "VARCHAR(50)", constraints: "NOT NULL" },
          { name: "status", type: "ENUM('SENT','FAILED','PENDING')", constraints: "NOT NULL" },
          { name: "sent_at", type: "TIMESTAMP", constraints: "" },
          { name: "error_message", type: "TEXT", constraints: "" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
      },
    ],
    apis: [
      { method: "POST", path: "/api/notifications/email", description: "Send an email notification", requestBody: "EmailRequest", response: "EmailResponse" },
      { method: "POST", path: "/api/notifications/bulk", description: "Send bulk emails", requestBody: "BulkEmailRequest", response: "BulkEmailResponse" },
      { method: "GET", path: "/api/notifications/logs", description: "Get email logs (paginated)", response: "Page<EmailLogDTO>" },
      { method: "GET", path: "/api/notifications/logs/{id}", description: "Get email log by ID", response: "EmailLogDTO" },
    ],
  },
  {
    id: "rooms",
    name: "Room Management Service",
    shortName: "Rooms",
    description: "Manages classrooms, labs, and scheduling for the campus buildings.",
    icon: "Building",
    color: "info",
    port: 8085,
    logicalArchitecture: [
      "Presentation Layer: REST API Controllers",
      "Business Logic Layer: Room service, scheduling, conflict detection",
      "Data Access Layer: Room & Schedule repositories",
      "Database Layer: Rooms database (PostgreSQL)"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "RoomController, ScheduleController – REST endpoints" },
        { name: "Service", description: "RoomService – room CRUD, availability, conflict detection" },
        { name: "Repository", description: "RoomRepository, ScheduleRepository" },
        { name: "Model", description: "Room, Schedule entities and DTOs" },
      ],
      techStack: ["Spring Boot", "Spring Data JPA", "PostgreSQL"],
    },
    database: [
      {
        name: "rooms",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "name", type: "VARCHAR(50)", constraints: "UNIQUE, NOT NULL" },
          { name: "building", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "capacity", type: "INT", constraints: "NOT NULL" },
          { name: "type", type: "ENUM('CLASSROOM','LAB','AMPHITHEATER')", constraints: "NOT NULL" },
          { name: "has_projector", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
          { name: "has_ac", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
        ],
      },
      {
        name: "schedules",
        columns: [
          { name: "id", type: "BIGINT", constraints: "PRIMARY KEY, AUTO_INCREMENT" },
          { name: "room_id", type: "BIGINT", constraints: "NOT NULL (FK → rooms)" },
          { name: "course_code", type: "VARCHAR(10)", constraints: "NOT NULL" },
          { name: "day_of_week", type: "VARCHAR(10)", constraints: "NOT NULL" },
          { name: "start_time", type: "TIME", constraints: "NOT NULL" },
          { name: "end_time", type: "TIME", constraints: "NOT NULL" },
          { name: "academic_year", type: "VARCHAR(9)", constraints: "NOT NULL" },
        ],
      },
    ],
    apis: [
      { method: "GET", path: "/api/rooms", description: "Get all rooms", response: "List<RoomDTO>" },
      { method: "GET", path: "/api/rooms/{id}", description: "Get room by ID", response: "RoomDTO" },
      { method: "POST", path: "/api/rooms", description: "Create a room", requestBody: "CreateRoomRequest", response: "RoomDTO" },
      { method: "PUT", path: "/api/rooms/{id}", description: "Update room details", requestBody: "UpdateRoomRequest", response: "RoomDTO" },
      { method: "DELETE", path: "/api/rooms/{id}", description: "Delete a room", response: "void" },
      { method: "GET", path: "/api/rooms/{id}/availability", description: "Check room availability", response: "AvailabilityDTO" },
      { method: "GET", path: "/api/schedules", description: "Get all schedules", response: "List<ScheduleDTO>" },
      { method: "POST", path: "/api/schedules", description: "Create a schedule", requestBody: "CreateScheduleRequest", response: "ScheduleDTO" },
    ],
  },
  {
    id: "composite",
    name: "Composite Service",
    shortName: "Composite",
    description: "Aggregates data from multiple microservices to provide unified views like student profiles with grades and registrations.",
    icon: "Layers",
    color: "destructive",
    port: 8086,
    logicalArchitecture: [
      "Presentation Layer: REST API Controllers (aggregated endpoints)",
      "Business Logic Layer: Aggregation service, data composition",
      "Integration Layer: Feign clients to all other microservices",
      "No dedicated database – reads from other services"
    ],
    softwareArchitecture: {
      layers: [
        { name: "Controller", description: "CompositeController – aggregated REST endpoints" },
        { name: "Service", description: "CompositeService – orchestrates calls, merges data" },
        { name: "Clients", description: "StudentClient, RegistrationClient, GradeClient, RoomClient" },
        { name: "DTO", description: "Composite DTOs (StudentFullProfile, etc.)" },
      ],
      techStack: ["Spring Boot", "OpenFeign", "Resilience4j (Circuit Breaker)"],
    },
    database: [],
    apis: [
      { method: "GET", path: "/api/composite/students/{id}/full-profile", description: "Full student profile with registrations & grades", response: "StudentFullProfileDTO" },
      { method: "GET", path: "/api/composite/registrations/year/{year}", description: "All registered students for an academic year", response: "List<RegisteredStudentDTO>" },
      { method: "GET", path: "/api/composite/students/{id}/transcript", description: "Student transcript with course details", response: "FullTranscriptDTO" },
      { method: "GET", path: "/api/composite/dashboard/stats", description: "Dashboard statistics (counts, averages)", response: "DashboardStatsDTO" },
      { method: "GET", path: "/api/composite/rooms/schedule/{day}", description: "Full room schedule for a given day", response: "List<RoomScheduleDTO>" },
    ],
  },
];

export const architectureComponents = {
  apiGateway: {
    name: "API Gateway (Spring Cloud Gateway)",
    description: "Single entry point for all client requests. Handles routing, load balancing, rate limiting, and authentication.",
    port: 8080,
    features: ["Request routing", "Load balancing", "Rate limiting", "JWT authentication", "CORS handling", "Request/Response logging"],
  },
  discoveryServer: {
    name: "Service Discovery (Eureka Server)",
    description: "Service registry where all microservices register themselves. Enables dynamic service discovery and load balancing.",
    port: 8761,
    features: ["Service registration", "Health monitoring", "Dynamic routing", "Failover support"],
  },
  configServer: {
    name: "Config Server (Spring Cloud Config)",
    description: "Centralized configuration management for all microservices.",
    port: 8888,
    features: ["Centralized config", "Environment-specific profiles", "Git-backed storage", "Dynamic refresh"],
  },
};

export const cicdSteps = [
  { step: 1, name: "Source Code", description: "Developer pushes code to Git repository (GitHub/GitLab)", icon: "GitBranch" },
  { step: 2, name: "Build & Test", description: "CI server (Jenkins/GitHub Actions) compiles code and runs unit tests", icon: "Hammer" },
  { step: 3, name: "Code Quality", description: "SonarQube analyzes code quality, coverage, and vulnerabilities", icon: "Shield" },
  { step: 4, name: "Docker Build", description: "Build Docker images for each microservice using Dockerfile", icon: "Container" },
  { step: 5, name: "Push to Registry", description: "Push Docker images to Docker Hub / private registry", icon: "Upload" },
  { step: 6, name: "Deploy", description: "Docker Compose / Kubernetes deploys all services", icon: "Rocket" },
];
