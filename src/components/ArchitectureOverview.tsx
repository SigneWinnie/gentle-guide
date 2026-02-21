import { ArrowRight, Shield, Radio, Settings } from "lucide-react";
import { architectureComponents } from "@/data/microservices";

const ArchitectureOverview = () => {
  return (
    <section id="overview" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">System Overview</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Architecture Diagram</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All client requests flow through the API Gateway, which discovers services via Eureka and routes accordingly.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-card rounded-2xl shadow-elevated p-8 md:p-12 mb-16 border border-border">
          {/* Client */}
          <div className="flex justify-center mb-8">
            <div className="px-8 py-4 rounded-xl bg-gradient-hero text-primary-foreground font-bold text-lg shadow-glow">
              🌐 Client (Browser / Mobile App)
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* API Gateway */}
          <div className="flex justify-center mb-8">
            <div className="px-8 py-5 rounded-xl bg-gradient-primary text-primary-foreground shadow-glow max-w-md w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield className="w-5 h-5" />
                <span className="font-bold text-lg">API Gateway</span>
              </div>
              <p className="text-sm opacity-80">Port {architectureComponents.apiGateway.port} — Routing, Auth, Rate Limiting</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Discovery + Config */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <div className="px-6 py-4 rounded-xl bg-secondary/10 border-2 border-secondary text-center flex-1 max-w-xs">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-secondary" />
                <span className="font-bold text-foreground">Eureka Server</span>
              </div>
              <p className="text-xs text-muted-foreground">Port {architectureComponents.discoveryServer.port}</p>
            </div>
            <div className="px-6 py-4 rounded-xl bg-accent/10 border-2 border-accent text-center flex-1 max-w-xs">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-accent" />
                <span className="font-bold text-foreground">Config Server</span>
              </div>
              <p className="text-xs text-muted-foreground">Port {architectureComponents.configServer.port}</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Microservices Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Students", port: 8081, emoji: "🎓", color: "bg-primary" },
              { name: "Registration", port: 8082, emoji: "📋", color: "bg-secondary" },
              { name: "Grades", port: 8083, emoji: "📝", color: "bg-accent" },
              { name: "Email", port: 8084, emoji: "📧", color: "bg-warning" },
              { name: "Rooms", port: 8085, emoji: "🏢", color: "bg-info" },
              { name: "Composite", port: 8086, emoji: "🔗", color: "bg-destructive" },
            ].map((ms) => (
              <div key={ms.name} className="p-4 rounded-xl bg-gradient-card border border-border text-center shadow-card hover:shadow-elevated transition-shadow">
                <div className="text-2xl mb-2">{ms.emoji}</div>
                <p className="font-semibold text-sm text-foreground">{ms.name}</p>
                <p className="text-xs text-muted-foreground font-mono">:{ms.port}</p>
              </div>
            ))}
          </div>

          {/* Database layer */}
          <div className="flex justify-center mt-8 mb-4">
            <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
          </div>
          <div className="flex justify-center">
            <div className="px-8 py-4 rounded-xl bg-muted border border-border text-center">
              <p className="font-bold text-foreground">🗄️ PostgreSQL Databases</p>
              <p className="text-xs text-muted-foreground">Each microservice has its own database (Database per Service pattern)</p>
            </div>
          </div>
        </div>

        {/* Infrastructure Components Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { data: architectureComponents.apiGateway, icon: <Shield className="w-6 h-6" />, gradient: "bg-gradient-primary" },
            { data: architectureComponents.discoveryServer, icon: <Radio className="w-6 h-6" />, gradient: "bg-gradient-secondary" },
            { data: architectureComponents.configServer, icon: <Settings className="w-6 h-6" />, gradient: "bg-gradient-primary" },
          ].map(({ data, icon, gradient }) => (
            <div key={data.name} className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center text-primary-foreground mb-4`}>
                {icon}
              </div>
              <h3 className="font-bold text-foreground mb-2">{data.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.features.map((f) => (
                  <span key={f} className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureOverview;
