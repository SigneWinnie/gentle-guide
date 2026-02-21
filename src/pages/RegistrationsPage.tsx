import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Plus, Trash2, X } from "lucide-react";

const RegistrationsPage = () => {
  const { registrations, students, addRegistration, updateRegistration, deleteRegistration } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ studentId: "", academicYear: "2024-2025", program: "", level: "", totalFee: 500000, amountPaid: 0 });

  const getStudentName = (id: string) => {
    const s = students.find((x) => x.id === id);
    return s ? `${s.firstName} ${s.lastName}` : "Unknown";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRegistration({ ...form, status: "PENDING" });
    setShowForm(false);
    setForm({ studentId: "", academicYear: "2024-2025", program: "", level: "", totalFee: 500000, amountPaid: 0 });
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-warning/15 text-warning",
    CONFIRMED: "bg-success/15 text-success",
    CANCELLED: "bg-destructive/15 text-destructive",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Registrations</h2>
          <p className="text-sm text-muted-foreground">Manage student registrations per academic year</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Registration
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Year</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Program</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Fee</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Paid</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{getStudentName(r.studentId)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.academicYear}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.program}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateRegistration(r.id, { status: e.target.value as "PENDING" | "CONFIRMED" | "CANCELLED" })}
                      className={`px-2 py-0.5 rounded text-xs font-bold border-0 cursor-pointer ${statusColors[r.status]}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{r.totalFee.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground hidden lg:table-cell">{r.amountPaid.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteRegistration(r.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No registrations</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">New Registration</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Student</label>
                <select required value={form.studentId} onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select student</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.matricule} — {s.firstName} {s.lastName}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Academic Year</label>
                  <input required value={form.academicYear} onChange={(e) => setForm((p) => ({ ...p, academicYear: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Level</label>
                  <select required value={form.level} onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select</option>
                    <option value="L1">L1</option><option value="L2">L2</option><option value="L3">L3</option>
                    <option value="M1">M1</option><option value="M2">M2</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Program</label>
                <input required value={form.program} onChange={(e) => setForm((p) => ({ ...p, program: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Total Fee (FCFA)</label>
                  <input required type="number" value={form.totalFee} onChange={(e) => setForm((p) => ({ ...p, totalFee: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Amount Paid</label>
                  <input type="number" value={form.amountPaid} onChange={(e) => setForm((p) => ({ ...p, amountPaid: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Register</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationsPage;
