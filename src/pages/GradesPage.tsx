import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Plus, Trash2, X } from "lucide-react";

const GradesPage = () => {
  const { grades, students, courses, addGrade, deleteGrade } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ studentId: "", courseId: "", academicYear: "2024-2025", ccScore: 0, examScore: 0 });

  const getStudentName = (id: string) => { const s = students.find((x) => x.id === id); return s ? `${s.firstName} ${s.lastName}` : "Unknown"; };
  const getCourseName = (id: string) => { const c = courses.find((x) => x.id === id); return c ? `${c.code} — ${c.name}` : "Unknown"; };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGrade(form);
    setShowForm(false);
    setForm({ studentId: "", courseId: "", academicYear: "2024-2025", ccScore: 0, examScore: 0 });
  };

  const gradeColor = (letter: string) => {
    if (letter === "A" || letter === "B+") return "bg-success/15 text-success";
    if (letter === "B" || letter === "C") return "bg-warning/15 text-warning";
    return "bg-destructive/15 text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Grades</h2>
          <p className="text-sm text-muted-foreground">Manage student grades (CC 40% + Exam 60%)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Grade
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">CC</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Exam</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Final</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Grade</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{getStudentName(g.studentId)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{getCourseName(g.courseId)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">{g.ccScore}/20</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">{g.examScore}/20</td>
                  <td className="px-4 py-3 font-mono text-sm font-bold text-foreground">{g.finalScore}/20</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${gradeColor(g.gradeLetter)}`}>{g.gradeLetter}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteGrade(g.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {grades.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No grades yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">Add Grade</h3>
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
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Course</label>
                <select required value={form.courseId} onChange={(e) => setForm((p) => ({ ...p, courseId: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select course</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Academic Year</label>
                <input required value={form.academicYear} onChange={(e) => setForm((p) => ({ ...p, academicYear: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">CC Score (/20)</label>
                  <input required type="number" min={0} max={20} step={0.5} value={form.ccScore} onChange={(e) => setForm((p) => ({ ...p, ccScore: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Exam Score (/20)</label>
                  <input required type="number" min={0} max={20} step={0.5} value={form.examScore} onChange={(e) => setForm((p) => ({ ...p, examScore: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                Final = CC × 0.4 + Exam × 0.6 = <span className="font-bold text-foreground">{(form.ccScore * 0.4 + form.examScore * 0.6).toFixed(2)}/20</span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Submit Grade</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GradesPage;
