import { useAppData } from "@/context/AppDataContext";
import { GraduationCap, ClipboardList, FileText, Building, Mail, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { students, registrations, grades, courses, rooms, emailLogs } = useAppData();
  const confirmedRegs = registrations.filter((r) => r.status === "CONFIRMED").length;
  const pendingRegs = registrations.filter((r) => r.status === "PENDING").length;
  const totalFees = registrations.reduce((s, r) => s + r.totalFee, 0);
  const totalPaid = registrations.reduce((s, r) => s + r.amountPaid, 0);

  const stats = [
    { label: "Students", value: students.length, icon: GraduationCap, color: "bg-primary" },
    { label: "Registrations", value: registrations.length, icon: ClipboardList, color: "bg-secondary" },
    { label: "Courses", value: courses.length, icon: BookOpen, color: "bg-accent" },
    { label: "Grades Entered", value: grades.length, icon: FileText, color: "bg-warning" },
    { label: "Rooms", value: rooms.length, icon: Building, color: "bg-info" },
    { label: "Emails Sent", value: emailLogs.length, icon: Mail, color: "bg-destructive" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Overview of the student management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-primary-foreground mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Registration Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-bold text-foreground mb-4">Registration Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Confirmed</span>
              <span className="px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold">{confirmedRegs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="px-3 py-1 rounded-full bg-warning/15 text-warning text-xs font-bold">{pendingRegs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cancelled</span>
              <span className="px-3 py-1 rounded-full bg-destructive/15 text-destructive text-xs font-bold">
                {registrations.filter((r) => r.status === "CANCELLED").length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-bold text-foreground mb-4">Fee Collection</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Expected</span>
              <span className="font-bold text-foreground">{totalFees.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Collected</span>
              <span className="font-bold text-success">{totalPaid.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Outstanding</span>
              <span className="font-bold text-destructive">{(totalFees - totalPaid).toLocaleString()} FCFA</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all"
                style={{ width: totalFees > 0 ? `${(totalPaid / totalFees) * 100}%` : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-bold text-foreground">Recent Students</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Matricule</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Level</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-mono text-xs text-primary">{s.matricule}</td>
                  <td className="px-6 py-3 text-foreground">{s.firstName} {s.lastName}</td>
                  <td className="px-6 py-3 text-muted-foreground">{s.department}</td>
                  <td className="px-6 py-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{s.level}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
