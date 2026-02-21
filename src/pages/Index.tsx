import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArchitectureOverview from "@/components/ArchitectureOverview";
import MicroservicesSection from "@/components/MicroservicesSection";
import CICDSection from "@/components/CICDSection";
import StepsSection from "@/components/StepsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ArchitectureOverview />
      <MicroservicesSection />
      <CICDSection />
      <StepsSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          ISJ IT Architecture Project — Microservices Architecture for Student Management System
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Université Saint Jean, Yaoundé, Cameroun
        </p>
      </footer>
    </div>
  );
};

export default Index;
