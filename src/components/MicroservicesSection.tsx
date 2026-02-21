import { microservices } from "@/data/microservices";
import MicroserviceCard from "./MicroserviceCard";

const MicroservicesSection = () => {
  return (
    <section id="microservices" className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Detailed Design</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Microservices</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on each microservice to explore its logical architecture, software layers, database model, and API endpoints.
          </p>
        </div>

        <div className="space-y-4">
          {microservices.map((ms) => (
            <MicroserviceCard key={ms.id} service={ms} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicroservicesSection;
