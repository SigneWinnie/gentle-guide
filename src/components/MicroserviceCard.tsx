import { useState } from "react";
import { ChevronDown, ChevronUp, GraduationCap, ClipboardList, FileText, Mail, Building, Layers } from "lucide-react";
import type { Microservice } from "@/data/microservices";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  ClipboardList: <ClipboardList className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Building: <Building className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

const methodColors: Record<string, string> = {
  GET: "bg-success/15 text-success",
  POST: "bg-primary/15 text-primary",
  PUT: "bg-warning/15 text-warning",
  DELETE: "bg-destructive/15 text-destructive",
  PATCH: "bg-accent/15 text-accent",
};

const MicroserviceCard = ({ service }: { service: Microservice }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${colorMap[service.color]} flex items-center justify-center`}>
            {iconMap[service.icon]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{service.name}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-muted font-mono text-xs text-muted-foreground">:{service.port}</span>
          {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
          {/* Logical Architecture */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Logical Architecture
            </h4>
            <div className="space-y-2">
              {service.logicalArchitecture.map((layer, i) => (
                <div key={i} className="flex items-start gap-3 pl-4">
                  <span className="text-xs font-mono text-muted-foreground mt-1">{i + 1}.</span>
                  <p className="text-sm text-foreground">{layer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Software Architecture */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" /> Software Architecture
            </h4>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              {service.softwareArchitecture.layers.map((layer) => (
                <div key={layer.name} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="font-mono text-xs text-primary font-semibold">{layer.name}</p>
                  <p className="text-sm text-muted-foreground">{layer.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {service.softwareArchitecture.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{tech}</span>
              ))}
            </div>
          </div>

          {/* Database Model */}
          {service.database.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" /> Database Model
              </h4>
              {service.database.map((table) => (
                <div key={table.name} className="rounded-lg border border-border overflow-hidden mb-3">
                  <div className="px-4 py-2 bg-muted font-mono text-sm font-semibold text-foreground">
                    📦 {table.name}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-4 py-2 font-medium text-muted-foreground">Column</th>
                          <th className="text-left px-4 py-2 font-medium text-muted-foreground">Type</th>
                          <th className="text-left px-4 py-2 font-medium text-muted-foreground">Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((col) => (
                          <tr key={col.name} className="border-b border-border last:border-0">
                            <td className="px-4 py-2 font-mono text-xs text-foreground">{col.name}</td>
                            <td className="px-4 py-2 font-mono text-xs text-primary">{col.type}</td>
                            <td className="px-4 py-2 text-xs text-muted-foreground">{col.constraints}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* API Endpoints */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning" /> API Endpoints
            </h4>
            <div className="space-y-2">
              {service.apis.map((api, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${methodColors[api.method]}`}>
                    {api.method}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-foreground break-all">{api.path}</p>
                    <p className="text-xs text-muted-foreground mt-1">{api.description}</p>
                    {api.response && (
                      <p className="text-xs text-primary font-mono mt-1">→ {api.response}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroserviceCard;
