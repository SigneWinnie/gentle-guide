import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Plus, Trash2, X, Pencil, Wifi, Wind } from "lucide-react";

const typeColors: Record<string, string> = {
  CLASSROOM: "bg-primary/15 text-primary",
  LAB: "bg-accent/15 text-accent",
  AMPHITHEATER: "bg-secondary/15 text-secondary",
};

const RoomsPage = () => {
  const { rooms, schedules, courses, addRoom, updateRoom, deleteRoom, addSchedule, deleteSchedule } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", building: "", capacity: 30, type: "CLASSROOM" as "CLASSROOM" | "LAB" | "AMPHITHEATER", hasProjector: false, hasAC: false });
  const [schedForm, setSchedForm] = useState({ roomId: "", courseCode: "", dayOfWeek: "Monday", startTime: "08:00", endTime: "10:00", academicYear: "2024-2025" });

  const openCreate = () => { setForm({ name: "", building: "", capacity: 30, type: "CLASSROOM", hasProjector: false, hasAC: false }); setEditingId(null); setShowForm(true); };
  const openEdit = (r: typeof rooms[0]) => { setForm({ name: r.name, building: r.building, capacity: r.capacity, type: r.type, hasProjector: r.hasProjector, hasAC: r.hasAC }); setEditingId(r.id); setShowForm(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateRoom(editingId, form);
    else addRoom(form);
    setShowForm(false);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule(schedForm);
    setShowScheduleForm(false);
  };

  const getRoomName = (id: string) => rooms.find((r) => r.id === id)?.name || "Unknown";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Rooms */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Rooms</h2>
            <p className="text-sm text-muted-foreground">Manage classrooms, labs, and amphitheaters</p>
          </div>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((r) => (
            <div key={r.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${typeColors[r.type]}`}>{r.type}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(r)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteRoom(r.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{r.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{r.building} · Capacity: {r.capacity}</p>
              <div className="flex gap-2">
                {r.hasProjector && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"><Wifi className="w-3 h-3" /> Projector</span>}
                {r.hasAC && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"><Wind className="w-3 h-3" /> A/C</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedules */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">Room Schedules</h3>
            <p className="text-sm text-muted-foreground">Weekly schedule assignments</p>
          </div>
          <button onClick={() => setShowScheduleForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Schedule
          </button>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Room</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Course</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Day</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Time</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 text-foreground font-medium">{getRoomName(s.roomId)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-primary">{s.courseCode}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.dayOfWeek}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.startTime} — {s.endTime}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteSchedule(s.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {schedules.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No schedules</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Room Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">{editingId ? "Edit Room" : "New Room"}</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Room Name</label>
                  <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Building</label>
                  <input required value={form.building} onChange={(e) => setForm((p) => ({ ...p, building: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Capacity</label>
                  <input required type="number" min={1} value={form.capacity} onChange={(e) => setForm((p) => ({ ...p, capacity: +e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
                  <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as typeof form.type }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="CLASSROOM">Classroom</option>
                    <option value="LAB">Lab</option>
                    <option value="AMPHITHEATER">Amphitheater</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={form.hasProjector} onChange={(e) => setForm((p) => ({ ...p, hasProjector: e.target.checked }))} className="rounded" />
                  Projector
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={form.hasAC} onChange={(e) => setForm((p) => ({ ...p, hasAC: e.target.checked }))} className="rounded" />
                  Air Conditioning
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">{editingId ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Form Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleScheduleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">New Schedule</h3>
              <button type="button" onClick={() => setShowScheduleForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Room</label>
                <select required value={schedForm.roomId} onChange={(e) => setSchedForm((p) => ({ ...p, roomId: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select room</option>
                  {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Course Code</label>
                <select required value={schedForm.courseCode} onChange={(e) => setSchedForm((p) => ({ ...p, courseCode: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select course</option>
                  {courses.map((c) => <option key={c.id} value={c.code}>{c.code} — {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Day of Week</label>
                <select value={schedForm.dayOfWeek} onChange={(e) => setSchedForm((p) => ({ ...p, dayOfWeek: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Start Time</label>
                  <input required type="time" value={schedForm.startTime} onChange={(e) => setSchedForm((p) => ({ ...p, startTime: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">End Time</label>
                  <input required type="time" value={schedForm.endTime} onChange={(e) => setSchedForm((p) => ({ ...p, endTime: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowScheduleForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
