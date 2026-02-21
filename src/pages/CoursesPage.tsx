import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Plus, Trash2, X, Pencil } from "lucide-react";

const CoursesPage = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", name: "", credits: 3, department: "", semester: 1 });

  const openCreate = () => { setForm({ code: "", name: "", credits: 3, department: "", semester: 1 }); setEditingId(null); setShowForm(true); };
  const openEdit = (c: typeof courses[0]) => { setForm({ code: c.code, name: c.name, credits: c.credits, department: c.department, semester: c.semester }); setEditingId(c.id); setShowForm(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateCourse(editingId, form);
    else addCourse(form);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Courses</h2>
          <p className="text-sm text-muted-foreground">Manage courses and modules</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-start justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md bg-accent/15 text-accent text-xs font-bold font-mono">{c.code}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(c)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => deleteCourse(c.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.department} · Semester {c.semester}</p>
            <p className="text-xs text-primary font-medium mt-2">{c.credits} Credits</p>
          </div>
        ))}
        {courses.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No courses yet</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">{editingId ? "Edit Course" : "New Course"}</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Code</label>
                  <input required value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Credits</label>
                  <input required type="number" min={1} value={form.credits} onChange={(e) => setForm((p) => ({ ...p, credits: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Course Name</label>
                <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Department</label>
                  <input required value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Semester</label>
                  <select value={form.semester} onChange={(e) => setForm((p) => ({ ...p, semester: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value={1}>1</option><option value={2}>2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">{editingId ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
