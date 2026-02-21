import { Server, Database, Globe, ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(215, 90%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(215, 90%, 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-slide-up">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Server className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
              <Database className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </div>

        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
          Université Saint Jean — IT Architecture Project
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight tracking-tight">
          Microservices
          <br />
          <span className="text-gradient-primary">Architecture</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          A comprehensive microservices architecture for the ISJ Student Management System — 
          designed for scalability, resilience, and performance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {["7 Microservices", "API Gateway", "Service Discovery", "CI/CD Pipeline"].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-mono text-sm border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        <a href="#overview" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm font-medium">Explore Architecture</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
