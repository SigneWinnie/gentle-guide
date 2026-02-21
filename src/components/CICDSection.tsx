import { GitBranch, Hammer, Shield, Box, Upload, Rocket } from "lucide-react";
import { cicdSteps } from "@/data/microservices";

const iconMap: Record<string, React.ReactNode> = {
  GitBranch: <GitBranch className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Container: <Box className="w-6 h-6" />,
  Upload: <Upload className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

const CICDSection = () => {
  return (
    <section id="cicd" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">DevOps</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">CI/CD Pipeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Automated build, test, and deployment pipeline using Docker and CI/CD tools.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cicdSteps.map((step) => (
              <div key={step.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow mb-4">
                  {iconMap[step.icon]}
                </div>
                <span className="font-mono text-xs text-primary mb-1">Step {step.step}</span>
                <h4 className="font-bold text-sm text-foreground mb-2">{step.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Docker Compose Example */}
        <div className="mt-16 bg-card rounded-2xl shadow-card border border-border overflow-hidden">
          <div className="px-6 py-4 bg-muted border-b border-border flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">docker-compose.yml</span>
          </div>
          <pre className="p-6 overflow-x-auto text-sm font-mono text-foreground leading-relaxed">
{`version: '3.8'
services:
  eureka-server:
    build: ./eureka-server
    ports: ["8761:8761"]

  config-server:
    build: ./config-server
    ports: ["8888:8888"]
    depends_on: [eureka-server]

  api-gateway:
    build: ./api-gateway
    ports: ["8080:8080"]
    depends_on: [eureka-server, config-server]

  student-service:
    build: ./student-service
    ports: ["8081:8081"]
    depends_on: [eureka-server, student-db]

  registration-service:
    build: ./registration-service
    ports: ["8082:8082"]
    depends_on: [eureka-server, registration-db]

  grade-service:
    build: ./grade-service
    ports: ["8083:8083"]
    depends_on: [eureka-server, grade-db]

  email-service:
    build: ./email-service
    ports: ["8084:8084"]
    depends_on: [eureka-server, rabbitmq]

  room-service:
    build: ./room-service
    ports: ["8085:8085"]
    depends_on: [eureka-server, room-db]

  composite-service:
    build: ./composite-service
    ports: ["8086:8086"]
    depends_on: [eureka-server]

  # Databases
  student-db:
    image: postgres:15
    environment:
      POSTGRES_DB: student_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret

  # ... similar for other DBs

  rabbitmq:
    image: rabbitmq:3-management
    ports: ["5672:5672", "15672:15672"]`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CICDSection;
