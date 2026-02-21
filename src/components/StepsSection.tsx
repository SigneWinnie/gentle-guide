const steps = [
  {
    step: 1,
    title: "Design Microservices Architecture",
    description: "Define each microservice's boundaries, APIs, database models, and communication patterns.",
    details: [
      "Identify bounded contexts: Students, Registrations, Grades, Email, Rooms",
      "Define API contracts (REST endpoints) for each service",
      "Design database schema per service (Database per Service pattern)",
      "Plan inter-service communication (Feign clients, message queues)",
    ],
  },
  {
    step: 2,
    title: "Set Up Infrastructure Services",
    description: "Create the Eureka Discovery Server, Config Server, and API Gateway.",
    details: [
      "Create Eureka Server project (spring-cloud-starter-netflix-eureka-server)",
      "Create Config Server (spring-cloud-config-server) backed by Git repo",
      "Create API Gateway (spring-cloud-starter-gateway) with route definitions",
      "Configure each service to register with Eureka",
    ],
  },
  {
    step: 3,
    title: "Implement Each Microservice",
    description: "Build the 6 business microservices with Spring Boot following the layered architecture.",
    details: [
      "Create Spring Boot project for each service",
      "Implement Entity → Repository → Service → Controller layers",
      "Configure PostgreSQL connection per service",
      "Add OpenFeign clients for inter-service calls",
      "Add Resilience4j circuit breakers for fault tolerance",
    ],
  },
  {
    step: 4,
    title: "Build the Composite Service",
    description: "Create the aggregation service that combines data from multiple microservices.",
    details: [
      "Create Feign clients for Student, Registration, Grade, and Room services",
      "Implement aggregation logic (e.g., full student profile)",
      "Add circuit breaker fallbacks for resilience",
      "Create composite DTOs for unified responses",
    ],
  },
  {
    step: 5,
    title: "Build the UI Microservice",
    description: "Create the frontend application (React/Angular) that communicates through the API Gateway.",
    details: [
      "Set up React/Angular project",
      "Configure API calls to go through the API Gateway (port 8080)",
      "Build pages: Student list, Registration form, Grade viewer, Room scheduler",
      "Add authentication (JWT tokens sent via API Gateway)",
    ],
  },
  {
    step: 6,
    title: "Dockerize & Set Up CI/CD",
    description: "Containerize all services and set up automated build/test/deploy pipeline.",
    details: [
      "Create Dockerfile for each microservice",
      "Write docker-compose.yml to orchestrate all services",
      "Set up GitHub Actions / Jenkins pipeline",
      "Add unit tests and integration tests",
      "Configure SonarQube for code quality",
      "Deploy to Docker environment",
    ],
  },
];

const StepsSection = () => {
  return (
    <section id="steps" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Implementation Guide</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Step-by-Step Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to build the complete microservices architecture from scratch.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.step} className="relative flex gap-6">
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow">
                  {s.step}
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-xl p-6 shadow-card border border-border">
                  <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                  <ul className="space-y-2">
                    {s.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">▸</span>
                        <span className="text-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
